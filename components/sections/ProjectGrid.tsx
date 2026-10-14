import { gridProjects } from "@/lib/data/projects";

const asideOffset = { "--aside-offset": "0.15rem" } as React.CSSProperties;

export function ProjectGrid() {
  // Entries with an empty description are unfinished and must not render.
  const projects = gridProjects.filter((p) => p.description.trim() !== "");
  if (projects.length === 0) return null;

  return (
    <section id="project-grid" aria-label="More projects" className="page mt-20">
      <ul>
        {projects.map((project) => (
          <li key={project.slug} id={project.slug} className="record row" style={asideOffset}>
            <div className="aside">
              <p>{project.context}</p>
              <p>
                <time>{project.timeframe}</time>
              </p>
            </div>
            <article className="main">
              <h3 className="text-entry">{project.title}</h3>
              <p className="mt-2 text-[1.0625rem] leading-[1.6]">{project.description}</p>
              <ul className="stack-list mt-3" aria-label="Stack">
                {project.stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {project.repo && (
                <p className="mt-2 font-sans text-meta">
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
