import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

export type ProjectFrontmatter = {
  title: string;
  slug: string;
  featured: boolean;
  order: number;
  role: string;
  timeframe: string;
  stack: string[];
  summary: string;
};

export type Project = ProjectFrontmatter & {
  /** Raw MDX body (frontmatter stripped). Compile with next-mdx-remote/rsc. */
  body: string;
};

function fail(file: string, message: string): never {
  throw new Error(`content/projects/${file}: ${message}`);
}

function parseFrontmatter(file: string, data: Record<string, unknown>): ProjectFrontmatter {
  const str = (key: keyof ProjectFrontmatter): string => {
    const v = data[key];
    if (typeof v !== "string" || v.trim() === "") fail(file, `frontmatter "${key}" must be a non-empty string`);
    return v;
  };

  const featured = data.featured;
  if (typeof featured !== "boolean") fail(file, 'frontmatter "featured" must be a boolean');

  const order = data.order;
  if (typeof order !== "number" || !Number.isFinite(order)) fail(file, 'frontmatter "order" must be a number');

  const stack = data.stack;
  if (!Array.isArray(stack) || stack.length === 0 || !stack.every((s) => typeof s === "string")) {
    fail(file, 'frontmatter "stack" must be a non-empty array of strings');
  }

  const slug = str("slug");
  const expectedSlug = file.replace(/\.mdx$/, "");
  if (slug !== expectedSlug) fail(file, `frontmatter slug "${slug}" does not match filename`);

  return {
    title: str("title"),
    slug,
    featured,
    order,
    role: str("role"),
    timeframe: str("timeframe"),
    stack: stack as string[],
    summary: str("summary"),
  };
}

async function readProject(file: string): Promise<Project> {
  const raw = await fs.readFile(path.join(PROJECTS_DIR, file), "utf8");
  const { data, content } = matter(raw);
  return { ...parseFrontmatter(file, data), body: content.trim() };
}

export async function getAllProjects(): Promise<Project[]> {
  const files = (await fs.readdir(PROJECTS_DIR)).filter((f) => f.endsWith(".mdx"));
  const projects = await Promise.all(files.map(readProject));
  return projects.sort((a, b) => a.order - b.order);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return (await getAllProjects()).filter((p) => p.featured);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const files = await fs.readdir(PROJECTS_DIR);
  const file = `${slug}.mdx`;
  if (!files.includes(file)) return null;
  return readProject(file);
}
