/**
 * Site-level strings. Everything here is taken from CLAUDE.md.
 *
 * resumeUrl is null when no resume PDF exists in public/, which hides
 * the resume link in the hero.
 */
export const site = {
  name: "Justin Tan",
  fullName: "Hong-Ming Justin Tan",
  domain: "justintan.dev",
  resumeUrl: "/resume.pdf" as string | null,
  heroLine:
    "I build systems that turn messy real-world input, video, camera frames, natural language, into something structured and usable.",
  /** Rendered under the hero lede. */
  availability:
    "I graduate from Northwestern with an MS in Computer Science in December 2026 and I’m looking for full-time software engineering work starting January 2027.",
  /** Header anchors, in page order. Each id is a section id on the home page. */
  nav: [
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "beyond-code", label: "Beyond code" },
    { id: "contact", label: "Contact" },
  ],
};