import {
  BitsText,
  BitsControl,
  AnimatedSection,
} from "../components/reactbits/experience";
import { ArrowLeft } from "lucide-react";
import ProjectVisual from "../components/project-visual";
import { projects } from "../data/portfolio";
import { Navigation, Footer, Tags, Arrow } from "../components/platform-layout";
export default function CaseStudy({ slug }: { slug: string }) {
  const project = projects.find((p) => p.slug === slug);
  if (!project) return null;
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navigation />
      <main id="main" className="case-study section">
        <BitsControl as="a" className="text-link back-link" href="/#work">
          <ArrowLeft size={18} aria-hidden="true" /> Back to selected work
        </BitsControl>
        <BitsText as="h1">
          {project.title}
          <span className="accent">.</span>
        </BitsText>
        <BitsText as="p" className="case-subtitle">
          {project.subtitle}
        </BitsText>
        {project.status && (
          <span className="experiment-status">{project.status}</span>
        )}
        <Tags values={project.technologies} />
        {project.liveUrl && (
          <BitsControl as="a" className="text-link" href={project.liveUrl}>
            Visit live website <Arrow />
          </BitsControl>
        )}
        <ProjectVisual
          project={project}
          featured={project.slug === "der-autoputzer"}
        />
        <AnimatedSection className="case-section">
          <BitsText as="h2">Overview</BitsText>
          <BitsText as="p">{project.description}</BitsText>
        </AnimatedSection>
        <AnimatedSection className="case-section">
          <BitsText as="h2">Challenge</BitsText>
          <BitsText as="p">{project.challenge}</BitsText>
        </AnimatedSection>
        {project.role && (
          <AnimatedSection className="case-section">
            <BitsText as="h2">My role</BitsText>
            <BitsText as="p">{project.role}</BitsText>
          </AnimatedSection>
        )}
        <AnimatedSection className="case-section">
          <BitsText as="h2">Architecture</BitsText>
          <ol className="case-flow">
            {project.flow.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </AnimatedSection>
        <AnimatedSection className="case-section">
          <BitsText as="h2">Implementation & engineering decisions</BitsText>
          <BitsText as="p">{project.approach}</BitsText>
        </AnimatedSection>
        {project.decisions?.map((decision) => (
          <AnimatedSection key={decision.title} className="case-section">
            <BitsText as="h2">{decision.title}</BitsText>
            <BitsText as="p">{decision.description}</BitsText>
          </AnimatedSection>
        ))}
        <AnimatedSection className="case-section">
          <BitsText as="h2">
            {project.status ? "Direction of the experiment" : "Result"}
          </BitsText>
          <BitsText as="p">{project.result}</BitsText>
        </AnimatedSection>
        {project.searchArchitecture && (
          <AnimatedSection className="case-section">
            <BitsText as="h2">Search & AI Architecture</BitsText>
            <div>
              <BitsText as="p">{project.searchArchitecture}</BitsText>
              <div className="case-capability-links">
                <BitsControl as="a" className="text-link" href="/#engineering">
                  {project.slug === "fit-with-nishika"
                    ? "Full-stack platform engineering"
                    : "TYPO3, Content Blocks & Nuxt"}{" "}
                  <Arrow />
                </BitsControl>
                <BitsControl as="a" className="text-link" href="/#search">
                  SEO · AEO · GEO capabilities <Arrow />
                </BitsControl>
              </div>
            </div>
          </AnimatedSection>
        )}
        <div className="case-next">
          <BitsText as="h2">Have a similar engineering problem?</BitsText>
          <BitsControl as="a" className="button primary" href="/#contact">
            Let’s talk <Arrow />
          </BitsControl>
        </div>
      </main>
      <Footer />
    </>
  );
}
