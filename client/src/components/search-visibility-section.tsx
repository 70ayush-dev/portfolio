import { ArrowDown } from "lucide-react";
import { searchServices } from "../data/portfolio";
import { BitsText, BitsControl, AnimatedSection } from "./reactbits/experience";
import SpotlightCard from "./reactbits/SpotlightCard";
import { SectionHeading, Arrow } from "./platform-layout";
export default function SearchVisibilitySection() {
  return (
    <AnimatedSection id="search" className="section search-section">
      <SectionHeading
        title="Search-ready web platforms."
        text="Modern websites need to be discoverable by more than traditional search engines. I build web platforms where technical SEO, structured content, AEO and GEO are considered alongside the CMS, frontend and backend architecture."
      />
      <div className="search-overview">
        <div className="search-service-intro">
          <BitsText as="h3">Search & AI Visibility Engineering.</BitsText>
          <p>
            I build websites with search visibility considered at the
            architecture level — combining technical SEO, structured content,
            answer-engine optimization and generative-search optimization.
          </p>
          <BitsControl as="a" className="text-link" href="#contact">
            Discuss your platform’s visibility <Arrow />
          </BitsControl>
        </div>
        <figure
          className="visibility-map"
          aria-label="Web platform architecture connects users, search and AI through structured content"
        >
          <div className="visibility-root">Web platform</div>
          <div className="visibility-branches">
            {[
              ["Users", "UX / UI"],
              ["Search", "Technical SEO"],
              ["AI", "AEO / GEO"],
            ].map(([name, role]) => (
              <div key={name}>
                <ArrowDown size={18} aria-hidden="true" />
                <strong>{name}</strong>
                <span>{role}</span>
              </div>
            ))}
          </div>
          <div className="visibility-foundation">
            <ArrowDown size={20} aria-hidden="true" />
            <strong>Structured content</strong>
            <ArrowDown size={20} aria-hidden="true" />
            <span>Web platform</span>
          </div>
          <figcaption>
            Useful for people. Understandable to search and AI systems.
          </figcaption>
        </figure>
      </div>
      <div className="search-services">
        {searchServices.map((service) => (
          <SpotlightCard key={service.title}>
            <BitsText as="h3">{service.title}</BitsText>
            {service.title !== "Technical SEO" && (
              <p className="service-expansion">
                {service.title === "AEO"
                  ? "Answer Engine Optimization"
                  : "Generative Engine Optimization"}
              </p>
            )}
            <p>{service.text}</p>
            <ul>
              {service.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </SpotlightCard>
        ))}
      </div>
      <div className="search-proof">
        <p>
          Clear entity information, structured answers and contextual internal
          links build on sound technical SEO. Rankings and inclusion in AI
          answers are not guaranteed.
        </p>
        <BitsControl
          as="a"
          className="text-link"
          href="/work/content-block-system/"
        >
          Explore structured content architecture <Arrow />
        </BitsControl>
      </div>
    </AnimatedSection>
  );
}
