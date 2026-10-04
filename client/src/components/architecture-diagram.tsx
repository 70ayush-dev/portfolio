import { BitsText } from "./reactbits/experience";
import { useState, useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
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
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  return (
    <aside
      className="system-map"
      aria-label="Explore the platform architecture"
    >
      <div className="map-header">
        <span>Inside the platform</span>
        <ArrowUpRight size={20} aria-hidden="true" />
      </div>
      <div className="map-nodes">
        {nodes.map(([name, label], i) => (
          <div className="node-wrap" key={name}>
            <button
              ref={(el) => {
                buttons.current[i] = el;
              }}
              className={`system-node ${active === i ? "selected" : ""}`}
              type="button"
              aria-pressed={active === i}
              aria-controls="architecture-description"
              onClick={() => setActive(i)}
              onKeyDown={(event) => {
                const delta = ["ArrowDown", "ArrowRight"].includes(event.key)
                  ? 1
                  : ["ArrowUp", "ArrowLeft"].includes(event.key)
                    ? -1
                    : 0;
                if (delta) {
                  event.preventDefault();
                  const next = (i + delta + nodes.length) % nodes.length;
                  setActive(next);
                  buttons.current[next]?.focus();
                }
              }}
            >
              <strong>{name}</strong>
              <small>{label}</small>
              <span className="node-indicator" aria-hidden="true" />
            </button>
            {i < nodes.length - 1 && (
              <div className="connection" aria-hidden="true">
                <ArrowDown size={18} />
              </div>
            )}
          </div>
        ))}
      </div>
      <BitsText
        as="p"
        id="architecture-description"
        className="map-description"
        aria-live="polite"
      >
        {nodes[active][2]}
      </BitsText>
      <p className="map-footer">Select a layer to see how it connects.</p>
    </aside>
  );
}
