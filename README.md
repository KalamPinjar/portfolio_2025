# Portfolio — Kalam Pinjar

Personal site and case-study archive. Next.js 15 App Router, React 19,
TypeScript (strict), Tailwind CSS v4.

Live: https://portfolio-2025-snowy-xi.vercel.app

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build        # production build
npm start            # serve the build
npm run typecheck    # tsc --noEmit
npm run lint
```

## Environment

Everything works without configuration except outbound email. Copy
`.env.example` to `.env.local` and fill in what you need.

| Variable         | Required | Purpose                                                        |
| ---------------- | -------- | -------------------------------------------------------------- |
| `RESEND_API_KEY` | No       | Sends the contact form. Without it the form returns a clear error pointing at the email address instead of silently failing. |
| `CONTACT_FROM`   | No       | From-address for that email. Defaults to Resend's sandbox sender. |

## Layout

```
app/
  layout.tsx           Fonts, metadata, JSON-LD, shell
  page.tsx             Home
  work/                Archive (URL-filtered) and case studies
  about/  contact/     Static routes
  api/contact/         Form handler — validation, honeypot, rate limit
  api/og/              Dynamic social cards
  sitemap.ts robots.ts
components/
  layout/              Nav, footer, command palette
  motion/              Reveal, Magnetic, reduced-motion hook
  home/ work/ about/ contact/
lib/
  projects.ts          All project content
  site.ts              Identity, contact, nav
public/fonts/          Self-hosted Clash Display + Satoshi
```

## Adding a project

Add one entry to the `projects` array in `lib/projects.ts`. Nothing else
changes — the home page, archive grid, filters, sitemap and command palette
all read from it. Give it a `study` object and it gains a case-study page at
`/work/<slug>` with a generated OG image; leave `study` off and it stays an
archive card linking to its source.

## Design system

Tokens live in `app/globals.css` under `@theme`, and every colour, font,
radius and easing curve in the app resolves through them.

| Token                                  | Value                      | Use                        |
| -------------------------------------- | -------------------------- | -------------------------- |
| `night` / `surface` / `raised`          | `#080b11` `#0f141c` `#171e29` | Grounds                 |
| `fg` / `fg-2` / `fg-3`                  | `#e9eef5` `#94a3b8` `#7d8aa1` | Text, three levels      |
| `accent`                                | `#58d8f0`                  | Links, focus, active state |
| `signal`                                | `#ffae57`                  | Quantities only            |

Contrast is measured, not assumed: `fg` 16.9:1, `fg-2` 7.7:1 and `fg-3` 5.7:1
against `night`, with the lowest pairing anywhere on the site at 4.8:1 — all
clear of WCAG 2.2 AA.

Three faces, all self-hosted: **Clash Display** for headings, **Satoshi** for
body, **JetBrains Mono** for labels and figures.

Motion is CSS-driven. `<Reveal>` never leaves content parked at `opacity: 0` —
the server HTML is fully visible, and only elements that start off-screen are
hidden and animated in. Under `prefers-reduced-motion` every transform
collapses to its end state.

## Notes

- Dark only, deliberately. There is no theme toggle and no theme library.
- 11 runtime dependencies, down from 58 in the previous version.
- Case studies are typed TypeScript rather than MDX — the content is
  structured data with a fixed shape, so a type error is a better guardrail
  than a parser, and it costs no dependency.
- The contact form uses native form semantics instead of a form library;
  validation lives in the route handler, where the real rule belongs.
