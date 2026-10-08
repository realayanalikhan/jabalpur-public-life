# 04. Design foundation: implementation notes

- **Date:** 2026-10-08
- **Scope:** scaffold plan §18 sequence step 5: design tokens, global CSS, the typography foundation
  with self-hosted fonts, accessibility and focus foundation, responsive foundation and the river-line
  primitive. **No pages, page layouts, navigation, archive cards, timeline, portrait treatment or real
  content.**
- **Follows:** decisions [0005](../decisions/0005-design-direction.md),
  [0009](../decisions/0009-modern-css-and-design-tokens.md),
  [0024](../decisions/0024-typography-system.md) and
  [0025](../decisions/0025-local-material-visual-palette.md); [design 03](../design/03-visual-direction.md)
  §3–§9; [design 07](../design/07-implementation-brief.md); scaffold plan §3 and §12. No decision was
  changed and no open decision was closed (see the last section).

## 1. Files

| Area | Files |
|---|---|
| Fonts | `public/fonts/*.woff2` (8 files) and `public/fonts/OFL-*.txt` (2 licences) |
| Global CSS | `src/styles/global.css` (entry and layer order), `fonts.css`, `reset.css`, `tokens.css`, `base.css`, `typography.css`, `layout.css`, `utilities.css` |
| Components | `src/components/timeline/RiverLine.astro` (new); `src/components/site/LanguageSwitch.astro` (interface text and 44 px target) |
| Layouts and pages | `src/layouts/BaseLayout.astro` (global CSS, body-font preload, skip link, page frame); `src/pages/404.astro` (global CSS); `src/pages/[lang]/dev/design-foundation.astro` (local-only specimen) |
| Routing | `src/lib/routes.ts`: route kind `dev` for local-only development pages |
| Tests | `tests/unit/design-tokens.test.ts` |
| Artefacts | `docs/design/screenshots/design-foundation/` |

Cascade layers, lowest to highest: `reset, tokens, base, layout, components, utilities` (plan §12).
Component styles are written inside `@layer components`.

## 2. Typography (0024)

### 2.1 Families and stacks

| Token | Stack | Use |
|---|---|---|
| `--font-content` | Source Serif 4 → Noto Serif Devanagari → metric-matched fallbacks (Georgia; Nirmala UI; Noto Sans Devanagari) → Kohinoor Devanagari → Georgia → Nirmala UI → Noto Sans Devanagari → `serif` | Headings, body, lead, captions, both languages |
| `--font-ui` | `system-ui`, -apple-system, Segoe UI, Roboto, Noto Sans, Nirmala UI, Noto Sans Devanagari, Kohinoor Devanagari, `sans-serif` | Navigation, buttons, labels, metadata, provenance labels |

- The Latin family comes first, so digits, spaces and inline English use Source Serif 4; the
  Devanagari subset contains no Latin characters, so each script always comes from its own font.
- Weights: **400 and 600** only; Source Serif 4 also **400 italic**. `font-synthesis: none` on the
  root, so no browser-made bold or italic. `strong`/`b` and headings use 600.
- Hindi: `em`, `i`, `cite`, `dfn`, `var`, `address` are upright; `em` and `i` use 600. No
  letter-spacing, word-spacing or case transforms on Devanagari. No uppercase or tracked text in
  either language (enforced by the test).
- English: real italics for emphasis and `cite` (titles of works). Hindi titles go in quotation
  marks, written in the text.
- Danda and double danda come from Noto Serif Devanagari (in its Unicode range), which sets them
  tight (design 01). Nothing adds spacing around punctuation.
- Language rules use `:lang()` on the element itself, so an inline phrase in the other language
  (`<span lang="en">` inside Hindi) keeps the surrounding size and line height.

### 2.2 Scale

Headings are fluid between 360 px and 1280 px viewports (`clamp()`, rem-based, so they also scale
with browser text size). Values from design 03 §3.

| Role | English | Hindi | Token |
|---|---|---|---|
| Display | 36 → 64 px, lh 1.08 | same size, lh 1.3 | `--size-display` |
| h1 | 32 → 56 px, lh 1.12 | same size, lh 1.3 | `--size-h1` |
| h2 | 26 → 40 px, lh 1.18 | same size, lh 1.35 | `--size-h2` |
| h3 | 21 → 28 px, lh 1.25 | same size, lh 1.4 | `--size-h3` |
| Lead | 20 px / 1.5 | 21 px / 1.7 | `--size-lead` |
| Body | 18 px / 1.6 | 19 px / 1.75 | `--size-body` |
| Caption | 15 px / 1.5 | 16 px / 1.7 | `--size-caption` |
| Label (system sans) | 14 px / 1.5 | 15 px / 1.6 | `--size-label` |

Measured: 360 px → h1 32 px, Hindi body 19 px / 33.25 px; 1280 px → display 64 px, h1 56 px,
h2 40 px. Long headings wrap (`text-wrap: balance`, `overflow-wrap: break-word`); they never shrink.

### 2.3 Font files

| File | Family | Weight / style | Unicode range | Bytes | SHA-256 |
|---|---|---|---|---|---|
| `noto-serif-devanagari-devanagari-400-normal.woff2` | Noto Serif Devanagari | 400 | Devanagari | 50,952 | `e64b3b73131abb4074d4b22453bffe54fe8973fa0ea98a32504570df647b2a0a` |
| `noto-serif-devanagari-devanagari-600-normal.woff2` | Noto Serif Devanagari | 600 | Devanagari | 54,944 | `dca1efd8f011a40f54da5b6e6bf8afdbac8281bd7bbeff9ce7da14f157e37c17` |
| `source-serif-4-latin-400-normal.woff2` | Source Serif 4 | 400 | Latin | 20,088 | `02194deb92d3975dd30e11a3824a1f1db32b48c93654e60560cb81ce8e7b5f95` |
| `source-serif-4-latin-400-italic.woff2` | Source Serif 4 | 400 italic | Latin | 20,092 | `882b7c150c29f29d4f8daae6b8dcae8662aac7f28ca34b34615305154136ecfd` |
| `source-serif-4-latin-600-normal.woff2` | Source Serif 4 | 600 | Latin | 21,532 | `f2b7e1cf1d277b7608231868135648f8ad8e2b58d8e97ca088bee15dc357bee7` |
| `source-serif-4-latin-ext-400-normal.woff2` | Source Serif 4 | 400 | Latin Extended | 17,828 | `cd757b37ff5e4ee2d18c45699df87093d233d98bac45ed682a51505a1914d25c` |
| `source-serif-4-latin-ext-400-italic.woff2` | Source Serif 4 | 400 italic | Latin Extended | 18,480 | `d05b8e57c5d272963ec3777e97e215aec2f8eddb06a06530d6717e9981d9d791` |
| `source-serif-4-latin-ext-600-normal.woff2` | Source Serif 4 | 600 | Latin Extended | 18,376 | `351f7c7a0db5732b008c62d26a8e2b1d2d110449026b8168d4240d07985a7e49` |

- **Source.** Static instances built by Google Fonts and subset by Unicode range, with all OpenType
  layout tables kept (GSUB, GPOS, GDEF; the Devanagari files keep `akhn`, `half`, `rphf`, `blwf`,
  `pres`, `abvs`, `blws`, `psts` and the rest). They are the same files the typography test
  measured (design 01: 49.8 KiB, 53.6 KiB, 19.6 KiB). They were copied unchanged from the npm
  packages `@fontsource/noto-serif-devanagari@5.3.0` and `@fontsource/source-serif-4@5.3.0`
  (integrity verified by npm). The packages are **not** project dependencies.
- **Font versions** (name table): Noto Serif Devanagari 2.006; Source Serif 4 4.004.
- **Latin Extended** files are only downloaded for characters such as diacritics. They do not decide
  any Romanisation question (OD-20).
- **Location:** `public/fonts/` with stable URLs, as plan §3 specifies. Cache headers are a hosting
  matter (OD-22).
- **Preload:** only the page script's body file: Devanagari 400 on `/hi/`, Latin 400 on `/en/`.
  `font-display: swap` on every face.

**Payload (accepted, 2026-10-08).**
- **About 123 KB** for a Hindi page was the earlier **estimate from the typography test** (design 01;
  0024 point 4): Noto Serif Devanagari 400 + 600 and Source Serif 4 Latin 400.
- **About 145 KB** (145.2 KB, 4 files) is the **current measured payload** of this implementation on a
  Hindi page. The difference is the Source Serif 4 Latin 600 file (21.5 KB), which Hindi headings
  load for their spaces and digits.
- The 123 KB figure is **not a hard requirement**. The current payload stays **within the documented
  research budget of 110–160 KB** (0024 rationale; research §13.3) and is accepted as is.
- **No font family, weight, loading strategy or typography decision changes because of this.**
- English pages measure about 111 KB (4 files, including Devanagari 400 for inline Hindi names).

**Licences.** Both families use the **SIL Open Font License 1.1**; the licence texts are next to the
fonts and are published with them.

| Family | Copyright (from the font's name table) | Licence file |
|---|---|---|
| Noto Serif Devanagari | © 2022 The Noto Project Authors | `OFL-noto-serif-devanagari.txt` |
| Source Serif 4 | © 2014–2021 Adobe Systems Incorporated, Reserved Font Name "Source" | `OFL-source-serif-4.txt` |

The header of `OFL-source-serif-4.txt` reads "Google Inc." as distributed by Fontsource; the holder
recorded in the font is Adobe. The files are used exactly as Google Fonts builds and distributes them
under the name "Source Serif 4"; this project does not modify them. Any future re-subsetting would
need to respect the Reserved Font Name.

**Updating:** a changed or added file needs an approved family and weight (new ones need a decision,
0024), a Unicode-range subset with layout features kept, its licence, its checksum and size here, and
re-measured fallback metrics.

### 2.4 Metric-matched fallbacks (0024 point 5)

While web fonts load, text uses local platform fonts adjusted to the web fonts' width and vertical
metrics, so paragraphs rewrap and shift less on swap.

**Method:** headless Chrome rendered a neutral synthetic paragraph in each web font and each local
font (canvas `measureText` at 100 px). `size-adjust` = web width ÷ fallback width;
`ascent-override` and `descent-override` = the web font's ascent and descent ÷ `size-adjust` (the
Capsize formula Astro also uses). `line-gap-override: 0%`.

| Fallback face | Local font | size-adjust | ascent | descent |
|---|---|---|---|---|
| Source Serif 4 Fallback 400 | Georgia | 107.94% | 96.35% | 31.5% |
| Source Serif 4 Fallback 400 italic | Georgia Italic | 96.24% | 108.07% | 35.33% |
| Source Serif 4 Fallback 600 | Georgia Bold | 93.84% | 110.83% | 36.23% |
| Noto Serif Devanagari Fallback Windows 400 | Nirmala UI | 87.03% | 106.86% | 72.39% |
| Noto Serif Devanagari Fallback Windows 600 | Nirmala UI Bold | 83.07% | 111.96% | 75.84% |
| Noto Serif Devanagari Fallback Android 400 | Noto Sans Devanagari | 93.18% | 99.81% | 67.61% |
| Noto Serif Devanagari Fallback Android 600 | Noto Sans Devanagari Bold | 91.57% | 101.56% | 68.8% |

Limits:
- **Kohinoor Devanagari** (iOS/macOS) could not be measured on the available platforms. It stays a
  plain fallback in the stack.
- Android's `local()` matching of system fonts varies by version; where it fails, the browser uses
  its normal fallback.
- Both are covered by the physical-device QA that 0024 point 7 requires before launch.
- Astro's built-in Fonts API was not used for this: its generated fallbacks only know Latin system
  fonts (Times New Roman, Arial), so it cannot produce the Devanagari fallbacks 0024 asks for.

## 3. Tokens (`src/styles/tokens.css`)

The only file with colour and size values. Structure:

1. **Palette** (`--palette-*`): the provisional candidate values, used only inside this file.
2. **Colour roles** (`--color-*`): background, surface, text, text-secondary, text-muted, rule,
   border-control, accent, link, focus, river-line, citation-surface, citation-text.
3. **Font families and weights:** `--font-content`, `--font-ui`, `--weight-regular`,
   `--weight-semibold`.
4. **Type scale and line heights:** per-language base tokens (`--size-body-hi`, `--leading-h1-en`, …)
   resolved by `:lang()` into `--size-body`, `--leading-h1`, `--measure` and so on.
5. **Spacing:** `--space-1` … `--space-11` (4 px base, 8 px rhythm: 4, 8, 12, 16, 24, 32, 40, 48, 64,
   96, 128 px), `--space-section` (64 → 128 px), `--space-gutter` (16 → 48 px),
   `--space-heading-factor` (Hindi 1.2).
6. **Widths:** frame 80rem, media 64rem, measure 40rem (English) / 37rem (Hindi), 44 px minimum target.
7. **Radii and borders:** `--radius: 0`; hairline and control borders 1 px; focus ring 2 px with a
   2 px offset; river line 1.5 px.
8. **Motion:** link 120 ms, fade 150 ms, maximum 200 ms; all 0 ms under `prefers-reduced-motion`.

**Breakpoints** cannot be custom properties, because media queries do not read them. The approved
values are documented in the token file, and the test allows no others:

| Width | Use | Source |
|---|---|---|
| 25rem (400 px) | Below it, primary navigation goes into a menu | 0024 point 6; design 03 §5 |
| 48rem (768 px) | 8-column grid | spec E (4/8/12); the threshold is an implementation-time choice |
| 64rem (1024 px) | 12-column grid; desktop composition | design 03 §5 |

These are layout breakpoints only. **No navigation system is implemented.** Navigation behaviour,
including the 400–1024 px range, is deliberately deferred to the navigation and component phase
(see §9).

## 4. Colour: current provisional values (0025, DP-08 open)

**Status: current provisional implementation values.**
- They are the candidate values of decision 0025 (Accepted with provisional values), derived from its
  accepted **local-material palette direction**: marble paper, stone, granite ink, grey-marble inks,
  one Narmada blue-green accent, one restrained warm tone.
- **DP-08 remains open.** These values are **not treated as final** until DP-08 is formally resolved,
  after validation against authentic material (0025 §4).
- **All values stay centralised** in the palette section of `src/styles/tokens.css`. DP-08 can
  replace them there without touching any other file.
- The 0025 variants still to test (ink `#242321`, band `#F3EDE6`) are noted in the token file, not
  used. No colour was changed by this PR beyond implementing the candidates.

| Role token | Palette | Value | Contrast |
|---|---|---|---|
| `--color-background` | marble paper | `#F5F3EE` | — |
| `--color-surface` | marble stone | `#ECE8E0` | — |
| `--color-text` | granite ink | `#1F2627` | 13.88:1 on paper; 12.59:1 on stone |
| `--color-text-secondary` | grey-marble ink-2 | `#4A5355` | 7.12:1 on paper; 6.46:1 on stone |
| `--color-text-muted` | grey-marble muted | `#5C6568` | 5.39:1 on paper (English metadata ≥ 14 px only) |
| `--color-rule` | grey-marble rule | `#D6D8D4` | 1.29:1, decorative hairlines only, never meaning |
| `--color-border-control` | grey-marble rule-strong | `#7E878A` | 3.31:1 (non-text) |
| `--color-accent`, `--color-link`, `--color-focus` | Narmada | `#1F5357` | 7.78:1 on paper; 7.06:1 on stone |
| `--color-river-line` | Narmada line | `#3E7F7A` | 4.19:1 (non-text) |
| `--color-citation-surface` / `-text` | warm band / band ink | `#F0E6DC` / `#77613F` | 4.78:1 |

The usage rules are unchanged:
- one accent, never as a large fill;
- no status, party or traffic-light colours;
- no gradients (enforced by the test);
- no sepia;
- photographs carry the colour.

## 5. Accessibility foundation

- **Focus:** every focusable element shows a 2 px narmada outline with a 2 px offset
  (`:focus-visible`); mouse focus shows none. Outlines stay visible in forced-colours mode.
- **Links:** always underlined, so they never rely on colour alone. Hover thickens the underline
  from 1 to 2 px. The Hindi underline offset is 0.3 em, to clear vowel signs; English uses 0.15 em.
  There is no separate visited colour, because the palette has one accent.
- **Skip link:** the first focusable element, using glossary key `ui.skip` (approved editorial). It
  appears on focus and moves focus to `<main id="main">`.
- **Targets:** the language switch has a 44 px minimum target.
- **Contrast:** the WCAG pairs above are asserted in `tests/unit/design-tokens.test.ts`: AAA (7:1)
  for body text, secondary text and links on paper; AA elsewhere; 3:1 for non-text.
- **Reduced motion:** all duration tokens become 0 ms, and a reset rule stops any transition,
  animation or smooth scrolling. There are no animations at all (enforced).
- **Text sizing:** sizes are rem-based, so browser text-size settings apply; there is no fixed root
  size.
- **No colour-only communication:** links are underlined, and there are no status colours.
- **Hindi at mobile widths:** 19 px / 1.75 body text, 42–53 characters per line at 360 px (spaces
  included), and no horizontal overflow at 360, 412 or 1280 px.

## 6. River line: initial primitive (DP-06 open)

`RiverLine.astro` is the **initial technical primitive** for the river line, not its final design.
"Straight and static" describes this first implementation only; it is **not a product or design
decision**. DP-06 (river-line execution: weight, bends, final treatment) **remains open** for later
review, and the primitive may change when it is resolved.

It currently renders a straight, static 1.5 px `--color-river-line` stroke:
- vertical, for the future Timeline spine;
- or horizontal, for at most one rule above the footer.

It is decorative (`aria-hidden`), has no animation, and the page works without it. It is not placed
on any production page yet: there is no Timeline or footer. Design 03 §8's gentle bends at period
boundaries and the final weight are **not implemented**, because they are DP-06 execution details.
The 1.5 px value is the upper end of design 03's 1–1.5 px range, marked in the token file as open
under DP-06.

## 7. Specimen page (local only)

`/hi/dev/design-foundation/` and `/en/dev/design-foundation/` are generated only when fixtures are
allowed (`SITE_ENV=local`). They never appear in preview or production, nor in a sitemap. They show:
- the scale and text roles;
- link and emphasis behaviour;
- an inline other-language phrase, digits, danda and conjuncts;
- the colour roles and the river line.

All text is neutral and synthetic, and every block starts with `[DEV]`. As development tooling (like
the preview banner) its text is written in the page, not in the glossary.

## 8. Validation (2026-10-08)

| Check | Result |
|---|---|
| Lighthouse, CI profiles (`/hi/`, `/en/`; production-rules build) | Accessibility 100 at 360 px and 1280 px; performance 100; mobile LCP 1.06–1.22 s; CLS 0 |
| Lighthouse, specimen (local build), 360 / 412 / 1280 px | Accessibility 100 in every run; performance 98–100; LCP 1.66–1.97 s (mobile), 0.37–0.42 s (desktop); CLS 0–0.044 |
| Font payload (specimen) | Hindi page 145.2 KB (4 files); English page 111.2 KB (4 files, including Devanagari 400 for the inline Hindi phrase) |
| Visual inspection, 360 / 412 / 1280 px | Conjuncts, matras and danda correct; long headings wrap; no horizontal overflow; focus visible |

Screenshots: `docs/design/screenshots/design-foundation/`. The 360 and 412 px captures come from the
app's browser with true viewport emulation; the 1280 px captures from headless Chrome.

## 9. Findings for review

1. **Hindi page payload: about 145 KB measured, against an earlier estimate of about 123 KB.**
   Reviewed and **accepted** (2026-10-08) as within the 110–160 KB research budget; the estimate was
   not a hard requirement. See §2.3. No font or typography change.
2. **Small font-swap shift on Hindi mobile pages** (CLS 0.017–0.044 on the specimen), from the 600
   and Latin faces that are not preloaded, as 0024 specifies. It is under the 0.1 working direction
   (OD-25 open). No change was made.
3. **Navigation between 400 and 1024 px** is not specified by design 03 §5 (menu below about
   400 px, inline navigation from about 1024 px). It is **intentionally deferred** to the navigation
   and component phase. No navigation breakpoint or interaction pattern is defined here.
4. **Physical-device QA** (0024 point 7) is still required before launch, including the Kohinoor and
   Android fallback behaviour.

## 10. Implementation-time choices

| Item | Choice | Why |
|---|---|---|
| Font delivery | Hand-written `@font-face` with vendored Google Fonts subsets in `public/fonts/` | Plan §3 location; exact 0024 files; Devanagari fallbacks the Astro Fonts API cannot generate |
| Tablet breakpoint | 48rem | Spec E fixes 4/8/12 columns but not the tablet threshold |
| Link states | Underline always; thicker on hover; no visited colour | One accent (0025); no colour-only meaning |
| English underline offset | 0.15 em | Design 01 specifies only the Hindi value (about 0.3 em) |
| Route kind `dev` | For local-only development pages | Keeps the specimen distinct from real routes |
| Design guards | `tests/unit/design-tokens.test.ts` instead of a CSS linter | No new dependency; plan §2 lists the CSS linter as optional |

## 11. Open decisions: unchanged

| Item | Status after this PR |
|---|---|
| DP-08 final palette | Open. Current values are provisional implementation values (0025 candidates), centralised in `tokens.css`, not final |
| DP-06 river-line execution (weight, bends) | Open. `RiverLine` is the initial primitive (straight, static, 1.5 px), not a decision |
| Navigation (400–1024 px behaviour) | Deferred to the navigation and component phase. Not implemented |
| DP-07 Occasion pages | Open. Nothing built |
| OD-20 Romanisation | Open. Nothing decided; Latin Extended coverage only |
| HP-01 site statement, HP-02 places section | Open. Nothing built |
| OD-21 storage threshold, OD-22 hosting product | Open. Static files only; no host-specific headers |
| OD-25 performance targets, launch date | Open. Performance stays report-only |
| FI-* family inputs, translation reviewer | Open. No person-specific content |
