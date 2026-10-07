# 03. Visual direction

- **Date:** 2026-10-07
- **Status:** Visual brief for review. Typography follows the test recommendation (Direction A,
  pending a decision record). The palette is **provisional** (DP-02). Nothing here is production CSS
  or the design system.
- **Builds on:** [research §12–§13](../research/01-visual-product-research.md#12-visual-opportunity),
  [01 typography test](01-bilingual-typography-test.md), [02 palette validation](02-palette-validation.md),
  [spec E](../spec/05-design-brief.md), [0005](../decisions/0005-design-direction.md).

## 1. Thesis

> **A public life, documented: a well-kept civic record with an editor's hand, set first in Hindi.**

In practice, the site should feel closer to a **serious Hindi literary or editorial publication**
and a **citeable digital archive** than to a political campaign website. Every visual choice below
is tested against that sentence. If something would look at home on a campaign poster, it is wrong.
If it would look at home in a well-made Hindi book, or in a museum's online catalogue, it is
probably right.

## 2. Brand character

**Documentary · composed · civic · mineral · literate**

| Adjective | Means | Does not mean |
|---|---|---|
| **Documentary** | Real photographs, captions, dates, sources; things shown as they are | Staged, filtered or dramatised imagery |
| **Composed** | Calm hierarchy, generous space, one thing at a time | Empty or sterile; corporate minimalism |
| **Civic** | About public service and place: wards, records, meetings | Personality cult; party identity |
| **Mineral** | Marble, granite and river tones; cool, quiet surfaces | Beige luxury; stone textures as decoration |
| **Literate** | Book-quality Hindi typography and careful writing in both languages | Ornate or "heritage" fonts; academic clutter |

## 3. Typography

**Recommended: Direction A** ([test](01-bilingual-typography-test.md#4-recommendation)), to be
formalised in a decision record (DP-01).

| Role | Hindi | English | Weight |
|---|---|---|---|
| Headings and display | Noto Serif Devanagari | Source Serif 4 | 600 |
| Body, lead, captions | Noto Serif Devanagari | Source Serif 4 | 400 (English italic 400) |
| Interface: navigation, buttons, labels, metadata, breadcrumbs, provenance labels | System Devanagari sans | System sans | Platform regular / semibold |

**Type scale** (starting values, fluid between 360 px and 1280 px; test-adjusted):

| Token | English | Hindi |
|---|---|---|
| Display (homepage name) | 36 → 64 px, lh 1.08 | same size, lh 1.3 |
| h1 | **32 → 56 px**, lh 1.12 | same size, lh 1.3 |
| h2 | 26 → 40 px, lh 1.18 | same, lh 1.35 |
| h3 | 21 → 28 px, lh 1.25 | same, lh 1.4 |
| Lead | 20 px / 1.5 | 21 px / 1.7 |
| Body | 18 px / 1.6 | 19 px / 1.75 |
| Caption | 15 px / 1.5 | 16 px / 1.7 |
| Label (system sans) | 14 px / 1.5 | 15 px / 1.6 |

**Rules:**
- **Measure:** about 40rem for English and 37rem for Hindi.
- Left-aligned text; never justified.
- **No uppercase or tracked kickers, and no drop caps, in either language** (for parity).
- No italics, faux styles or letter-spacing in Hindi. Hindi emphasis uses weight 600.
- Hindi titles of works go in quotation marks; English titles in italics.
- Tabular figures in timelines and tables.
- Inline phrases in the other language carry their own `lang` attribute.

## 4. Colour

**Status: provisional.** The direction is confirmed; values are not tokens
([02](02-palette-validation.md#5-status-and-next-steps)).

| Role | Candidate | Use | Status |
|---|---|---|---|
| Paper | `#F5F3EE` | Page background | Direction validated; value provisional |
| Stone | `#ECE8E0` | Item panels, image mats, facts blocks | Provisional |
| Ink | `#1F2627` | Text | Provisional. Test against a warmer neutral (`#242321`) |
| Ink-2 | `#4A5355` | Captions, metadata, all small Hindi text | Provisional (7.12:1) |
| Muted | `#5C6568` | English-only metadata ≥ 14 px | Provisional |
| Rule / rule-strong | `#D6D8D4` / `#7E878A` | Hairline dividers / control borders | Provisional |
| **Narmada** | `#1F5357` | **The only accent:** links, focus ring, active state | Hue not yet evidenced by imagery |
| Narmada-line | `#3E7F7A` | The river line (non-text) | Provisional |
| Band | `#F0E6DC` | Citation and press surfaces only (small areas) | Provisional. Test a lighter variant (`#F3EDE6`) |

**Usage rules:**
- Photographs carry the colour; the interface stays neutral.
- The accent appears only on interactive elements and the river line, never as a large fill.
- **No status colours.** Verification is shown with text labels (§10), never with green, amber or red.
- Historical prints sit on **stone** mats, never on the band.

**Avoid:**
- saffron and orange in any strength;
- tricolour combinations;
- party-associated colours;
- gradients;
- sepia or parchment backgrounds;
- pure black on pure white.

## 5. Layout

| Aspect | Direction |
|---|---|
| **Content width** | Page frame 80rem (1280 px) with gutters `clamp(16px, 4vw, 48px)`; media column 64rem; text column 40rem (English) / 37rem (Hindi) |
| **Grid** | 4 / 8 / 12 columns. **Asymmetric on desktop:** text on columns 1–6 or 2–7, image on 7–12, captions can hang in the margin. Single column on mobile. Components reflow by their own width (container queries) |
| **Spacing** | 4 px base, 8 px rhythm. Sections `clamp(64px, 3rem + 5vw, 128px)` apart; components 24–40 px; captions 8–12 px below images. Hindi gets about 1.2× English block spacing around headings |
| **Editorial rhythm** | Each section opens with a hairline rule and a sentence-case label, then content. Alternate text-led and image-led sections; never two image-heavy sections in a row |
| **Dividers** | 1 px hairlines between sections and list rows. No boxes around text, no shadows |
| **Cards** | Only for genuinely parallel items (collections, archive grids): flat, square corners, no shadow; image, type and date line, title. **Roles, press items and updates are ruled lists, not cards** |
| **Image treatment** | Square corners, no frames, filters or shadows. Archival items keep their original proportions on a stone mat inside a fixed-ratio slot. At most one full-bleed image per long page |
| **Desktop vs mobile** | Desktop: asymmetric, hanging captions, inline navigation from about 1024 px. Mobile: one column, captions directly below images, full-width tap rows, **menu below about 400 px** (Hindi navigation needs about 371 px; [test](01-bilingual-typography-test.md#21-layout-at-mobile-widths)), language switch always in the header |

## 6. Photography

| Aspect | Direction |
|---|---|
| **Portrait** | An environmental documentary portrait: natural light, a real civic or neighbourhood setting in Jabalpur, eye level, neutral expression. No garlands, podiums, party scarves, crowds or cut-outs. **Any approved portrait** can serve at launch. Commissioned photography is optional and depends on budget, family approval and availability ([photography brief](../research/02-research-to-spec-reconciliation.md#appendix-a--photography-brief-for-later-use)) |
| **Documentary** | People at work in context, sequences of two to four images from one occasion, everyday civic Jabalpur |
| **Archival** | Presented "as found": black-and-white stays black-and-white, prints keep their tone, borders and handwriting stay visible. No colourisation, AI upscaling or reconstruction; restoration beyond basic clean-up is disclosed |
| **Colour vs monochrome** | Contemporary photographs in natural colour. Never convert to monochrome for "gravitas" |
| **Captions** | One grammar in both languages: *what/who · where · when · credit*, below the image, serif, ink-2. Name only public figures; describe others by role. Use "लगभग" / "c." for uncertain dates. Omit the credit line when the credit is unknown |
| **Credits** | "फ़ोटो: ‹name› / ‹collection›" · "Photo: ‹name› / ‹collection›" (prefix wording per glossary). Shown on every image where known |
| **Cropping** | Contemporary photographs may be cropped to the standard ratios with the focal point kept. **Archival items are never cropped; they are matted** |
| **Aspect ratios** | 4:5 (portraits), 3:2 (documentary landscape), 16:9 (video only). Square avoided except optional thumbnails |
| **Galleries** | Contact-sheet grid on browse pages; sequences with one caption voice on collection pages; native `<dialog>` lightbox, keyboard-operable |

## 7. Jabalpur identity

Jabalpur is present through **content-bearing channels only**:

1. **Devanagari place names** set with care in descriptor lines, captions, role rows and timeline
   entries ("‹वार्ड›, जबलपुर"). Place is part of every record, not decoration.
2. **Real local photography** of everyday civic Jabalpur:
   - ghat steps in early light, rather than the evening aarti spectacle;
   - marble against water in close view, rather than the Dhuandhar postcard;
   - brick-and-lime civic façades shot straight-on;
   - ward streets with real signage (with consent).
3. **The mineral palette:** marble paper, granite ink, the river accent. Each value has a local
   referent ([02](02-palette-validation.md)).
4. **The place lens in the archive** ([0022](../decisions/0022-archive-browsing-model.md)): visitors
   can browse the record by ward and locality.
5. **One river line** (§8).

**Never:**
- temples, lingas, diyas or lotus motifs;
- waterfall heroes;
- marble textures;
- Gond, Warli, mandala or rangoli patterns used as decoration;
- freedom-fighter portraits used as branding;
- "ethnic" Latin display fonts;
- symbol-stacked logos (the Smart City logo entries are the anti-reference, research §7).

## 8. The river line

**Role:** a single, quiet signature that carries meaning, not decoration.

- **Where:** the **spine of the Timeline**. Optionally, once more, as a short horizontal rule above
  the footer. **Nowhere else.** Not in the header, the homepage opening, buttons, cards or
  backgrounds.
- **What:** a 1–1.5 px narmada-line stroke, nearly straight, with a gentle bend only at period
  boundaries. On mobile it is the vertical left edge of the timeline.
- **Never:** animated, drawn on scroll, a wave icon, a gradient, part of the wordmark or logo, a
  watermark, or a background texture.
- **Why:** the river as the passage of time connects Jabalpur's defining landscape to the record's
  chronology without any pictorial cliché ([0005](../decisions/0005-design-direction.md)).

## 9. Motion

Motion exists only to orient. Everything works without it.

| Element | Behaviour | With `prefers-reduced-motion` |
|---|---|---|
| Focus ring | Instant: 2 px narmada with a 2 px paper offset | Same |
| Links | Colour and underline transition about 120 ms | Instant |
| Images | Optional 150 ms fade on load; space reserved, so no layout shift | No fade |
| Disclosures (source details, transcripts) | Native open and close | Same |
| Lightbox | 150 ms fade | Instant |
| Archive lens change | Full page load; optional cross-fade ≤ 200 ms where enhanced | Instant |
| Header, river line, timeline, homepage opening, counters | **Static.** No sticky-shrink, parallax, scroll-drawn lines, auto-advance or count-up | — |
| Video | Never autoplays; click-to-load facade | — |
| Page transitions | None at launch | — |

## 10. Verification and provenance (visual language)

Validated in [02 §4](02-palette-validation.md#4-conclusions-by-criterion) and
[05](05-archive-item-concept.md):

- **Level 1 (always visible):** one line in the interface sans, ink-2, made up of the status word
  in semibold, the source type, and a "What this means" link. Examples: "परिवार द्वारा उपलब्ध ·
  इसका क्या अर्थ है"; "Verified · Source: ‹source type›".
- **Level 2 (on demand):** source details in a native disclosure.
- **Long pages:** a "Sources and notes" section at the end. Small linked note markers appear only on
  specific factual claims (spec C §3).
- **No colours, badges, shields or check-mark icons in brand colours.** An optional neutral glyph in
  ink-2 is the most it gets. Final glyphs and wording are DP-03.

## 11. Summary: what makes it unmistakable

| It looks like… | …not like |
|---|---|
| A museum's catalogue of one civic life | A party banner with a biography attached |
| A Hindi literary journal | A Hindi news portal |
| A documentary photobook of a city | An event gallery of crowds and garlands |
| An archive you can cite | A brochure you scroll past |
| Equally at home in Hindi and English | English with Hindi poured in |
