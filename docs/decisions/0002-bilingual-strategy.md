# 0002 — Bilingual strategy (Hindi default, English fully supported)

- **Status:** Accepted
- **Date:** 2026-10-07
- **Deciders:** Product/technical decision partner (relayed by the project owner)
- **Related:** [Spec D](../spec/04-bilingual-architecture.md); OD-01, OD-04, OD-05, OD-10

## Context

The site serves Jabalpur residents, people who know the person, journalists and researchers.
Some will prefer Hindi and some English. Both languages must be first-class. The project needed
decisions on URL structure, the default language, numerals, spelling conventions and how to
handle content that naturally exists in only one language.

## Decision

1. **Languages:** Hindi and English from launch; both are first-class experiences. Neither is a
   mechanical copy of the other; either may be the original language of a piece of content.
2. **URLs:** both languages are prefixed: `/hi/...` and `/en/...`. Slugs and section path
   segments are shared, in Latin script, across both languages.
3. **Default language (OD-01): Hindi.** `/` resolves or redirects to `/hi/`. English remains
   fully supported at `/en/`.
4. **SEO:** reciprocal `hreflang` (`hi`, `en`) on every pair of equivalent pages, with
   `x-default` pointing to the Hindi version; a self-referencing canonical URL per language;
   per-language sitemaps.
5. **Language switch:** visible on every page, labelled in each language's own script
   ("English", "हिंदी"), and links to the equivalent page.
6. **Numerals (OD-04):** Western numerals (`0 1 2 3 4 5 6 7 8 9`) on Hindi pages.
7. **Spelling (OD-05):** "हिंदी" is used consistently. A single romanisation convention for
   recurring terms and names is defined in the glossary.
8. **Translation:** human-reviewed. Machine translation may be used only as a draft and cannot be
   published. Translation state and staleness are tracked per item (enforced by
   [0018](0018-content-integrity-rules.md)).
9. **Parity (OD-10):**
   - **Core pages** (Home, About, Public Life pages, Connect, all utility pages) must be
     bilingual.
   - **Individual updates and archive items** may exist in one language, with a clear language
     label. Naturally single-language material (e.g. a Hindi newspaper clipping) is not given an
     artificial translation.
   - If an item is unavailable in the current language, the page says so and links to the
     available version. It never silently shows the other language.
10. **Typography:** Devanagari-specific rules apply (paired typefaces, larger line height, no
    uppercase transforms, letter-spacing or synthetic italics), as in spec D §8.

## Rationale

- Hindi as default reflects the primary local audience, while equal prefixed routes keep English
  first-class.
- Redirecting `/` to a fixed default is cacheable and SEO-clean, unlike browser-language
  detection.
- Latin slugs survive sharing (e.g. on WhatsApp); Devanagari slugs become long percent-encoded
  strings.
- Western numerals are widely used in contemporary Hindi publishing and avoid mixed-numeral
  inconsistencies across data, dates and tables.
- Allowing single-language items avoids low-quality forced translations while core pages
  guarantee a complete experience in both languages.

## Alternatives considered

- **English default:** rejected in favour of the primary local audience.
- **Unprefixed default language (e.g. Hindi at `/`, English at `/en/`):** makes the languages
  structurally unequal and complicates switching. Rejected.
- **Language chooser page or `Accept-Language` detection at `/`:** extra click, or uncacheable
  and unreliable. Rejected.
- **Devanagari numerals:** authentic, but inconsistent with dates, data and common usage.
  Rejected.
- **"हिन्दी" spelling:** equally correct; one form had to be chosen for consistency.
- **Require both languages for everything:** forces artificial translations of original-language
  material. Rejected.

## Consequences

- The glossary must exist before content entry and must define the romanisation convention.
- A translation reviewer is still to be decided (OD-16, open).
- Social sharing images must be tested for correct Devanagari rendering.
- Hindi pages use Western numerals in all generated dates, counts and data.
