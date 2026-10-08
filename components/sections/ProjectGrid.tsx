import { gridProjects } from "@/lib/data/projects";

export function ProjectGrid() {
  // Entries with an empty description are unfinished and must not render.
  const projects = gridProjects.filter((p) => p.description.trim() !== "");
  if (projects.length === 0) return null;

  return (
    <section id="project-grid" aria-label="More projects">
      <ul>
        {projects.map((project) => (
          <li key={project.slug} id={project.slug}>
            <article>
              <h3>{project.title}</h3>
              <p>
                {project.context}, {project.timeframe}
              </p>
              <p>{project.description}</p>
              <ul>
                {project.stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {project.repo && <a href={project.repo}>GitHub</a>}
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
