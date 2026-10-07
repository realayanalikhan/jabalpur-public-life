# Research-to-specification reconciliation

- **Date:** 2026-10-07
- **Status:** Analysis for review. **This document changes nothing.** It does not amend the
  specification or any decision record. Every change it recommends needs a separate, approved
  decision record or spec update.
- **Inputs:** [01 Visual and product research](01-visual-product-research.md) (the research);
  [Project Specification v1.1](../spec/README.md) (the spec); decision records
  [0001–0019](../decisions/README.md).
- **Person-specific content:** none. Placeholders such as ‹public name› are used where needed.

The research stands as written. Where it disagrees with the specification, this document records
the disagreement. It does not rewrite either side.

---

## 0. Design thesis

The research ends in one thesis (research §12):

> **"A public life, documented: a well-kept civic record with an editor's hand, set first in Hindi."**

**Practical reading.** The site should feel closer to a **serious Hindi literary/editorial
publication** and a **citeable digital archive** than to a political campaign website.

This is a **design thesis, not marketing copy**. It is a test to apply to design decisions, not
a line to put on the site. In practice:

| Test | Passes | Fails |
|---|---|---|
| Does it document, or does it persuade? | Captions, dates, sources, credits, factual descriptors | Slogans, superlatives, calls to action, counters |
| Could a researcher cite it? | Stable item pages, reference IDs, provenance labels, copyable citations | Carousels, unlinked images, undated claims |
| Is Hindi the first-class edition? | Designed Devanagari serif, Hindi month names, fully localised interface text | Hindi as a translation layer, English strings on Hindi pages |
| Does Jabalpur come through content? | Devanagari place names, real local photography | Monument clip-art, decorative regional patterns, tourist imagery |
| Is it finished? | Nothing empty, nothing "coming soon" | Placeholders, thin sections, visible empty fields |

---

## 1. Findings that reinforce existing decisions

The research supports every approved decision. The strongest evidence for each:

| Decision | Research finding that supports it | Research ref |
|---|---|---|
| [0001](../decisions/0001-product-purpose-and-posture.md) Documentary posture, archive over campaign | None of the Indian politicians' own sites sampled is a usable premium model: they share one template (carousel, slogan, party symbol, social embeds, Hindi as an afterthought). Authority in the strongest references comes from details people can check (fixed fact labels, credits, catalogue IDs, approximate dates, correction routes), not from promotion. obama.org (donate, sign-up, video hero) is the counter-example. | §1, §3, §4 |
| [0002](../decisions/0002-bilingual-strategy.md) Hindi default | Indian-language users are the majority of India's internet users (KPMG–Google 2017). No evidence that a Hindi default is a usability problem, provided the "English" link is always visible. | §8 |
| 0002 `/hi/` + `/en/` subfolders, no automatic redirect | Google Search Central recommends subfolders and advises against URL parameters and automatic redirects. Rekhta's `?lang=` and RBI's JavaScript postback switch are the failures to avoid. | §8 |
| 0002 Equivalent-page switching | Canada.ca language toggle, the Welsh Bilingual Design Guide and the USWDS two-language pattern all switch to the same page in the other language and avoid flags. | §8, §17 |
| 0002 Western numerals | Article 343(1) of the Constitution prescribes the "international form of Indian numerals". Hindwi and Amar Ujala use Western digits in Hindi text. | §8 |
| 0002 / [0018](../decisions/0018-content-integrity-rules.md) Human-reviewed translation and correct `lang` | PMML shows a "Rate this translation" widget (machine-translated Hindi). narendramodi.in/hi serves Hindi under `lang="en"` with no Devanagari web font. Treating Hindi carelessly is the category's norm, so getting it right is a differentiator. | §3, §8 |
| [0003](../decisions/0003-information-architecture.md) No standalone Jabalpur page | The local institutional default (Jabalpur Smart City logo entries stacking a linga, a circuit, Wi-Fi icons and a river line) shows what a symbol-led "Jabalpur" treatment becomes. The research places Jabalpur in content: place names, photography, the palette. | §7, §13.6 |
| 0003 Hidden empty sections; timeless homepage | Small archives look substantial when single items are generous and counts are hidden (Indian Memory Project, MAP). Sabarmati Ashram's calm homepage — one documentary photograph with a factual caption — contrasts with carousel homepages. | §3, §16 |
| [0004](../decisions/0004-content-and-verification-model.md) Verification statuses; labels + optional details | No Indian reference shows provenance or verification status on each item. Wellcome (plain rights wording, copyable credit), MAP (honest dates, "Suggest an edit"), JFK (record panel, preferred citation) and Trove (citation breadcrumb, corrections count) show restrained provenance done well. | §5, §16 |
| 0004 "supplied" as a distinct status | Indian Memory Project credits each contributor with their family relationship to the subject and keeps image rights separate from text rights. Family-supplied is a legitimate, attributable category. | §5 |
| [0005](../decisions/0005-design-direction.md) Restrained palette; no party colours; light only | Saffron, navy-and-orange and tricolour palettes dominate the category (PMML `#F37021`). A neutral mineral palette is what sets the site apart. The editorial references use paper, ink, grey captions and one muted accent. | §3, §6, §13.2 |
| 0005 Subtle river line; no marble texture; no decorative regional motifs | Gond art comes from Dindori and Mandla, and mislabelled imitations harm real artists (PARI). Bharat Bhavan draws its identity from architecture, not ornament. | §7 |
| [0006](../decisions/0006-archive-strategy.md) Citation + excerpt + link for press | Trove treats a newspaper article as a citable record (paper › date › page › headline) with an excerpt. This is the model for our default. | §5 |
| 0006 No public contributions at launch | Indian Memory Project shows the value of contributions, but also the moderation and rights burden (sprawling tags, threatening legal wording). Deferral is sound. | §5 |
| [0008](../decisions/0008-astro-and-typescript.md) / [0009](../decisions/0009-modern-css-and-design-tokens.md) Static, minimal JavaScript, modern CSS | Script counts follow commerce and page builders, not quality: The Pudding ships 2 scripts, Magnum 61, Noema 109. Per-language typography needs `:lang()` rules, which plain CSS handles naturally. | §6, §17 |
| [0011](../decisions/0011-image-and-media-strategy.md) Video facade; captions and transcripts | Densho splits interviews into segments with transcripts. The video facade keeps third-party code off the page until a visitor clicks play. | §5 |
| [0015](../decisions/0015-mvp-contact-strategy.md) Links only, no forms | Political WordPress and ThemeForest templates are built around donation, volunteer and event forms. Avoiding forms also avoids that template look. | §3 |
| [0016](../decisions/0016-analytics-strategy.md) Cookieless analytics | Fits the research's "no cookies" reading of spec A §8 (see C-06). | §19 |
| [0017](../decisions/0017-search-deferred.md) No search at MVP; browsing by taxonomy | Churchill Archive (Topic / People / Place / Period) and Densho (four browse routes with one-line definitions) show that curated lenses beat search at small scale. | §5, §16 |
| 0018 Integrity rules | The category's failures (blank lazy-loading tiles, machine-translated Hindi, wrong `lang`, offline "archive" sites) are exactly what build-time gates prevent. | §3 |

---

## 2. Findings that require clarification

These expose ambiguity, inaccuracy or internal inconsistency in the **specification**. None
conflicts with an approved decision record. Each needs a small spec edit, made once the
recommendation is accepted.

### C-01 Typography: inaccurate statement and unclear family cap (spec E §2)

- **Inaccuracy:** spec E §2 lists "Tiro Devanagari Hindi (with its matching Latin)". This is
  **incorrect**. Tiro Devanagari Hindi's Latin glyphs are a **transliteration subset**, not a text
  companion for English (research §13.3, §19 item 1; [Tiro Typeworks](https://tiro.com/fonts/tiro-devanagari-hindi)).
  The statement came from the original spec draft, not from research.
- **Unclear rule:** "At most two families" does not say whether the platform's own system font for
  interface text counts as a family. The research recommends two self-hosted families plus the
  system sans for interface text (zero bytes).
- **Clarification needed:** correct the Tiro statement. Restate the cap as "two self-hosted families
  plus system fonts for interface text", or replace it with a font-weight budget of about
  110–160 KB per Hindi page.
- The typography **decision** itself is covered in §4 (D-01).

### C-02 Colour: "sandstone/basalt" lacks a local source (spec E §4)

- Spec E §4 takes the warm secondary from "local stone (sandstone/basalt tones)". The research found
  **no source** for sandstone or basalt in Jabalpur city. The documented materials are dolomitic
  marble (white, grey, pink, bluish-grey with dark veins), granite (Madan Mahal, Balancing Rock) and
  brick-lime civic buildings (research §7, §13.2).
- **Clarification needed:** take the warm secondary from the **pink-cream band of the Bhedaghat
  marble** (or monsoon silt as its darker partner), not from sandstone or basalt.
- [0005](../decisions/0005-design-direction.md) only requires "at most one warm secondary", so this
  stays within the decision.

### C-03 Verification UI: "footnotes" in the design brief (spec E §10; spec C §3)

- Spec E §10 lists a "prose/biography layout **with footnotes**". [0004](../decisions/0004-content-and-verification-model.md)
  rejects "academic-style footnote clutter". Spec C §3 still requires that "specific verifiable facts"
  inside long-form text "should carry inline source references".
- **Recommendation:** rename the component **"prose layout with Sources and notes"**:
  - Long-form pages (biography, initiatives, collection introductions) end with a **"Sources and
    notes" / "स्रोत और टिप्पणियाँ"** block.
  - **Specific factual claims** (dates, positions, figures) keep a discreet, linked note marker to
    their entry in that block. Running text has no discursive footnotes.
  - Items and role rows keep the **one-line provenance label**, with details in a native
    disclosure (Level 1 / Level 2, research §16).
- **This does not weaken the integrity model.** Every claim stays traceable, `verified` still
  requires a source, and `unverified` is still never published. Only the presentation changes.

### C-04 `x-default` target (spec D §3; 0002 point 4)

- 0002 says `x-default` points to "the Hindi version". The options table in spec D §3 says
  "`x-default` points to it", which can be read as `/` (a redirect) or `/hi/` (a real page).
- **Clarification:** `x-default` points to the **`/hi/` equivalent of each page**, which loads
  directly, never to the redirecting `/`. hreflang targets should be final URLs (research §19
  item 7, inferred from Google Search Central).
- This is what 0002 already says, made explicit. No new decision is needed.

### C-05 Language switch label convention (spec B §1 sketch; 0002 point 5)

- The navigation sketch in spec B §1 shows `[हिंदी | EN]`. 0002 says the switch is "labelled in each
  language's own script ('English', 'हिंदी')". The sketch uses an abbreviation ("EN") and shows both
  options, which matches neither the decision nor the research.
- **Recommended convention:**
  - The header shows **only the other language**, written **in full in its own script**:
    **"English"** on `/hi/` pages and **"हिंदी"** on `/en/` pages.
  - A plain link (not a dropdown, not a toggle widget, no flags, no codes such as EN/HI), with
    `lang`, `hreflang` and `translate="no"`.
  - An accessible description: "Read this page in English" / "यह पेज हिंदी में पढ़ें".
  - Top-right of the header, visible on mobile outside the menu.
  - Always targets the equivalent page (or the notice page in C-07).
  - Evidence: Canada.ca, USWDS, the Welsh guide, the W3C language-selector notes (research §8, §17).
- **Clarification needed:** correct the spec B §1 sketch and spec D §4 wording to this convention.
  It is within 0002.

### C-06 Remembering the language choice (spec D §4 vs spec A §8)

- Spec D §4 says the visitor's last explicit choice "may be remembered on their own device". Spec A §8
  says "No cookies … at MVP". A static `/` redirect cannot read browser storage without JavaScript, so
  remembering the choice would need either a cookie or a script-driven root page.
- **Recommendation:** **do not remember the language choice at MVP.**
  - `/` always resolves to `/hi/`, and deep links are always respected.
  - English-first visitors rely on the always-visible "English" link.
  - Press and English outreach links point directly to `/en/` URLs.
- Reconsider later together with the privacy notice, if analytics show a need.
- **Clarification needed:** spec D §4 should state that MVP does not remember the choice. 0002 does
  not require remembering, so no decision changes.

### C-07 Single-language items must not pretend a translation exists (spec D §4/§6; 0002 point 9)

- 0002 already says an unavailable item "says so and links to the available version" and "never
  silently shows the other language". The research adds two points: hreflang must pair only
  **genuinely equivalent** pages, and a translated page frame around untranslated content should not
  be indexed (Google Search Central).
- **Recommended convention:**
  1. **Definition.** A *single-language item* has its editorial text (title, summary, body or caption)
     in only one language. An archive item with **bilingual metadata** whose original artefact is in
     one language (e.g. a Hindi clipping) is **not** single-language. It gets full pages in both
     languages with an "Original in Hindi" / "मूल हिंदी में" label.
  2. **Counterpart path.** For a single-language item, the counterpart path serves a **notice page**:
     localised interface text, a short notice ("यह सामग्री केवल अंग्रेज़ी में उपलब्ध है" / "This item is
     available in Hindi only"), and a link to the available version. It is **`noindex`**, **excluded
     from hreflang pairs and sitemaps**, and never contains a mirrored untranslated body.
  3. **Listings** in the other language label such items ("केवल अंग्रेज़ी में" / "In Hindi only"), so
     visitors know before clicking.
- This implements 0002 without changing it. Record it as a clarification of spec D §4/§6.

### C-08 Archive browsing lenses (spec A FR-A2; 0017 "type, decade, theme")

- The research recommends **periods** (named by role or life phase, derived from Roles) as the
  default chronological lens, with **decades** generated and **merged when sparse**. It also
  recommends using place as a lens (research §16; Churchill, Brandt).
- Spec B §2 already makes Place a filter. Period browsing is an **addition** to the "type, decade,
  theme" list in FR-A2 and 0017, not a contradiction.
- **Clarification needed:** confirm whether the lens set is type · period/decade · theme · place, and
  update FR-A2 accordingly. If the wording in 0017 is considered binding, record this as a minor
  amendment together with the occasion model (A-01).

### C-09 Portrait at launch vs commissioned photography (spec A §5.2)

- Spec A §5.2 requires "an approved portrait" for launch. The research's homepage concept is built
  around a **commissioned** documentary portrait.
- **Clarification:**
  - The launch requirement is **any approved portrait**, for example an existing family photograph or
    archival image, credited and captioned.
  - Commissioned photography is **desirable, not a prerequisite** (see §5 and Appendix A).
  - The homepage identity block must work well with a modest approved portrait, and also without the
    portrait during development.

---

## 3. Findings that require an amendment or superseding decision

Only one research finding genuinely conflicts with an approved decision.

### A-01 Linking all material about one real-world occasion (amends 0004 / spec C)

**The finding.** The research treats a single real-world occasion as a **connected story**: for
example, an inauguration with photographs, a newspaper report, a document, a video and a timeline
entry. Each item should link to the others ("From the same occasion", research §16, §19 item 11; the
JFK Library's "Associated Records"). Matching by overlapping dates and places is too unreliable for a
public life with many events.

**Does the current model support this cleanly? No, not cleanly.**

| Current element (spec C §4) | What it does | Gap for "occasion" linking |
|---|---|---|
| **TimelineEvent** | "A milestone not represented by another entity"; links → any item | Defined as **milestones only**, and used only when nothing else represents the event. An ordinary past occasion (a public meeting, a ward visit in an earlier decade) has no proper home, and every TimelineEvent appears on the Timeline. |
| **Activity** | Current or recent activity (event, visit, announcement, appearance, community activity); links → Photo / Video | Built for **current Updates**. It doesn't fit historical occasions, and has no link to Coverage or Document. It is also both "the happening" and "the post about it". |
| **Collection** | Curated set or story | **Editorial curation**, not a factual record of an occasion. Using it for occasions would mix two different things. |
| Photo / Coverage / Video / Document | Link to Place, Theme, Collection, Source | **No link to the occasion they document.** "Related items" can only be inferred from dates and places. |

So the gap is real. Three things are mixed together: the **happening** (a fact: what, when, where),
the **timeline milestone** (an editorial judgement) and the **update post** (a publication).

**Options:**

| Option | Description | Assessment |
|---|---|---|
| **A. Research's lighter option** | Give media items an optional reference to a TimelineEvent *or* an Activity. | Little schema change, but it keeps the mix. TimelineEvent must be stretched beyond "milestones", the link points to one of two different types, and an Activity becomes historical over time without changing type. |
| **B. A dedicated Occasion entity (recommended)** | A new entity **Occasion**: a dated, placed, real-world happening, past or present, with verification and sources. Photo, Coverage, Video and Document get an optional `occasion` reference. TimelineEvent becomes a flag on Occasion (e.g. `milestone` / `onTimeline`), or remains only for milestones with no occasion. Activity stays the **Update publication** and may reference the Occasion it reports on. | Separates the happening (Occasion), the editorial judgement (milestone flag) and the publication (Activity). Gives "From the same occasion" a single reliable anchor. Works for any decade. Adds one entity. |
| C. Use Collections | Model every occasion as a Collection. | Mixes curation with fact; collections need an author's introduction, occasions don't. Rejected. |

**Recommendation: Option B.** It changes the meaning of an accepted entity (TimelineEvent) and adds
one, so it **needs a formal decision record** amending
[0004](../decisions/0004-content-and-verification-model.md), followed by spec C updates (§4
catalogue, §5 diagram, §6 derived views, §11 staging) and a small update to spec B (Timeline sources).
**Not to be implemented until approved.**

The record must decide:
- **Name.** "Occasion" is suggested, to avoid clashing with Activity type `event`; a Hindi term is
  needed for the glossary (e.g. अवसर, for review).
- **Whether TimelineEvent is replaced by an Occasion flag or kept** only for occasion-less milestones.
- **How Activity relates** (optional `occasion` reference).
- **Staging** (MVP or "when content warrants").
- **Date precision and verification rules**, which must match the existing model.

**No other research finding conflicts with an approved decision.** The typography, colour,
bilingual, navigation and verification-presentation items are clarifications (§2) or decisions not
yet made (§4).

---

## 4. Design decisions now ready to make

These can be decided **without family input**, using the research, synthetic bilingual sample text
and device testing. The final Hindi wording still needs a Hindi reviewer (OD-16, §5).

### D-01 Typography (needs a formal decision record)

**The conflict, stated accurately.**
- The design brief (spec E §2) **did not choose a typeface**. It listed candidates and left the
  final choice to "the design phase by testing real bilingual text on low-end phones". **Tiro
  Devanagari Hindi** was listed first, with the incorrect matching-Latin claim (C-01).
- The "Tiro + Literata" pairing appears only in the research, as its alternative Direction B.
- So there is no approved typography decision to override. There is an unchosen candidate list,
  with one inaccurate entry.

**The research evidence (research §8.6, §13.3):**

| | Direction A — Noto Serif Devanagari + Source Serif 4 + system sans for interface | Direction B — Tiro Devanagari Hindi + Literata |
|---|---|---|
| Hindi weights | Variable, 100–900 (headings at 600, body at 400) | **Regular and Italic only, no bold.** Hierarchy relies on size and colour, and `font-synthesis: none` is mandatory |
| Latin companion | Source Serif 4 (optical sizes); ratio of Devanagari headline height to Latin x-height **1.27**, within the range designed bilingual families use, so no size adjustment needed [M] | Literata (ratio 1.22). Tiro's own Latin is not usable for English |
| Fonts per Hindi page | **≈ 125 KB** (Devanagari 400 + 600, Latin 400) [M] | ≈ 97 KB Devanagari, plus Latin |
| Licence | OFL (both) | OFL (Tiro Devanagari Hindi), OFL (Literata). Murty Hindi's free licence forbids web use |
| Character | Calm, legible, less distinctive. Premium has to come from layout, spacing and photography | Most literary and "book-like"; strongest pedigree |
| Risk | Common face (widely used Noto family) | Interface and emphasis harder without bold; tall vowel marks need body line-height ≥ 1.8 |
| Category context | Sampled Hindi news sites set text in **sans**, so any Hindi serif already reads as "book/archive", not "news portal" | Same |

**Recommendation: Direction A**, confirmed by a one-page bilingual test against Direction B. The
test page should include:
- a dense Hindi paragraph,
- English names inside Hindi text,
- numerals and dates,
- captions, links and a role row.

Run it on a mid-range Android phone over throttled 4G before the decision is recorded.

**What needs to be formally decided:**
1. Hindi and English faces for display, body and captions.
2. Weights to self-host.
3. Interface text: system sans or a web font.
4. The font-size budget and how the "two families" cap is worded (C-01).
5. The type scale (research §13.3) as the starting tokens.
6. The parity rule: no uppercase or tracked kickers and no drop caps **in either language**, a
   research recommendation that goes beyond spec D §8.

Record it as a new decision record and correct spec E §2.

### D-02 Colour and material direction (decide the direction now; finalise values later)

**Comparison with the brief.**

| | Spec E §4 / 0005 | Research §13.2 | Assessment |
|---|---|---|---|
| Base | Paper-like off-white, deep ink near-black | Marble off-white **`#F5F3EE`**, granite ink **`#1F2627`** | Consistent; the research grounds them in local materials |
| Accent | One restrained Narmada deep blue-green | Narmada **`#1F5357`** (7.8:1 on paper [M]), with deep and line variants | Consistent |
| Warm secondary | "Local stone (sandstone/basalt tones)" | Marble pink-cream band tint `#F0E6DC`, monsoon silt `#77613F` as darker partner | Different source; see C-02 |
| Party colours | Not used in the interface | Not used; saffron/tricolour avoided; accent kept blue-leaning so it never drifts towards a party green | Consistent |
| Verification colours | Not by colour alone (spec E §8) | **No** traffic-light colours for statuses; text labels only | Consistent; stricter |

**Recommendation:**
- Approve the **direction**: a cool, mineral palette with one warm note, every value tied to a
  physical Jabalpur referent, no saffron or party colours, no colour-coding of verification.
- Treat the hex values as **provisional estimates**. They become **design tokens only after visual
  validation against authentic Jabalpur photography** (commissioned or approved existing images)
  and contrast checks in the token build.
- Until validated, the values may be used as **provisional tokens**, clearly marked, so that design
  and scaffold work are not blocked.

**What needs to be formally decided:** the palette direction and token roles (paper, stone, ink,
ink-2, muted, rule, Narmada accent and variants, band); the warm-secondary source (C-02); the rule
against colour-coded statuses; and the validation step that turns provisional values into final ones.

### D-03 Verification and provenance UI

- **Recommendation:** adopt the research's two-level model within 0004:
  - **Level 1 (always visible):** a one-line label in the interface sans, `--ink-2`, with an
    optional small glyph and a "What this means" link to How We Verify.
  - **Level 2:** the source details (type, publisher/outlet, date, link or archive link, "supplied by"
    wording) inside a native disclosure element.
  - **Long-form prose:** the "Sources and notes" pattern (C-03).
  - **Launch display level (FR-V2):** Level 1 on archive items and role rows. Level 2 available
    everywhere. Biography relies on "Sources and notes".
- **Label wording:** draft candidates are in research §16. **Final Hindi wording waits for the Hindi
  reviewer** (OD-16). The model can be decided now; the wording is finalised later.
- **Not weakened:** statuses, source requirements and the build-failing rules in 0018 are unchanged.
- **Record as:** a decision record clarifying presentation under 0004.

### D-04 Bilingual routing and switching conventions

Record C-04 (`x-default` → `/hi/`), C-05 (switch convention), C-06 (no remembered choice at MVP)
and C-07 (single-language notice pages) together as **one clarifying decision record** under 0002,
then update spec B §1 and spec D §3, §4 and §6.

The complete routing picture:

| Element | Convention |
|---|---|
| `/` | Always resolves to `/hi/` (static redirect). No language detection. No remembered choice at MVP. |
| `/hi/…` | Hindi edition; `lang="hi"`; canonical to itself |
| `/en/…` | English edition; `lang="en"`; canonical to itself |
| `hreflang` | Reciprocal `hi` ↔ `en` only between genuinely equivalent pages |
| `x-default` | The `/hi/` equivalent of each page (a final URL, not `/`) |
| Language switch | Header, top-right, other language only, in full in its own script ("English" / "हिंदी"), plain link to the equivalent page |
| Single-language item | Counterpart path serves a `noindex` notice page linking to the available version; excluded from hreflang and sitemaps; labelled in listings |
| Bilingual metadata + original-language artefact | Full pages in both languages with "Original in ‹language›" label (not single-language) |

### D-05 Hindi terminology conventions (part of OD-20)

These must be fixed **before design mock-ups and implementation**, because they affect navigation
width, date formatting and URLs. **This document does not propose the final glossary.** It lists the
decisions to make:

| # | Convention to decide | Why it matters | Research input |
|---|---|---|---|
| T-1 | **Hindi navigation labels** for every section and utility page | Navigation width at 360 px; tone (common vs Sanskritised) | Candidate set in research §17 (e.g. अभिलेखागार vs संग्रह for Archive); prefer common nouns ([Hindwi](https://www.hindwi.org/)) |
| T-2 | **Month-name spelling** (e.g. अक्टूबर vs अक्तूबर) | Generated dates must match the glossary | Research recommends CLDR spellings, so the formatting library and the glossary agree |
| T-3 | **Approximate-date wording** ("c." / "लगभग"), ranges, decades ("1990 का दशक") | Archive dates | Research §17 |
| T-4 | **Nuqta usage** (e.g. फ़ोटो vs फोटो, दस्तावेज़ vs दस्तावेज) | Consistency across labels, captions and credits | Research §19 item 9 |
| T-5 | **Romanisation convention** for names and places (OD-20) | Slugs, English text, SEO | One documented scheme (e.g. common English spellings vs a systematic transliteration) |
| T-6 | **Verification and metadata labels** (स्रोत, तिथि, स्थान, पुष्ट…) | Provenance UI | Candidates in research §16–§17 |
| T-7 | **Caption grammar and credit prefixes** in both languages (e.g. "फ़ोटो: ‹name› / ‹collection›") | Every image | Research §13.5 |
| T-8 | **Punctuation and numerals** (danda use, Indian digit grouping, लाख/करोड़) | Running text and data | Research §17 |
| T-9 | **Names and spellings of the person, places and institutions** | Identity, SEO, slugs | **Family-dependent for the person** (FI-06); places and institutions can be standardised now |

### D-06 Archive relationship model

Decide A-01 (Occasion). This blocks the archive item-page design, "Related" logic and the Timeline
data sources.

### D-07 Archive browsing and reference IDs

- **Browsing lenses (C-08):** type · period/decade · theme · place. Sparse decades merge below a
  configurable minimum. No visible item counts. Launch with three to five editor-made collections if
  content allows.
- **Public reference IDs:** a short, stable public reference per item that does **not** encode the
  date, shown in the item panel and citations but not on cards (research §19 item 5; JFK, MAP).
- **Item-page order:** as research §16 (media → caption → header line → provenance label → narrative
  → "About this item" panel → "Use and cite" → "From the same occasion" → "Suggest a correction").

### D-08 Homepage content hierarchy and wireframe

The research's homepage concept (research §14) can go into wireframes now, using placeholders:
- **Screen 1:** typographic identity block (name in both scripts, factual descriptor line with
  जबलपुर) with one captioned portrait beside it, never behind it.
- **Screens 2–3:** the record and one featured archive collection.

It depends on D-01 (type), D-02 (provisional palette) and D-06 (occasion links in archive modules).

### D-09 Layout, photography rules and motion

The research's layout system (three widths, an asymmetric grid on desktop, ruled lists rather than
cards for roles, press and updates), photography treatment (archival "as found", matted not cropped,
captions below the image) and motion table (§13.4–§13.7) are ready to adopt as design-system inputs.
They need no family input. They are confirmed through the design-system work, not by separate
decision records, except where they touch accessibility or performance budgets.

---

## 5. Family- and budget-dependent decisions

These **cannot be resolved without the person, the family or a budget decision**. This document
does not propose answers.

| Topic | Tracking ID | What it affects | What can proceed without it |
|---|---|---|---|
| Public name | FI-06 | Wordmark, homepage identity block, SEO, slugs | Wireframes with ‹public name› |
| Hindi spelling of the name (and Latin spelling) | FI-06, OD-20 | Glossary, typography tests with the real name | Glossary conventions (D-05 T-1 to T-8) |
| Party affiliation presentation | FI-05 | Roles & Terms, Organisation display | Role row design with an optional organisation field |
| Contact channels | FI-08 | Connect, Press Kit, Corrections | Connect layout using ContactMethod placeholders |
| Official social accounts | FI-09 | Connect, footer, impersonation protection | Component design |
| Official video channel | FI-09 | Video provider (0011) | The video facade and provider abstraction |
| Archive inventory | FI-03 | Collections, thresholds, storage threshold (OD-21), whether Documents/Video launch | The archive design at small scale (research §16) |
| Original/master storage | FI-04 | Intake workflow, preservation | Nothing user-facing |
| Consent arrangements | FI-11 | Which photographs can be published | Consent flags in the content model |
| Topics to avoid | FI-10 | Editorial review | — |
| Maintenance ownership | FI-02 | Future CMS need, Updates cadence | The repository-based workflow |
| Domain ownership | FI-01 | Deployment, DNS, canonical URLs | Local and preview environments |
| Budget | OD-17 | Commissioned photography, human translation, legal review, paid fonts | The free-licence (OFL) typography path; provisional palette |
| Personal-details policy | OD-23 / FI-07 | Person entity display (e.g. birth date) | Optional fields that hide when empty |
| Translation reviewer | OD-16 | Final Hindi wording (labels, glossary, content) | Drafted conventions marked "pending review" |
| Legal review | OD-18 | Privacy, Terms / Takedown wording | Legal-page structure |
| **Commissioned photography** | OD-17 + family approval + availability | Hero portrait quality; palette validation | Launch can use **any approved portrait** (C-09). The brief is ready in Appendix A. **Not a prerequisite for implementation.** |

---

## 6. Recommended sequence from here

### The proposed sequence

1. Research review
2. Resolve research/spec inconsistencies
3. Typography decision
4. Colour/material direction
5. Bilingual content/glossary conventions
6. Verification/provenance UI decision
7. Archive relationship model
8. Homepage wireframe/content hierarchy
9. Design system
10. Technical scaffold
11. Implementation

This order is sound. **Two adjustments would materially improve it:**

**Adjustment 1 — define the glossary conventions before the typography test, not after it.** The
typography test (step 3) needs real Hindi interface labels, month formats and caption grammar to test
navigation width at 360 px and mixed-script lines. Settling the conventions in D-05 (T-1 to T-8,
excluding the person's name) first, or alongside, avoids testing fonts on text that will change.
Human review of the final Hindi wording can follow later (OD-16).

**Adjustment 2 — run the technical scaffold in parallel with the design system, once the content
model is settled.** The scaffold covers the Astro setup, content schemas, publish gates (0018), CI and
environments. It depends on the content model (step 7) and the bilingual routing conventions (D-04),
not on visual design. Running steps 9 and 10 in parallel shortens the path. It also means the
build-failing gates exist before any styled page does, which helps the integrity principles.

### Recommended sequence

| Step | What | Output | Depends on |
|---|---|---|---|
| 0 | **Review and merge the documentation chain** (spec → decisions → research) | `main` holds the approved baseline | Your review |
| 1 | **Research review** (this document + research 01) | Agreement on C-01…C-09, A-01, D-01…D-09 | Step 0 |
| 2 | **Resolve research/spec inconsistencies** | Spec v1.2 edits for C-01…C-09; one clarifying decision record for bilingual routing (D-04) | Step 1 |
| 3 | **Bilingual content/glossary conventions** (moved earlier) | Glossary conventions T-1…T-8, marked "pending Hindi review" | Step 2 |
| 4 | **Typography decision** | One-page bilingual device test; typography decision record | Step 3 |
| 5 | **Colour/material direction** | Palette direction decision; provisional tokens; validation step defined | Step 2 |
| 6 | **Verification/provenance UI decision** | Decision record (Level 1/2, Sources and notes, launch display level) | Steps 2, 3 |
| 7 | **Archive relationship model** | Occasion decision record (amends 0004); spec C updates; browsing lenses and reference IDs | Step 2 |
| 8 | **Homepage wireframe/content hierarchy** | Wireframes for the homepage and key pages with placeholders | Steps 4–7 |
| 9 | **Design system** ∥ **10. Technical scaffold** (in parallel) | Tokens, components, missing-field behaviour ∥ Astro setup, schemas, gates, CI, preview environment | 9: steps 4–8 · 10: steps 2, 7 |
| 11 | **Implementation** | Pages built on the design system and scaffold | Steps 9, 10 |
| — | **Family input and photography** (runs alongside, gates nothing above) | FI-01…FI-11, OD-16/17/18/23 answers; commissioned photography if approved; final palette validation | Family and budget |

Steps 3 and 5 can run in parallel. Step 5's final hex values stay provisional until photography is
available. That does not block steps 6–11.

---

## Appendix A — Photography brief (for later use)

**Status:** recommended brief, **dependent on budget (OD-17), family approval and the
photographer's availability.** It is **not** a prerequisite for implementation. Launch can use any
approved portrait (C-09). Source: research §13.5–§13.6 and §19 item 3.

**Purpose.** To produce (1) one hero environmental portrait and a small set of alternates; (2) a
place survey of everyday civic Jabalpur; (3) reference images to validate the provisional palette.

**Commission.**
- A local documentary photographer (portrait session plus a half-day place survey).
- Natural light.
- Tone reference: Supriya Lele and Jamie Hawkesworth's *Narmada* (soft daylight, real people,
  no orange grading). This is a reference for tone, not for imitation.

**Portrait session.**
- Environmental documentary portrait in a real civic or neighbourhood setting in Jabalpur.
- Eye level, neutral expression, natural light.
- No garlands, podiums, party scarves, crowds, cut-outs or posed handshakes.
- Deliver 4:5 and 3:4 crops plus a 3:2 option.
- Several alternates, including one plain-background portrait for the Press Kit.

**Place survey (suggested subjects, all subject to consent and practicality).**
- Ghat steps in early light, rather than the evening aarti spectacle.
- Close crops of marble against green water, rather than the Dhuandhar postcard view.
- Brick-and-lime civic façades shot straight-on.
- Ward streets with real Devanagari signage.
- Everyday public spaces relevant to civic life.
- Avoid temples as hero subjects, monument postcards, saturated sunsets and staged scenes.

**Technical.**
- RAW plus high-quality JPEG; colour-accurate (grey card or colour checker in a reference frame,
  for palette sampling).
- No heavy grading, no filters, no AI retouching.
- Location metadata kept in the masters only (stripped from web derivatives per 0011/0018).

**Consent and rights.**
- Written consent for identifiable private individuals.
- No identifiable minors without guardian consent.
- No sensitive settings.
- Licence terms agreed in writing: ownership or perpetual licence to the family, with web, press
  and print use.
- Photographer credit required in captions ("फ़ोटो: ‹name›" / "Photo: ‹name›", wording per glossary
  T-7).

**Deliverables.**
- Selected images with captions drafted (what · where · when).
- Contact sheet.
- Model releases and consent records (stored as **restricted** data, never in git).
- Masters kept in family-controlled storage (FI-04).

---

## Appendix B — Spec and decision edits implied (not made)

| Item | Target | Change, if accepted |
|---|---|---|
| C-01 | Spec E §2 | Correct the Tiro statement; restate the family cap or set a font-size budget |
| C-02 | Spec E §4 | Warm secondary from marble pink-cream band (or silt), not sandstone/basalt |
| C-03 | Spec E §10; spec C §3 | "Prose layout with Sources and notes"; discreet note markers for specific claims only |
| C-04 | Spec D §3 | `x-default` = `/hi/` equivalent page |
| C-05 | Spec B §1; spec D §4 | Switch shows only the other language in full ("English" / "हिंदी") |
| C-06 | Spec D §4 | No remembered language choice at MVP |
| C-07 | Spec D §4, §6 | Definition of single-language item; `noindex` notice page; excluded from hreflang/sitemaps |
| C-08 | Spec A FR-A2; possibly 0017 | Browsing lenses: type · period/decade · theme · place |
| C-09 | Spec A §5.2 | "Approved portrait" may be any approved image; commissioned photography optional |
| A-01 | New decision record amending 0004; spec B, C | Occasion entity and `occasion` references |
| D-01 | New decision record; spec E §2 | Typography |
| D-02 | New decision record; spec E §4 | Palette direction; provisional tokens; validation step |
| D-03 | New decision record (under 0004) | Verification UI presentation |
| D-04 | New decision record (under 0002) | Routing and switching conventions |
| D-05 | Glossary (OD-20) | Terminology conventions |
