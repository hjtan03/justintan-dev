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
  // CLAUDE.md "Hero line (draft)"
  heroLine:
    "MS CS student at Northwestern working on applied AI. I build systems that turn messy real-world input, video, camera frames, natural language, into something structured and usable.",
};