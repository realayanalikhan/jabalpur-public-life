# 05. Navigation and shared components (PR A): implementation notes

- **Date:** 2026-10-13
- **Scope:** the shared site components the page templates will use. **No pages, homepage
  sections, real content or person-specific information.**
- **Follows:** spec B §1 (navigation, mobile navigation, footer); design 04 H0 and H9; design 03 §5
  and §10; decisions 0003, 0021, 0022, 0023, 0026, 0027; the design foundation
  ([04](04-design-foundation-notes.md)).

## 1. Components

| Component | File | Source |
|---|---|---|
| Header (wordmark, primary navigation, menu, language switch) | `src/components/site/Header.astro` | spec B §1; design 04 H0 |
| Footer (primary sections, utility and trust pages) | `src/components/site/Footer.astro` | spec B §1; design 04 H9 |
| Navigation model | `src/lib/navigation.ts` | spec B §1, §4 |
| Section (hairline, sentence-case heading, content) | `src/components/layout/Section.astro` | design 03 §5 |
| Forward link ("→ Public life") | `src/components/ui/ActionLink.astro` | design 04 H1/H3/H4 |
| Provenance label, Level 1 | `src/components/verification/ProvenanceLabel.astro` | 0026 point 3; design 03 §10 |
| Source details, Level 2 | `src/components/verification/SourceDetails.astro` | 0026 point 4 |
| Metadata line ("date · type · place") | `src/components/archive/MetaLine.astro` | design 04 H4; 0027 |
| Archive card | `src/components/archive/ArchiveCard.astro` | design 03 §5; 0022; 0023; 0027 |
| Ruled list | `src/components/archive/RuledList.astro` | design 03 §5 |
| Citation surface ("Use and cite") | `src/components/archive/CitationBlock.astro` | 0027; 0025 (warm band) |

The existing `LanguageSwitch.astro` is unchanged. `BaseLayout.astro` now renders the header and footer
and computes the navigation. All styling uses the design tokens inside `@layer components`, and the
design guards apply.

## 2. Navigation rules

- **Visible and built.** An item appears only when its section is visible (hidden sections are
  removed entirely, spec B §4) **and** its landing page exists for that language. Links therefore
  never point to a missing page (I20) or a hidden section (I19).
- **Current state.** No section pages exist yet, so on the real site the header shows only the
  wordmark and the language switch, the menu button does not appear, and the footer renders nothing.
  Navigation fills in automatically as PR C builds the pages.
- **Wordmark.** The person's published public name. Until one exists, it is the glossary "Home" label
  (मुखपृष्ठ / Home). No placeholder name is ever invented. Local builds show the `[DEV]` fixture name.
- **Order** (spec B §1): About · Public Life · Archive · Updates · Connect. The mobile menu adds the
  utility group: Press Kit, How We Verify. The footer lists Press Kit, How We Verify, Corrections &
  Feedback, Privacy, and Terms / Takedown.
- **Current section:** `aria-current="page"`, shown in the accent colour with a 2 px underline, so it
  is never colour-only.

## 3. Responsive navigation: an explicit choice for review

Design 03 §5 fixes the two ends (menu below about 400 px; inline from about 1024 px). The middle
range was deferred to this phase.

| Width | Behaviour | Why |
|---|---|---|
| Below 25rem (400 px) | Wordmark · language switch · **menu** button. The menu is a native `<details>` disclosure; its panel opens below the header with the primary sections, then the utility group | The five Hindi labels need about 371 px (design 01) |
| 25rem–64rem (400–1024 px) | Wordmark and language switch on the first row; **navigation inline on a second row** | All five labels fit from about 400 px, so no menu is needed. This avoids an extra interaction ("do not add unnecessary menus") |
| From 64rem (1024 px) | **One row:** wordmark · navigation · language switch | design 04 H0 (desktop) |

Other details:
- No JavaScript, no sticky header, no overlay animation.
- The language switch is always visible and never inside the menu (0021).
- The navigation type matches the typography test that produced the 371 px figure: system sans
  15 px (Hindi) / 14 px (English), 16 px gaps, ink links without underline, 44 px targets.

## 4. Other choices for review

| Item | Choice | Why |
|---|---|---|
| Section headings | `h2` set at the h3 scale (21 → 28 px), after a hairline | Keeps the page title (h1) dominant; design 03 §5 "hairline + sentence-case label" |
| Wordmark size | Lead size (20/21 px), semibold content serif | The name is identity, not a heading |
| Menu panel | Opens over the page directly below the header (no animation) | Keeps the page from jumping; closes with the button |
| Buttons | No generic button component | The site has no actions other than navigation (no forms or accounts). Only the menu button exists |
| Archive card image | "As found" on a stone mat in a fixed 3:2 slot, never cropped (`object-fit: contain`) | design 03 §5; 0027 |
| Card link | The title is the link; its hit area covers the whole card | One link per card; keyboard focus outlines the card |
| Provenance link | "What this means" appears only when the How We Verify page exists | No link to a missing page |

## 5. Deliberately not included

| Item | Why |
|---|---|
| A second language switch in the footer | spec B lists one, but 0021 specifies a single switch and route rule R7 enforces exactly one per page. **Flagged for review**; the header switch is always visible |
| "Last updated" in the footer | Needs a defined content source of truth (which date counts). For a later PR |
| Official profiles in the footer | No `SocialLink` entries exist |
| River rule above the footer | Optional in design 03 §8; DP-06 stays open |
| Breadcrumbs | Not needed until section sub-pages exist (PR C) |

## 6. Review specimen (local only)

`/hi/dev/components/` and `/en/dev/components/` are generated only in local builds (like the
design-foundation specimen). They show:
- a demonstration header with all five sections "as if built", so all three navigation behaviours
  can be reviewed;
- the section, link, provenance (three statuses), source details, cards, ruled list and citation
  components.

All demonstration values start with `[DEV]`. The card image is the `[DEV]` fixture photo, read through
the site data: fixtures load only in local builds, so no fixture file can be bundled into preview or
production output.

Screenshots: `docs/design/screenshots/components/`.
- 360 px: header, menu closed and open.
- 412 px: navigation row; provenance and cards.
- 1280 px: the full specimen in both languages, and the local home pages.

## 7. Open question for PR B and PR C: demonstration content on the live preview

The deployed GitHub Pages site is a **preview** build. Under the accepted rules:
- 0013 says previews **never** contain development fixtures;
- I2 (0018 core) fails a preview build containing fixtures or `[DEV]` text.

So the live preview can only show real (published or in-review) content. **Today that means none**:
the live site shows the header, the empty home page and no navigation. Synthetic demonstration
content can be reviewed in local builds and in PR screenshots, but not on the live preview, unless a
decision changes this. For example, a separate, clearly marked "demo" build or environment with its
own rules, which would amend 0013 and the I2 wording.

This PR does not change it. A decision is needed before the homepage (PR B) can show demonstration
content on the live preview.

## 8. Open decisions: unchanged

OD-20, DP-06, DP-07, DP-08, HP-01, HP-02, OD-21, OD-22, OD-25, family inputs: all unchanged. No
navigation item, section or page was invented, and no person-specific information was added.
