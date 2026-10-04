---
name: "AYUSH404 \u2014 Engineering Fieldnotes"
description: "Editorial platform engineering in warm paper, deep ink and cobalt."
colors:
  canvas: "#f7f5ef"
  surface: "#ffffff"
  surface-soft: "#eeebe3"
  ink: "#172126"
  ink-secondary: "#4c585d"
  accent: "#2349c6"
  accent-hover: "#19389b"
  accent-soft: "#e9eeff"
  border: "#d5d8d3"
  border-control: "#78817f"
  on-accent: "#ffffff"
  success: "#246344"
  warning: "#805315"
  error: "#ac303a"
  spotlight: "rgb(35 73 198 / 5%)"
  dark-canvas: "#000000"
  dark-surface: "#101619"
  dark-surface-soft: "#182126"
  dark-ink: "#f7f5ef"
  dark-ink-secondary: "#c0cdd2"
  dark-accent: "#96adff"
  dark-accent-hover: "#b6c5ff"
  dark-accent-soft: "#293950"
  dark-border: "#39464d"
  dark-border-control: "#819398"
  dark-on-accent: "#172126"
  dark-success: "#8ed7ac"
  dark-warning: "#e6c087"
  dark-error: "#ffadb3"
  dark-spotlight: "rgb(150 173 255 / 7%)"
typography:
  display:
    fontFamily: "\"Space Grotesk\", \"Trebuchet MS\", sans-serif"
    fontSize: "clamp(2.75rem, 1.1rem + 5vw, 6rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  hero:
    fontFamily: "\"Space Grotesk\", \"Trebuchet MS\", sans-serif"
    fontSize: "clamp(2.75rem, 5.5vw, 5rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "\"Space Grotesk\", \"Trebuchet MS\", sans-serif"
    fontSize: "clamp(2rem, 1.3rem + 2.2vw, 3.5rem)"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-0.035em"
  title:
    fontFamily: "\"Space Grotesk\", \"Trebuchet MS\", sans-serif"
    fontSize: "clamp(1.625rem, 1.3rem + 1vw, 2.25rem)"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  body:
    fontFamily: "\"Source Sans 3\", \"Segoe UI\", sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.65
  caption:
    fontFamily: "\"Source Sans 3\", \"Segoe UI\", sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  action:
    fontFamily: "\"Source Sans 3\", \"Segoe UI\", sans-serif"
    fontSize: "1rem"
    fontWeight: 600
rounded:
  card: "8px"
  control: "4px"
spacing:
  8: "8px"
  12: "12px"
  16: "16px"
  20: "20px"
  24: "24px"
  28: "28px"
  32: "32px"
  48: "48px"
  64: "64px"
  96: "96px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    typography: "{typography.action}"
    rounded: "{rounded.control}"
    padding: "14px 22px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
  text-link:
    textColor: "{colors.accent}"
    typography: "{typography.action}"
  tag:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.ink-secondary}"
    rounded: "{rounded.control}"
    padding: "3px 9px"
  spotlight-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.card}"
    padding: "32px"
  theme-toggle:
    rounded: "{rounded.control}"
    width: "44px"
    height: "44px"
---

# Design System: AYUSH404

Implemented system extracted from `client/src/index.css` and the shipped React components. Companion documents: [Typography](typogrpahy.md) · [Design philosophy](DesignPhilophsy.md). Token frontmatter is normative; CSS remains the implementation source.

## Overview

**Creative North Star: "Engineering Fieldnotes"**

Engineering Fieldnotes is the implemented portfolio identity: considered typography, open editorial rows, quiet surfaces and concise technical annotations. Warm paper and deep ink establish a calm reading surface; cobalt identifies actions and connected architecture. The authorized dark theme preserves those relationships on a pure black canvas.

The signature pairs an oversized statement with an unboxed architecture annotation. Project stories explain real systems through labeled vector diagrams and readable prose. Fit with Nishika additionally uses a real public homepage screenshot, captioned as a live website, with a direct site link. The hero remains a plain surface, without a moving background.

**Key Characteristics:**
- Open editorial rows and generous margins.
- Space Grotesk headings with Source Sans 3 reading text.
- Meaningful architecture diagrams and native controls.
- Persistent AMOLED black dark theme and restrained motion.

## Colors

### Primary

Cobalt (`accent`) identifies links, primary actions, selected architecture nodes and diagram connectors. `accent-hover` and `accent-soft` provide interaction states. `spotlight` is a faint accent-derived pointer tint, not a separate accent family.

### Neutral

Warm paper (`canvas`), white (`surface`) and soft paper (`surface-soft`) establish the light reading surfaces. Deep ink (`ink`) and secondary ink (`ink-secondary`) establish hierarchy. `border` supplies decorative separators; `border-control` supplies meaningful control and diagram boundaries. `on-accent` is the text on solid accent. Success, warning and error are reserved semantic tokens, not decorative accents.

The dark values are recorded as `dark-*` tokens in frontmatter, sourced exactly from `:root[data-theme="dark"]`. They override the same CSS variables: pure black canvas, lighter reading text, light cobalt actions and dark text on solid accent. Light uses `:root` (including `data-theme="light"`). Do not reduce text opacity to manufacture secondary text.

**The Semantic Color Rule.** Use the existing semantic CSS variables so controls, diagrams and text follow the active theme together.

Validate new text combinations against 4.5:1 ordinary-text and 3:1 large-text and meaningful-boundary targets. These targets are accessibility requirements, not a claim of measured scores.

## Typography

**Display Font:** Space Grotesk with Trebuchet MS and sans-serif fallback, weights 500 and 600.
**Body Font:** Source Sans 3 with Segoe UI and sans-serif fallback, weights 400 and 600.
**Code Font:** platform monospace stack for literal code only.

The heading face gives concise statements a technical character; the body face supports uninterrupted reading. Headings use balanced wrapping and weight 500. Brand text uses weight 600. The frontmatter records base H1, homepage hero, H2, project H3, body, caption and action roles; [typogrpahy.md](typogrpahy.md) records responsive overrides and local title sizes.

Body is 1.125rem at line-height 1.65. Supporting paragraphs often use 1rem; captions use 0.875rem; diagram captions and experiment status use 0.8125rem. Intro text does not use the previously proposed fluid lead token. Reading measures vary deliberately: hero 56ch, project text 60ch and long prose 65ch.

**The Settled Reading Rule.** Body text and section headings stay stable; the authored intro is reserved for H1 text and the homepage hero section.

Fonts are self-hosted through Latin `@fontsource` CSS imports in `client/src/main.tsx`, using only the four selected family/weight combinations and `font-display: swap`. No guessed fallback metric adjustments are documented.

## Layout

Main surfaces have a maximum width of 1280px and 48px side margins above the tablet breakpoint. At widths up to 1079px, side margins become 32px; up to 719px, 20px. These are component-specific CSS grids, not a universal 12/6/4-column grid.

The desktop hero uses 8fr/4fr columns with a 64px gap; tablet uses 1.5fr/1fr with 32px gap; mobile stacks. Editorial heading, project and about pairs share 64px desktop gaps and 32px tablet gaps. Capabilities are open ruled rows; projects alternate diagram and story on desktop, then return diagram before story on mobile. Diagrams use labeled nodes and vertical connectors without requiring horizontal page scrolling.

Section padding is 96px desktop, 64px tablet and 48px mobile. Reused spacing steps are recorded in frontmatter; smaller layout-specific values remain local. Case studies narrow to 1100px, with prose at 65ch. Additional observed breakpoints are 370px (compact masthead/diagram adjustments) and 1600px (wider hero annotation minimum).

## Elevation & Depth

There are no box shadows in the system. Tonal surface changes, one-pixel rules and control borders provide separation. A low-opacity radial cobalt tint responds inside service and lab wrappers. It does not obscure text or supply essential information.

**The Flat Structure Rule.** Use spacing, tonal surfaces and thin rules to express grouping; do not add ornamental shadows.

## Shapes

Diagram panels, specialization panels and service cards use modest 8px corners. Controls, tags and diagram nodes use 4px corners. The lab retains open rows with square corners and a top rule rather than a boxed-card silhouette. Connector arrows are SVG icons with descriptive text beside them.

## Components

### Buttons and links

Primary actions use solid accent, on-accent text, 4px corners, 14px 22px padding and a 48px minimum height. Hover uses the accent-hover token. Secondary actions are underlined accent text with a 44px minimum height. Keep native anchors for destinations and buttons for state changes; do not nest interactive elements inside linked project containers.

Global focus is a 2px solid accent outline with 4px offset; primary actions use 5px offset. Theme and menu buttons are 44px squares. Project titles and explicit case-study actions remain distinct links.

### Tags and status

Technology tags are noninteractive list items: soft surface, secondary ink, 3px 9px padding and 4px corners. Experiment status is explicit text in accent at 0.8125rem with 0.07em tracking. It is not a numeric proficiency indicator.

### Containers and diagrams

Service SpotlightCard adaptations use white/theme surface, a decorative one-pixel border, 8px corners and 32px padding (24px mobile). Lab adaptations remain transparent, square open rows. Project visuals use soft surface and 8px corners; the featured architecture uses accent with on-accent labels. Meaningful diagram node borders use border-control. Interactive hero nodes show a selected accent border, accent-soft surface and selected indicator, with textual descriptions.

### Navigation and disclosure

The masthead pairs AYUSH404 with real name and professional role where space permits. Navigation is a horizontal list on desktop and a controlled menu on mobile. The menu exposes expanded state and supports Escape with focus returned to its toggle. FAQ uses native details/summary, 44px summary height, readable answer text and a plus icon rotated when open. The skip link becomes visible on keyboard focus. No input form is implemented; do not infer an input styling contract.

### Theme switch

The header button exposes `aria-pressed` for dark mode and a destination-specific title. It persists `ayush404-theme` in localStorage when available. The HTML head applies saved light/dark preference before paint, falling back to initial system preference when no valid saved choice exists. The browser theme-color tracks the canvas. This is an initial preference lookup, not a live system-preference subscription.

Theme changes crossfade the root with the View Transition API for 280ms ease-out when supported; otherwise color/background/border transitions use 240ms ease-out. The button is disabled while a View Transition finishes. Reduced motion bypasses View Transitions and disables CSS animations/transitions.

### Adapted React Bits motion

`BitsText`, `AnimatedSection`, `BitsControl` and `SpotlightCard` are documented adaptations of React Bits behaviors, with provenance and license beside the source. BitsText keeps native text intact and animates only H1: blur 3px to zero for 600ms, expo.out. AnimatedSection defaults to settled; homepage intro moves 12px to zero for 650ms, expo.out. Controls use mouse-only Magnet displacement capped at 3px for 200ms, expo.out; leave, blur and motion-preference changes reset it. Other section headings and body text stay stable.

Reduced-motion checks prevent displacement/blur; listeners clean up and ongoing intro motion stops when that preference becomes active. Static/prerendered content is visible before effects run. No CountUp is implemented because no verified numeric results were supplied. No letter/word stagger or scroll-triggered entrance is claimed.

## Do's and Don'ts

### Do:

- **Do** retain native headings, sections, links, buttons and disclosures.
- **Do** pair architecture graphics with readable labels and adjacent explanation.
- **Do** use visible focus and respect reduced motion in both themes.
- **Do** label experiments and use only supported project claims.

### Don't:

- **Don't** add an animated background to the hero.
- **Don't** make important text depend on animation or hover.
- **Don't** add skill scores, unverified metrics or CountUp without evidence.
- **Don't** describe the adapted React Bits behaviors as unmodified upstream components.
