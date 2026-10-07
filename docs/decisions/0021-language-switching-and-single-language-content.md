# 0021 — Language switching, `x-default` and single-language content

- **Status:** Accepted (clarifies [0002](0002-bilingual-strategy.md))
- **Date:** 2026-10-07
- **Deciders:** Product/technical decision partner (relayed by the project owner)
- **Related:** [Spec B §1](../spec/02-information-architecture.md), [Spec D §3–§7](../spec/04-bilingual-architecture.md); [Research §8, §17, §19](../research/01-visual-product-research.md); [Reconciliation C-04–C-07](../research/02-research-to-spec-reconciliation.md)

## Context

[0002](0002-bilingual-strategy.md) set Hindi as the default, used `/hi/` and `/en/` routes, and
required an equivalent-page language switch. The visual research found four points it left open
or ambiguous:

1. **`x-default`:** spec D could be read as pointing it at the redirecting `/` rather than a page.
2. **Switch label:** the navigation sketch in spec B showed two competing labels (`[हिंदी | EN]`).
3. **Remembered choice:** spec D allowed remembering the visitor's choice, which conflicts with the
   no-cookies MVP (spec A §8).
4. **Single-language items:** the specification did not say what URL and markup they get in the
   other language.

This record settles all four without changing the substance of 0002.

## Decision

1. **Root.** `/` always resolves (static redirect) to `/hi/`. No language detection.
2. **`x-default`.** On every page, `x-default` points to the **`/hi/` equivalent route of that
   page** (a URL that returns the page directly), never to the redirecting `/`.
3. **One language-switch convention**, the same on desktop and mobile:
   - a single plain text link showing **only the alternative language**, written in full in its
     own script: **"English"** on `/hi/` pages and **"हिंदी"** on `/en/` pages;
   - no flags, no language codes (`EN`, `HI`), no dropdown, and no control that shows both
     languages as competing labels;
   - placed at the end of the header, always visible, **outside** the mobile menu;
   - marked up with `lang`, `hreflang` and `translate="no"`, with an accessible name describing
     the action (e.g. "Read this page in English" / "यह पेज हिंदी में पढ़ें"; final wording per the
     glossary);
   - always targets the **same path in the other language**: the equivalent page, or the notice
     page in point 6.
4. **No remembered preference at MVP.** The site does not persist the visitor's language in cookies,
   local storage or any other storage. The URL is the only source of the page language. The
   explicit switch is sufficient. Any future persistence needs a new decision and a privacy review.
5. **Equivalent routes exist only for real translations.** A page is published in a language only
   when its content exists in that language (reviewed, per [0018](0018-content-integrity-rules.md)).
   Core pages remain bilingual (unchanged from 0002).
6. **Single-language items.**
   - **Definition:** an item whose editorial text (title, summary, body or caption) exists in only
     one language.
   - **Not single-language:** an archive item with bilingual metadata whose original artefact is in
     one language (e.g. a Hindi newspaper clipping). It has full pages in both languages, with an
     "Original in ‹language›" label.
   - **The counterpart path** (same path in the other language) serves a **"not available in this
     language" notice page**: localised interface text, a clear notice in the page language, and a
     link to the available version. The notice page:
     - is `noindex`;
     - is excluded from `hreflang` pairs, sitemaps and the other language's search-ready index;
     - **never** contains the untranslated body or presents it as a translation.
   - **Listings** in the other language may show the item with a clear language label (e.g. "Hindi
     only"), linking **directly to the available version**, not to the notice page.
7. **`hreflang`** pairs only genuinely equivalent published pages. Each language's sitemap lists
   only pages published in that language.
8. **Section structure is identical in both languages.** Section visibility
   ([0003](0003-information-architecture.md)) counts a published item once, whatever its
   language. A section therefore exists in both languages or in neither, and the switch on a
   section page always reaches its counterpart.

## Rationale

- Using final URLs as `hreflang`/`x-default` targets, subfolders, and no automatic redirects follows
  Google Search Central guidance cited in the research (§8).
- A single endonym link to the equivalent page is the pattern in the Canada.ca language toggle,
  USWDS and the Welsh Bilingual Design Guide (research §8, §17). Showing only the other language
  removes the ambiguity of a two-label control.
- Not persisting the choice keeps the MVP free of cookies and client storage (spec A §8,
  [0016](0016-analytics-strategy.md)). A static `/` redirect cannot read browser storage anyway.
- Notice pages keep the "same path" promise of 0002 and spec D, while preventing a translated frame
  around untranslated content from being indexed, which the research identifies as a common
  bilingual failure.
- Counting items once for visibility keeps both language editions structurally equal.

## Alternatives considered

- **`x-default` → `/`:** points to a redirect rather than a final URL. Rejected.
- **Two-label toggle (`हिंदी | English`) or codes (`HI/EN`):** ambiguous about the current state;
  codes are less readable. Rejected.
- **Dropdown or flags:** unnecessary for two languages; flags represent countries, not languages.
  Rejected.
- **Remember the choice in a cookie or local storage:** conflicts with the no-cookies MVP, and
  needs script on `/`. Deferred.
- **Switch goes to the nearest bilingual parent page:** breaks the "same path" model and surprises
  users. Rejected in favour of the notice page.
- **Show the other language's body under translated chrome:** misleading, and poor for search.
  Rejected.
- **Count items per language for visibility:** sections could exist in one language only, breaking
  structural parity. Rejected.

## Consequences

- The build must generate notice pages for single-language items, mark them `noindex`, and exclude
  them from `hreflang` and sitemaps.
- Spec B §1 (navigation sketch) and spec D §3, §4, §6, §7 and §10 are updated to match (spec v1.2).
- The accessible names and notice wording are glossary entries
  ([spec 09](../spec/09-language-glossary.md)).
- English-first visitors (e.g. journalists) rely on the always-visible "English" link and on direct
  `/en/` links in press material.
