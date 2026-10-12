import Link from "next/link";
import { education, experience, type ExperienceEntry } from "@/lib/data/experience";

function EntryList({ id, heading, entries }: { id: string; heading: string; entries: ExperienceEntry[] }) {
  // An empty array means the subsection isn't ready and must not render.
  if (entries.length === 0) return null;

  return (
    <section id={id} aria-labelledby={`${id}-heading`}>
      <h3 id={`${id}-heading`}>{heading}</h3>
      <ol>
        {entries.map((entry) => (
          <li key={`${entry.org}-${entry.timeframe}`}>
            <h4>{entry.href ? <Link href={entry.href}>{entry.org}</Link> : entry.org}</h4>
            <p>{entry.role}</p>
            <p>
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
    <section id="experience" aria-labelledby="experience-heading">
      <h2 id="experience-heading">Experience</h2>
      <EntryList id="work" heading="Work" entries={experience} />
      <EntryList id="education" heading="Education" entries={education} />
    </section>
  );
}
