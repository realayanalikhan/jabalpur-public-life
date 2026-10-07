# D. Bilingual Architecture

**Status:** Accepted ([0002](../decisions/0002-bilingual-strategy.md), clarified by [0021](../decisions/0021-language-switching-and-single-language-content.md); [0018](../decisions/0018-content-integrity-rules.md)). Not yet implemented.

## 1. Principles

- English and Hindi are **equal, first-class experiences**.
- Hindi is never a mechanical copy of English, and English is never a mechanical copy of Hindi.
  Either may be the original language of a piece of content.
- Every published translation is **human-reviewed**.
- Consistency is enforced by process and tooling (status tracking, staleness detection, glossary),
  not by memory.

## 2. Locales

| Locale | URL prefix | HTML `lang` | hreflang | Open Graph locale |
|---|---|---|---|---|
| English | `/en/` | `en` | `en` | `en_IN` |
| Hindi | `/hi/` | `hi` | `hi` | `hi_IN` |

## 3. URL structure

- **Both languages are prefixed:** `/en/...` and `/hi/...`. Neither is privileged in the URL.
- **Root `/`:** always resolves (static redirect) to the default language, **Hindi** (`/hi/`).
  English is fully supported at `/en/`. No language detection and no remembered preference
  ([0021](../decisions/0021-language-switching-and-single-language-content.md)).
- **`x-default`:** on every page, points to the **`/hi/` equivalent route of that page** (a URL
  that returns the page directly), never to the redirecting `/`
  ([0002](../decisions/0002-bilingual-strategy.md), clarified by
  [0021](../decisions/0021-language-switching-and-single-language-content.md)).
- Options considered for `/`:

  | Option | Assessment |
  |---|---|
  | Redirect `/` to a chosen default language | **Chosen.** Simple, cacheable, SEO-clean. |
  | Language chooser page at `/` | Adds a click for every visitor; weak for SEO. |
  | Server-side detection (`Accept-Language`) | Not cacheable on a static host; unreliable; can confuse search engines. |

- **Slugs:** shared Latin-script slugs in both languages, e.g. `/en/archive/photographs/{id}/` and
  `/hi/archive/photographs/{id}/`. Devanagari slugs become long percent-encoded strings when
  shared (e.g. on WhatsApp) and are fragile.
- **Section paths:** the same English path segments in both languages (`/hi/public-life/`).
  Translated or transliterated segments add complexity without a clear benefit.

## 4. Page equivalence and switching

Defined in [0021](../decisions/0021-language-switching-and-single-language-content.md):

- **Equivalent routes exist only for real translations.** Core pages always exist in both
  languages. For single-language items, the counterpart path serves a notice page (§6).
- **One switch convention on desktop and mobile:**
  - a single plain link showing **only the other language**, written in full in its own script:
    "English" on `/hi/` pages, "हिंदी" on `/en/` pages;
  - no flags, no codes (EN/HI), no dropdown, no two-label toggle;
  - always visible at the end of the header, outside the mobile menu.
- The switch always leads to the **same path in the other language**: the equivalent page, or the
  notice page. It never leads to the homepage.
- **No remembered preference at MVP.** The language is not stored in cookies, local storage or any
  other storage. The URL alone determines the page language.

## 5. Translation workflow

```
author (original language) → draft translation (human or machine) → human review → reviewed
                                         ↑                                            │
                                         └──── source text changes → marked stale ────┘
```

| Element | Rule |
|---|---|
| **Original language** | Recorded per item (`originalLanguage`). |
| **Translation state** | `missing` · `machine-draft` · `in-review` · `reviewed`, per item per language. |
| **Staleness** | At review time, a fingerprint of the original text is stored. If the original later changes, the translation is automatically flagged stale and fails the parity check until re-reviewed. |
| **Machine translation** | Allowed only as a draft aid; `machine-draft` cannot be published. |
| **Reviewer** | Recorded per translation. Who reviews is open (OD-16, see H); no reviewer is assumed. |
| **Glossary** | Standard renderings for the person's name, role titles, institutions, wards and localities, and recurring terms. Translators must follow it; deviations are reviewed. |

## 6. Parity rules

| Content | Rule |
|---|---|
| **Core pages** (Home, About, Public Life pages, Connect, all utility pages) | Must have reviewed versions in **both** languages to publish. Missing parity blocks the build. |
| **Archive items** | Metadata (title, caption, alt text) should exist in both languages. The original artefact keeps its original language and is labelled (e.g. "Original in Hindi"). |
| **Coverage** | Headline shown in its original language and script, with a reviewed translation as secondary text. |
| **Updates** | May be published in one language with a clear language label ([0002](../decisions/0002-bilingual-strategy.md)). |

**Single-language items** ([0021](../decisions/0021-language-switching-and-single-language-content.md)):

- **Definition:** an item whose editorial text (title, summary, body or caption) exists in only one
  language. An archive item with bilingual metadata and an original artefact in one language is
  **not** single-language: it has full pages in both languages with an "Original in ‹language›"
  label.
- **The counterpart path** serves a **"not available in this language" notice page**: localised
  interface text, a clear notice in the page language, and a link to the available version. It is
  `noindex`, is excluded from `hreflang`, sitemaps and the search-ready index, and never contains
  the untranslated body. The site never pretends a translation exists.
- **Listings** in the other language may show the item with a clear language label, linking directly
  to the available version.
- **Section visibility** counts each published item once, whatever its language, so both language
  editions have the same sections.

## 7. Metadata and SEO

- Unique `<title>`, meta description and social image per page per language.
- Reciprocal hreflang links **only between genuinely equivalent published pages**, plus `x-default`
  pointing to the `/hi/` equivalent route (§3). Notice pages are never part of an hreflang pair.
- Self-referencing canonical URL per language. Never canonicalise one language to the other.
- Per-language sitemaps listing alternates, containing only pages published in that language.
  Notice pages are excluded and carry `noindex`.
- Names appear naturally in both scripts and in common romanised spellings. This helps searches in
  Devanagari, in English and in romanised Hindi, without keyword stuffing.
- Social images must render Devanagari correctly (conjuncts and vowel marks). This needs testing
  because some image-generation tools do not shape Indic scripts correctly.

## 8. Typography (Devanagari requirements)

Design direction is in [E](05-design-brief.md). Bilingual technical requirements:

- Typefaces chosen as **pairs** with compatible weights and vertical metrics. They need not come
  from one family or foundry: a Devanagari face and a separate Latin face are acceptable when their
  proportions are measured to sit together (see [E §2](05-design-brief.md#2-typography-direction)).
- Larger line height for Devanagari to accommodate vowel marks above and below.
- Hindi body text optically sized slightly larger than English for equal readability.
- No forced uppercase, letter-spacing or synthetic italics on Devanagari (the script has no
  case and no italic). Emphasis uses weight.
- Fonts self-hosted, subset per script, and loaded so text stays visible while fonts load.
- Inline text in the other language carries its own `lang` attribute so that fonts, line
  breaking and screen readers behave correctly.

## 9. Formatting conventions

| Item | Approach |
|---|---|
| Dates | Locale-aware formatting (`en-IN`, `hi-IN`) respecting date precision. |
| Numbers | Indian digit grouping (lakh/crore) in both languages. |
| Digits on Hindi pages | **Western numerals (0–9)** ([0002](../decisions/0002-bilingual-strategy.md)). |
| Spelling of "Hindi" in Hindi | **"हिंदी"**, used consistently ([0002](../decisions/0002-bilingual-strategy.md)). |
| Transliteration | One romanisation convention for recurring names and terms, defined in the glossary. The convention itself is open (OD-20, see H). |

## 10. Accessibility

- `lang` set correctly at page level and on inline phrases.
- The language switch is a plain link with the target language name in its own script, marked up
  with `lang`, `hreflang` and `translate="no"`, plus an accessible name describing the action
  (wording per the glossary).
- Alt text and captions are written in, not machine-copied into, each language.
