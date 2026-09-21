export const site = {
  name: "Kalam Pinjar",
  fullName: "Mohd Kalam Aslam Pinjar",

  /**
   * How the site positions him — broader than any single job title, because
   * the work spans both sides of the stack. The specific title held at Tech
   * Sonic lives in `experience` below, where it is a matter of record.
   */
  role: "Full-Stack Developer",

  company: "Tech Sonic",
  companyLocation: "Canada",
  location: "Navi Mumbai, India",
  email: "owaiskal57@gmail.com",
  phone: "+91 9324142773",
  url: "https://portfolio-2025-snowy-xi.vercel.app",
  resume: "/kalam-pinjar-resume.pdf",

  /** What he is open to. Stated plainly so nobody has to guess. */
  availability: {
    short: "Full-time or contract",
    long: "Open to full-time roles and contract work — frontend, backend or the whole stack.",
  },

  /** The positioning line — spec §02. */
  thesis:
    "I build products end to end: the interface, the API behind it, and the parts that break under real auth, real payments and real traffic.",

  /** Long form, used on /about and in metadata descriptions. */
  bio: "Full-stack developer with a cyber security degree. Next.js and NestJS at Tech Sonic, and the things I build tend to involve the parts most portfolios skip — authentication, billing, real-time transport and vector search. Open to full-time and contract work.",

  socials: {
    github: "https://github.com/KalamPinjar",
    linkedin: "https://www.linkedin.com/in/kalam-pinjar-100178207",
  },

  education: {
    degree: "Graduation in Cyber Security",
    school: "Tilak Maharashtra Vidyapeeth",
    period: "Sep 2021 — May 2024",
    result: "CGPA 3.90 / 75%",
  },

  experience: {
    title: "Lead Frontend Developer",
    company: "Tech Sonic",
    location: "Canada · Remote",
    period: "Nov 2024 — Present",
    detail:
      "Next.js on the front and NestJS behind it, with Playwright covering the flows that cost money when they break.",
  },
} as const;

export const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
