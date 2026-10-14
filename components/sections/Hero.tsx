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
    <section id="hero" aria-labelledby="hero-heading" className="column pt-24 pb-20 sm:pt-32 sm:pb-24">
      <h1 id="hero-heading" className="reveal text-display">
        {site.name}
      </h1>
      <p className="reveal mt-6 max-w-[30ch] text-lede sm:max-w-none" style={{ "--reveal-delay": "90ms" } as React.CSSProperties}>
        {site.heroLine}
      </p>
      <ul className="reveal mt-8 flex flex-wrap gap-x-6 gap-y-2 text-compact" style={{ "--reveal-delay": "180ms" } as React.CSSProperties}>
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
