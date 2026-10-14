export type ExperienceEntry = {
  org: string;
  role: string;
  timeframe: string;
  /** Optional link to the related project page or grid entry. */
  href?: string;
  /** Education entries render under a separate heading. */
  kind?: "work" | "education";
};

/**
 * Experience timeline, most recent first.
 */
export const experience: ExperienceEntry[] = [
  {
    org: "IDX Exchange",
    role: "Software Engineering Intern",
    timeframe: "Jun 2026 – Sep 2026",
    href: "/projects/idx-exchange",
    kind: "work",
  },
  {
    org: "Pinpoint",
    role: "Co-Founder & Founding Engineer",
    timeframe: "Jan 2026 – present",
    href: "/projects/pinpoint",
    kind: "work",
  },
  {
    org: "University of South Carolina",
    role: "Undergraduate Researcher, Naval Autonomous Maritime Perception",
    timeframe: "Apr 2024 – May 2025",
    href: "/#maritime-perception",
    kind: "work",
  },
];

export const education: ExperienceEntry[] = [
  {
    org: "Northwestern University",
    role: "M.S. Computer Science (AI and Robotics), Minor in Entrepreneurship",
    timeframe: "Sept 2025 – present",
    kind: "education",
  },
  {
    org: "University of South Carolina",
    role: "B.S. Computer Engineering, Minor in Mathematics, Honors College",
    timeframe: "Aug 2021 – May 2025",
    kind: "education",
  },
];