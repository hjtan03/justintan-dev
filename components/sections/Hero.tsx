import { contact } from "@/lib/data/personal";
import { site } from "@/lib/data/site";

export function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-heading">
      <h1 id="hero-heading">{site.name}</h1>
      <p>{site.heroLine}</p>
      <ul>
        {site.resumeUrl && (
          <li>
            <a href={site.resumeUrl}>Resume</a>
          </li>
        )}
        <li>
          <a href={contact.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </li>
        <li>
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </li>
        <li>
          <a href={`mailto:${contact.email}`}>Email</a>
        </li>
      </ul>
    </section>
  );
}