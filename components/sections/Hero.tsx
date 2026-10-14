import { contact } from "@/lib/data/personal";
import { site } from "@/lib/data/site";

const links = [
  site.resumeUrl ? { label: "Resume", href: site.resumeUrl } : null,
  { label: "GitHub", href: contact.github, external: true },
  { label: "LinkedIn", href: contact.linkedin, external: true },
  { label: "Email", href: `mailto:${contact.email}` },
].filter((l): l is NonNullable<typeof l> => l !== null);

export function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-heading" className="page pt-20 sm:pt-28 md:pt-32">
      {/* The rule matches the ink width of the name, not the container. */}
      <div className="max-w-full w-fit">
        <h1 id="hero-heading" className="hero-name">
          {site.name}
        </h1>
        <div className="hero-rule" aria-hidden="true" />
      </div>
      <p className="hero-lede mt-8">{site.heroLine}</p>
      <ul className="hero-links mt-10 flex flex-wrap gap-x-8 gap-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="nav-link"
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
