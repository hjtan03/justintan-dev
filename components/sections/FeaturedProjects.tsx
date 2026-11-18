import Link from "next/link";
import { IdxArchitecture } from "@/components/IdxArchitecture";
import type { Project } from "@/lib/projects";

/** Static diagrams shown in a featured block, keyed by project slug. */
const diagrams: Record<string, React.ComponentType<{ animate?: boolean }>> = {
  "idx-exchange": IdxArchitecture,
};

const asideOffset = { "--aside-offset": "0.7rem" } as React.CSSProperties;

export function FeaturedProjects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="page section">
      <div className="space-y-16">
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
              <p className="mt-1.5">{project.summary}</p>
              {diagrams[project.slug] && (
                <div className="mt-5">
                  {(() => {
                    const Diagram = diagrams[project.slug];
                    return <Diagram animate={false} />;
                  })()}
                </div>
              )}
              <ul className="mt-1 flex flex-wrap gap-x-5 font-sans text-compact">
                <li>
                  <Link href={`/projects/${project.slug}`} className="nav-link">
                    Read the full writeup
                  </Link>
                </li>
                {project.appStoreUrl && (
                  <li>
                    <a href={project.appStoreUrl} className="nav-link" target="_blank" rel="noopener noreferrer">
                      On the App Store
                    </a>
                  </li>
                )}
              </ul>
              <ul className="stack-list mt-2" aria-label="Stack">
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
