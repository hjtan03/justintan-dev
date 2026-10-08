import Link from "next/link";
import { experience } from "@/lib/data/experience";

export function Experience() {
  if (experience.length === 0) return null;

  return (
    <section id="experience" aria-labelledby="experience-heading">
      <h2 id="experience-heading">Experience</h2>
      <ol>
        {experience.map((entry) => (
          <li key={`${entry.org}-${entry.timeframe}`}>
            <h3>{entry.href ? <Link href={entry.href}>{entry.org}</Link> : entry.org}</h3>
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
