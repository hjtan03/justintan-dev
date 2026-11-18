import { Figure } from "@/components/Figure";
import { gridProjects, type GridProject } from "@/lib/data/projects";

const asideOffset = { "--aside-offset": "0.15rem" } as React.CSSProperties;

/** Wraps each collaborator's name in the text with a link to them. */
function withCredits(text: string, people: GridProject["collaborators"]): React.ReactNode {
  if (!people || people.length === 0) return text;
  const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`(${people.map((p) => escape(p.name)).join("|")})`, "g");
  return text.split(pattern).map((part, i) => {
    const person = people.find((p) => p.name === part);
    return person ? (
      <a key={i} href={person.href} className="text-link" target="_blank" rel="noopener noreferrer">
        {part}
      </a>
    ) : (
      part
    );
  });
}

/** "https://dailyliftoff.app/" renders as "dailyliftoff.app". */
const hostname = (url: string) => new URL(url).hostname.replace(/^www\./, "");

function SelectedEntry({ project }: { project: GridProject }) {
  return (
    <li id={project.slug} className="record row" style={asideOffset}>
      <div className="aside">
        <p>{project.context}</p>
        <p>
          <time>{project.timeframe}</time>
        </p>
      </div>
      <article className="main">
        <h4 className="text-entry">{project.title}</h4>
        <p className="mt-1 text-[1.0625rem] leading-[1.6]">{withCredits(project.description, project.collaborators)}</p>
        {project.figure && (
          <div className="mt-4">
            <Figure {...project.figure} />
          </div>
        )}
        <ul className="stack-list mt-1.5" aria-label="Stack">
          {project.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        {(project.url || project.repo) && (
          <ul className="mt-1 flex flex-wrap gap-x-5 font-sans text-meta">
            {project.url && (
              <li>
                <a href={project.url} className="nav-link" target="_blank" rel="noopener noreferrer">
                  {hostname(project.url)}
                </a>
              </li>
            )}
            {project.repo && (
              <li>
                <a href={project.repo} className="nav-link" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </li>
            )}
          </ul>
        )}
      </article>
    </li>
  );
}

/** Dense: title, context and year on one line, one sentence under it. */
function EarlierEntry({ project }: { project: GridProject }) {
  return (
    <li id={project.slug} className="row">
      <article className="main">
        <h4 className="font-sans text-compact font-medium">
          {project.title}
          <span className="font-normal text-text-muted">
            {" "}
            · {project.context}, <time>{project.timeframe}</time>
          </span>
        </h4>
        <p className="mt-0.5 text-compact">{project.description}</p>
      </article>
    </li>
  );
}

export function ProjectGrid() {
  // Entries with an empty description are unfinished and must not render.
  const projects = gridProjects.filter((p) => p.description.trim() !== "");
  const selected = projects.filter((p) => p.group === "selected");
  const earlier = projects.filter((p) => p.group === "earlier");
  if (projects.length === 0) return null;

  return (
    <section id="project-grid" aria-label="More projects" className="page mt-24">
      <div className="space-y-16">
        {selected.length > 0 && (
          <section aria-labelledby="selected-work-heading">
            <div className="row">
              <h3 id="selected-work-heading" className="main font-sans text-meta font-medium text-text-muted">
                Selected work
              </h3>
            </div>
            <ul className="mt-2">
              {selected.map((project) => (
                <SelectedEntry key={project.slug} project={project} />
              ))}
            </ul>
          </section>
        )}
        {earlier.length > 0 && (
          <section aria-labelledby="earlier-work-heading">
            <div className="row">
              <h3 id="earlier-work-heading" className="main font-sans text-meta font-medium text-text-muted">
                Earlier work
              </h3>
            </div>
            <ol className="mt-2 space-y-4">
              {earlier.map((project) => (
                <EarlierEntry key={project.slug} project={project} />
              ))}
            </ol>
          </section>
        )}
      </div>
    </section>
  );
}
