import { ArrowDown, Plus } from "lucide-react";
import {
  BitsText,
  BitsControl,
  AnimatedSection,
} from "../components/reactbits/experience";
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
import ArchitectureDiagram from "../components/architecture-diagram";
import ProjectVisual from "../components/project-visual";
import SearchVisibilitySection from "../components/search-visibility-section";
import SpotlightCard from "../components/reactbits/SpotlightCard";

export default function Portfolio() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navigation />
      <main id="main">
        <AnimatedSection className="hero" motion="intro">
          <div className="hero-grid">
            <div className="hero-copy">
              <BitsText as="h1">
                Building the systems
                <br className="hero-break" /> behind <span>modern web</span>{" "}
                experiences.
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
            </div>
            <ArchitectureDiagram />
          </div>
          <div className="hero-bottom">
            <p>Based in India. Working with teams globally.</p>
            <a href="#work">
              Explore the work <ArrowDown size={18} aria-hidden="true" />
            </a>
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
        <AnimatedSection id="build" className="section capabilities-section">
          <SectionHeading
            title="Systems, not just websites."
            text="My work sits between backend architecture and frontend experience — building the systems that power websites and the interfaces people actually use."
          />
          <div className="capabilities">
            {capabilities.map((c) => (
              <article className="capability-row" key={c.title}>
                <BitsText as="h3">{c.title}</BitsText>
                <div>
                  <BitsText as="p">{c.text}</BitsText>
                  {c.title === "Search & AI Visibility" && (
                    <BitsControl
                      as="a"
                      className="text-link capability-link"
                      href="#search"
                    >
                      Explore the service <Arrow />
                    </BitsControl>
                  )}
                </div>
                <Tags values={c.tags} />
              </article>
            ))}
          </div>
        </AnimatedSection>
        <AnimatedSection id="work" className="section work-section">
          <SectionHeading
            title="Selected work."
            text="Platforms, systems and experiments. A closer look at the engineering behind the interface."
          />
          <div className="project-grid">
            {projects.map((p, i) => (
              <article className={`project project-${i}`} key={p.slug}>
                <ProjectVisual
                  project={p}
                  featured={p.slug === "der-autoputzer"}
                />
                <div className="project-copy">
                  <BitsText as="h3">
                    <a href={`/work/${p.slug}/`}>{p.title}</a>
                  </BitsText>
                  <p className="project-subtitle">{p.subtitle}</p>
                  {p.status && (
                    <span className="experiment-status">{p.status}</span>
                  )}
                  <BitsText as="p">{p.description}</BitsText>
                  <Tags values={p.technologies} />
                  <BitsControl
                    as="a"
                    className="text-link"
                    href={`/work/${p.slug}/`}
                  >
                    Explore case study <Arrow />
                  </BitsControl>
                  {p.liveUrl && (
                    <BitsControl as="a" className="text-link" href={p.liveUrl}>
                      Visit live website <Arrow />
                    </BitsControl>
                  )}
                </div>
              </article>
            ))}
          </div>
        </AnimatedSection>
        <AnimatedSection
          id="engineering"
          className="section engineering-section"
        >
          <SectionHeading
            title="Engineering across the stack."
            text="Deep CMS expertise. Modern frontend thinking. The tools to connect it all."
          />
          <div className="engineering-grid">
            <div className="stack-list">
              {stack.map(([name, tools]) => (
                <div key={name}>
                  <BitsText as="h3">{name}</BitsText>
                  <BitsText as="p">{tools}</BitsText>
                </div>
              ))}
            </div>
            <aside className="specialization">
              <BitsText as="h3">Deep TYPO3 experience.</BitsText>
              <div
                className="version-timeline"
                aria-label="TYPO3 versions used"
              >
                {["v11", "v12", "v13", "v14"].map((v) => (
                  <span key={v}>{v}</span>
                ))}
              </div>
              <BitsText as="p">
                Custom extensions. Content Blocks. Fluid. Upgrade wizards.
                Backend modules. Site packages. Migrations, SEO and performance.
              </BitsText>
              <p>
                Experience with the details that make a CMS work in production.
              </p>
              <a className="text-link" href="/work/content-block-system/">
                See the content architecture <Arrow />
              </a>
            </aside>
          </div>
          <div className="problems">
            <BitsText as="h3">Problems I’ve solved.</BitsText>
            <div>
              {problems.map(([name, text]) => (
                <article key={name}>
                  <BitsText as="h4">{name}</BitsText>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </AnimatedSection>
        <SearchVisibilitySection />
        <AnimatedSection id="lab" className="section lab-section">
          <SectionHeading
            title="Practical AI. Real curiosity."
            text="Exploring the intersection of AI and web engineering — tools that remove repetitive work, improve CMS workflows and make complex systems easier to use."
          />
          <div className="lab-grid">
            {experiments.map(([title, text, status, tech]) => (
              <SpotlightCard className="experiment-card" key={title}>
                <BitsText as="h3">{title}</BitsText>
                <span className="experiment-status">{status}</span>
                <p>{text}</p>
                <p className="lab-tech">{tech}</p>
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
            <BitsText as="h2">Comfortable with the complicated.</BitsText>
            <p className="about-location">
              Ayush Singh · Web Platform Engineer
              <br />
              India → teams around the world
            </p>
          </div>
          <div className="about-copy">
            <p>
              I’m Ayush Singh, a web engineer focused on building modern
              platforms across CMS, commerce and custom applications while
              working across modern frontend development, SEO, AEO, GEO, AI and
              developer automation.
            </p>
            <p>
              My work sits between backend architecture and frontend experience.
              I enjoy taking complicated legacy workflows and turning them into
              simpler, reusable systems.
            </p>
            <p>
              I work extensively with TYPO3 and PHP, with experience in Laravel,
              WordPress, Joomla, Shopify and PrestaShop. I build modern
              interfaces with Vue, Nuxt, React, Next.js and Tailwind. More
              recently, I’m exploring practical applications of AI, RAG and
              automation to improve CMS workflows and development processes.
            </p>
            <div className="about-links">
              <BitsControl as="a" className="text-link" href="#search">
                Search & AI visibility capabilities <Arrow />
              </BitsControl>
              <BitsControl
                as="a"
                className="text-link"
                href={identity.linkedin}
              >
                Connect on LinkedIn <Arrow />
              </BitsControl>
            </div>
          </div>
        </AnimatedSection>
        <AnimatedSection className="section faq-section">
          <SectionHeading title="A little more context." />
          <div className="faq-list">
            {faqs.map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <Plus size={20} aria-hidden="true" />
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </AnimatedSection>
        <AnimatedSection id="contact" className="section contact-section">
          <div>
            <BitsText as="h2">
              Have a complex
              <br />
              web problem?
            </BitsText>
            <p>
              Let’s talk about the architecture, the problem and what we can
              build.
            </p>
          </div>
          <div className="contact-actions">
            <BitsControl
              as="a"
              className="button primary"
              href={`mailto:${identity.email}`}
            >
              Start a conversation <Arrow />
            </BitsControl>
            <a className="contact-email" href={`mailto:${identity.email}`}>
              {identity.email}
            </a>
            <div className="contact-links">
              <a href={identity.github}>
                GitHub <Arrow />
              </a>
              <a href={identity.linkedin}>
                LinkedIn <Arrow />
              </a>
            </div>
          </div>
        </AnimatedSection>
      </main>
      <Footer />
    </>
  );
}
