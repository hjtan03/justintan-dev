export type ExperienceEntry = {
  org: string;
  role: string;
  timeframe: string;
  /** Optional link to the related project page or grid entry. */
  href?: string;
};

/**
 * Experience timeline, most recent first.
 *
 * VERIFY BEFORE SHIPPING. CLAUDE.md asks for a short timeline but no
 * experience data was provided, so every string below was lifted from
 * frontmatter in content/projects/*.mdx or from lib/data/projects.ts.
 * Nothing was invented, but the entries may be incomplete (no
 * Northwestern or USC degree lines, since no dates exist for them).
 */
export const experience: ExperienceEntry[] = [
  {
    org: "IDX Exchange",
    role: "Software Engineering Intern",
    timeframe: "Jun 2026 – Sep 2026",
    href: "/projects/idx-exchange",
  },
  {
    org: "Pinpoint",
    role: "Co-Founder & Founding Engineer",
    timeframe: "Jan 2026 – present",
    href: "/projects/pinpoint",
  },
  {
    org: "USC",
    role: "Undergraduate research",
    timeframe: "Apr 2024 – May 2025",
    href: "/#maritime-perception",
  },
];
