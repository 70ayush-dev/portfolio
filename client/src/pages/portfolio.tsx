import {
  BitsText,
  BitsControl,
  AnimatedSection,
} from "../components/reactbits/experience";
import { useEffect, useState, lazy, Suspense } from "react";
import {
  ArrowDown,
  Layers,
  Code2,
  Workflow,
  LayoutTemplate,
  ScanSearch,
} from "lucide-react";
import {
  identity,
  projects,
  capabilities,
  stack,
  problems,
  experiments,
  faqs,
} from "../data/portfolio";
import {
  Navigation,
  Footer,
  Tags,
  SectionHeading,
  Arrow,
} from "../components/platform-layout";
import SearchVisibilitySection from "../components/search-visibility-section";
import ArchitectureDiagram from "../components/architecture-diagram";
import SpotlightCard from "../components/reactbits/SpotlightCard";
const Threads = lazy(() => import("../components/reactbits/Threads"));
function HeroBackground() {
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setAnimate(!query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);
  return (
    <div className="hero-background" aria-hidden="true">
      {animate && (
        <Suspense fallback={null}>
          <Threads
            color={[0.75, 0.93, 0.47]}
            amplitude={1.2}
            distance={0.35}
            enableMouseInteraction={false}
          />
        </Suspense>
      )}
    </div>
  );
}
export default function Portfolio() {
  const icons = [Layers, Code2, Workflow, LayoutTemplate, ScanSearch];
  return (
    <>
      <BitsControl as="a" className="skip-link" href="#main">
        Skip to content
      </BitsControl>
      <Navigation />
      <main id="main">
        <AnimatedSection className="hero">
          <HeroBackground />
          <div className="hero-topline">
            <BitsText as="p" className="eyebrow">
              AYUSH SINGH / WEB PLATFORM ENGINEER
            </BitsText>
            <BitsText as="p" className="status">
              <span /> Building web platforms & AI tools
            </BitsText>
          </div>
          <div className="hero-grid">
            <div className="hero-copy">
              <BitsText as="h1">
                Building the systems
                <br />
                behind <span>modern web</span>
                <br />
                experiences<span className="accent">.</span>
              </BitsText>
              <BitsText as="p" className="hero-description">
                I build modern web platforms, CMS architectures and
                search-ready, AI-visible digital experiences. SEO, AEO and GEO
                are considered alongside the backend, frontend and content
                architecture.
              </BitsText>
              <div className="hero-actions">
                <BitsControl as="a" className="button primary" href="#work">
                  View selected work <Arrow />
                </BitsControl>
                <BitsControl as="a" className="text-link" href="#contact">
                  Let’s talk <Arrow />
                </BitsControl>
              </div>
              <BitsText as="p" className="hero-stack">
                PHP · TYPO3 · VUE · NUXT · TAILWIND · SEO · AEO · GEO · AI ·
                AUTOMATION
              </BitsText>
            </div>
            <ArchitectureDiagram />
          </div>
          <div className="hero-bottom">
            <BitsText as="p">BASED IN INDIA · WORKING GLOBALLY</BitsText>
            <BitsControl as="a" href="#build">
              Explore the architecture <ArrowDown size={15} />
            </BitsControl>
          </div>
        </AnimatedSection>
        <div className="technology-strip" aria-label="Core technologies">
          {[
            "TYPO3",
            "PHP",
            "Vue",
            "Nuxt",
            "Tailwind",
            "SEO",
            "AEO",
            "GEO",
            "AI",
            "Automation",
          ].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <AnimatedSection id="build" className="section">
          <SectionHeading
            number="01"
            label="WHAT I BUILD"
            title="Systems, not just websites."
            text="My work sits between backend architecture and frontend experience — building the systems that power websites and the interfaces people actually use."
          />
          <div className="capabilities">
            {capabilities.map((c, i) => {
              const Icon = icons[i];
              return (
                <SpotlightCard key={c.title}>
                  <div className="card-top">
                    <Icon size={25} />
                    <span>0{i + 1}</span>
                  </div>
                  <BitsText as="h3">{c.title}</BitsText>
                  <BitsText as="p">{c.text}</BitsText>
                  <Tags values={c.tags} />
                  {c.title === "Search & AI Visibility" && (
                    <BitsControl
                      as="a"
                      className="text-link capability-link"
                      href="#search"
                    >
                      Explore the service <Arrow />
                    </BitsControl>
                  )}
                </SpotlightCard>
              );
            })}
          </div>
        </AnimatedSection>
        <AnimatedSection id="work" className="section work-section">
          <SectionHeading
            number="02"
            label="SELECTED WORK"
            title="Built around real problems."
            text="A selection of platforms, systems and experiments. The architecture matters as much as the interface."
          />
          <div className="project-grid">
            {projects.map((p, i) => (
              <article key={p.slug} className={`project project-${i}`}>
                <BitsControl
                  as="a"
                  className="project-visual"
                  href={`/work/${p.slug}/`}
                  aria-label={`View ${p.title} case study`}
                >
                  <div className="visual-top">
                    <span>{p.status || "ENGINEERING CASE STUDY"}</span>
                    <span>0{i + 1} ↗</span>
                  </div>
                  {i === 0 ? (
                    <div className="platform-preview">
                      <div className="preview-bar">
                        <span>DER AUTOPUTZER</span>
                        <span>PLATFORM REBUILD</span>
                      </div>
                      <BitsText as="p">
                        Content.
                        <br />
                        Components.
                        <br />
                        <em>Connected.</em>
                      </BitsText>
                      <div className="preview-blocks">
                        <span>TYPO3 CMS</span>
                        <span>NUXT FRONTEND ↗</span>
                      </div>
                    </div>
                  ) : (
                    <div className="project-flow">
                      {p.flow.slice(0, 5).map((step, n) => (
                        <div key={step}>
                          <span className="flow-number">0{n + 1}</span>
                          {step}
                          {n < Math.min(p.flow.length, 5) - 1 && (
                            <span className="flow-arrow">↓</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  <span className="visual-caption">
                    ARCHITECTURE OVERVIEW / {p.technologies[0]}
                  </span>
                </BitsControl>
                <div className="project-copy">
                  <BitsText as="p" className="eyebrow">
                    {p.subtitle}
                  </BitsText>
                  <BitsText as="h3">
                    <BitsControl as="a" href={`/work/${p.slug}/`}>
                      {p.title}
                      <Arrow />
                    </BitsControl>
                  </BitsText>
                  <BitsText as="p">{p.description}</BitsText>
                  <Tags values={p.technologies} />
                  <BitsControl
                    as="a"
                    className="text-link"
                    href={`/work/${p.slug}/`}
                  >
                    Explore case study <Arrow />
                  </BitsControl>
                </div>
              </article>
            ))}
          </div>
        </AnimatedSection>
        <AnimatedSection id="engineering" className="section">
          <SectionHeading
            number="03"
            label="ENGINEERING"
            title="Across the stack."
            text="Deep CMS expertise. Modern frontend thinking. The tools to connect it all."
          />
          <div className="engineering-grid">
            <div className="stack-list">
              {stack.map(([name, tools], i) => (
                <div key={name}>
                  <span className="stack-index">0{i + 1}</span>
                  <BitsText as="h3">{name}</BitsText>
                  <BitsText as="p">{tools}</BitsText>
                </div>
              ))}
            </div>
            <aside className="specialization">
              <BitsText as="p" className="eyebrow">
                A STRONG FOUNDATION
              </BitsText>
              <BitsText as="h3">
                Deep TYPO3
                <br />
                experience<span className="accent">.</span>
              </BitsText>
              <div className="version-timeline">
                {["v11", "v12", "v13", "v14"].map((v) => (
                  <span key={v}>{v}</span>
                ))}
              </div>
              <BitsText as="p">
                Custom extensions. Content Blocks. Fluid. Upgrade wizards.
                Backend modules. Site packages. Migrations, SEO and performance.
              </BitsText>
              <BitsText as="p">
                Experience with the details that make a CMS work in production.
              </BitsText>
            </aside>
          </div>
          <div className="problems">
            <BitsText as="h3">Problems I’ve solved.</BitsText>
            <div>
              {problems.map(([name, text]) => (
                <article key={name}>
                  <BitsText as="h4">{name}</BitsText>
                  <BitsText as="p">{text}</BitsText>
                </article>
              ))}
            </div>
          </div>
        </AnimatedSection>
        <SearchVisibilitySection />
        <AnimatedSection id="lab" className="section lab-section">
          <SectionHeading
            number="05"
            label="THE LAB"
            title="Practical AI. Real curiosity."
            text="Exploring the intersection of AI and web engineering — tools that remove repetitive work, improve CMS workflows and make complex systems easier to use."
          />
          <div className="lab-grid">
            {experiments.map(([title, text, status, tech], i) => (
              <SpotlightCard key={title}>
                <div className="card-top">
                  <span className="lab-number">L / 0{i + 1}</span>
                  <span className="experiment-status">{status}</span>
                </div>
                <BitsText as="h3">{title}</BitsText>
                <BitsText as="p">{text}</BitsText>
                <BitsText as="p" className="lab-tech">
                  {tech}
                </BitsText>
              </SpotlightCard>
            ))}
          </div>
          <BitsControl
            as="a"
            className="text-link github-link"
            href={identity.github}
          >
            Open source & experiments on GitHub <Arrow />
          </BitsControl>
        </AnimatedSection>
        <AnimatedSection id="about" className="section about-section">
          <div>
            <BitsText as="p" className="eyebrow">
              06 / ABOUT AYUSH
            </BitsText>
            <BitsText as="h2">
              Comfortable with
              <br />
              the complicated<span className="accent">.</span>
            </BitsText>
            <BitsText as="p" className="about-location">
              INDIA → TEAMS AROUND THE WORLD
            </BitsText>
          </div>
          <div className="about-copy">
            <BitsText as="p">
              I’m Ayush Singh, a web engineer focused on building modern
              platforms around TYPO3 and PHP while working across modern
              frontend development, SEO, AEO, GEO, AI and developer automation.
            </BitsText>
            <BitsText as="p">
              My work sits between backend architecture and frontend experience.
              I enjoy taking complicated legacy workflows and turning them into
              simpler, reusable systems.
            </BitsText>
            <BitsText as="p">
              I work extensively with TYPO3 and PHP while building modern
              interfaces with Vue, Nuxt and Tailwind. More recently, I’m
              exploring practical applications of AI, RAG and automation to
              improve CMS workflows and development processes.
            </BitsText>
            <BitsControl as="a" className="text-link" href="#search">
              Search & AI visibility capabilities <Arrow />
            </BitsControl>
            <BitsControl as="a" className="text-link" href={identity.linkedin}>
              Connect on LinkedIn <Arrow />
            </BitsControl>
          </div>
        </AnimatedSection>
        <AnimatedSection className="section faq-section">
          <SectionHeading
            number="07"
            label="QUICK ANSWERS"
            title="A little more context."
          />
          <div className="faq-list">
            {faqs.map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <span aria-hidden="true">+</span>
                </summary>
                <BitsText as="p">{a}</BitsText>
              </details>
            ))}
          </div>
        </AnimatedSection>
        <AnimatedSection id="contact" className="section contact-section">
          <BitsText as="p" className="eyebrow">
            LET’S BUILD SOMETHING THAT WORKS
          </BitsText>
          <BitsText as="h2">
            Have a complex
            <br />
            web problem<span className="accent">?</span>
          </BitsText>
          <BitsText as="p">
            Let’s talk about the architecture, the problem and what we can
            build.
          </BitsText>
          <BitsControl
            as="a"
            className="button primary"
            href={`mailto:${identity.email}`}
          >
            Start a conversation <Arrow />
          </BitsControl>
          <div className="contact-links">
            <BitsControl as="a" href={`mailto:${identity.email}`}>
              {identity.email}
            </BitsControl>
            <BitsControl as="a" href={identity.github}>
              GitHub <Arrow />
            </BitsControl>
            <BitsControl as="a" href={identity.linkedin}>
              LinkedIn <Arrow />
            </BitsControl>
          </div>
        </AnimatedSection>
      </main>
      <Footer />
    </>
  );
}
