import { readFile, writeFile, mkdir } from "node:fs/promises";
import {
  render,
  identity,
  projects,
  faqs,
} from "../.prerender/entry-server.js";
const template = await readFile("dist/index.html", "utf8");
const escape = (text) =>
  text
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
const routes = ["/", ...projects.map((p) => `/work/${p.slug}/`), "/404.html"];
const person = {
  "@type": "Person",
  "@id": `${identity.url}/#person`,
  name: identity.name,
  url: identity.url,
  jobTitle: identity.role,
  sameAs: [identity.github, identity.linkedin],
  knowsAbout: [
    "TYPO3",
    "PHP",
    "Vue",
    "Nuxt",
    "Technical SEO",
    "On-Page SEO",
    "AEO",
    "GEO",
    "Structured Data",
    "Schema.org",
    "JSON-LD",
    "Semantic HTML",
    "AI integrations",
    "Web automation",
  ],
  homeLocation: { "@type": "Country", name: "India" },
};
for (const path of routes) {
  const project = projects.find((p) => path === `/work/${p.slug}/`);
  const title = project
    ? `${project.title} — Ayush Singh | Engineering Case Study`
    : path === "/404.html"
      ? "Page not found — Ayush404"
      : "Ayush Singh — Web Platform Engineer | TYPO3, PHP, Vue, SEO & AI";
  const description =
    project?.description ||
    "Ayush Singh is a Web Platform Engineer specializing in TYPO3, PHP, Vue/Nuxt, SEO, AEO, GEO, AI integrations and web automation.";
  const graph = [
    person,
    {
      "@type": "WebSite",
      "@id": `${identity.url}/#website`,
      url: identity.url,
      name: "AYUSH404 — Ayush Singh",
      publisher: { "@id": person["@id"] },
    },
  ];
  if (path !== "/404.html")
    graph.push({
      "@type": "WebPage",
      "@id": identity.url + path + "#webpage",
      url: identity.url + path,
      name: title,
      description,
      isPartOf: { "@id": identity.url + "/#website" },
      about: { "@id": person["@id"] },
    });
  if (project)
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: identity.url + "/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: project.title,
          item: identity.url + path,
        },
      ],
    });
  if (project)
    graph.push({
      "@type": "CreativeWork",
      name: project.title,
      description: project.description,
      url: identity.url + path,
      author: { "@id": person["@id"] },
      keywords: project.technologies.join(", "),
    });
  else if (path === "/") {
    graph.push(
      ...projects.map((p) => ({
        "@type": "CreativeWork",
        name: p.title,
        description: p.description,
        url: `${identity.url}/work/${p.slug}/`,
        author: { "@id": person["@id"] },
      })),
    );
    graph.push({
      "@type": "FAQPage",
      mainEntity: faqs.map(([q, a]) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    });
  }
  const seo = `<title>${escape(title)}</title>\n<meta name="description" content="${escape(description)}" />\n<link rel="canonical" href="${identity.url + path}" />\n<meta name="robots" content="${path === "/404.html" ? "noindex" : "index, follow, max-image-preview:large"}" />\n<meta property="og:title" content="${escape(title)}" />\n<meta property="og:description" content="${escape(description)}" />\n<meta property="og:type" content="website" />\n<meta property="og:url" content="${identity.url + path}" />\n<meta property="og:image" content="${identity.url}/og-image.png" />\n<meta property="og:image:alt" content="Ayush Singh — Web Platform Engineer. TYPO3, PHP, Vue, Nuxt, SEO, AEO, GEO and AI." />\n<meta name="twitter:card" content="summary_large_image" />\n<meta name="twitter:title" content="${escape(title)}" />\n<meta name="twitter:description" content="${escape(description)}" />\n<meta name="twitter:image" content="${identity.url}/og-image.png" />\n<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replaceAll("<", "\\u003c")}</script>`;
  const html = template
    .replace(/<!--seo-start-->[\s\S]*?<!--seo-end-->/, seo)
    .replace(
      '<div id="root"></div>',
      `<div id="root" data-page="${path}">${render(path)}</div>`,
    );
  const output =
    path === "/"
      ? "dist/index.html"
      : path === "/404.html"
        ? "dist/404.html"
        : `dist${path}index.html`;
  await mkdir(output.slice(0, output.lastIndexOf("/")), { recursive: true });
  await writeFile(output, html);
}
await writeFile(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes
    .filter((r) => r !== "/404.html")
    .map((r) => `<url><loc>${identity.url + r}</loc></url>`)
    .join("")}</urlset>`,
);
await writeFile(
  "dist/llms.txt",
  `# Ayush Singh — Web Platform Engineer

> Ayush Singh builds modern web platforms, CMS architectures and search-ready, AI-visible digital experiences around TYPO3, PHP, Vue/Nuxt, SEO, AEO, GEO, AI integrations and automation.

This is Ayush's professional portfolio. Project pages describe engineering work and distinguish implemented work from considerations or experiments. Search and AI visibility are architectural capabilities; no rankings, traffic gains or AI citations are guaranteed.

## Portfolio

- [Homepage](${identity.url}/): Professional identity, capabilities, selected work and contact information.
- [Engineering](${identity.url}/#engineering): Technical skills and platform engineering expertise.
- [Search & AI Visibility](${identity.url}/#search): Technical SEO, AEO and GEO capabilities and services.

## Case studies

${projects.map((p) => `- [${p.title}](${identity.url}/work/${p.slug}/): ${p.description.replaceAll("\n", " ")}`).join("\n")}

## Discovery

- [XML sitemap](${identity.url}/sitemap.xml): Canonical, indexable portfolio pages.
- [Robots directives](${identity.url}/robots.txt): Crawler access directives.

This file provides a curated site overview. It does not set crawling permissions or training policies.
`,
);
console.log(
  `Prerendered ${routes.length} pages with route metadata and structured data.`,
);
