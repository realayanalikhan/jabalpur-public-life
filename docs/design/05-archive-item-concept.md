# 05. Archive-item concept

- **Date:** 2026-10-07
- **Status:** Concept for review. It informs proposed decision
  [0023](../decisions/0023-public-reference-identifiers.md), which **remains Proposed**; this
  document does not modify it.
- **Artefact:** [`test-pages/archive-item-concept.html`](test-pages/archive-item-concept.html)
  (variants `#noref`, `#ref`, `#everywhere`; add `-w360` for mobile width) ·
  **Screenshot:** [`screenshots/archive-item-ref-variants-360.png`](screenshots/archive-item-ref-variants-360.png)
  (left: no reference · centre: restrained · right: everywhere)
- **Content:** neutral test content and placeholders only. The reference format "P-0042" is
  illustrative and **not decided**.

## 1. Page anatomy (photograph item, Hindi edition)

```
MOBILE (360 px)                                DESKTOP (≥ 1024 px)
┌──────────────────────────────┐   ┌────────────────────────────────────────────────┐
│ ‹wordmark›   English  [मेनू] │   │ header                                          │
│ अभिलेखागार › तस्वीरें          │ 1 │ breadcrumb                                      │
│ ┌──────────────────────────┐ │   │ ┌──────────────────────────────┐ ‹title›       │
│ │  ‹media on stone mat›    │ │ 2 │ │                              │ ‹date·type·   │
│ │  original proportions    │ │   │ │   ‹media, media column›      │  place›       │
│ └──────────────────────────┘ │   │ │                              │ ‹provenance›  │
│ ‹caption: what·where·when›   │ 3 │ └──────────────────────────────┘ ‹caption›     │
│ ‹title›                      │ 4 │ ‹narrative paragraph›            ‹About this   │
│ ‹date · type · place›        │ 5 │                                    item panel› │
│ ‹provenance label · meaning› │ 6 │ ‹use and cite›                                  │
│ ‹narrative paragraph›        │ 7 │ ‹from the same occasion›  ‹from this period›   │
│ ┌ About this item ─────────┐ │ 8 │ ‹suggest a correction›                          │
│ │ date · place · occasion  │ │   └────────────────────────────────────────────────┘
│ │ credit · source · origin │ │
│ │ rights · [reference]     │ │
│ └──────────────────────────┘ │
│ Use and cite [copy][copy]    │ 9
│ From the same occasion       │ 10
│ From this period             │ 11
│ Suggest a correction         │ 12
└──────────────────────────────┘
```

| # | Element | Content (Hindi / English labels per glossary) | Notes |
|---|---|---|---|
| 1 | Breadcrumb | अभिलेखागार › तस्वीरें / Archive › Photographs | System sans, ink-2 |
| 2 | **Media** | Image (lightbox), document pages, or video facade | Archival items matted on stone, never cropped |
| 3 | **Caption** | *what · where · when* in a human voice | Serif, ink-2 |
| 4 | **Title** | Editorial title in the page language | h1, Direction A |
| 5 | **Header line** | **Date** (with precision: "लगभग 1992") · **type** · **place** | One line in system sans |
| 6 | **Verification** | Level-1 label: status word + source type + "इसका क्या अर्थ है" | Text only; no colour ([03 §10](03-visual-direction.md#10-verification-and-provenance-visual-language)) |
| 7 | Narrative | Optional paragraph before the metadata | Only if written |
| 8 | **About this item** | Date · place · **related Occasion** (link) · **credit** · **source** · original form · original language · **rights** (plain words) · *reference (experiment)* | Stone panel; empty fields and their labels omitted |
| 9 | **Use and cite** | Preferred citation + permanent link, each with a copy button | Citation includes the reference only in the experiment |
| 10 | **From the same occasion** | Other published items referencing the same Occasion ([0020](../decisions/0020-occasion-connective-archive-entity.md)), across media types | First group of related items; hidden if none |
| 11 | **Related archive items** | Same period / theme / place (at most six) | Hidden if none |
| 12 | Suggest a correction | Link to Corrections & Feedback | In the experiment, asks visitors to quote the reference |

**Type-specific differences** (detailed in [06](06-key-page-wireframes.md)):
- **Press item:** citation first (outlet, date, page, original-script headline, excerpt, link,
  archive link); a scan only if rights allow ([0006](../decisions/0006-archive-strategy.md)).
- **Document item:** page images (redacted derivatives) + transcription + optional translation.
- **Video item:** click-to-load facade, chapters, captions, transcript.

## 2. The reference-identifier experiment

Three variants were rendered at 360 px:

| Variant | Where the reference appears | Visible effect |
|---|---|---|
| **No reference** | Nowhere | Clean. Citation relies on title and permanent link |
| **Restrained** (as 0023 proposes) | One row in "About this item" (संदर्भ · P-0042); inside the citation text; one sentence in the correction prompt | **About two extra lines on a long page.** It sits in places where people look for exactly this information. The header line, captions and cards are unchanged |
| **Everywhere** (anti-pattern) | Also in the header line and on every related-item card ("· P-0043", "· D-0011") | Codes next to every date. The page starts to read like a **catalogue database**, which the research warns against (research §16) |

## 3. Does the reference number improve the experience enough to justify being public?

**Yes, in the restrained form only.**

| Test | Finding |
|---|---|
| **Citation** | The restrained variant gives a short, language-neutral handle ("संदर्भ P-0042") that survives title corrections and works in print and speech. The permanent link alone works on screen but not in print, on the phone, or in a newspaper footnote |
| **Provenance and corrections** | Contact is by links only (email, WhatsApp; [0015](../decisions/0015-mvp-contact-strategy.md)). A reference makes correction requests unambiguous ("about P-0042"), which directly supports the corrections process (spec G §8) |
| **Visual noise** | Negligible when confined to the item panel and citation: it appears only where a researcher or journalist would look. **Significant when shown on cards and header lines**, so those placements must be prohibited |
| **Internal-only alternative** | Gives none of the citation or correction benefit |
| **Bilingual fit** | Western digits and a short Latin prefix read identically in both editions; no translation needed |

**Recommendation to the decision partner:** **accept 0023 as proposed**, with these placement rules
written into the record when it is accepted:
1. Shown **only** in the "About this item" panel, in the citation text, and in the
   correction prompt on the item page.
2. **Never** on cards, listings, captions, header lines or the homepage.
3. The format stays opaque and short. It is set at implementation; "P-0042" is illustrative.

This document does not change 0023's status. Accepting it is a decision for the decision partner.
