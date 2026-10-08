import { contact } from "@/lib/data/personal";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading">
      <h2 id="contact-heading">Contact</h2>
      <ul>
        <li>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </li>
        <li>
          <a href={contact.github}>GitHub</a>
        </li>
        <li>
          <a href={contact.linkedin}>LinkedIn</a>
        </li>
      </ul>
    </section>
  );
}
