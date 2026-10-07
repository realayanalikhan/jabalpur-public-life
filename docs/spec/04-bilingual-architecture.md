# D. Bilingual Architecture

**Status:** Working direction (approach accepted; implementation pending technical approval).

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
- **Root `/`:** redirects to the default language. Which language that is remains an
  **open decision** (see H). Options considered:

  | Option | Assessment |
  |---|---|
  | Redirect `/` to a chosen default language | **Recommended.** Simple, cacheable, SEO-clean; `x-default` points to it. |
  | Language chooser page at `/` | Adds a click for every visitor; weak for SEO. |
  | Server-side detection (`Accept-Language`) | Not cacheable on a static host; unreliable; can confuse search engines. |

- **Slugs:** shared Latin-script slugs in both languages, e.g. `/en/archive/photographs/{id}/` and
  `/hi/archive/photographs/{id}/`. Devanagari slugs become long percent-encoded strings when
  shared (e.g. on WhatsApp) and are fragile.
- **Section paths:** the same English path segments in both languages (`/hi/public-life/`).
  Translated or transliterated segments add complexity without a clear benefit.

## 4. Page equivalence and switching

- Every page has a counterpart at the same path in the other locale.
- The language switch links to the **equivalent page**, not the homepage.
- The switch is labelled in each language's own script ("English", "हिन्दी"), not with flags.
- The visitor's last explicit choice may be remembered on their own device as a convenience. It
  never causes automatic redirects away from a URL they opened.

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
| **Reviewer** | Recorded per translation. Who reviews is an open decision (see H). |
| **Glossary** | Standard renderings for the person's name, role titles, institutions, wards and localities, and recurring terms. Translators must follow it; deviations are reviewed. |

## 6. Parity rules

| Content | Rule |
|---|---|
| **Core pages** (Home, About, Public Life pages, Connect, all utility pages) | Must have reviewed versions in **both** languages to publish. Missing parity blocks the build. |
| **Archive items** | Metadata (title, caption, alt text) should exist in both languages. The original artefact keeps its original language and is labelled (e.g. "Original in Hindi"). |
| **Coverage** | Headline shown in its original language and script, with a reviewed translation as secondary text. |
| **Updates** | Open decision (see H): require both languages, or allow single-language publication with a visible label. |

If an item is unavailable in the current language, the page says so in the current language and
links to the available version. It never silently shows the other language.

## 7. Metadata and SEO

- Unique `<title>`, meta description and social image per page per language.
- Reciprocal hreflang links between every pair of equivalent pages, plus `x-default`.
- Self-referencing canonical URL per language. Never canonicalise one language to the other.
- Per-language sitemaps listing alternates.
- Names appear naturally in both scripts and in common romanised spellings. This helps searches in
  Devanagari, in English and in romanised Hindi, without keyword stuffing.
- Social images must render Devanagari correctly (conjuncts and vowel marks). This needs testing
  because some image-generation tools do not shape Indic scripts correctly.

## 8. Typography (Devanagari requirements)

Design direction is in [E](05-design-brief.md). Bilingual technical requirements:

- Typefaces chosen as **pairs** designed for Devanagari and Latin together, with compatible
  weights and vertical metrics.
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
| Digits on Hindi pages | Devanagari (०–९) or Western (0–9): **open decision** (see H). |
| Spelling of "Hindi" in Hindi | "हिन्दी" or "हिंदी": to be fixed in the glossary (see H). |
| Transliteration | One documented convention for romanising names and places (see H). |

## 10. Accessibility

- `lang` set correctly at page level and on inline phrases.
- Language switch is a labelled link with the target language name in its own script, plus an
  accessible description.
- Alt text and captions are written in, not machine-copied into, each language.
