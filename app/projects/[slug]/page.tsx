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
      <nav aria-label="Breadcrumb">
        <Link href="/">{site.name}</Link>
      </nav>
      <article>
        <header>
          <h1>{project.title}</h1>
          <p>
            {project.role}, {project.timeframe}
          </p>
          <p>{project.summary}</p>
          <ul>
            {project.stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </header>
        {content}
      </article>
    </main>
  );
}
