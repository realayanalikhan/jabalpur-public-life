# Research

This folder holds design and product research for the bilingual public-life profile and archive.
Research documents are **inputs** to the design phase. They are not specifications and they are
not decisions.

| # | Document | Research date | Status |
|---|---|---|---|
| 01 | [Visual and product research](01-visual-product-research.md) | 7 October 2026 | Complete; input to the design phase |

## Purpose

[01-visual-product-research.md](01-visual-product-research.md) answers one question:

> How should a premium bilingual (Hindi default + English) digital public-life profile and archive
> for a former Jabalpur public figure actually look and feel, within the project's approved
> constraints?

It turns benchmark research into a design direction that a senior product designer or art director
can brief from: a visual thesis, palette, type system, layout and photography rules, a homepage
concept, key page and archive concepts, bilingual behaviour rules, anti-patterns, and the design
decisions still to be made.

## Research date

All references were checked on **7 October 2026**. Websites change. Observations describe what was
seen on that date and may not match the live sites later.

## Scope

Six research streams plus typography:

1. **Indian public-figure sites:** politician, memorial and institutional sites.
2. **International public-service profiles:** legacy, foundation, presidential-library and government history sites.
3. **Digital archives:** item pages, provenance, rights, browsing, press and video presentation.
4. **Editorial and documentary publications:** long-form, photography-led and cultural sites.
5. **Jabalpur / Narmada / Madhya Pradesh visual identity:** landscape, materials, institutions, photography, motifs to avoid.
6. **Hindi + English UX:** language switching, URLs, dates and numerals, localisation failures, standards.
7. **Bilingual typography:** Devanagari + Latin typefaces, licences, file sizes, vertical metrics, web typography rules.

Out of scope: the person. **No research was done on the person**, and the documents contain no
name, party, ward, dates, roles, achievements, quotes or photographs of them. Layout examples use
abstract placeholders such as ‹public name› and ‹role, years›. External sites are cited as design
references only; nothing from them is to be copied as content.

## How references were selected

- **Quality over quantity.** Each stream shortlisted roughly 5–8 strong references and kept weaker
  ones only where they illustrate an anti-pattern or a single useful detail.
- **Transferability.** References were chosen for what a small, provenance-focused, bilingual,
  municipal-scale archive can realistically adopt, not for budget or scale.
- **Balance.** Personal political sites were sampled across parties and alongside non-partisan
  institutions, so that conclusions about promotional patterns are about the category, not a party.
- **Verified live where possible.** Each citation in the main document carries a status marker.

### Method notes

| Marker | Meaning | Where it was used |
|---|---|---|
| **[R]** | Verified in a rendered browser (screenshots, computed CSS, DOM) | Indian public-figure sites, including 375 px mobile checks for three of them; JFK Library and Trove, where fetching was blocked |
| **[H]** | Verified from fetched HTML, CSS or page text, not rendered | International profiles (text fetcher); editorial sites (`curl` of HTML and CSS for fonts, widths, reduced-motion rules, script counts); archives; bilingual standards |
| **[M]** | Our own measurement | Font file sizes from the Google Fonts CSS2 API, vertical metrics parsed from served font files, colour contrast ratios |
| **[S]** | Search snippet or secondary summary only | Several Jabalpur landscape and institution sources; some critiques and supporting articles |
| **[B]** | Blocked or unreachable on the research date | See limitations below |

No bot check or access control was bypassed.

### Limitations and unverified items

- **Rendering:** international and editorial layouts were inferred from page text and markup, not
  seen. Their typefaces are reliable (taken from CSS) but layout, crop and above-the-fold claims are
  not.
- **Mobile:** only three Indian sites were tested at 375 px. No archive or editorial site was tested
  on mobile.
- **No audits:** no Lighthouse, Core Web Vitals or accessibility audits of reference sites.
- **No device test of Hindi type:** the typography recommendation still needs a rendering test on
  a mid-range Android phone over throttled 4G.
- **Colour:** no published colour data exists for the Bhedaghat marble or the Narmada. All hex
  values are **designer estimates**, to be validated against commissioned photography and
  contrast-checked.
- **Jabalpur fieldwork:** local signage, ghats, bazaars and civic buildings were not documented.
  This needs a local photographic survey.
- **Blocked or unreachable:** ThemeForest (bot check), rahulgandhi.in, abdulkalam.com (Cloudflare
  523), mkstalin.in and shivrajsinghchouhan.org (Cloudflare 522), pmml.nic.in, UK Parliament member
  pages (403), the National Archives of Australia PM pages (timeout), archive.nelsonmandela.org and
  loc.gov (bot checks), the Densho search (bot check), nytimes.com (403), the UNESCO tentative-list
  page (403; known from a search snippet), BBC Hindi/NDTV/india.gov.in for UX fetching, and the
  MeitY localisation best-practice PDF (403).
- **Not fetched:** jabalpur.nic.in, mptourism.com, and the official Bharat Bhavan and Tribal Museum
  sites. GIGW 3.0's primary text was not retrieved.
- **Licences not confirmed:** web-licence terms and prices for paid Devanagari faces (Kohinoor
  Devanagari, Adobe Devanagari, Skolar Devanagari) and any commercial bold weight of the Murty/Tiro
  design.
- **No user research** with Jabalpur residents, journalists or researchers was carried out.

## Relationship to the specification and decision records

- The [specification](../spec/README.md) and the [decision records](../decisions/README.md) are
  the **constraint and the source of truth**. This research operates inside them.
- **This research does not change the specification or any decision.** Where the evidence suggests
  an approved decision or a specification detail deserves another look, the point is listed as
  **"For review"** in section 19 of the main document, with the evidence.
- **Any change requires a new decision record** using
  [`../decisions/0000-template.md`](../decisions/0000-template.md), superseding the relevant
  record, as set out in the [decisions README](../decisions/README.md).
- Design-phase deliverables (spec E §11) should cite this research where it informs a choice, and
  should test its recommendations (type pairing, palette, homepage) with real bilingual sample text
  and real photography before they are adopted.
