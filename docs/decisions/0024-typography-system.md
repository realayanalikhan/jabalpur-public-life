# 0024 — Typography system

- **Status:** Accepted
- **Date:** 2026-10-07
- **Deciders:** Product/technical decision partner (relayed by the project owner)
- **Related:** [Spec E §2](../spec/05-design-brief.md#2-typography-direction), [Spec D §8](../spec/04-bilingual-architecture.md#8-typography-devanagari-requirements); [0002](0002-bilingual-strategy.md), [0009](0009-modern-css-and-design-tokens.md); [Design test 01](../design/01-bilingual-typography-test.md); [Research §8.6, §13.3](../research/01-visual-product-research.md#133-typography); closes DP-01

## Context

The site is Hindi-first, with equal-quality English. Typography carries most of the design
(spec E §2). Two directions were compared in a rendered bilingual test
([design 01](../design/01-bilingual-typography-test.md)) using neutral test content:

- **A:** Noto Serif Devanagari + Source Serif 4 + system sans UI.
- **B:** Tiro Devanagari Hindi + Literata + system sans UI.

**Basis of this decision.** The test was rendered in Chrome at simulated 360 px and 412 px mobile
widths (a 360 px viewport is common on mid-range Android). It was **not** run on a physical Android
device. Final implementation QA must include one.

## Decision

1. **Families and roles:**

   | Role | Hindi | English |
   |---|---|---|
   | Content: headings, body, lead, captions | **Noto Serif Devanagari** | **Source Serif 4** |
   | Interface: navigation, buttons, labels, filters, breadcrumbs, metadata lines, provenance labels | **System Devanagari sans** (platform font) | **System sans** (platform font) |

2. **Weights at launch:**
   - Noto Serif Devanagari **400** and **600**.
   - Source Serif 4 **400**, **400 italic** and **600**.
   - No other weights without a new decision. Hindi emphasis uses 600, never italic or synthetic
     styles (`font-synthesis: none`).
3. **Two-content-family limit** (spec E §2): exactly **two self-hosted web-font families**, one
   Devanagari and one Latin, both for content. The system sans for interface text is not a web font
   and does not count. **No third web font**, including for display or interface text.
4. **Delivery:**
   - Self-hosted WOFF2, static instances.
   - Subset **by Unicode range** (Devanagari / Latin), keeping all OpenType layout features.
     Never subset to the characters in use, because conjuncts depend on character sequences.
   - Latin family first in the stack, so Western digits and inline English use Source Serif 4.
   - Approximate payload: **≈ 123 KB** on a Hindi page; **≈ 60 KB** on an English page, or
     **≈ 110 KB** when Hindi names appear.
5. **Fallback philosophy:**
   - Text must be readable immediately and shift as little as possible when web fonts arrive.
   - `font-display: swap`.
   - Preload only the body file for the page's script.
   - Metric-matched fallback faces (`size-adjust` / `ascent-override` where supported) over the
     platform fonts:
     - Hindi: Noto Sans Devanagari (Android), Kohinoor Devanagari (iOS), Nirmala UI (Windows);
     - Latin: Georgia, then the generic serif.
6. **Mobile findings that bind the design system:**
   - Hindi primary navigation needs about **371 px**. Below about **400 px**, navigation lives in
     the menu.
   - Long h1s run to 5 lines at 36 px on a 360 px viewport, so the **mobile h1 starts at about
     32 px**.
   - Hindi body 19 px / 1.75 and English body 18 px / 1.6 are confirmed.
   - No uppercase or tracked kickers and no drop caps, in either language.
7. **QA requirement:** before launch, typography is checked on at least **one physical mid-range
   Android device**, in addition to desktop and iOS. The checks are: no clipped vowel marks,
   acceptable weight and colour, correct conjuncts, and the menu breakpoint.

## Rationale

Evidence from the rendered test ([design 01 §3–§4](../design/01-bilingual-typography-test.md#3-findings)):

- **Stronger Hindi hierarchy.** A has a real bold. B's single weight left Hindi h3s barely
  distinct from body text.
- **Legibility of frequent archive terms.** B's traditional ख reads as "रव" (अभिलेख looks like
  "अभिलेव"). A renders it clearly.
- **Better danda spacing.** A sets the danda tight. B adds a visible gap.
- **Better Hindi/English balance.** In A, Latin inside Hindi sits in proportion (headline-to-x-height
  1.37). In B, Literata looks oversized (1.19).
- **Shorter mobile layouts.** At 360 px, A's Hindi archive cards are about 20% shorter
  (121 vs 146 px) and its Hindi paragraphs about 12% shorter.
- **A complete, useful weight range** (100–900 available) for future needs.
- **Acceptable payload:** ≈ 123 KB on a Hindi page, within the research's 110–160 KB budget.

## Alternatives considered

- **B: Tiro Devanagari Hindi + Literata.** Rejected. It has the more literary character and is
  about 40 KB lighter on Hindi pages, but it lacks a bold weight, has the ख/"रव" ambiguity and the
  danda gap, and its Latin is oversized beside the Devanagari.
- **Tiro for display only, alongside A.** Rejected: it would add a third web font.
- **Variable fonts.** Not chosen at launch. Source Serif 4 variable (≈ 119 KB) keeps optical sizes
  but costs about twice the static weights. Revisit only if display headings need it.
- **System fonts for Hindi body (zero bytes).** Rejected as the default, because texture varies by
  platform. Remains the emergency fallback if device testing shows performance failures.
- **Sans-only systems** (Noto Sans, Mukta, Hind, IBM Plex). Rejected: they read as news portals or
  corporate, not "book/archive" (research §8.6).

## Consequences

- Spec E §2 and spec D §8 now reference this record. DP-01 is closed.
- The design system builds its type tokens from §6 and the scale in
  [design 03 §3](../design/03-visual-direction.md#3-typography).
- Adding a weight or family requires a new decision record.
- Implementation QA must include the physical-device check in point 7.
