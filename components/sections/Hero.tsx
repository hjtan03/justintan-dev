import { contact } from "@/lib/data/personal";
import { resumeUrl, site } from "@/lib/data/site";

export function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-heading">
      <h1 id="hero-heading">{site.name}</h1>
      <p>{site.heroLine}</p>
      <ul>
        {resumeUrl && (
          <li>
            <a href={resumeUrl}>Resume</a>
          </li>
        )}
        <li>
          <a href={contact.github}>GitHub</a>
        </li>
        <li>
          <a href={contact.linkedin}>LinkedIn</a>
        </li>
        <li>
          <a href={`mailto:${contact.email}`}>Email</a>
        </li>
      </ul>
    </section>
  );
}
