import {
  ArrowDown,
  ArrowRight,
  Layers,
  Braces,
  PanelsTopLeft,
  MessageSquare,
} from "lucide-react";
import type { Project } from "../data/portfolio";
export default function ProjectVisual({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  if (project.image) {
    return (
      <figure className="project-visual screenshot-visual">
        <img
          src={project.image}
          alt="Fit with Nishika homepage showing physiotherapy and movement coaching with the interactive practitioner badge"
          width={1440}
          height={1000}
          loading="lazy"
          decoding="async"
        />
        <figcaption>Live website · {project.title}</figcaption>
      </figure>
    );
  }
  return (
    <figure
      className={`project-visual ${featured ? "featured-visual" : ""}`}
      aria-label={`${project.title} architecture overview`}
    >
      {featured ? (
        <>
          <div className="visual-title">
            <span>Der Autoputzer</span>
            <span>TYPO3 + Nuxt</span>
          </div>
          <div className="featured-architecture">
            <div className="architecture-source">
              <Layers size={24} aria-hidden="true" />
              <span>
                TYPO3 CMS<strong>Structured content</strong>
              </span>
            </div>
            <div className="architecture-connector" aria-hidden="true">
              <ArrowDown size={22} />
            </div>
            <div className="architecture-middle">
              <div>
                <Braces size={23} aria-hidden="true" />
                <span>Content Blocks</span>
              </div>
              <ArrowRight size={22} aria-hidden="true" />
              <div>
                <PanelsTopLeft size={23} aria-hidden="true" />
                <span>Nuxt components</span>
              </div>
            </div>
            <div className="architecture-connector" aria-hidden="true">
              <ArrowDown size={22} />
            </div>
            <div className="architecture-result">
              <span>Responsive frontend</span>
              <small>Reusable content. Connected interfaces.</small>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="visual-title">
            <span>
              {project.slug === "typo3-ai-chatbot" ? (
                <>
                  <MessageSquare size={18} aria-hidden="true" /> Content →
                  conversation
                </>
              ) : (
                "Architecture overview"
              )}
            </span>
            <span>{project.technologies[0]}</span>
          </div>
          <ol className="project-flow">
            {project.flow.map((step, i) => (
              <li key={step}>
                <span>{step}</span>
                {i < project.flow.length - 1 && (
                  <ArrowDown size={16} aria-hidden="true" />
                )}
              </li>
            ))}
          </ol>
        </>
      )}
      <figcaption>Architecture diagram · {project.title}</figcaption>
    </figure>
  );
}
