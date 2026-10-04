import { ScanSearch, MessageSquareText, Network } from "lucide-react";
import { searchServices } from "../data/portfolio";
import { BitsText, BitsControl, AnimatedSection } from "./reactbits/experience";
import SpotlightCard from "./reactbits/SpotlightCard";
import { SectionHeading, Arrow, Tags } from "./platform-layout";
export default function SearchVisibilitySection() {
  const icons = [ScanSearch, MessageSquareText, Network];
  return (
    <AnimatedSection id="search" className="section search-section">
      <SectionHeading
        number="04"
        label="SEARCH & AI VISIBILITY"
        title="Search-ready web platforms."
        text="Modern websites need to be discoverable by more than traditional search engines. I build web platforms where technical SEO, structured content, AEO and GEO are considered alongside the CMS, frontend and backend architecture."
      />
      <div className="search-overview">
        <div className="search-service-intro">
          <BitsText as="p" className="eyebrow">
            SEO · AEO · GEO / PROFESSIONAL CAPABILITY
          </BitsText>
          <BitsText as="h3">
            Search & AI Visibility Engineering<span className="accent">.</span>
          </BitsText>
          <BitsText as="p">
            I build websites with search visibility considered at the
            architecture level — combining technical SEO, structured content,
            answer-engine optimization and generative-search optimization.
          </BitsText>
          <Tags
            values={[
              "Structured Content",
              "Semantic HTML",
              "Schema.org",
              "JSON-LD",
              "Core Web Vitals",
              "AI Search",
            ]}
          />
          <BitsControl as="a" className="text-link" href="#contact">
            Discuss your platform’s visibility <Arrow />
          </BitsControl>
        </div>
        <SpotlightCard className="visibility-map">
          <BitsText as="p" className="eyebrow">
            ONE PLATFORM / THREE AUDIENCES
          </BitsText>
          <div className="visibility-root">WEB PLATFORM</div>
          <div className="visibility-branches">
            {[
              ["USERS", "UX / UI"],
              ["SEARCH", "SEO"],
              ["AI", "AEO / GEO"],
            ].map(([name, role]) => (
              <div key={name}>
                <span aria-hidden="true">↓</span>
                <BitsText as="h4">{name}</BitsText>
                <BitsText as="p">{role}</BitsText>
              </div>
            ))}
          </div>
          <div className="visibility-foundation">
            <span aria-hidden="true">↓</span>
            <strong>STRUCTURED CONTENT</strong>
            <span aria-hidden="true">↓</span>
            <span>WEB PLATFORM</span>
          </div>
          <BitsText as="p" className="visibility-caption">
            Useful for people. Understandable to search and AI systems.
          </BitsText>
        </SpotlightCard>
      </div>
      <div className="search-services">
        {searchServices.map((service, i) => {
          const Icon = icons[i];
          return (
            <SpotlightCard key={service.title}>
              <div className="card-top">
                <Icon size={25} />
                <span>0{i + 1}</span>
              </div>
              <BitsText as="p" className="eyebrow">
                {service.label}
              </BitsText>
              <BitsText as="h3">{service.title}</BitsText>
              <BitsText as="p">{service.text}</BitsText>
              <ul>
                {service.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </SpotlightCard>
          );
        })}
      </div>
      <div className="search-proof">
        <BitsText as="p">
          Clear entity information, structured answers and contextual internal
          links build on sound technical SEO. Rankings and inclusion in AI
          answers are not guaranteed.
        </BitsText>
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
