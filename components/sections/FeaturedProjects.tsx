import Link from "next/link";
import type { Project } from "@/lib/projects";

export function FeaturedProjects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="column pt-8 pb-16 sm:pb-20">
      <h2 id="projects-heading" className="text-section">
        Projects
      </h2>
      <div className="mt-10 space-y-14">
        {projects.map((project) => (
          <article key={project.slug}>
            <h3 className="text-title">
              <Link href={`/projects/${project.slug}`} className="text-link">
                {project.title}
              </Link>
            </h3>
            <p className="mt-1.5 font-sans text-meta text-muted">
              {project.role}, {project.timeframe}
            </p>
            <p className="mt-4">{project.summary}</p>
            <ul className="stack-list mt-4" aria-label="Stack">
              {project.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
