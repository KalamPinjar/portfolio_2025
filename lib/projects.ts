/**
 * Project content.
 *
 * One typed object per project; adding a project means adding an entry here
 * and nothing else. Stacks are transcribed from each repository's actual
 * package.json rather than inferred from its README.
 *
 * Metrics are engineering facts about the build — architecture, integration
 * count, transport count. They are quotable in an interview because they are
 * checkable in the source.
 */

export type Metric = {
  value: string;
  label: string;
};

export type PipelineStage = {
  label: string;
  sub?: string;
  /** `key` stages are drawn in the accent colour. */
  tone?: "key" | "plain";
};

export type CaseSection = {
  heading: string;
  body: string[];
};

/** Separated so the UI can present source and deployment differently. */
export type ProjectLink = {
  label: string;
  href: string;
  type: "repo" | "live";
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  /** Short label for the archive grid card. */
  summary: string;
  year: string;
  role: string;
  /** Featured projects lead the home page. Every project has a case study. */
  featured: boolean;
  category: string;
  stack: string[];
  /** Coarse tags, used by the /work filter. */
  tags: string[];
  links: ProjectLink[];
  metrics?: Metric[];
  study: {
    context: string;
    pipeline?: { caption: string; stages: PipelineStage[] };
    sections: CaseSection[];
    decisions: { title: string; body: string }[];
    stackGroups: { group: string; items: string[] }[];
  };
};

export const projects: Project[] = [
  /* ================================================================== */
  {
    slug: "docquery",
    name: "DocQuery",
    tagline:
      "Upload a PDF, ask it questions, get answers grounded in the document.",
    summary:
      "A retrieval-augmented SaaS: PDF ingestion, vector search and streamed answers, with a free tier and a paid plan.",
    year: "2024",
    role: "Sole engineer — architecture, frontend, backend",
    featured: true,
    category: "AI / SaaS",
    stack: [
      "Next.js 14",
      "TypeScript",
      "tRPC v11",
      "Prisma",
      "PostgreSQL",
      "Pinecone",
      "LangChain",
      "OpenAI",
      "Cohere",
      "Vercel AI SDK",
      "Kinde Auth",
      "Stripe",
      "UploadThing",
      "TanStack Query",
    ],
    tags: ["AI", "SaaS", "Full-stack", "Payments"],
    links: [
      {
        label: "Source",
        href: "https://github.com/KalamPinjar/SaasAI-PDF",
        type: "repo",
      },
    ],
    metrics: [
      { value: "7", label: "External services wired" },
      { value: "0", label: "Hand-written API types" },
      { value: "2", label: "Embedding providers compared" },
    ],
    study: {
      context:
        "DocQuery is a document question-answering product. You upload a PDF, it gets parsed, chunked, embedded and stored in a vector index, and then you can ask questions about it in a chat interface. Answers stream back grounded in the pages that actually matter. There is a free tier with page and file-size limits, and a pro plan behind Stripe.",
      pipeline: {
        caption: "Ingestion and retrieval path",
        stages: [
          { label: "Upload", sub: "UploadThing" },
          { label: "Parse", sub: "pdf-parse" },
          { label: "Chunk", sub: "overlap window", tone: "key" },
          { label: "Embed", sub: "OpenAI / Cohere", tone: "key" },
          { label: "Index", sub: "Pinecone" },
          { label: "Retrieve", sub: "top-k + context", tone: "key" },
          { label: "Stream", sub: "AI SDK" },
        ],
      },
      sections: [
        {
          heading: "The problem worth solving",
          body: [
            "The interesting part of a RAG product is not the chat interface — it is retrieval quality. A naive chunk-and-embed pipeline will confidently answer a question using text from the wrong page, and the user has no way to tell. The failure is silent, which makes it the worst kind.",
            "Most of the engineering went into the boundary between the document and the model: how big a chunk should be, how much chunks should overlap so a sentence split across a boundary is not lost, how many neighbours to retrieve, and how much of that retrieved context to actually hand the model before it starts ignoring the middle of it.",
          ],
        },
        {
          heading: "What I built",
          body: [
            "Uploads land through UploadThing so large PDFs never pass through a serverless function body. The file is parsed, split into overlapping windows, embedded, and upserted into Pinecone under a namespace scoped to the file — so retrieval can never leak across documents or across users.",
            "At query time the question is embedded with the same model that indexed the document, the nearest chunks are pulled back, and the question plus retrieved context plus the recent turns of the conversation are streamed to the model through the Vercel AI SDK. The response streams token by token into the client rather than making the user wait on a complete answer.",
            "Billing is a Stripe subscription with a free tier enforced server-side at upload time. Auth is Kinde, so I did not hand-roll sessions.",
          ],
        },
        {
          heading: "The part I would show a reviewer",
          body: [
            "The whole stack is typed end to end with no generated client and no hand-written request types. Prisma types the database, tRPC v11 infers the router's input and output types straight into the React client, and Zod validates at the boundary. Renaming a database column surfaces as a red squiggle in a component, at author time, not as a runtime error in production.",
            "That property is the reason I would build it this way again. It removes an entire category of bug rather than catching it later.",
          ],
        },
      ],
      decisions: [
        {
          title: "Two embedding providers, not one",
          body: "I wired both OpenAI and Cohere so retrieval quality could be compared on the same corpus instead of assumed. Different providers genuinely disagree about which chunk is nearest, and on a document-QA product that disagreement is the product.",
        },
        {
          title: "Namespace per document",
          body: "Pinecone namespaces scope every query to a single file. A retrieval bug can therefore return a wrong chunk, but never someone else's chunk. Isolation enforced by the data layer beats isolation enforced by remembering to add a filter.",
        },
        {
          title: "Stream, don't wait",
          body: "A grounded answer can take several seconds to generate. Streaming turns that into visible progress instead of a spinner, which changes how fast the product feels far more than any optimisation of the actual latency.",
        },
        {
          title: "Enforce plan limits on the server",
          body: "Free-tier page and size limits are checked before ingestion, not in the UI. The client-side check is a courtesy; the server-side check is the rule.",
        },
      ],
      stackGroups: [
        {
          group: "Retrieval",
          items: ["Pinecone", "LangChain", "OpenAI embeddings", "Cohere embeddings", "pdf-parse"],
        },
        { group: "Data", items: ["PostgreSQL", "Prisma", "Zod"] },
        { group: "Transport", items: ["tRPC v11", "TanStack Query", "Vercel AI SDK"] },
        { group: "Platform", items: ["Next.js 14", "Kinde Auth", "Stripe", "UploadThing"] },
      ],
    },
  },

  /* ================================================================== */
  {
    slug: "commerce-platform",
    name: "Commerce Platform",
    tagline:
      "A headless admin that runs many stores, and a storefront that consumes it.",
    summary:
      "Two deployable Next.js apps over one API — multi-store management, Stripe checkout, and per-store data isolation.",
    year: "2024",
    role: "Sole engineer — architecture, both applications",
    featured: true,
    category: "Commerce",
    stack: [
      "Next.js 14",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Stripe",
      "Server Actions",
      "Zustand",
      "SWR",
      "Headless UI",
      "DaisyUI",
    ],
    tags: ["Commerce", "Full-stack", "Payments", "Architecture"],
    links: [
      {
        label: "Admin + API",
        href: "https://github.com/KalamPinjar/E-Commerce-With-Admin-Panel",
        type: "repo",
      },
      {
        label: "Storefront",
        href: "https://github.com/KalamPinjar/E-commerce-Store-Using-Admin-Panel",
        type: "repo",
      },
    ],
    metrics: [
      { value: "2", label: "Deployable applications" },
      { value: "1", label: "Shared headless API" },
      { value: "N", label: "Stores per admin instance" },
    ],
    study: {
      context:
        "This is two applications rather than one. The admin is a dashboard and an API: it owns products, categories, billboards, orders and Stripe, and it can manage any number of separate stores from a single deployment. The storefront is a thin, fast client of that API — it holds no business logic, and a second storefront can be pointed at the same admin without touching the admin at all.",
      pipeline: {
        caption: "Request path for a purchase",
        stages: [
          { label: "Storefront", sub: "Next.js" },
          { label: "Store API", sub: "scoped by id", tone: "key" },
          { label: "Prisma", sub: "PostgreSQL" },
          { label: "Checkout", sub: "Stripe" },
          { label: "Webhook", sub: "idempotent", tone: "key" },
          { label: "Order", sub: "persisted" },
        ],
      },
      sections: [
        {
          heading: "The problem worth solving",
          body: [
            "The hard requirement was multi-tenancy. One admin instance owns N stores, and every single query, route handler and webhook has to be scoped so that store A can never read or mutate anything belonging to store B. Getting this wrong is not a rendering bug — it is a data breach.",
            "The second hard requirement was payment correctness. Stripe does not promise to deliver a webhook exactly once. It promises at least once. If the handler is written naively, the same `checkout.session.completed` event arrives twice and the customer gets two orders for one payment.",
          ],
        },
        {
          heading: "What I built",
          body: [
            "Store scoping is structural rather than remembered. The store id is a route parameter, every data access is resolved through it, and there is no code path that queries a product without also constraining it to a store. Making the safe thing the only thing available is more reliable than making it the thing you have to remember.",
            "The webhook handler verifies the Stripe signature, then treats the event id as the unit of work — an event that has already been processed is acknowledged and discarded rather than replayed. The order write is keyed so that a duplicate delivery cannot create a second order.",
            "On the storefront, cart state lives in Zustand and persists across reloads, with SWR handling product data. The split matters: the cart is client-owned and must survive a refresh; the catalogue is server-owned and must stay fresh. Those are different problems and they get different tools.",
          ],
        },
        {
          heading: "Why split it into two apps",
          body: [
            "Because they have different jobs. The admin is authenticated, write-heavy, and only a handful of people ever load it — its bundle size barely matters. The storefront is public, read-heavy, and its load time is directly a conversion number.",
            "Keeping them separate means the storefront ships almost no admin code, and the admin can grow without making the storefront slower. It also means a new client gets a new storefront deployment rather than a new fork of everything.",
          ],
        },
      ],
      decisions: [
        {
          title: "Headless admin, not a monolith",
          body: "The admin exposes an API rather than rendering the shop. That one decision is what makes N storefronts possible without duplicating business logic, and it keeps the public site's bundle free of dashboard code.",
        },
        {
          title: "Scope in the route, not in the query",
          body: "The store id lives in the URL and flows down through every data access. There is no unscoped query to accidentally call, so tenancy is enforced by the shape of the code rather than by reviewer vigilance.",
        },
        {
          title: "Treat webhooks as at-least-once",
          body: "Stripe will redeliver. Handling the event id as an idempotency key is a few lines and it is the difference between a correct ledger and double-charged customers.",
        },
        {
          title: "Different state tools for different state",
          body: "Zustand for the cart because it is client-owned and must survive reloads. SWR for the catalogue because it is server-owned and must not go stale. One global store for both would have been worse at both.",
        },
      ],
      stackGroups: [
        { group: "Admin + API", items: ["Next.js 14", "Server Actions", "Prisma", "PostgreSQL"] },
        { group: "Storefront", items: ["Next.js 14", "Zustand", "SWR", "Headless UI", "DaisyUI"] },
        { group: "Payments", items: ["Stripe Checkout", "Signed webhooks", "Idempotent handlers"] },
      ],
    },
  },

  /* ================================================================== */
  {
    slug: "discord-clone",
    name: "Discord Clone",
    tagline: "Servers, channels, real-time chat, and live video rooms.",
    summary:
      "Three transports in one application: HTTP for history, WebSocket for messages, WebRTC for calls.",
    year: "2024",
    role: "Sole engineer",
    featured: false,
    category: "Real-time",
    stack: [
      "Next.js 14",
      "TypeScript",
      "Clerk",
      "Prisma",
      "PostgreSQL",
      "Socket.IO",
      "LiveKit",
      "TanStack Query",
      "Zustand",
      "UploadThing",
    ],
    tags: ["Real-time", "Full-stack"],
    links: [
      {
        label: "Source",
        href: "https://github.com/KalamPinjar/Discord-Clone-Nextjs",
        type: "repo",
      },
    ],
    metrics: [
      { value: "3", label: "Concurrent transports" },
      { value: "5", label: "External services wired" },
    ],
    study: {
      context:
        "A Discord-shaped application: users create servers, servers hold channels, channels hold messages, and members have roles that decide what they can do. On top of that sits live audio and video, so a text channel can become a call without leaving the page. I built it to find out what actually breaks when one app has to run three different transports at once.",
      pipeline: {
        caption: "What happens when someone sends a message",
        stages: [
          { label: "Compose", sub: "client" },
          { label: "POST", sub: "route handler" },
          { label: "Authorise", sub: "role check", tone: "key" },
          { label: "Persist", sub: "Prisma" },
          { label: "Emit", sub: "Socket.IO", tone: "key" },
          { label: "Fan out", sub: "channel room" },
        ],
      },
      sections: [
        {
          heading: "The problem worth solving",
          body: [
            "Three transports, three different sets of guarantees. HTTP is request-response and reliable, and it is how history loads. WebSockets are persistent, ordered but droppable, and they are how new messages arrive. WebRTC is peer-to-peer, lossy by design, and it is how audio and video work.",
            "The difficulty is that the user does not care about any of that. They expect one coherent view of a conversation. So the real work is reconciling three sources into a single piece of state that never shows a message twice, never loses one, and never disagrees with what the server thinks happened.",
          ],
        },
        {
          heading: "What I built",
          body: [
            "Messages are written over HTTP and broadcast over WebSocket — never written over the socket directly. The route handler authorises against the member's role, persists through Prisma, and only then emits to the channel room. That ordering means the database is always the source of truth and the socket is only a notification that something changed.",
            "History loads through TanStack Query with cursor pagination, so scrolling up fetches the next window rather than re-fetching a growing offset. Incoming socket messages are merged into the same cache, which is what keeps live messages and loaded history in one list instead of two.",
            "Audio and video run on LiveKit rather than raw WebRTC. Clerk handles authentication, and UploadThing handles attachments and avatars.",
          ],
        },
        {
          heading: "What I would change",
          body: [
            "The Socket.IO server runs alongside Next, which is the weakest part of the design. It works, but it ties the realtime layer to the lifecycle of the web app and does not survive being deployed to a serverless platform.",
            "If I rebuilt it, the socket layer would be a separate long-lived service and the Next app would be a client of it. That is the difference between a project that demonstrates the pattern and one that could actually take traffic.",
          ],
        },
      ],
      decisions: [
        {
          title: "Persist before broadcasting",
          body: "A message is written to PostgreSQL and then emitted. Emitting first would feel marginally faster and would occasionally show people a message that was never saved — which is worse than any latency.",
        },
        {
          title: "Cursor pagination, not offset",
          body: "Offsets shift when new rows arrive, so a busy channel would duplicate or skip messages as you scrolled. A cursor is stable against inserts, which is exactly the property a live feed needs.",
        },
        {
          title: "LiveKit instead of raw WebRTC",
          body: "Signalling, TURN servers and renegotiation are a project of their own, and getting them subtly wrong produces calls that work on your machine and fail on everyone else's. LiveKit is the part I chose not to reinvent.",
        },
        {
          title: "Roles checked on the server",
          body: "The client hides controls a member cannot use, but the route handler is what actually enforces it. Hiding a button is presentation; refusing the request is authorisation.",
        },
      ],
      stackGroups: [
        { group: "Realtime", items: ["Socket.IO", "LiveKit", "TanStack Query"] },
        { group: "Data", items: ["PostgreSQL", "Prisma", "Zod"] },
        { group: "Platform", items: ["Next.js 14", "Clerk", "UploadThing", "Zustand"] },
      ],
    },
  },

  /* ================================================================== */
  {
    slug: "al-birr",
    name: "Al-Birr",
    tagline: "Website for a Mumbai community trust.",
    summary:
      "Programmes, publications and online donations for a socio-religious trust — the one project here with real users.",
    year: "2025",
    role: "Sole engineer",
    featured: false,
    category: "Client work",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    tags: ["Client work", "Frontend"],
    links: [{ label: "Live site", href: "https://al-birr.vercel.app", type: "live" }],
    metrics: [
      { value: "8", label: "Programme areas" },
      { value: "1", label: "Donation flow, three tender types" },
    ],
    study: {
      context:
        "Al-Birr is a socio-religious trust based in Mumbai with branches across several regions. The site carries their eight programme areas — lectures, publications, fieldwork, regional tours, women's education, village outreach, competitions and their YouTube channel — alongside downloadable literature and an online donation flow that accepts Zakat and Sadaqah as well as general giving.",
      sections: [
        {
          heading: "The brief, and who it is actually for",
          body: [
            "This was not an audience of developers. A large share of visitors arrive on mid-range Android phones over uneven mobile connections, many are not reading in their first language, and a meaningful number are older and not confident online. That set the constraints far more than any design preference did.",
            "It also meant the usual portfolio instincts were wrong. Heavy motion, clever layouts and anything that delays first paint would actively cost this client donations. The job was clarity and speed, not expression.",
          ],
        },
        {
          heading: "What I built",
          body: [
            "The eight programmes are modelled as content rather than hardcoded pages, so the trust can add a programme or reorder them without a developer. Each one leads with a photograph and a plain description, because that is what tells a visitor whether this is the organisation they were looking for.",
            "The donation path is deliberately short, and the page carries the reassurance signals that actually matter for charitable giving: secure-payment confirmation, tax-exemption status, and explicit handling of Zakat and Sadaqah as distinct categories rather than a single generic amount. Literature is offered as direct downloads, and scholar testimonials sit near the giving path rather than buried on an About page.",
          ],
        },
        {
          heading: "Designing for trust rather than polish",
          body: [
            "A donation page lives or dies on credibility. Someone deciding whether to give money to a religious trust is asking a very specific question — is this real, and will the money reach where it says. Every design decision on that page answers that question or it is noise.",
            "So the endorsements, the registration and exemption details, and the named programmes are all load-bearing content, not decoration. The most effective thing I did on this project was resist making it look more impressive.",
          ],
        },
      ],
      decisions: [
        {
          title: "Lead with proof, not with design",
          body: "Scholar endorsements, tax-exemption status and named programmes sit high on the page. For a giving audience these are the conversion levers, and burying them under a hero would have been a designer's decision rather than a useful one.",
        },
        {
          title: "Zakat and Sadaqah as first-class categories",
          body: "These are religiously distinct obligations with different rules, not labels on the same donation. Treating them as separate options respects how the audience actually thinks about giving, and it is the detail that signals the site was built for them.",
        },
        {
          title: "Programmes as content, not pages",
          body: "The trust adds and retires activities over time. Modelling them as data means that is an edit rather than a deployment, which matters when the client has no developer on hand.",
        },
        {
          title: "Treat performance as accessibility",
          body: "On a low-end Android over a weak connection, every unnecessary kilobyte is a person who leaves before the page renders. For this audience, a fast site is not a technical achievement — it is whether they saw the content at all.",
        },
      ],
      stackGroups: [
        { group: "Application", items: ["Next.js", "TypeScript", "Tailwind CSS"] },
        { group: "Content", items: ["Programme model", "Literature downloads", "Testimonials"] },
        { group: "Delivery", items: ["Vercel", "Image optimisation", "Static rendering"] },
      ],
    },
  },

  /* ================================================================== */
  {
    slug: "cipherweb",
    name: "CipherWeb",
    tagline: "Ten classical and modern ciphers, implemented from the spec.",
    summary:
      "Encrypt and decrypt with ten algorithms — Caesar and Vigenere through to Blowfish and RSA — with Firebase-backed storage.",
    year: "2024",
    role: "Sole engineer",
    featured: false,
    category: "Security",
    stack: ["JavaScript", "Tailwind CSS", "Canvas 2D", "Firebase"],
    tags: ["Security", "Frontend"],
    links: [
      { label: "Source", href: "https://github.com/KalamPinjar/CipherWeb", type: "repo" },
    ],
    metrics: [
      { value: "10", label: "Ciphers implemented" },
      { value: "0", label: "Crypto libraries used" },
    ],
    study: {
      context:
        "CipherWeb came out of my cyber security degree. It implements ten ciphers in the browser — Caesar, Vigenere, Gronsfeld, Vernam, Rail Fence, Polybius Square, Morse, Huffman, Blowfish and RSA — and lets you encrypt or decrypt text with any of them, with results stored in Firebase. Every algorithm is written from its specification rather than pulled from a library, because reading about a cipher and implementing one turn out to be very different activities.",
      pipeline: {
        caption: "Path of a message through the tool",
        stages: [
          { label: "Plaintext", sub: "user input" },
          { label: "Select", sub: "1 of 10" },
          { label: "Key schedule", sub: "per algorithm", tone: "key" },
          { label: "Transform", sub: "encrypt / decrypt", tone: "key" },
          { label: "Ciphertext", sub: "rendered" },
          { label: "Store", sub: "Firebase" },
        ],
      },
      sections: [
        {
          heading: "Ten algorithms, four different ideas",
          body: [
            "The ten are not variations on one theme — they fall into distinct families, and implementing them side by side is what makes the differences legible. Caesar, Vigenere and Gronsfeld are substitution: they replace characters. Rail Fence and Polybius are transposition: they keep the characters and move them. Morse and Huffman are encodings rather than ciphers at all — Huffman is compression, and including it honestly means labelling it as such.",
            "Then there is the jump to Blowfish and RSA. One is a symmetric block cipher with a real key schedule and Feistel rounds; the other is asymmetric and rests on modular arithmetic with large numbers. Going from a Caesar shift to RSA in one project is the clearest way I have found to feel the gap between a puzzle and actual cryptography.",
          ],
        },
        {
          heading: "Why implement rather than import",
          body: [
            "The point of the project was learning, and you cannot learn a key schedule by calling a function that has one. Writing Blowfish's subkey initialisation by hand, or getting RSA's modular exponentiation to behave, teaches you where the sharp edges are in a way that reading the Wikipedia article does not.",
            "The interface uses Canvas to draw what transposition ciphers are doing, because Rail Fence in particular is far easier to understand as a picture of characters moving between rails than as a paragraph of prose.",
          ],
        },
        {
          heading: "The conclusion it argues for",
          body: [
            "Implementing these is exactly why I would never ship my own crypto in production. A textbook RSA implementation without proper padding is breakable, timing behaviour leaks information, and a key schedule with a subtle off-by-one still produces plausible-looking ciphertext that is simply wrong.",
            "That is the useful outcome of the project, and the reason it belongs in this portfolio rather than in a drawer. It is where the instinct came from that shows up in everything else here — validate at the boundary, never trust the client, and be suspicious of code that looks correct because the output looks scrambled.",
          ],
        },
      ],
      decisions: [
        {
          title: "From the specification, no crypto libraries",
          body: "Importing a library would have produced a better tool and taught me nothing. The entire value of the project was in the implementations, so using someone else's would have removed the reason to build it.",
        },
        {
          title: "Label Huffman honestly",
          body: "Huffman coding is compression, not encryption, and it sits in the list because it is a related transformation worth understanding. Presenting it as a cipher would have been the easy and slightly dishonest choice.",
        },
        {
          title: "Draw the transpositions",
          body: "Rail Fence and Polybius are spatial algorithms. A Canvas rendering of characters moving between rails explains in one glance what a paragraph of description does not.",
        },
        {
          title: "Educational, and labelled as such",
          body: "Nothing here is safe for real secrets, and the project says so. A tool that implements textbook RSA and lets the user believe it is secure would be worse than no tool.",
        },
      ],
      stackGroups: [
        {
          group: "Substitution",
          items: ["Caesar", "Vigenere", "Gronsfeld", "Vernam"],
        },
        {
          group: "Transposition & encoding",
          items: ["Rail Fence", "Polybius Square", "Morse", "Huffman"],
        },
        { group: "Modern", items: ["Blowfish", "RSA"] },
        { group: "Platform", items: ["JavaScript", "Canvas 2D", "Tailwind CSS", "Firebase"] },
      ],
    },
  },

  /* ================================================================== */
  {
    slug: "e-doc",
    name: "E-Doc",
    tagline: "Document workspace with durable background processing.",
    summary:
      "Document handling where the slow work runs as retryable background jobs, with dashboards over the results.",
    year: "2024",
    role: "Sole engineer",
    featured: false,
    category: "Productivity",
    stack: [
      "Next.js 14",
      "TypeScript",
      "Clerk",
      "Prisma",
      "Inngest",
      "Recharts",
      "UploadThing",
      "Sass",
    ],
    tags: ["Full-stack", "Productivity"],
    links: [
      { label: "Source", href: "https://github.com/KalamPinjar/E-Doc", type: "repo" },
      { label: "Live site", href: "https://e-doc-nu.vercel.app", type: "live" },
    ],
    metrics: [{ value: "4", label: "External services wired" }],
    study: {
      context:
        "E-Doc is a document workspace: users sign in, upload documents, and the application processes them and reports on what it found. The reason it is in this portfolio is not the document handling — it is that the slow work is modelled as durable background jobs rather than something attempted inside a request, and that the results are surfaced as dashboards rather than left in a database.",
      pipeline: {
        caption: "Upload to insight",
        stages: [
          { label: "Upload", sub: "UploadThing" },
          { label: "Record", sub: "Prisma" },
          { label: "Enqueue", sub: "Inngest event", tone: "key" },
          { label: "Process", sub: "retryable steps", tone: "key" },
          { label: "Aggregate", sub: "usage data" },
          { label: "Chart", sub: "Recharts" },
        ],
      },
      sections: [
        {
          heading: "Why the work does not happen in the request",
          body: [
            "Document processing is slow and it fails for boring reasons — a large file, a rate-limited third party, a cold start that runs past the timeout. Doing that work inside the HTTP request means the user watches a spinner and then gets an error that loses everything the job had already done.",
            "Moving it to a job queue changes the failure mode. The upload succeeds immediately, the processing becomes a sequence of steps that can be retried independently, and a transient failure in step four does not throw away steps one through three.",
          ],
        },
        {
          heading: "What I built",
          body: [
            "Uploads go through UploadThing and are recorded in PostgreSQL through Prisma, at which point the request is done and the user gets their page back. That write emits an Inngest event, and the processing runs as durable steps outside the request lifecycle, with retries handled by the platform rather than by a loop I wrote.",
            "Authentication is Clerk. The processed results are aggregated and rendered as Recharts dashboards, so the output of all that background work is something the user can actually read rather than a status column that says `complete`.",
          ],
        },
        {
          heading: "Making asynchronous work feel intentional",
          body: [
            "The honest difficulty with background processing is that it moves the problem into the interface. The user uploaded something and now nothing appears to be happening, which feels broken even though it is working exactly as designed.",
            "So the queue has to be visible. Showing which documents are pending, which finished and which failed turns an invisible system into an understandable one, and it is the difference between a user waiting patiently and a user uploading the same file four times.",
          ],
        },
      ],
      decisions: [
        {
          title: "Durable steps over fire-and-forget",
          body: "Inngest gives each step its own retry and its own record of having run. A plain background promise gives you neither, and silently drops work whenever the function instance goes away.",
        },
        {
          title: "Make steps idempotent",
          body: "Anything that can be retried will eventually run twice. Writing each step so a second run is harmless is the only way retries are actually safe rather than merely available.",
        },
        {
          title: "Show the queue to the user",
          body: "Pending, complete and failed are states the user needs to see. Hiding them is what makes asynchronous software feel unreliable even when it is working.",
        },
        {
          title: "Clerk rather than hand-rolled sessions",
          body: "Authentication is the wrong place to be original. Using a provider meant the interesting work stayed on the processing pipeline where the actual problem was.",
        },
      ],
      stackGroups: [
        { group: "Background work", items: ["Inngest", "Retryable steps", "Event-driven"] },
        { group: "Data", items: ["PostgreSQL", "Prisma", "UploadThing"] },
        { group: "Interface", items: ["Next.js 14", "Recharts", "Sass", "Clerk"] },
      ],
    },
  },

  /* ================================================================== */
  {
    slug: "uxgear",
    name: "UXGear",
    tagline: "Marketing site for a design studio.",
    summary:
      "A studio site where the presentation is the product — motion and typography under a strict performance budget.",
    year: "2025",
    role: "Sole engineer",
    featured: false,
    category: "Client work",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    tags: ["Client work", "Frontend"],
    links: [{ label: "Live site", href: "https://uxgear.vercel.app", type: "live" }],
    study: {
      context:
        "UXGear is a digital design studio, and their site opens on the line 'Crafting Exceptional Digital Experiences'. That sets an awkward bar: when the client sells design quality, the website is not a description of the service, it is a sample of it. A slow or clumsy studio site actively argues against the studio.",
      sections: [
        {
          heading: "What is actually hard about a marketing site",
          body: [
            "Marketing sites look like the easy category and are not. There is no complex state and no data model, so all the difficulty concentrates in the two things that are genuinely hard to get right: perceived performance and motion that feels deliberate rather than decorative.",
            "The failure mode is specific. Heavy imagery and animation libraries make the first load slow, and a studio site that takes four seconds to paint has already lost the argument it exists to make — before anyone reads a word of the copy.",
          ],
        },
        {
          heading: "What I built",
          body: [
            "The site is Next.js on Vercel, built so the content renders on the server and arrives as HTML rather than assembling itself in the browser. Images go through the framework's optimisation pipeline with explicit dimensions, so the layout never jumps while they load.",
            "Motion is used at section boundaries rather than on every element. The restraint is the point: a page where everything animates reads as a template, and a page where two or three things move at the right moment reads as considered.",
          ],
        },
      ],
      decisions: [
        {
          title: "Server-rendered content, always",
          body: "A marketing page whose text is assembled client-side is slower to paint and harder to index. Both of those directly undercut the only two jobs the site has.",
        },
        {
          title: "A motion budget, not a motion library",
          body: "Choosing a small number of moments to animate keeps the page fast and keeps the effects meaningful. Adding an animation library would have made it easy to spend that budget everywhere at once.",
        },
        {
          title: "Reserve space for every image",
          body: "Explicit dimensions mean nothing shifts as assets arrive. On a site selling visual craft, a layout that jumps during load is the most expensive possible bug.",
        },
      ],
      stackGroups: [
        { group: "Application", items: ["Next.js", "TypeScript", "Tailwind CSS"] },
        { group: "Delivery", items: ["Vercel", "Image optimisation", "Static rendering"] },
      ],
    },
  },

  /* ================================================================== */
  {
    slug: "restate",
    name: "reState",
    tagline: "Real estate listings, on iOS and Android.",
    summary:
      "A React Native application — listings, search and detail views from one codebase on two platforms.",
    year: "2025",
    role: "Sole engineer",
    featured: false,
    category: "Mobile",
    stack: ["React Native", "Expo", "TypeScript", "NativeWind"],
    tags: ["Mobile", "Frontend"],
    links: [
      {
        label: "Source",
        href: "https://github.com/KalamPinjar/expo_reState",
        type: "repo",
      },
    ],
    metrics: [{ value: "2", label: "Platforms, one codebase" }],
    study: {
      context:
        "reState is a property browsing app built with Expo and React Native — browse listings, filter them, open a property and look through its detail and images. I built it to find out how much of what I know about building for the web actually transfers to a phone, and where the assumptions quietly stop holding.",
      sections: [
        {
          heading: "What does not transfer from the web",
          body: [
            "There is no hover, so every affordance that leaned on it has to be redesigned as something visible at rest. There is no cursor, so touch targets have to be sized for a thumb rather than a pointer, and the reachable part of a large phone screen is the bottom half, not the top.",
            "The bigger shift is list performance. A web page can render a few hundred rows and get away with it. On a mid-range Android, a list that renders everything eagerly drops frames while scrolling, and dropped frames on a scroll are the single most obvious way an app feels cheap.",
          ],
        },
        {
          heading: "What I built",
          body: [
            "Listings render through a virtualised list so only what is on screen is mounted, with image loading deferred and sizes fixed so rows do not resize as photos arrive. Search and filtering narrow the same underlying collection rather than re-fetching, which keeps interaction immediate.",
            "Styling is NativeWind, which gives React Native the same utility-class model I use on the web. That was a deliberate choice to keep one styling vocabulary across both targets instead of context-switching between Tailwind and StyleSheet objects.",
          ],
        },
        {
          heading: "Why it is in this portfolio",
          body: [
            "Most web developers are web-only. Having shipped a real React Native application means I can take a feature that spans web and mobile without treating the mobile half as somebody else's problem.",
            "It also made me better on the web. Building against a slow device with a small screen and no hover is a useful corrective to developing on a fast laptop, and several of the performance habits in the other projects here started on this one.",
          ],
        },
      ],
      decisions: [
        {
          title: "Expo rather than bare React Native",
          body: "Expo removes the native build toolchain from the critical path, which for a solo project is the difference between shipping features and maintaining Xcode and Gradle configurations.",
        },
        {
          title: "NativeWind to keep one styling model",
          body: "Using the same utility vocabulary on both targets means moving between web and mobile does not mean relearning how to express a layout. Consistency across contexts is worth more than any single platform's idiomatic API.",
        },
        {
          title: "Virtualise the list from day one",
          body: "Retrofitting virtualisation means rewriting how rows measure themselves. Starting with it costs nothing and avoids the rewrite entirely.",
        },
        {
          title: "Design for thumbs",
          body: "Primary actions sit in the lower half of the screen, where a hand holding a phone can actually reach them. It is a small decision that changes how usable the app is one-handed.",
        },
      ],
      stackGroups: [
        { group: "Application", items: ["React Native", "Expo", "TypeScript"] },
        { group: "Interface", items: ["NativeWind", "Virtualised lists", "Expo Router"] },
      ],
    },
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const archiveProjects = projects.filter((p) => !p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

/** Every project has a case study. */
export function getCaseStudies() {
  return projects;
}

/** Every tag in use, in order of first appearance. */
export const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)));
