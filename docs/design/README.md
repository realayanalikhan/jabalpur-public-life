# Design definition

- **Phase:** Visual definition and design testing
- **Date:** 2026-10-07
- **Status:** Design work for review. **Nothing here is production code, and nothing here is a
  decision record.** Approved outcomes will be formalised as decision records in the next phase.

## Documents

| # | Document | Purpose |
|---|---|---|
| 01 | [Bilingual typography test](01-bilingual-typography-test.md) | Renders Direction A and Direction B at mobile widths and recommends one |
| 02 | [Palette validation](02-palette-validation.md) | Tests the provisional research palette against authentic Jabalpur imagery and interface elements |
| 03 | [Visual direction](03-visual-direction.md) | Turns the research thesis and the two tests into a concrete visual brief |
| 04 | [Homepage wireframe](04-homepage-wireframe.md) | The homepage, top to bottom, with placeholders only |
| 05 | [Archive-item concept](05-archive-item-concept.md) | Archive item page concept, and the evidence for or against public reference IDs (0023) |
| 06 | [Key page wireframes](06-key-page-wireframes.md) | Conceptual wireframes for the main page types |

## Test artefacts

| Path | What it is |
|---|---|
| [`test-pages/typography-test.html`](test-pages/typography-test.html) | Typography test page. Open with `#a` or `#b`, add `-w360` to simulate a 360 px viewport, or `-m` to write measurements |
| [`test-pages/palette-test.html`](test-pages/palette-test.html) | Palette test page. Hot-links openly licensed Wikimedia Commons images, with credits; add `#m` to run the colour analysis |
| [`test-pages/archive-item-concept.html`](test-pages/archive-item-concept.html) | Archive item page mock-up, with and without a public reference ID |
| [`screenshots/`](screenshots/) | Rendered screenshots of the test pages. **No third-party photographs** are included in committed screenshots |

### Rules for these artefacts

- **Not the website.** Test pages are standalone HTML with inline, test-only CSS. They are not
  application files, not components and not the design system.
- **Neutral test content only.** Every sample text is marked as test content. Nothing describes,
  names, depicts or makes claims about the person the site is about. Placeholders such as
  ‹public name› and ‹role title› stand in for real content.
- **Fonts** load from Google Fonts for testing only. Production fonts will be self-hosted
  ([0011](../decisions/0011-image-and-media-strategy.md) principles; spec E §2).
- **Third-party images** are hot-linked under their licences with credits, and are not copied into
  the repository.
- **Family-dependent decisions are not made here** (spec H §4).
