export const identity = {
  name: "Ayush Singh",
  role: "Web Platform Engineer",
  url: "https://ayush404.in",
  email: "ayush8000342870@gmail.com",
  github: "https://github.com/70ayush-dev",
  linkedin: "https://linkedin.com/in/ayush-singhdev",
};
export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  flow: string[];
  challenge: string;
  approach: string;
  result: string;
  status?: string;
  searchArchitecture?: string;
}
export const projects: Project[] = [
  {
    searchArchitecture:
      "Reusable TYPO3 Content Blocks and Nuxt components connect structured content with the frontend. SEO is part of the project scope. This content model supports search-friendly page architecture; project-specific metadata, routing, performance, image optimization and AEO/GEO implementation details are not yet documented here.",
    slug: "der-autoputzer",
    title: "Der Autoputzer",
    subtitle: "Modern TYPO3 + Nuxt platform rebuild",
    description:
      "A large-scale website modernization project combining TYPO3 content architecture with a modern Nuxt/Tailwind frontend.",
    technologies: ["TYPO3", "Nuxt", "Vue", "Tailwind", "Content Blocks", "SEO"],
    flow: ["TYPO3", "Content Blocks", "API / Data", "Nuxt", "Tailwind UI"],
    challenge:
      "Modernize the existing platform while keeping the CMS manageable for editors.",
    approach:
      "Create reusable TYPO3 content structures and map them to reusable Nuxt components across seminar pages, reviews, pricing and responsive layouts.",
    result:
      "A modern frontend architecture with reusable content components and a stronger foundation for future development.",
  },
  {
    slug: "typo3-ai-chatbot",
    title: "TYPO3 AI Chatbot",
    subtitle: "RAG-powered AI assistant for TYPO3",
    description:
      "An AI assistant designed to bring intelligent search and conversational access to TYPO3 content.",
    technologies: ["TYPO3", "PHP", "AI", "RAG", "LLM", "Vector Search"],
    flow: [
      "TYPO3 Content",
      "Content Indexing",
      "Knowledge Base",
      "Retrieval",
      "LLM",
      "AI Assistant",
    ],
    challenge:
      "Traditional website search often requires users to know exactly what they are looking for.",
    approach:
      "Connect TYPO3 content indexing and retrieval with an AI provider and a frontend chat interface, allowing questions in natural language.",
    result:
      "A retrieval-based approach to conversational access to CMS content.",
  },
  {
    slug: "migration-assistant",
    title: "TYPO3 Migration Assistant",
    subtitle: "From legacy pages to structured content",
    description:
      "Exploring how AI and automation can simplify complex TYPO3 website migrations.",
    status: "EXPERIMENT",
    technologies: ["TYPO3", "AI", "Automation", "Content Mapping"],
    flow: [
      "Old Page URL",
      "Page Scraping",
      "Content Analysis",
      "Layout Selection",
      "Content Mapping",
      "Preview",
      "TYPO3 Page Creation",
    ],
    challenge:
      "Legacy page content needs to be understood and mapped into a new CMS structure.",
    approach:
      "Explore a workflow in which editors enter a URL, analyze the content, select a target layout, map content and preview a page before creation.",
    result:
      "An experiment in AI-assisted migration with editor review built into the proposed workflow.",
  },
  {
    slug: "crm-system",
    title: "TYPO3 CRM System",
    subtitle: "Custom modules. Connected operations.",
    description: "A custom CRM platform built around TYPO3 v14.",
    technologies: [
      "TYPO3 v14",
      "PHP",
      "Fluid",
      "Database",
      "Authentication",
      "Custom Extension",
    ],
    flow: ["Authentication", "Custom Modules", "Database", "Dashboard"],
    challenge:
      "Bring data management and user management together within a custom CRM platform.",
    approach:
      "Build around TYPO3 v14 with authentication, custom backend modules, Fluid and database-backed workflows.",
    result:
      "A TYPO3-based architecture for login, dashboards, data management and user management.",
  },
  {
    searchArchitecture:
      "Structured TYPO3 content is mapped through an API/data layer into reusable Nuxt components. This makes the relationship between CMS content and visible page structure explicit. AEO and GEO are architectural considerations, rather than documented visibility results for this project.",
    slug: "content-block-system",
    title: "TYPO3 Content Block System",
    subtitle: "One content model. Reusable interfaces.",
    description:
      "Designing reusable content structures that can power modern frontend components.",
    technologies: ["TYPO3", "Content Blocks", "Nuxt", "Vue", "API"],
    flow: [
      "TYPO3 Content Block",
      "Structured Content",
      "API / Data Layer",
      "Nuxt Component",
      "Responsive UI",
    ],
    challenge:
      "Give CMS editors manageable content structures while keeping frontend components reusable.",
    approach:
      "Define structured content in TYPO3 Content Blocks and map the data layer to Nuxt components.",
    result:
      "A shared content model connecting editor workflows with reusable responsive interfaces.",
  },
];
export const searchSkills = [
  "Technical SEO",
  "On-Page SEO",
  "AEO",
  "GEO",
  "Structured Data",
  "Schema.org",
  "JSON-LD",
  "Semantic HTML",
  "Sitemaps",
  "Canonical URLs",
  "Internal Linking",
  "Core Web Vitals",
  "Image Optimization",
  "AI Search Optimization",
  "Entity Optimization",
];
export const searchServices = [
  {
    title: "Technical SEO",
    label: "01 / SEARCH FOUNDATIONS",
    text: "Make the platform accessible to crawlers and understandable to search engines, with performance considered from the start.",
    items: [
      "Crawlability & indexability",
      "SEO-friendly URL and routing architecture",
      "Canonical URLs & XML sitemaps",
      "Robots directives & metadata architecture",
      "Semantic HTML & on-page SEO",
      "Core Web Vitals, performance & image optimization",
    ],
  },
  {
    title: "AEO",
    label: "02 / ANSWER ENGINE OPTIMIZATION",
    text: "Structure helpful content so search and answer engines can understand the context and answer questions about the website.",
    items: [
      "Question-based content & clear answers",
      "FAQ structures & semantic headings",
      "Schema.org / JSON-LD structured data",
      "Entity relationships & structured answers",
      "Helpful, context-rich content",
      "Meaningful internal linking",
    ],
  },
  {
    title: "GEO",
    label: "03 / GENERATIVE ENGINE OPTIMIZATION",
    text: "Build a clear, crawlable source of first-party information for AI-powered search and generative answer systems.",
    items: [
      "Entity clarity & consistent brand information",
      "Author and source information",
      "First-party, structured content",
      "Clear topic and entity relationships",
      "Crawlable, AI-readable page architecture",
      "Contextual internal links & structured data",
    ],
  },
];
export const capabilities = [
  {
    title: "CMS Engineering",
    text: "TYPO3 extensions, Content Blocks, Fluid, migrations, upgrade wizards, backend modules and custom CMS functionality.",
    tags: ["TYPO3", "PHP", "Fluid", "Composer"],
  },
  {
    title: "Full-Stack Platforms",
    text: "Modern web applications connecting robust backend systems with modern frontend experiences.",
    tags: ["PHP", "Vue", "Nuxt", "REST APIs", "SQL"],
  },
  {
    title: "AI & Automation",
    text: "AI-powered assistants, RAG systems, migration automation and developer tooling.",
    tags: ["LLMs", "RAG", "AI APIs", "MCP"],
  },
  {
    title: "UI Engineering",
    text: "Turning designs into responsive, reusable and production-ready interfaces.",
    tags: ["Vue", "Nuxt", "Tailwind", "CSS", "GSAP"],
  },
  {
    title: "Search & AI Visibility",
    text: "Building websites that are technically optimized for search engines, answer engines and generative AI systems — with structured content, metadata and visibility considered from the beginning.",
    tags: [
      "SEO",
      "AEO",
      "GEO",
      "Schema.org",
      "JSON-LD",
      "Structured Content",
      "Semantic HTML",
      "Core Web Vitals",
      "AI Search",
    ],
  },
];
export const stack = [
  ["Backend", "PHP · TYPO3 · Fluid · Composer · MySQL · REST APIs"],
  ["Frontend", "Vue · Nuxt · JavaScript · Tailwind · HTML · CSS · GSAP"],
  [
    "Infrastructure",
    "Docker · DDEV · Git · Linux · Cloudflare · DigitalOcean · Plesk",
  ],
  ["Integrations", "Stripe · Twilio · WhatsApp · External APIs"],
  ["AI", "LLMs · RAG · AI APIs · MCP · Automation"],
  ["Search & AI Visibility", searchSkills.join(" · ")],
];
export const problems = [
  ["Legacy → modern", "Modernizing legacy CMS and frontend architectures."],
  [
    "CMS migrations",
    "Upgrading TYPO3 between major LTS versions while maintaining functionality and content.",
  ],
  [
    "Production debugging",
    "Investigating database, server, PHP, JavaScript and application-level issues.",
  ],
  [
    "Dependency management",
    "Resolving Composer conflicts and maintaining compatible environments.",
  ],
  [
    "Automation",
    "Replacing repetitive manual workflows with reusable tools and scripts.",
  ],
  ["API integrations", "Connecting Stripe, Twilio and external systems."],
];
export const experiments = [
  [
    "TYPO3 × AI Migration Assistant",
    "AI-assisted legacy content analysis and mapping.",
    "EXPERIMENT",
    "TYPO3 / AI / Automation",
  ],
  [
    "TYPO3 × RAG",
    "Conversational access to a CMS knowledge base.",
    "EXPERIMENT",
    "PHP / Retrieval / LLM",
  ],
  [
    "AI Content Block Generator",
    "Exploring AI-assisted reusable content structures.",
    "EXPERIMENT",
    "TYPO3 / AI",
  ],
  [
    "Vue → TYPO3 Component Workflow",
    "Connecting frontend components with editor workflows.",
    "EXPERIMENT",
    "Vue / Content Blocks",
  ],
  [
    "Developer Automation",
    "Tools to reduce repetitive development work.",
    "EXPERIMENT",
    "Scripts / APIs",
  ],
  [
    "UI Experiments",
    "Explorations in responsive interfaces and subtle motion.",
    "EXPERIMENT",
    "Vue / Nuxt / CSS",
  ],
];
export const faqs = [
  [
    "Does Ayush provide SEO, AEO and GEO services?",
    "Yes. Ayush provides Search & AI Visibility Engineering as part of web platform development: technical and on-page SEO, structured content, AEO (Answer Engine Optimization) and GEO (Generative Engine Optimization). He builds with these considerations from the architecture stage; rankings and inclusion in AI answers are not guaranteed.",
  ],
  [
    "Who is Ayush Singh?",
    "Ayush Singh is a Web Platform Engineer based in India, working with teams globally. His work connects backend architecture with modern frontend experiences.",
  ],
  [
    "What does Ayush build?",
    "Ayush builds modern, scalable, search-ready web platforms, CMS architectures, custom TYPO3 functionality, modern interfaces, AI-powered tools and automation workflows. SEO, AEO and GEO are considered alongside backend and frontend architecture.",
  ],
  [
    "Which technologies does Ayush use?",
    "His core technologies include PHP, TYPO3, Vue, Nuxt, JavaScript and Tailwind, alongside SQL, REST APIs, Docker, DDEV, SEO, AEO, GEO and AI integrations.",
  ],
  [
    "What TYPO3 experience does Ayush have?",
    "His TYPO3 work spans v11 through v14, including custom extensions, Content Blocks, Fluid, Composer, upgrade wizards, backend modules, site packages, APIs and migrations.",
  ],
  [
    "What projects has Ayush worked on?",
    "Selected work includes Der Autoputzer, a TYPO3 AI Chatbot, a TYPO3 Migration Assistant experiment, a TYPO3 CRM System and a reusable Content Block System.",
  ],
  [
    "What AI work is Ayush exploring?",
    "Ayush is exploring RAG-based content retrieval, conversational CMS interfaces, AI-assisted migration, content workflows and developer automation.",
  ],
];
