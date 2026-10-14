import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { site } from "@/lib/data/site";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";

type Params = { slug: string };

export const dynamicParams = false;

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

  const { content } = await compileMDX({ source: project.body });

  return (
    <main>
      <nav aria-label="Breadcrumb" className="column pt-8">
        <Link href="/" className="nav-link text-compact">
          {site.name}
        </Link>
      </nav>
      <article className="column pt-16 pb-24 sm:pt-20 sm:pb-32">
        <header>
          <h1 className="text-section sm:text-[2.125rem] sm:leading-[1.15]">{project.title}</h1>
          <p className="mt-3 font-sans text-meta text-muted">
            {project.role}, {project.timeframe}
          </p>
          <p className="mt-6 text-lede">{project.summary}</p>
          <ul className="stack-list mt-5" aria-label="Stack">
            {project.stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </header>
        <div className="prose mt-12 border-t border-rule pt-10">{content}</div>
      </article>
    </main>
  );
}
