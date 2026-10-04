# AYUSH404 — Typography

Status: implemented typography for **Engineering Fieldnotes**, extracted from `client/src/index.css`, `client/src/main.tsx` and the semantic React wrappers. Related: [Design system](DESIGN.md) · [Design philosophy](DesignPhilophsy.md).

## Font families and delivery

Space Grotesk supplies headings (500) and the wordmark (600). Its fallback is Trebuchet MS, sans-serif. Source Sans 3 supplies body/UI (400 and 600), with Segoe UI, sans-serif fallback. Literal code may use ui-monospace, SFMono-Regular, Consolas, monospace; this is not an ordinary-label style.

Latin static fonts are self-hosted through `@fontsource/space-grotesk/latin-500.css`, `latin-600.css`, and `@fontsource/source-sans-3/latin-400.css`, `latin-600.css` imports in `client/src/main.tsx`. The package styles use `font-display: swap`; no third-party font stylesheet or invented metric correction is required. Preserve package licenses and readable fallback wrapping.

## Actual type hierarchy

CSS rem sizes respect browser settings; pixel equivalents are not fixed measurements.

| Role | CSS size | Weight | Line height | Tracking |
|---|---|---|---|---|
| Base H1 / desktop case-study H1 | clamp(2.75rem, 1.1rem + 5vw, 6rem) | 500 | 1.05 | -0.04em |
| Homepage H1, desktop | clamp(2.75rem, 5.5vw, 5rem) | 500 | 1.05 | -0.04em |
| Homepage H1, ≤1079px | clamp(2.75rem, 6vw, 4.5rem) | 500 | 1.05 | -0.04em |
| Homepage H1, ≤719px | clamp(2.75rem, 8.6vw, 3.5rem) | 500 | 1.05 | -0.04em |
| Case-study H1, ≤719px | clamp(2.75rem, 9vw, 4rem) | 500 | 1.05 | -0.04em |
| Section H2 | clamp(2rem, 1.3rem + 2.2vw, 3.5rem) | 500 | 1.12 | -0.035em |
| Contact H2, desktop | clamp(2.75rem, 1.7rem + 3.5vw, 5rem) | 500 | 1.12 | -0.035em |
| Contact H2, ≤719px | clamp(2.75rem, 8vw, 3.5rem) | 500 | 1.12 | -0.035em |
| Project H3 | clamp(1.625rem, 1.3rem + 1vw, 2.25rem) | 500 | 1.2 | -0.025em |
| Capability / lab H3 | 1.5rem | 500 | 1.2 | -0.025em |
| Service H3 | 1.75rem | 500 | 1.2 | -0.025em |
| H4 | 1.375rem | 500 | 1.25 | -0.015em |
| Body | 1.125rem | 400 | 1.65 | normal |
| Hero description | 1.125rem; 1rem at ≤1079px | 400 | 1.65 | normal |
| About opening | 1.375rem; 1.25rem at ≤719px | 400 | 1.5 | normal |
| Supporting paragraphs | 1rem | 400 | inherited 1.65 | normal |
| Primary button / action link | 1rem | 600 | inherited 1.65 | normal |
| Navigation | 1rem | 400 | inherited 1.65 | normal |
| Tags | 0.875rem | 400 | 1.5 | normal |
| Diagram caption | 0.8125rem | 400 | inherited 1.65 | normal |
| Experiment status | 0.8125rem | 400 | 1.4 | 0.07em |

Local technical titles use 1.125rem, 1.375rem, 1.75rem or 2rem where appropriate; they do not redefine the global heading scale. No eyebrow type role is part of the implemented system. The prior proposed card/lead tokens and weight-600 card heading are not implemented.

## Composition and accessibility

Use one H1 and logical H2/H3/H4 nesting chosen by document structure. Headings use balanced wrapping. Hero prose is capped at 56ch, project text at 60ch and long prose at 65ch. Mobile columns determine their own readable measure. Do not justify paragraphs or put long passages in uppercase. Use clear standalone action labels, underline reading links where applicable, and permit long email/identifier wrapping.

Secondary text uses the semantic ink-secondary color, not reduced opacity. Both themes share the hierarchy. Retain readable content at narrow widths, text enlargement, font failure and 200% zoom; do not claim measured test results in this document.

## Text and motion

BitsText is an adaptation of React Bits BlurText behavior, preserving native headings/paragraphs and intact selectable sentences. Only H1 receives a 600ms expo.out blur from 3px to zero. Body text and H2/H3/H4 remain stable. There is no word stagger, letter splitting or animated body reading state.

AnimatedSection defaults to settled. The homepage hero uses the intro adaptation (12px movement, 650ms expo.out). Important prerendered text is visible before JavaScript runs. Reduced motion prevents blur/displacement and active listeners stop ongoing intro effects when the preference changes. Refer to DESIGN.md for theme crossfade, controls and focus rules.

## Verification guardrails

Preserve a logical outline and intact screen-reader sentences. Check new content at narrow and intermediate widths, enlarged text and slow font loading. Keep labels and actions visible without hover or animation. Give measurements units and source context only when verified; no CountUp or proficiency scores are currently used.
