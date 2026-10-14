import { gridProjects } from "@/lib/data/projects";

export function ProjectGrid() {
  // Entries with an empty description are unfinished and must not render.
  const projects = gridProjects.filter((p) => p.description.trim() !== "");
  if (projects.length === 0) return null;

  return (
    <section id="project-grid" aria-label="More projects" className="column pb-20 sm:pb-24 md:max-w-[52rem]">
      <ul className="grid grid-cols-1 gap-x-10 md:grid-cols-2">
        {projects.map((project) => (
          <li key={project.slug} id={project.slug} className="border-t border-rule py-6">
            <article className="font-sans text-compact">
              <h3 className="text-[1.0625rem] leading-snug">{project.title}</h3>
              <p className="mt-1 text-meta text-muted">
                {project.context}, {project.timeframe}
              </p>
              <p className="mt-3 font-serif text-[1.0625rem] leading-[1.6]">{project.description}</p>
              <ul className="stack-list mt-3" aria-label="Stack">
                {project.stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {project.repo && (
                <p className="mt-3 text-meta">
                  <a href={project.repo} className="nav-link" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </p>
              )}
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
