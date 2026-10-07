# 0005 — Design direction

- **Status:** Accepted
- **Date:** 2026-10-07
- **Deciders:** Product/technical decision partner (relayed by the project owner)
- **Related:** [Spec E](../spec/05-design-brief.md); OD-11, OD-12

## Context

The site must not resemble a typical Indian politician's website. It should feel like a premium
public-figure archive or editorial publication, work well on mid-range phones, and express a
genuine connection to Jabalpur without gimmicks.

## Decision

1. **Character:** premium, dignified, editorial, modern, Indian and strongly connected to
   Jabalpur. Photography-led, typography-focused, spacious, mobile-first, fast and accessible.
2. **Avoid:** outdated politician-website aesthetics, clutter, excessive gradients, flashing
   banners, giant slogans, generic stock photography, excessive party colours, unnecessary
   animation and election-template layouts.
3. **Colour:** a restrained, mostly neutral palette with a Narmada-derived accent and at most one
   warm secondary. Party colours are not used in the interface.
4. **Motif (OD-12):** restrained palette plus an **extremely subtle river-line motif** (e.g. as
   the Timeline spine). No literal marble texture as a major design element. No decorative
   regional motifs used purely for decoration.
5. **Jabalpur connection:** comes primarily from authentic local photography and real content.
6. **Theme (OD-11):** **light mode only at launch.** Dark mode may be reconsidered later; colours
   are defined as design tokens so it can be added without restructuring.
7. **Photography:** real and documentary; no AI-generated imagery; archival images presented
   honestly; captions and credits shown.
8. **Accessibility:** WCAG 2.2 AA; motion only to aid orientation; `prefers-reduced-motion`
   respected; works without JavaScript.

## Rationale

- An editorial, archival look signals credibility and longevity, matching the documentary
  posture ([0001](0001-product-purpose-and-posture.md)).
- Real local photography is a more authentic Jabalpur signal than graphic motifs.
- Light-only at launch halves design and testing effort for a photography-led site; tokens keep
  dark mode possible later.

## Alternatives considered

- **Marble-texture motif:** too literal and decorative as a major element. Rejected.
- **Palette only, no motif:** acceptable, but a very subtle river line adds meaning to the Timeline.
- **Dark mode at launch:** doubles visual QA for archival photography with little benefit at
  launch. Deferred.
- **Party-coloured theme:** conflicts with the neutral posture. Rejected.

## Consequences

- The design phase delivers the token system, type pairing and component specifications.
- Commissioned local photography is strongly recommended; budget remains open (OD-17).
- Styling implementation follows [0009](0009-modern-css-and-design-tokens.md).
