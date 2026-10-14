import Link from "next/link";
import { education, experience, type ExperienceEntry } from "@/lib/data/experience";

const asideOffset = { "--aside-offset": "0.1rem" } as React.CSSProperties;

function EntryList({
  id,
  heading,
  entries,
  sectionHeading,
}: {
  id: string;
  heading: string;
  entries: ExperienceEntry[];
  /** Rendered in the margin beside the first subsection only. */
  sectionHeading?: React.ReactNode;
}) {
  // An empty array means the subsection isn't ready and must not render.
  if (entries.length === 0) return null;

  return (
    <section id={id} aria-labelledby={`${id}-heading`}>
      <div className="row">
        {sectionHeading && <div className="aside">{sectionHeading}</div>}
        <h3 id={`${id}-heading`} className="main font-sans text-meta font-medium text-muted">
          {heading}
        </h3>
      </div>
      <ol className="mt-3">
        {entries.map((entry) => (
          <li key={`${entry.org}-${entry.timeframe}`} className="record row" style={asideOffset}>
            <p className="aside">
              <time>{entry.timeframe}</time>
            </p>
            <div className="main">
              <h4 className="font-sans text-compact font-medium">
                {entry.href ? (
                  <Link href={entry.href} className="text-link">
                    {entry.org}
                  </Link>
                ) : (
                  entry.org
                )}
              </h4>
              <p className="mt-0.5 font-sans text-meta text-muted">{entry.role}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Experience() {
  if (experience.length === 0 && education.length === 0) return null;

  // The section heading sits beside whichever subsection renders first.
  const sectionHeading = <h2 id="experience-heading">Experience</h2>;
  const workFirst = experience.length > 0;

  return (
    <section id="experience" aria-labelledby="experience-heading" className="page section">
      <div className="space-y-12">
        <EntryList id="work" heading="Work" entries={experience} sectionHeading={workFirst ? sectionHeading : undefined} />
        <EntryList
          id="education"
          heading="Education"
          entries={education}
          sectionHeading={workFirst ? undefined : sectionHeading}
        />
      </div>
    </section>
  );
}
