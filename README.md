# AYUSH404 portfolio

React, TypeScript and Vite portfolio based on `ayush404-portfolio-v2.md`. Dark engineering design with Manrope / JetBrains Mono typography, lime accents, an interactive system map and adapted React Bits Threads, SpotlightCard, BlurText, AnimatedContent and Magnet components. Their upstream license is preserved in `client/src/components/reactbits/LICENSE.md`.

- `npm install`: install dependencies.
- `npm run dev`: local development.
- `npm run check`: TypeScript validation.
- `npm run build`: build and prerender the homepage, five case studies and a 404 page into `dist/`.
- `npm run preview`: preview the production build.
- `node scripts/check-portfolio.mjs`: browser and static-content checks (requires Chrome at `/usr/bin/google-chrome`; set `PORTFOLIO_TEST_URL` to test a preview server).

Project content, contact links, technologies, experiments and FAQs live in `client/src/data/portfolio.ts`. No project metrics are invented. Lab entries are explicitly presented as experiments. Project visuals illustrate architecture rather than claiming to be screenshots.

The build generates page-specific titles, descriptions, canonical URLs, social metadata, Person / WebSite / WebPage / BreadcrumbList / CreativeWork structured data, visible FAQs with matching FAQPage data, and a sitemap. Static HTML makes content available without JavaScript; React hydrates the interactions. `robots.txt` allows crawling. This supports search and AI discovery but does not guarantee rankings or AI citations.

GitHub Pages deployment remains configured in `.github/workflows/`. Each case study has a real static directory for direct navigation. Animations respect reduced motion, and the Threads canvas skips rendering while offscreen or in a hidden tab.

Search & AI Visibility is an integrated capability and service after Engineering. Service content and skills are data-driven, with technical SEO, AEO and GEO considered at the architecture stage. Case studies distinguish documented content architecture from broader considerations, without inventing search outcomes.
