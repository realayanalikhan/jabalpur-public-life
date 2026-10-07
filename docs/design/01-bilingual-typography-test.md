# 01. Bilingual typography test

- **Date:** 2026-10-07
- **Status:** Test complete. **Direction A accepted** as [0024](../decisions/0024-typography-system.md)
  (DP-01 closed). The test was rendered at simulated widths, not on a physical device; implementation
  QA must include a real mid-range Android phone.
- **Compares:**
  - **Direction A:** Noto Serif Devanagari + Source Serif 4 + system sans UI
  - **Direction B:** Tiro Devanagari Hindi + Literata + system sans UI
- **Artefact:** [`test-pages/typography-test.html`](test-pages/typography-test.html) ·
  **Screenshots:** [`screenshots/`](screenshots/)

All sample text is neutral test content, marked "[परीक्षण]" / "[Test]". It names places (Jabalpur,
Narmada, Gwarighat) and generic institutions only, and makes no claim about any person.

## 1. Method

| Item | Setting |
|---|---|
| Renderer | Chrome (headless, current stable) on Windows 11, device pixel ratio 2 |
| Mobile widths | **360 px** (common mid-range Android CSS width) and **412 px** (larger Android). Simulated by setting the page column to that width, because headless Chrome will not open a window narrower than about 500 px. The test page uses fixed sizes and no media queries, so the layout is the same as on a real viewport of that width. |
| Fonts | Google Fonts CSS2 API (test only). Payloads measured separately as static per-weight WOFF2 files, which is how production would self-host them. |
| Type scale (same for both) | English body 18 px / 1.6; Hindi body 19 px / 1.75 (A) or **1.85** (B, because Tiro's vowel marks are taller); h1 36 px; h2 28 px; h3 22 px; captions 15 px (EN) / 16 px (HI); interface text in system sans 14–15 px |
| Weights | A: Hindi headings 600, body 400; English headings 600, body 400 + italic. B: **Hindi headings 400** (Tiro has no bold); English headings 600, body 400 + italic. `font-synthesis: none` in both. |
| Content blocks | Hindi long heading, lead, two body paragraphs with Latin names, numerals and punctuation; short headings; timeline entry; caption with credit; buttons; three archive cards; Hindi heading + English metadata; glyph stress line; English long heading and body with Hindi names and italics; English heading + Hindi metadata; English caption, timeline, card; figures |
| Measurement | A script in the test page records line counts, characters per line, block heights, Hindi navigation width and glyph metrics after fonts load |

**Limits of this test:**
- It is not a physical Android device. Windows and Android rasterise fonts differently, so a
  confirmation pass on a real mid-range Android phone is still advisable.
- The interface sans on Windows is Segoe UI / Nirmala UI; on Android it would be Roboto / Noto Sans
  Devanagari.
- Network performance (LCP over throttled 4G) was not measured. Payloads are given instead.

## 2. Measurements

### 2.1 Layout at mobile widths

| Measure | A · 360 | B · 360 | A · 412 | B · 412 |
|---|---|---|---|---|
| Hindi navigation (5 labels, inline) | **2 rows** (371 px needed, 327 available) | **2 rows** | 1 row | 1 row |
| Hindi long h1 (lines) | 5 (234 px) | 5 (243 px) | 4 | 4 |
| English long h1 (lines) | 5 | 5 | 5 | 5 |
| Hindi body paragraph (lines · characters per line) | **13 · 44** (432 px) | **14 · 41** (492 px) | 11 · 52 | 12 · 48 |
| English body paragraph (lines · characters per line) | **11 · 37** (317 px) | **12 · 34** (346 px) | 10 · 41 | 10 · 41 |
| Hindi caption (lines) | 2 | 2 | 2 | 2 |
| English caption (lines) | 3 | 3 | 2 | 2 |
| Hindi metadata line (system sans) | 2 lines | 2 lines | 1 line | 1 line |
| Hindi archive card height | **121 px** | **146 px** (title wraps to 3 lines) | 121 | 121 |
| English archive card height | 138 px | 138 px | 138 | 138 |

### 2.2 Glyph metrics (ink measured at 100 px)

| | Direction A | Direction B |
|---|---|---|
| Latin x-height | 46 (Source Serif 4) | 52 (Literata) |
| Latin cap height | 67 | 73 |
| Devanagari headline height | 63 (Noto Serif Devanagari) | 62 (Tiro Devanagari Hindi) |
| Headline ÷ Latin x-height | **1.37** | **1.19** |

This measures rendered ink, so it differs in method from the font-table ratio in research §13.3
(1.27 for A). Both methods agree on the direction: **Literata's Latin is large relative to Tiro's
Devanagari**, and Source Serif 4's Latin sits slightly smaller than Noto Serif Devanagari.

### 2.3 Font payload (static WOFF2 per weight, as self-hosted)

| Page | Direction A | Direction B |
|---|---|---|
| Hindi page | Noto Serif Devanagari 400 (49.8 KB) + 600 (53.6 KB) + Source Serif 4 400 Latin for digits and inline English (19.6 KB) = **≈ 123 KB** | Tiro Devanagari Hindi 400 (62.1 KB) + Literata 400 Latin (20.0 KB) = **≈ 82 KB** |
| English page | Source Serif 4 400 + 600 + 400 italic (60.2 KB) + Noto Serif Devanagari 400 for inline Hindi names (49.8 KB) = **≈ 110 KB** (≈ 60 KB with no Hindi on the page) | Literata 400 + 600 + 400 italic (62.0 KB) + Tiro 400 (62.1 KB) = **≈ 124 KB** (≈ 62 KB with no Hindi) |
| Variable-font alternative (for reference) | Noto Serif Devanagari variable 124.3 KB; Source Serif 4 variable (opsz + wght) 119.3 KB | Literata variable 83.8 KB |

B's Hindi pages are about 40 KB lighter **because Tiro has only one weight**. The saving and the
hierarchy weakness (§3.1) are the same fact.

## 3. Findings

Screenshots:
[heading and body](screenshots/compare-hindi-heading-body.png) ·
[body and timeline](screenshots/compare-hindi-body-timeline.png) ·
[cards and glyphs](screenshots/compare-hindi-cards-glyphs.png) ·
[English](screenshots/compare-english.png) ·
[detail: ख and danda](screenshots/compare-detail-kha-danda.png) ·
full pages [A](screenshots/typography-a-360.png) / [B](screenshots/typography-b-360.png).
In each comparison, A is on the left and B on the right.

### 3.1 Hindi

| Criterion | Direction A | Direction B |
|---|---|---|
| **Devanagari readability** | Even, crisp texture at 19 px; slightly condensed; calm | Wider, calligraphic, more "book"; very pleasant in running text |
| **Headline character** | 600 weight gives clear, confident headings | Only one weight: headings rely on size alone. At h3 (22 px), "पद और कार्यकाल" is barely distinct from 19 px body. **Weak hierarchy** |
| **Body comfort** | Comfortable at 1.75 | Comfortable, but needs 1.85; paragraphs are about 14% taller |
| **Matras and conjuncts** | All stacked conjuncts and vowel marks render correctly; no clipping at the tested line heights | Correct and elegant traditional forms, **but ख uses the traditional closed form, which reads as "रव"**: "अभिलेख" looks like "अभिलेव" ([detail](screenshots/compare-detail-kha-danda.png)). अभिलेख ("record") and अभिलेखागार (a candidate for "Archive") are central words on this site |
| **Punctuation** | Danda sits tight to the word ("है।"), matching current Hindi web practice | Danda is set with a visible gap ("है ।"), a traditional style that reads as an extra space on screen |
| **Numerals** | Western digits come from Source Serif 4; consistent and balanced | Western digits from Literata look large next to Tiro |
| **Line height and density** | 13 lines, 44 characters per line at 360 px | 14 lines, 41 characters per line; looser |
| **Long headings** | 5 lines at 360 px (36 px). Heavy but legible | 5 lines; lighter and more elegant, but less authoritative |
| **Short labels / mobile navigation** | Interface text uses system sans in both directions, so they are identical. The five Hindi labels need 371 px but only 327 px is available at 360 px, so they **wrap to two rows**; they fit at 412 px. **The mobile menu (spec B §1) is required below about 400 px**, whichever direction is chosen. | Same |

### 3.2 English

| Criterion | Direction A (Source Serif 4) | Direction B (Literata) |
|---|---|---|
| **Display quality** | Crisp, classic, authoritative at 600 | Softer, contemporary-bookish; wider |
| **Body readability** | Very good; 37 characters per line at 360 px | Very good, larger appearance; 34 characters per line, so one extra line per paragraph |
| **Relationship to Hindi** | Latin sits slightly smaller than Devanagari, so English names inside Hindi text blend in | Latin looks **larger and heavier** than Tiro's Devanagari; English names inside Hindi text stand out |
| **x-height** | Moderate (46) | Large (52) |
| **Weight hierarchy** | 400 / 600, plus optical sizes if variable | 400 / 600 |
| **Italics** | True italic, refined and narrow | True italic, sturdy |
| **Numerals and captions** | Balanced | Slightly large |
| **Metadata** | System sans (identical) | System sans (identical) |

### 3.3 Mixed-language behaviour

| Case | Direction A | Direction B |
|---|---|---|
| Hindi heading + English metadata | Good | Good |
| English heading + Hindi metadata | Good (metadata in system sans) | Good |
| Hindi paragraph with Latin names | **Balanced** colour and size | Latin words look oversized |
| English paragraph with Hindi names | Names blend at equal size | Names blend, slightly small |
| Dates ("7 अक्टूबर 2026", "लगभग 1998 – 2003") | Clean; tabular figures in timeline | Clean |
| Archive credits ("फ़ोटो: ‹नाम› / परिवार संग्रह") | Clear, two lines at 360 px | Clear, two lines |
| Source labels ("पुष्ट · स्रोत: …") | Identical (system sans) | Identical |

### 3.4 Mobile summary at 360 px

| Item | Result |
|---|---|
| Navigation width | Inline Hindi navigation does not fit below about 400 px in either direction. Use the menu |
| Heading wrapping | Long h1s run to 5 lines at 36 px in both. **Start the mobile h1 at about 32 px** and grow it with viewport width |
| Paragraph measure | 41–44 Hindi and 34–37 English characters per line: comfortable. A is denser |
| Archive card height | A 121 px vs B 146 px for Hindi cards: **B makes Hindi lists about 20% longer** |
| Caption and metadata wrapping | Same in both: 2–3 lines; metadata wraps to 2 lines at 360 px |
| Language switch, buttons, links | Identical (system sans); 44 px targets fit |
| Mixed-script lines | A better balanced |

## 4. Recommendation

### Recommended: **Direction A** — Noto Serif Devanagari + Source Serif 4 + system sans UI

**Why, from the test:**
1. **Hindi hierarchy.** A has a real bold (600). B's single weight leaves Hindi h3s and short
   headings nearly indistinguishable from body text, which matters on a site built from many
   labelled sections.
2. **Legibility of the site's key words.** B's traditional ख reads as "रव", affecting अभिलेख and
   अभिलेखागार, words this archive will use constantly.
3. **Modern punctuation.** A sets the danda tight; B adds a visible gap.
4. **Mixed scripts.** A's Latin sits in balance with the Devanagari (ratio 1.37). B's Latin looks
   oversized (1.19), and names inside Hindi sentences will be common.
5. **Mobile density.** A's Hindi cards are about 20% shorter and its paragraphs about 12% shorter at
   360 px, with no loss of comfort.
6. **Room to grow.** A has a full weight range (100–900) for tables, labels and future needs. This
   is consistent with the research finding that Noto Serif Devanagari's proportions closely match
   Android's likely fallback (Noto Sans Devanagari), reducing visible shift when the web font loads
   (research §13.3).

### Trade-offs: what we give up by not choosing B

- **Character.** Tiro is more literary, calligraphic and distinctive. A is calmer and more common
  (the Noto family is widely used). A's premium feel must come from scale, spacing, layout and
  photography (spec E §1).
- **Payload.** About 40 KB more on Hindi pages (≈ 123 KB vs ≈ 82 KB), because A loads two Hindi
  weights.
- **Book-like airiness** of Tiro's longer lines.

These are acceptable: the hierarchy, legibility and mixed-script problems in B are structural, while
A's lack of distinctiveness can be addressed by design. Using Tiro for occasional display would add
a third web font, contrary to spec E §2, so that option is not recommended.

### Implementation implications (not production CSS)

| Topic | Implication |
|---|---|
| **Font files** | Self-hosted WOFF2, static instances: Noto Serif Devanagari 400 and 600 (Devanagari subset); Source Serif 4 400, 400 italic and 600 (Latin subset). Subset **by Unicode range** and keep all OpenType layout features. Never subset to the characters in use, because conjuncts depend on character sequences. |
| **Weights** | Hindi: 400 body, 600 headings and emphasis. English: 400 body, 400 italic, 600 headings. No other weights at launch. |
| **Approximate payload** | Hindi page ≈ 123 KB; English page ≈ 60 KB (≈ 110 KB when Hindi names appear). Within the research's 110–160 KB budget. |
| **Optical sizes** | Static Source Serif 4 instances drop the optical-size axis. The variable file (≈ 119 KB) keeps it but is about twice the size. Recommendation: static text instances at launch; revisit only if display headings look too heavy. |
| **Fallbacks** | Hindi: Noto Sans Devanagari (Android), Kohinoor Devanagari (iOS), Nirmala UI (Windows). Latin: Georgia, then the generic serif. Define metric-matched fallback faces (`size-adjust`, `ascent-override`) to limit layout shift, with Safari's gaps in mind (research §8.6). |
| **`font-display`** | `swap` for body faces. Preload only the body file for the page's script: the Devanagari 400 on `/hi/`, the Latin 400 on `/en/`. |
| **Hindi/Latin rendering** | Latin family first in the stack, so Western digits and inline English use Source Serif 4. `lang` on every inline phrase. `font-synthesis: none`. No letter-spacing, uppercase or italics on Devanagari. Underline offset about 0.3 em on Hindi links. |
| **Type scale adjustment** | Mobile h1 starts at about 32 px rather than 36 px. Hindi body 19 px / 1.75; English 18 px / 1.6 (research §13.3, confirmed here). |
| **Confirmation** | Before the decision record, view [`typography-test.html#a`](test-pages/typography-test.html) on one physical mid-range Android phone to confirm rendering (no clipping, acceptable weight). |
