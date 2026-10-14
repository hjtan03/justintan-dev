import Link from "next/link";
import type { Project } from "@/lib/projects";

const asideOffset = { "--aside-offset": "0.7rem" } as React.CSSProperties;

export function FeaturedProjects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="page section">
      <div className="space-y-14">
        {projects.map((project, index) => (
          <article key={project.slug} className="row" style={asideOffset}>
            <div className="aside">
              {/* The section heading shares the first project's margin cell. */}
              {index === 0 && <h2 id="projects-heading">Projects</h2>}
              <p>{project.role}</p>
              <p>
                <time>{project.timeframe}</time>
              </p>
            </div>
            <div className="main">
              <h3 className="text-feature">
                <Link href={`/projects/${project.slug}`} className="title-link">
                  {project.title}
                </Link>
              </h3>
              <p className="mt-4">{project.summary}</p>
              <ul className="stack-list mt-4" aria-label="Stack">
                {project.stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
