# 06. Key page wireframes

- **Date:** 2026-10-07
- **Status:** Conceptual wireframes (DP-05 open). They establish **one coherent system**, not detailed
  designs, and are not permission to start coding. Placeholders only. Archive item pages follow
  [0027](../decisions/0027-archive-item-page-principles.md). **Hindi labels in these wireframes are
  illustrative and predate the glossary;** [spec 09](../spec/09-language-glossary.md) governs wording
  (e.g. मीडिया में, हम जानकारी कैसे जाँचते हैं).
- **System rules used on every page** ([03](03-visual-direction.md)):
  - header with the language switch;
  - breadcrumb below section level;
  - a hairline and sentence-case label opening each section;
  - ruled lists for roles, press and updates;
  - flat cards only for parallel items;
  - Level-1 provenance labels in system sans;
  - "Sources and notes" at the end of long prose;
  - hidden empty sections ([0003](../decisions/0003-information-architecture.md));
  - one column on mobile.

Wireframes show the mobile layout (360 px); desktop notes follow each.

---

## 1. Biography (About)

```
┌──────────────────────────────┐
│ परिचय                         │  h1
│ ‹descriptor›, जबलपुर           │  lead
│ ┌──────────────────────────┐ │
│ │ ‹portrait 4:5›           │ │
│ └──────────────────────────┘ │
│ ‹caption · credit›           │
│ In this biography: ‹period›  │  chapter index (links)
│ · ‹period› · ‹period›        │
│ ── ‹chapter: period/place› ──│  h2
│ ‹prose…›¹                    │  note marker on a factual claim
│ ‹photo sequence + caption›   │
│ ── ‹chapter› ─────────────── │
│ ‹prose…›                     │
│ ── Sources and notes ─────── │  स्रोत और टिप्पणियाँ
│ 1. ‹source type, publisher›  │
│ ‹provenance: as provided by  │
│  the family›                 │
└──────────────────────────────┘
```

- **Purpose:** the person's story in prose, with Jabalpur as a thread through it.
- **Key elements:** chapters named by period or place; at most one full-bleed image; small note markers only on
  specific factual claims; "Sources and notes" at the end; overall `supplied` label (spec C §3).
- **Desktop:** text column 37–40rem; images break into the media column; captions hang.
- **Missing content:** required for launch (short biography). The long biography's chapters appear as
  content arrives.

## 2. Public Life overview

```
┌──────────────────────────────┐
│ सार्वजनिक जीवन                 │  h1
│ ‹2–3 sentence factual summary›│
│ ── Roles & terms ─────────── │
│ ‹role› · ‹ward› · ‹years›    │  ruled rows (top 3–5)
│ ‹provenance›                 │
│ → All roles and terms        │
│ ── Timeline ──────────────── │
│ │ ‹year› ‹milestone›         │  river line, 3–4 entries
│ → Full timeline              │
│ ── Work & initiatives ────── │
│ ‹initiative› · ‹years› · ‹place›│
│ → All work                   │
└──────────────────────────────┘
```

- **Purpose:** a factual hub. Each block previews a child page and links to it.
- **Desktop:** two columns (roles and work on the left, the timeline excerpt on the right).
- **Missing content:** each block is hidden with its child page; the overview appears when any child is visible.

## 3. Timeline

```
┌──────────────────────────────┐
│ समयरेखा                       │  h1
│ Show: सभी · पद · अवसर · प्रेस   │  type filter as links (static pages)
│ ┃                            │
│ ┃ ‹period title, years›      │  period header (from Roles)
│ ┃ ● ‹लगभग 1992› ‹title›      │  entry: date (tabular), title
│ ┃   ‹place› · ‹provenance›   │
│ ┃   ‹3 thumbnails from the   │  only for Occasions with material
│ ┃    occasion›               │
│ ┃ ● ‹year› ‹role began›      │
│ ┃                            │
│ ┃ ‹next period…›             │
└──────────────────────────────┘
```

- **Purpose:** the chronology of public life, generated from content (spec C §6).
- **Key elements:**
  - **The river line is the spine** (its main appearance); it bends gently only at period boundaries.
  - Periods follow Roles.
  - Occasions flagged `onTimeline` show a small strip of their material ([0020](../decisions/0020-occasion-connective-archive-entity.md)).
  - Dates honour their precision.
- **Desktop:** vertical, with the date column on the left of the line and content on the right. **No
  horizontal scrolling timeline.**
- **Missing content:** hidden below its threshold; type filters appear only for types that have entries.

## 4. Roles & Terms

```
┌──────────────────────────────┐
│ पद और कार्यकाल                 │  h1
│ ─────────────────────────────│
│ ‹role title›                 │  row
│ ‹organisation› · ‹ward/area› │
│ ‹years, precision›           │
│ ‹how obtained›               │
│ ‹provenance› [details ▾]     │  Level 2 on demand
│ → ‹related occasions/work›   │
│ ─────────────────────────────│
│ ‹next role…›                 │
│ ── Sources and notes ─────── │
└──────────────────────────────┘
```

- **Purpose:** positions held, as a factual register.
- **Key elements:**
  - ruled rows, not cards;
  - official designations (glossary §5);
  - party shown only as factual text if the family chooses (FI-05);
  - no logos or symbols.
- **Desktop:** two-column rows (role on the left; place, years and provenance on the right).
- **Missing content:** hidden with no published roles; empty fields omitted.

## 5. Work & Initiatives

```
┌──────────────────────────────┐
│ कार्य और पहल                   │  h1
│ ‹intro line›                 │
│ ┌──────┐ ‹initiative title›  │  list rows with optional image
│ │ img  │ ‹years› · ‹place›   │
│ └──────┘ ‹one-line summary›  │
│ ─────────────────────────────│
│ … detail page:               │
│ ‹title› ‹years› ‹places›     │
│ ‹prose; outcomes only with   │
│  sources›                    │
│ ‹occasions in this initiative›│
│ ‹Sources and notes›          │
└──────────────────────────────┘
```

- **Purpose:** sustained programmes of work (distinct from Occasions, spec C §4.1).
- **Key elements:**
  - outcomes shown only with sources;
  - no counters or "impact numbers";
  - related Occasions and archive items linked.
- **Missing content:** hidden with no published initiative.

## 6. Archive landing

```
┌──────────────────────────────┐
│ अभिलेखागार                     │  h1
│ ‹one-sentence human promise› │
│ ┌──────────────────────────┐ │
│ │ ‹featured collection 3:2›│ │  in focus
│ └──────────────────────────┘ │
│ ‹title› ‹intro› ‹by editor›   │
│ ── Browse ────────────────── │
│ तस्वीरें — ‹one-line definition›│  lenses with definitions
│ दस्तावेज़ — …                   │
│ प्रेस में — …                   │
│ वीडियो — …                     │
│ समय · विषय · स्थान             │  time · theme · place lenses
│ ── Collections ───────────── │
│ ‹card› ‹card›                │
│ ── A few items ───────────── │
│ ‹item› ‹item› ‹item›         │
│ ‹About our sources → How We Verify›│
└──────────────────────────────┘
```

- **Purpose:** an editorial entry, not a database ([0022](../decisions/0022-archive-browsing-model.md)).
- **Key elements:**
  - curated material first;
  - lenses each with a one-line definition;
  - no counts, no facet panel, no search at MVP;
  - sparse decades merged.
- **Desktop:** featured collection beside its introduction; lenses in two columns; collection cards in three columns.
- **Missing content:** lenses and collections appear only above their thresholds.

## 7. Photograph item

See [05 archive-item concept](05-archive-item-concept.md). Media on a stone mat → caption → title →
date · type · place → provenance → narrative → About this item → Use and cite → From the same
occasion → related → Suggest a correction.

## 8. Press item

```
┌──────────────────────────────┐
│ अभिलेखागार › प्रेस में           │
│ ┌ citation (band surface) ──┐│
│ │ ‹Outlet› · ‹date› · p. ‹n›││  masthead name as text
│ │ “‹original-script headline›”││ language-neutral
│ │ ‹translated headline›      ││  secondary, labelled
│ │ “‹short excerpt›”          ││
│ │ → Read at source · Archive ││
│ └────────────────────────────┘│
│ ‹scan only if rights allow›  │  (0006)
│ ‹media-reported label›       │
│ About this item · Use and cite│
│ From the same occasion       │
└──────────────────────────────┘
```

- **Purpose:** coverage as a **citation**, not a reproduction ([0006](../decisions/0006-archive-strategy.md)).
- **Key elements:**
  - outlet, date and page;
  - original-script headline with a translation;
  - short excerpt;
  - links to the source and a web archive;
  - rights in plain words;
  - "Original in Hindi" label where relevant.
- **Listing (In the Press):** ruled list grouped by year, showing outlet · date · headline. No logos.

## 9. Document item

```
┌──────────────────────────────┐
│ ‹page 1 image (redacted)›    │  on stone mat, page n of N
│ [‹ prev] [next ›]            │
│ ‹caption› ‹title›            │
│ ‹date · document type · place›│
│ ‹provenance›                 │
│ ▾ Transcription (original)   │  native disclosure
│ ▾ Translation (if reviewed)  │
│ About this item · Use and cite│
└──────────────────────────────┘
```

- **Purpose:** a readable, accessible document record.
- **Key elements:**
  - only redacted derivatives (spec G §4);
  - transcription as real text, which makes it accessible and search-ready;
  - "Original in ‹language›" label.
- **Missing content:** without a transcription, the page states it plainly. A placeholder text is never shown.

## 10. Video item

```
┌──────────────────────────────┐
│ ┌──────────────────────────┐ │
│ │ ‹poster frame 16:9› ▶    │ │  click-to-load facade
│ └──────────────────────────┘ │
│ ‹title› ‹date · duration ·   │
│  place›                      │
│ ‹provenance›                 │
│ Chapters: 00:00 ‹…› 03:12 ‹…›│
│ ▾ Transcript                 │
│ About this item · Use and cite│
│ From the same occasion       │
└──────────────────────────────┘
```

- **Purpose:** video with context and accessibility.
- **Key elements:**
  - never autoplays;
  - provider-neutral facade ([0011](../decisions/0011-image-and-media-strategy.md));
  - captions and transcript;
  - chapters for long recordings.
- **Missing content:** the Video section stays hidden until there is at least one video. The channel depends on FI-09.

## 11. Updates

```
┌──────────────────────────────┐
│ गतिविधियाँ                     │  h1
│ सभी · कार्यक्रम · घोषणाएँ          │  type links
│ ── Upcoming (if any) ─────── │
│ ‹date› ‹title› ‹place›       │
│ ── Recent ────────────────── │
│ ‹date› · ‹type›              │  ruled list
│ ‹title›                      │
│ ‹केवल अंग्रेज़ी में›             │  single-language label (0021)
│ ─────────────────────────────│
└──────────────────────────────┘
```

- **Purpose:** a dated log of current activity: factual, with no campaign tone.
- **Key elements:**
  - upcoming events first, then the recent list;
  - single-language items labelled;
  - updates may link to their Occasion.
- **Missing content:** hidden with no published activity; the "Upcoming" group appears only when events are upcoming.

## 12. How We Verify

```
┌──────────────────────────────┐
│ हम कैसे पुष्टि करते हैं           │  h1
│ ‹short intro: why sources›   │
│ ── What the labels mean ──── │
│ पुष्ट / Verified — ‹meaning›   │  each label shown exactly as on the site
│ परिवार द्वारा उपलब्ध — …        │
│ ‹…› में प्रकाशित — …            │
│ ── What we never publish ─── │  unverified claims
│ ── Sources and rights ────── │  citation-first press; credits
│ ── Corrections ───────────── │  how to suggest a correction
│ ── Reference numbers ─────── │  only if 0023 is accepted
└──────────────────────────────┘
```

- **Purpose:** the public explanation of the verification system (spec B §5; [0004](../decisions/0004-content-and-verification-model.md)).
- **Key elements:**
  - shows each label in its real form;
  - explains Level 1 and Level 2;
  - states that unverified claims are never published;
  - links to Corrections & Feedback;
  - **does not state response times** until OD-24 is decided.
- **Missing content:** always present (required for launch).
