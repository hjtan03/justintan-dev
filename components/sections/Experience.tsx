import Link from "next/link";
import { education, experience, type ExperienceEntry } from "@/lib/data/experience";

function EntryList({ id, heading, entries }: { id: string; heading: string; entries: ExperienceEntry[] }) {
  // An empty array means the subsection isn't ready and must not render.
  if (entries.length === 0) return null;

  return (
    <section id={id} aria-labelledby={`${id}-heading`}>
      <h3 id={`${id}-heading`} className="font-sans text-meta font-medium text-muted">
        {heading}
      </h3>
      <ol className="mt-3 divide-y divide-rule border-y border-rule">
        {entries.map((entry) => (
          <li key={`${entry.org}-${entry.timeframe}`} className="grid gap-x-8 gap-y-0.5 py-4 sm:grid-cols-[1fr_auto]">
            <h4 className="font-sans text-compact font-medium">
              {entry.href ? (
                <Link href={entry.href} className="text-link">
                  {entry.org}
                </Link>
              ) : (
                entry.org
              )}
            </h4>
            <p className="font-sans text-meta text-muted sm:order-last sm:col-span-2">{entry.role}</p>
            <p className="font-sans text-meta text-muted sm:text-right">
              <time>{entry.timeframe}</time>
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Experience() {
  if (experience.length === 0 && education.length === 0) return null;

  return (
    <section id="experience" aria-labelledby="experience-heading" className="column pb-20 sm:pb-24">
      <h2 id="experience-heading" className="text-section">
        Experience
      </h2>
      <div className="mt-8 space-y-10">
        <EntryList id="work" heading="Work" entries={experience} />
        <EntryList id="education" heading="Education" entries={education} />
      </div>
    </section>
  );
}
