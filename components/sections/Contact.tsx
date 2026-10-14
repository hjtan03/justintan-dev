import { contact } from "@/lib/data/personal";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="column pb-24 sm:pb-32">
      <h2 id="contact-heading" className="text-section">
        Contact
      </h2>
      <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-compact">
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
