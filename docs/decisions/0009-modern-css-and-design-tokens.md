# 0009 — Styling: modern CSS, design tokens and Astro scoped styles

- **Status:** Accepted
- **Date:** 2026-10-07
- **Deciders:** Product/technical decision partner (relayed by the project owner)
- **Related:** [Spec F §3](../spec/06-technical-architecture.md), [Spec E](../spec/05-design-brief.md); T-02

## Context

The design is bespoke, editorial and typography-led, with language-specific rules for Devanagari
and Latin text. The styling approach must express this precisely, stay lightweight and remain
maintainable for years.

## Decision

1. Styling uses **modern CSS** with:
   - CSS custom properties as **design tokens** (colour, type, space, radius, etc.);
   - **Astro component-scoped styles**;
   - **cascade layers** where appropriate;
   - **container queries** where useful;
   - **logical properties**;
   - **responsive typography**;
   - **language-specific typography rules** (e.g. `:lang(hi)`).
2. **No Tailwind**, unless this decision is explicitly revisited in a new record.
3. **No generic UI framework or component library.**

## Rationale

- Tokens map directly from the design system and make future theming (e.g. dark mode) possible.
- Per-language typography is natural in CSS and awkward in utility classes.
- No extra dependency or build step; modern CSS is stable long term.
- A bespoke editorial design gains nothing from a generic UI kit and would risk a generic look.

## Alternatives considered

- **Tailwind CSS v4:** fast iteration and widely known; less natural for bespoke editorial and
  per-language typography; adds a dependency. Not chosen.
- **CSS-in-JS / component libraries:** unnecessary runtime weight and a generic aesthetic. Rejected.

## Consequences

- A token file and a small set of global layers (reset, tokens, base typography, utilities) are
  needed at the start of implementation.
- Contributors must follow the token system rather than hard-coding values.
