import { contact } from "@/lib/data/personal";

const asideOffset = { "--aside-offset": "0.1rem" } as React.CSSProperties;

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="page section row pb-24 sm:pb-32"
      style={asideOffset}
    >
      <div className="aside">
        <h2 id="contact-heading">Contact</h2>
      </div>
      <ul className="main flex flex-wrap gap-x-6 gap-y-2 text-compact">
        <li>
          <a href={`mailto:${contact.email}`} className="nav-link">
            {contact.email}
          </a>
        </li>
        <li>
          <a href={contact.github} className="nav-link" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </li>
        <li>
          <a href={contact.linkedin} className="nav-link" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </li>
      </ul>
    </section>
  );
}
