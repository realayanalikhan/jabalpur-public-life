# 07. Design implementation brief

- **Date:** 2026-10-07
- **For:** engineers and designers building the design system and the site.
- **Status:** The bridge between research/design and engineering. It summarises **approved**
  decisions and lists what is still open. **It is not permission to start production
  implementation.** That follows the glossary and technical-scaffold planning.
- **Source of truth:** decision records in [`docs/decisions/`](../decisions/README.md) win over this
  brief. Details are in [`docs/spec/`](../spec/README.md) and the design docs listed below.

## Design thesis

> **A public life, documented: a well-kept civic record with an editor's hand, set first in Hindi.**

The site should feel closer to a **serious Hindi literary/editorial publication** and a **citeable
digital archive** than to a political campaign website. Test every decision against this.

## Visual character

**Documentary · composed · civic · mineral · literate** ([03 §2](03-visual-direction.md#2-brand-character)).

## Typography (approved: [0024](../decisions/0024-typography-system.md))

- **Content:** Noto Serif Devanagari (Hindi) + Source Serif 4 (English).
- **Interface:** system sans (navigation, buttons, labels, metadata, provenance labels).
- **Weights:** Noto Serif Devanagari 400/600; Source Serif 4 400, 400 italic, 600. Nothing else.
- **Two self-hosted content families, no third web font.** WOFF2 static instances, subset by
  Unicode range with all OpenType features kept, `font-display: swap`, preload only the page
  script's body file. About 123 KB of fonts on a Hindi page.
- **Sizes:** Hindi body 19/1.75; English body 18/1.6; mobile h1 starts at about 32 px. Scale in
  [03 §3](03-visual-direction.md#3-typography).
- **Hindi rules:** no uppercase/tracked kickers or drop caps in either language. No italics,
  letter-spacing or synthetic styles in Hindi. `lang` on every inline phrase. Latin family first in
  the stack, so digits use Source Serif 4.
- **QA:** check on a physical mid-range Android device before launch.

## Colour (approved direction, provisional values: [0025](../decisions/0025-local-material-visual-palette.md))

- **Roles:** marble off-white paper, stone surfaces, granite ink, grey-marble secondary inks,
  **one** Narmada blue-green accent (links, focus, river line only), one restrained warm tone (small
  citation surfaces only).
- **Candidate values** (`#F5F3EE`, `#1F2627`, `#1F5357`…) are **provisional, not final tokens**.
  Define them in one place so they can be replaced after validation (DP-08).
- **Never:** status colours, party colours, saffron, gradients, sepia backgrounds.

## Layout

Editorial, spacious, photography-led ([03 §5](03-visual-direction.md#5-layout)).

- **Widths:** frame 80rem; media 64rem; text 40rem (English) / 37rem (Hindi).
- **Grid:** 4/8/12, asymmetric on desktop, one column on mobile.
- **Rhythm and dividers:** hairline + sentence-case label opening each section; ruled lists (not
  cards) for roles, press and updates; flat cards only for parallel items; no shadows, no rounded
  corners, no boxes around text.

## Photography

Documentary, authentic, captioned, credited ([03 §6](03-visual-direction.md#6-photography)).

- **Captions:** what · where · when · credit, below the image.
- **Archival items:** shown "as found", matted on stone, never cropped, never colourised or
  AI-enhanced.
- **Ratios:** 4:5 for portraits, 3:2 for documentary, 16:9 for video.
- **Imagery:** no stock, no AI imagery. Any approved portrait works at launch; commissioned
  photography is optional.

## Jabalpur identity

Content-led and material-led, not decorative ([03 §7](03-visual-direction.md#7-jabalpur-identity)):
- Devanagari place names in every record;
- real local photography;
- the mineral palette;
- browsing by place;
- **one river line**, used primarily as the Timeline spine, with at most one restrained rule above
  the footer.

The river line is:
- never animated;
- never a logo;
- never decorative elsewhere;
- never competing with photography or type.

The site must work perfectly without it.

## Verification (approved: [0026](../decisions/0026-verification-and-source-presentation.md))

Quiet and visible:
- **Level 1:** a one-line text label (status · source type · "What this means").
- **Level 2:** details in a native disclosure.
- **Long pages:** short source markers on specific claims, and a "Sources and notes" section.

No badges, no traffic-light colours, no footnote clutter. The [0018](../decisions/0018-content-integrity-rules.md)
build-failing rules are unchanged.

## Archive

Authored and editorial, not database-like ([0022](../decisions/0022-archive-browsing-model.md),
[0027](../decisions/0027-archive-item-page-principles.md)).

- **Hub:** curated material first, then four lenses (type · time · theme · place), each with a
  one-line definition. No counts, no facet panel, no search at MVP.
- **Item page order:** media → caption → title → date/type/place → source → optional narrative →
  details → occasion → rights/credit → use and cite → related ("From the same occasion" first) →
  correction pathway.
- **Public reference:** shown only in details, citation and correction pathway. Opaque,
  non-sequential, never on cards ([0023](../decisions/0023-public-reference-identifiers.md)).
- **Occasions** ([0020](../decisions/0020-occasion-connective-archive-entity.md)) connect material
  but have **no standalone page yet** (DP-07).

## Motion

Restrained and static by default ([03 §9](03-visual-direction.md#9-motion)):
- short fades (≤ 200 ms) only;
- no parallax, carousels, scroll animation, sticky-shrink headers, count-ups or autoplay;
- everything is instant under `prefers-reduced-motion`.

## Bilingual

Hindi-first, with equal-quality English ([0002](../decisions/0002-bilingual-strategy.md),
[0021](../decisions/0021-language-switching-and-single-language-content.md)):
- `/hi/` default; `/en/` equivalent routes; `x-default` → `/hi/` equivalent;
- the header shows only the other language ("English" / "हिंदी");
- no remembered preference at MVP;
- single-language items get a `noindex` notice page;
- Western numerals;
- interface strings come only from the glossary ([spec 09](../spec/09-language-glossary.md)).

## Mobile

Mobile-first, especially Hindi navigation and long-form reading:
- Hindi navigation needs about 371 px, so **use the menu below about 400 px**;
- the language switch always stays in the header;
- 44 px targets;
- 41–44 Hindi characters per line at 360 px;
- long headings wrap rather than shrink;
- captions sit directly below images.

## Homepage

Principle (not a component checklist):

**identity → context → public record → archive → timeline/places → current activity → connect.**

- Content availability decides which sections appear: no empty modules, placeholder cards, fake
  activity or invented archive content.
- No hero slogan or carousel.
- The site statement and the places section are **proposed only**
  ([08](08-homepage-additions-analysis.md)).

## Anti-patterns (do not build)

- generic political templates or campaign aesthetics;
- carousels, sliders or slogan heroes;
- party-colour UI, saffron or tricolour styling;
- clutter: social feeds, icon walls, pop-ups, counters, "join/donate/vote" calls to action;
- fake or placeholder content in production;
- decorative regional motifs (Gond/Warli/mandala patterns, temple or waterfall clip-art, marble
  textures);
- text over photographs, cut-out portraits, filtered "vintage" effects;
- English strings on Hindi pages; flags or EN/HI codes for language;
- database-style archive interfaces (facet panels, visible counts, reference IDs on cards).

## Genuinely unresolved design questions

| ID | Question | Depends on |
|---|---|---|
| DP-04 | Glossary: Recommended entries in [glossary v2](../spec/09-language-glossary.md) await approval; Hindi wording then confirmed by the reviewer | Decision partner; reviewer (OD-16) |
| OD-20 | Romanisation convention | Glossary work |
| DP-05 | Final homepage and page wireframes (current ones are conceptual) | DP-04; HP-01/HP-02 |
| HP-01 | Homepage site statement: approve as optional module? | Decision partner |
| HP-02 | Homepage "places in the record": approve as conditional module? | Archive inventory (FI-03) |
| DP-07 | Standalone Occasion pages: only where enough material makes them editorially useful | Archive inventory (FI-03) |
| DP-08 | Exact palette values (Narmada hue, ink and band variants) | Authentic imagery (FI-03, OD-17) |
| DP-06 | River-line execution details (weight, bends) | Design system |
| OD-24 / OD-25 | Corrections response times; performance targets | FI-02/FI-08; technical phase |

Family-input decisions (spec H §4) are not design questions and are not decided here.

## Before implementation starts

1. Glossary and content conventions (DP-04, OD-20).
2. Homepage product decision (HP-01, HP-02).
3. Final design-system definition (tokens with provisional colours, components).
4. Content-schema implementation plan (including Occasion and `reference`).
5. Technical scaffold plan (Astro, content collections, publish gates, CI, preview).
