import { BitsText, BitsControl, AnimatedSection } from "./reactbits/experience";
import { useState } from "react";
const nodes = [
  [
    "TYPO3",
    "Content architecture",
    "Custom extensions, Fluid templates and reusable Content Blocks give editors structured content.",
  ],
  [
    "PHP / API",
    "Connected backend",
    "PHP and APIs connect CMS content, databases and external services.",
  ],
  [
    "NUXT",
    "Frontend experience",
    "Vue components, Nuxt rendering and Tailwind translate structured content into responsive interfaces.",
  ],
  [
    "AI",
    "Practical automation",
    "RAG, LLM integrations and automation help simplify content and development workflows.",
  ],
];
export default function ArchitectureDiagram() {
  const [active, setActive] = useState(0);
  return (
    <div className="system-map">
      <div className="map-header">
        <span>SYSTEM ARCHITECTURE</span>
        <span className="map-marker">↗</span>
      </div>
      <div className="map-nodes">
        {nodes.map(([name, label], i) => (
          <div className="node-wrap" key={name}>
            <BitsControl
              as="button"
              className={`system-node ${active === i ? "selected" : ""}`}
              aria-pressed={active === i}
              onClick={() => setActive(i)}
            >
              <span className="node-index">0{i + 1}</span>
              <span>
                <strong>{name}</strong>
                <small>{label}</small>
              </span>
              <span className="node-indicator" />
            </BitsControl>
            {i < nodes.length - 1 && (
              <div className="connection" aria-hidden="true">
                <span />
              </div>
            )}
          </div>
        ))}
      </div>
      <BitsText as="p" className="map-description" aria-live="polite">
        {nodes[active][2]}
      </BitsText>
      <div className="map-footer">
        <span>CONTENT → EXPERIENCE</span>
        <span>404 / SYSTEMS</span>
      </div>
    </div>
  );
}
