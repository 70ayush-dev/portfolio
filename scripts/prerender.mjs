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
const routes = [
  "/",
  "/lab/mascot/",
  "/lab/custom-domain-email/",
  ...projects.map((p) => `/work/${p.slug}/`),
  "/404.html",
];
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
    "Python",
    "Node.js",
    "Laravel",
    "WordPress",
    "Joomla",
    "Shopify",
    "PrestaShop",
    "React",
    "Next.js",
    "TypeScript",
    "Firebase",
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
  const isMascot = path === "/lab/mascot/";
  const isEmailGuide = path === "/lab/custom-domain-email/";
  const title = project
    ? `${project.title} — Ayush Singh | Engineering Case Study`
    : isMascot
      ? "Make Your Own Animated Mascot in 20 Minutes — Ayush Singh Lab"
      : isEmailGuide
        ? "Free Custom Domain Email with Cloudflare & Gmail Guide — Ayush Singh Lab"
        : path === "/404.html"
          ? "Page not found — Ayush404"
          : "Ayush Singh — Web Platform Engineer | TYPO3, PHP, Vue, SEO & AI";
  const description =
    project?.description ||
    (isMascot
      ? "Step-by-step guide to building interactive, procedural SVG animated mascots for web platforms with Cloudflare Workers AI companion integration."
      : isEmailGuide
        ? "Step-by-step fieldguide to set up professional custom domain email (hello@yourdomain.com) for $0/mo forever using Cloudflare Email Routing, SPF/DMARC and Gmail."
        : "Ayush Singh is a Web Platform Engineer specializing in TYPO3, PHP, Vue/Nuxt, SEO, AEO, GEO, AI integrations and web automation.");
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
  } else if (isMascot) {
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
          name: "Lab",
          item: identity.url + "/#lab",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Animated Mascot Guide",
          item: identity.url + path,
        },
      ],
    });
    graph.push({
      "@type": "TechArticle",
      headline: title,
      description,
      url: identity.url + path,
      author: { "@id": person["@id"] },
      proficiencyLevel: "Beginner",
      dependencies: "React, SVG",
      keywords: "Animated Mascot, Procedural SVG, React Animation, Character Design",
    });
    graph.push({
      "@type": "HowTo",
      name: "Make Your Own Animated Mascot in 20 Minutes",
      description,
      totalTime: "PT20M",
      tool: [
        {
          "@type": "HowToTool",
          name: "Avatar Lab Studio",
        },
      ],
      supply: [
        {
          "@type": "HowToSupply",
          name: "React",
        },
        {
          "@type": "HowToSupply",
          name: "SVG",
        },
      ],
      step: [
        {
          "@type": "HowToStep",
          name: "Step 1: Choose Starter Shape",
          text: "Select a starter body shape such as Strobi (round ball), Freddy (block with ears), Citrus (drop), Nova (bean), or Grok bot in the Avatar Lab Studio canvas.",
          url: `${identity.url}${path}#step-1`,
        },
        {
          "@type": "HowToStep",
          name: "Step 2: Customize Eyes & Geometry",
          text: "Configure body colors, eye shapes, width, height, spacing, and tilt to give the mascot unique facial expressions and personality.",
          url: `${identity.url}${path}#step-2`,
        },
        {
          "@type": "HowToStep",
          name: "Step 3: Export SVG or JSON Definition",
          text: "Export the designed character definition as clean, lightweight SVG markup or an avatar JSON definition bundle.",
          url: `${identity.url}${path}#step-3`,
        },
        {
          "@type": "HowToStep",
          name: "Step 4: Integrate in React with Animation States",
          text: "Mount the procedural mascot component in React and bind interaction states, blinking intervals, and mood reaction controller hooks.",
          url: `${identity.url}${path}#step-4`,
        },
        {
          "@type": "HowToStep",
          name: "Step 5: Connect Free Cloudflare Workers AI Companion with Rate Limiting",
          text: "Connect your mascot to Cloudflare Workers AI (@cf/meta/llama-3.1-8b-instruct) with dual-layer IP rate limiting, mood synchronization (thinking, excited, happy), and streaming SSE.",
          url: `${identity.url}${path}#step-5`,
        },
      ],
    });
  } else if (isEmailGuide) {
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
          name: "Lab",
          item: identity.url + "/#lab",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Free Custom Domain Email Guide",
          item: identity.url + path,
        },
      ],
    });
    graph.push({
      "@type": "TechArticle",
      headline: title,
      description,
      url: identity.url + path,
      author: { "@id": person["@id"] },
      proficiencyLevel: "Beginner",
      dependencies: "Cloudflare Email Routing, Gmail, DNS, SPF, DKIM, DMARC",
      keywords: "Cloudflare Email Routing, Free Custom Domain Email, Gmail SMTP, Professional Email, SPF DMARC",
    });
    graph.push({
      "@type": "HowTo",
      name: "How to Get Free Custom Domain Email with Cloudflare & Gmail",
      description,
      totalTime: "PT10M",
      tool: [
        {
          "@type": "HowToTool",
          name: "Cloudflare Dashboard",
        },
        {
          "@type": "HowToTool",
          name: "Google Account & Gmail",
        },
      ],
      supply: [
        {
          "@type": "HowToSupply",
          name: "Custom Domain",
        },
        {
          "@type": "HowToSupply",
          name: "Free Personal Gmail Account",
        },
      ],
      step: [
        {
          "@type": "HowToStep",
          name: "Step 1: Enable Cloudflare Email Routing & Apply DNS Records",
          text: "Open Cloudflare Dashboard -> Email -> Email Routing, auto-apply the 3 MX records (route1/2/3.mx.cloudflare.net) and SPF TXT record.",
          url: `${identity.url}${path}#step-1`,
        },
        {
          "@type": "HowToStep",
          name: "Step 2: Configure Custom Address & Verify Gmail Destination",
          text: "Create custom addresses (e.g. hello@yourdomain.com) and forward them to your personal Gmail inbox after clicking the verification email.",
          url: `${identity.url}${path}#step-2`,
        },
        {
          "@type": "HowToStep",
          name: "Step 3: Generate Google 16-Character App Password",
          text: "In Google Account Security (with 2-Step Verification enabled), generate a dedicated 16-character App Password for SMTP authentication.",
          url: `${identity.url}${path}#step-3`,
        },
        {
          "@type": "HowToStep",
          name: "Step 4: Configure Gmail 'Send Mail As' via SMTP",
          text: "In Gmail Settings -> Accounts and Import, add your custom domain email with host smtp.gmail.com, port 587 (TLS), and your App Password for free two-way sending.",
          url: `${identity.url}${path}#step-4`,
        },
        {
          "@type": "HowToStep",
          name: "Step 5: Enforce Combined SPF & DMARC DNS Records",
          text: "Publish combined SPF TXT record allowing both Cloudflare routing and Google SMTP, plus a DMARC policy record for 10/10 inbox deliverability.",
          url: `${identity.url}${path}#step-5`,
        },
      ],
    });
  }
  const seo = `<title>${escape(title)}</title>\n<meta name="description" content="${escape(description)}" />\n<link rel="canonical" href="${identity.url + path}" />\n<meta name="robots" content="${path === "/404.html" ? "noindex" : "index, follow, max-image-preview:large"}" />\n<meta property="og:title" content="${escape(title)}" />\n<meta property="og:description" content="${escape(description)}" />\n<meta property="og:type" content="website" />\n<meta property="og:url" content="${identity.url + path}" />\n<meta property="og:image" content="${identity.url}/og-image.png" />\n<meta property="og:image:width" content="1200" />\n<meta property="og:image:height" content="630" />\n<meta property="og:image:type" content="image/png" />\n<meta property="og:image:alt" content="Ayush Singh — Web Platform Engineer. TYPO3, PHP, Vue, Nuxt, SEO, AEO, GEO and AI." />\n<meta name="twitter:card" content="summary_large_image" />\n<meta name="twitter:title" content="${escape(title)}" />\n<meta name="twitter:description" content="${escape(description)}" />\n<meta name="twitter:image" content="${identity.url}/og-image.png" />\n<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replaceAll("<", "\\u003c")}</script>`;
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
const today = new Date().toISOString().split("T")[0];
await writeFile(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes
    .filter((r) => r !== "/404.html")
    .map((r) => `<url><loc>${identity.url + r}</loc><lastmod>${today}</lastmod></url>`)
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
- [Animated Mascot Lab](${identity.url}/lab/mascot/): Step-by-step 20-minute guide, procedural SVG character engine with 23 animated moods, and free Cloudflare Workers AI companion integration.
- [Free Custom Domain Email Guide](${identity.url}/lab/custom-domain-email/): Step-by-step 10-minute fieldguide to receiving and sending custom domain email (hello@yourdomain.com) for $0/mo forever using Cloudflare Email Routing and Gmail.

## Case studies

${projects.map((p) => `- [${p.title}](${identity.url}/work/${p.slug}/): ${p.description.replaceAll("\n", " ")}`).join("\n")}

## Discovery

- [XML sitemap](${identity.url}/sitemap.xml): Canonical, indexable portfolio pages.
- [Robots directives](${identity.url}/robots.txt): Crawler access directives.

This file provides a curated site overview. It does not set crawling permissions or training policies.
`,
);

// Comprehensive Full Markdown Corpus for RAG & AI Assistants
const fullKnowledgeMarkdown = `# Ayush Singh — Web Platform Engineering Knowledge Base

## Professional Identity
- Name: ${identity.name}
- Role: ${identity.role}
- Email: ${identity.email}
- Location: ${identity.location}
- Portfolio Website: ${identity.url}
- GitHub: ${identity.github}
- LinkedIn: ${identity.linkedin}
- Summary: Ayush Singh is a Web Platform Engineer specializing in TYPO3, PHP, Vue/Nuxt, Technical SEO, AEO, GEO, AI integrations, and web automation.

## Core Technical Competencies
- CMS & Backend: Deep TYPO3 expertise (v11–v14), PHP 8.x, Python, Node.js, Firebase Auth & Firestore, Laravel, WordPress.
- Frontend Architecture: Vue 3, Nuxt, React, Next.js, TypeScript, Tailwind CSS, GSAP, procedural SVG graphics.
- Search & AI Visibility: Technical SEO, AEO (Answer Engine Optimization), GEO (Generative Engine Optimization), Schema.org JSON-LD structured data, semantic HTML5, Core Web Vitals optimization.
- AI Automation & Data: Real estate AI email assistant automation, ETL data transformation pipelines (300k+ records), RAG assistants.

## Case Studies & Engineering Architecture
${projects
  .map(
    (p) => `### ${p.title}
- Subtitle: ${p.subtitle}
- URL: ${identity.url}/work/${p.slug}/
- Live Demo: ${p.liveUrl || "Client platform"}
- Role: ${p.role || "Lead Platform Engineer"}
- Technologies: ${p.technologies.join(", ")}
- Flow: ${p.flow.join(" → ")}
- Challenge: ${p.challenge}
- Approach: ${p.approach}
- Results: ${p.result}
${p.decisions ? `- Key Decisions:\n${p.decisions.map((d) => `  * ${d.title}: ${d.description}`).join("\n")}` : ""}
- Search Architecture: ${p.searchArchitecture || "Structured schema.org graph and page metadata."}
`,
  )
  .join("\n")}

## Lab Experiments
### Animated Mascot Lab (Strobi)
- URL: ${identity.url}/lab/mascot/
- Description: Procedural SVG character engine and 20-minute step-by-step implementation guide.
- Technology: 100% vector SVG and native CSS keyframes (< 4KB payload, zero external runtime libraries, zero layout shift).
- Features: 23 animated moods (idle, waking, happy, excited, curious, thinking, celebrate, drowsy, sleeping), natural periodic blinking, sleep timer, reduced-motion accessibility.
- Companion AI: Grounded RAG chatbot connected to Cloudflare Workers AI (@cf/meta/llama-3.1-8b-instruct) with streaming responses, visual mood synchronization, dual-layer sliding window IP rate limiting (10 req/min), and client cooldown.

### Free Custom Domain Email with Cloudflare & Gmail
- URL: ${identity.url}/lab/custom-domain-email/
- Description: Step-by-step fieldguide to setting up professional custom domain email (hello@yourdomain.com) for $0/mo forever without paying $72+/year for Google Workspace.
- Architecture: Cloudflare Email Routing handles inbound MX routing and anti-spam; forwards to personal Gmail. Outbound mail sends via Gmail SMTP (smtp.gmail.com:587) with a dedicated Google App Password.
- Security: Combined SPF (include:_spf.mx.cloudflare.net include:_spf.google.com) and DMARC enforcement (p=none / p=quarantine) for 10/10 deliverability.

## Frequently Asked Questions (FAQs)
${faqs.map(([q, a]) => `### Q: ${q}\nA: ${a}`).join("\n\n")}
`;

await writeFile("dist/llms-full.txt", fullKnowledgeMarkdown);
await writeFile("client/public/llms-full.txt", fullKnowledgeMarkdown);

// Structured RAG Chunks JSON Index
const ragChunks = [
  {
    id: "identity",
    title: "About Ayush Singh & Contact Details",
    url: `${identity.url}/`,
    content: `Ayush Singh is a Web Platform Engineer based in ${identity.location}. Specializing in TYPO3, PHP, Vue/Nuxt, SEO, AEO, and AI workflows. Email: ${identity.email}, LinkedIn: ${identity.linkedin}, GitHub: ${identity.github}.`,
    keywords: ["ayush", "contact", "email", "location", "hire", "linkedin", "github", "bio", "about", "who"],
  },
  {
    id: "skills",
    title: "Core Technical Stack & Engineering Skills",
    url: `${identity.url}/#engineering`,
    content: "Core stack includes TYPO3 (v11–v14), PHP 8.x, Vue, Nuxt, React, Next.js, TypeScript, Python, Node.js, Tailwind CSS, Firebase, Technical SEO, AEO, GEO, and automated AI data pipelines.",
    keywords: ["skills", "stack", "technologies", "tech", "tools", "typo3", "vue", "nuxt", "react", "php", "python"],
  },
  {
    id: "search-visibility",
    title: "Search & AI Visibility (SEO, AEO, GEO)",
    url: `${identity.url}/#search`,
    content: "Engineers platforms for both traditional search engines (Google, Bing) and AI answer engines (Perplexity, ChatGPT, Claude). Implements JSON-LD schema graphs, semantic HTML, and curated llms.txt.",
    keywords: ["seo", "aeo", "geo", "search", "schema", "llms", "visibility", "rankings", "google"],
  },
  ...projects.map((p) => ({
    id: p.slug,
    title: p.title,
    url: `${identity.url}/work/${p.slug}/`,
    content: `${p.title} (${p.subtitle}): ${p.description} Technologies: ${p.technologies.join(", ")}. Flow: ${p.flow.join(" → ")}. Challenge: ${p.challenge} Approach: ${p.approach} Result: ${p.result}`,
    keywords: [p.slug, ...p.title.toLowerCase().split(" "), ...p.technologies.map((t) => t.toLowerCase())],
  })),
  {
    id: "mascot-lab",
    title: "Animated Mascot Lab (Strobi) & Free Cloudflare Workers AI",
    url: `${identity.url}/lab/mascot/`,
    content: "Strobi is a procedural SVG companion with 23 animated moods, 0 external runtime libraries, 100% vector SVG, and an integrated free RAG chatbot powered by Cloudflare Workers AI with Llama 3.1 8B Instruct, mood synchronization, and dual-layer rate limiting.",
    keywords: ["mascot", "strobi", "animation", "svg", "lab", "avatar", "moods", "character", "chatbot", "ai", "cloudflare", "llama", "rate-limit"],
  },
  {
    id: "custom-domain-email",
    title: "Free Custom Domain Email with Cloudflare & Gmail Guide",
    url: `${identity.url}/lab/custom-domain-email/`,
    content: "Complete guide to getting professional custom domain email (hello@yourdomain.com) for $0/year using Cloudflare Email Routing and Gmail SMTP with App Passwords. Includes SPF, DKIM, and DMARC deliverability hardening.",
    keywords: ["email", "domain", "cloudflare", "gmail", "smtp", "free", "routing", "dmarc", "spf", "mx", "custom"],
  },
  ...faqs.map(([q, a], idx) => ({
    id: `faq-${idx}`,
    title: q,
    url: `${identity.url}/#faq`,
    content: `${q} Answer: ${a}`,
    keywords: q.toLowerCase().split(" ").filter((w) => w.length > 3),
  })),
];

await writeFile("dist/chatbot-corpus.json", JSON.stringify(ragChunks, null, 2));
await writeFile("client/src/data/chatbot-knowledge.json", JSON.stringify(ragChunks, null, 2));

console.log(
  `Prerendered ${routes.length} pages, generated llms-full.txt and indexed ${ragChunks.length} RAG chunks.`,
);
