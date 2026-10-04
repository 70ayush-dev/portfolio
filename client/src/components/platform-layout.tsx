import ThemeToggle from "./theme-toggle";
import { BitsText, BitsControl } from "./reactbits/experience";
import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, Menu, X, Github, Linkedin } from "lucide-react";
import { identity } from "../data/portfolio";

export function Arrow() {
  return <ArrowUpRight size={18} aria-hidden="true" />;
}
export function Navigation() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="site-header">
      <div className="masthead">
        <a className="brand" href="/" aria-label="Ayush Singh home">
          AYUSH<span>404</span>
          <span className="brand-dot">.</span>
        </a>
        <p className="masthead-identity">
          Ayush Singh<span>Web Platform Engineer</span>
        </p>
      </div>
      <div className="header-controls">
        <ThemeToggle />
        <button
          ref={toggle}
          type="button"
          className="menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <nav
        id="site-nav"
        aria-label="Main navigation"
        className={open ? "nav-open" : ""}
      >
        {["Work", "Engineering", "Lab", "About"].map((name) => (
          <a
            key={name}
            href={`/#${name.toLowerCase()}`}
            onClick={() => setOpen(false)}
          >
            {name}
          </a>
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
      <div>
        <a className="brand" href="/">
          AYUSH<span>404</span>.
        </a>
        <p>Web Platform Engineer</p>
      </div>
      <p>
        © {new Date().getFullYear()} Ayush Singh
        <br />
        Based in India. Working globally.
      </p>
      <div className="footer-links">
        <a href={identity.github}>
          <Github size={18} aria-hidden="true" /> GitHub
        </a>
        <a href={identity.linkedin}>
          <Linkedin size={18} aria-hidden="true" /> LinkedIn
        </a>
        <a href={`mailto:${identity.email}`}>
          Email <Arrow />
        </a>
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
  title,
  text,
}: {
  number?: string;
  label?: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="section-heading">
      <BitsText as="h2">{title}</BitsText>
      {text && <BitsText as="p">{text}</BitsText>}
    </div>
  );
}
