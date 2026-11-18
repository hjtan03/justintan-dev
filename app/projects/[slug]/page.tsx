import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { Figure } from "@/components/Figure";
import { IdxArchitecture } from "@/components/IdxArchitecture";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";

/** Diagrams that sit above a writeup body, keyed by project slug. */
const diagrams: Record<string, React.ComponentType> = {
  "idx-exchange": IdxArchitecture,
};

type Params = { slug: string };

export const dynamicParams = false;

// Lines the margin text up with the cap height of the fluid page title.
const asideOffset = { "--aside-offset": "calc(var(--text-page-title) * 0.52)" } as React.CSSProperties;

export async function generateStaticParams(): Promise<Params[]> {
  const projects = await getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const { content } = await compileMDX({ source: project.body, components: { Figure } });
  const Diagram = diagrams[project.slug];

  return (
    <main>
      <article className="project-article page row pt-14 pb-24 sm:pt-20 sm:pb-32" style={asideOffset}>
        <div className="aside">
          <p>{project.role}</p>
          <p>
            <time>{project.timeframe}</time>
          </p>
        </div>
        <div className="main">
          <header>
            <h1 className="text-page-title">{project.title}</h1>
            <p className="lede mt-6 font-serif text-lede italic text-text-muted">{project.summary}</p>
            {project.appStoreUrl && (
              <p className="mt-4 font-sans text-compact">
                <a href={project.appStoreUrl} className="nav-link" target="_blank" rel="noopener noreferrer">
                  On the App Store
                </a>
              </p>
            )}
          </header>
          {Diagram && (
            <div className="mt-8">
              <Diagram />
            </div>
          )}
          <div className="prose prose-book mt-8">{content}</div>
        </div>
        <ul className="project-stack stack-stack" aria-label="Stack">
          {project.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>
    </main>
  );
}
