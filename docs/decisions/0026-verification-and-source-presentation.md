# 0026 — Verification and source presentation

- **Status:** Accepted
- **Date:** 2026-10-07
- **Deciders:** Product/technical decision partner (relayed by the project owner)
- **Related:** [Spec C §3](../spec/03-content-architecture.md#3-verification-model), [Spec E §10](../spec/05-design-brief.md); clarifies the presentation set by [0004](0004-content-and-verification-model.md) (OD-02); [0018](0018-content-integrity-rules.md) unchanged; [0023](0023-public-reference-identifiers.md); [Design 02 §4](../design/02-palette-validation.md#4-conclusions-by-criterion), [Design 03 §10](../design/03-visual-direction.md#10-verification-and-provenance-visual-language), [Design 05](../design/05-archive-item-concept.md); closes DP-03 (presentation)

## Context

[0004](0004-content-and-verification-model.md) chose "labels + optional source details" and ruled
out academic footnote clutter. Spec C §3 (v1.2) added "Sources and notes". The design tests showed
how the presentation should look: calm, text-led, no colour-coding. This record fixes the public
presentation so that the design system and implementation apply it consistently.

## Decision

1. **Short factual source markers.** Where an individual factual claim (a date, position or figure)
   needs traceability, it carries a small, discreet linked marker to its entry in the page's
   "Sources and notes". Markers are used only where useful, not on every sentence.
2. **Sources and notes.** Longer pages (biography, initiative pages, collection introductions, role
   pages where useful) end with a **"Sources and notes"** section ("स्रोत और टिप्पणियाँ"; wording
   per glossary) listing the sources behind the page.
3. **Item-level label (Level 1).** Archive items, role rows and similar records show **one short
   line**:
   - the status word (e.g. Verified / Provided by the family / Reported in ‹outlet›);
   - the source type where relevant;
   - a "What this means" link to How We Verify.

   It is set in the interface sans in a secondary ink, with at most a small neutral glyph.
4. **Optional details (Level 2).** Fuller source and provenance information (source type, publisher
   or outlet, date, link or archive link, "supplied by" wording) is available **on demand** in a
   native disclosure, or in the item's details panel. It is never forced into running text.
5. **Tone.** Quiet, documentary, factual. The source information is visible but never dominates the
   content.
6. **Do not use:**
   - academic footnote clutter;
   - large badges, seals, shields or ribbons;
   - **traffic-light colours** (green, amber, red) or any colour-coding of statuses;
   - "verified" graphics or icons that dominate the content;
   - decorative trust signals (trust scores, stamps, "100% verified" claims).
7. **Accessibility.** Status is always conveyed in text, never by colour or icon alone. Disclosures
   are keyboard-operable.
8. **Explanation.** The How We Verify page shows each label exactly as it appears on the site and
   explains Level 1 and Level 2.
9. **Wording.** Final label wording in both languages is set through the glossary
   ([spec 09](../spec/09-language-glossary.md), DP-04) and the Hindi/English reviewer (OD-16).
   Research §16 holds draft candidates.
10. **Integrity unchanged.** The rules of [0018](0018-content-integrity-rules.md) stand:
    - `unverified` is never published;
    - `verified` requires a source;
    - internal sources are never rendered.

## Rationale

- Restrained, visible provenance is the clearest differentiator found in the research. No Indian
  reference shows per-item verification (research §5, §16).
- The palette test showed that text labels with a neutral glyph read clearly and calmly without
  colour ([design 02](../design/02-palette-validation.md)).
- Colour-coded "fact-check" styling would make the site read as a rating service and would convey
  meaning by colour (spec E §8).

## Alternatives considered

- **Academic footnotes everywhere:** cluttered. Rejected (as in 0004).
- **Colour-coded badges:** read as fact-check ratings; not accessible on colour alone. Rejected.
- **Provenance only on the How We Verify page:** loses the per-item trust signal. Rejected.

## Consequences

- Spec C §3 and spec E §10 reference this record. DP-03 (presentation) is closed. Label wording
  remains part of DP-04 (glossary), pending OD-16.
- 0004 stays accepted; its status notes "clarified by 0026".
- The design system needs three components: source marker, "Sources and notes" section, and
  Level-1 label with Level-2 disclosure.
