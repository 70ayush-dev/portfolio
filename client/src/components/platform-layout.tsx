import { BitsText, BitsControl, AnimatedSection } from "./reactbits/experience";
import { useState } from "react";
import { ArrowUpRight, Menu, X, Github, Linkedin } from "lucide-react";
import { identity } from "../data/portfolio";
export function Arrow() {
  return <ArrowUpRight size={18} aria-hidden="true" />;
}
export function Navigation() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <BitsControl
        as="a"
        className="brand"
        href="/"
        aria-label="Ayush Singh home"
      >
        AYUSH<span>404</span>
        <span className="brand-dot">.</span>
      </BitsControl>
      <BitsControl
        as="button"
        className="menu-toggle"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="site-nav"
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </BitsControl>
      <nav
        id="site-nav"
        aria-label="Main navigation"
        className={open ? "nav-open" : ""}
      >
        {["Work", "Engineering", "Lab", "About"].map((name) => (
          <BitsControl
            as="a"
            key={name}
            href={`/#${name.toLowerCase()}`}
            onClick={() => setOpen(false)}
          >
            {name}
          </BitsControl>
        ))}
        <BitsControl
          as="a"
          className="nav-cta"
          href="/#contact"
          onClick={() => setOpen(false)}
        >
          Let’s talk <Arrow />
        </BitsControl>
      </nav>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <BitsControl as="a" className="brand" href="/">
        AYUSH<span>404</span>.
      </BitsControl>
      <BitsText as="p">
        © {new Date().getFullYear()} Ayush Singh · Web Platform Engineer
      </BitsText>
      <div>
        <BitsControl as="a" href={identity.github} aria-label="Ayush on GitHub">
          <Github size={19} />
        </BitsControl>
        <BitsControl
          as="a"
          href={identity.linkedin}
          aria-label="Ayush on LinkedIn"
        >
          <Linkedin size={19} />
        </BitsControl>
        <BitsControl as="a" href={`mailto:${identity.email}`}>
          Email <Arrow />
        </BitsControl>
      </div>
    </footer>
  );
}
export function Tags({ values }: { values: string[] }) {
  return (
    <ul className="tags" aria-label="Technologies">
      {values.map((value) => (
        <li key={value}>{value}</li>
      ))}
    </ul>
  );
}
export function SectionHeading({
  number,
  label,
  title,
  text,
}: {
  number: string;
  label: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="section-heading">
      <BitsText as="p" className="eyebrow">
        <span>{number} /</span> {label}
      </BitsText>
      <div>
        <BitsText as="h2">{title}</BitsText>
        {text && <BitsText as="p">{text}</BitsText>}
      </div>
    </div>
  );
}
