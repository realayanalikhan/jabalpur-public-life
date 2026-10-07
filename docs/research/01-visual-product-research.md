# Visual and product research: a public record with an editor's hand

- **Document:** Visual and product research for the bilingual public-life profile and archive
- **Research date:** 7 October 2026
- **Status:** Research input to the design phase. **It does not change the specification or any decision record.** Proposals that touch approved decisions are listed in [§19](#19-recommended-next-design-decisions) as points for review only.
- **Constraint sources:** [Project Specification v1.1](../spec/README.md) and decision records [0001](../decisions/0001-product-purpose-and-posture.md)–[0019](../decisions/README.md).
- **Person-specific content:** none. Every layout example uses abstract placeholders such as ‹public name›, ‹portrait›, ‹role, years›, ‹place›. External sites are design references only.

Verification legend used throughout: **[R]** verified in a rendered browser; **[H]** verified from fetched HTML, CSS or page text (not rendered); **[S]** search snippet or secondary summary only (treat as indicative); **[B]** blocked or unreachable on the research date; **[M]** our own measurement (font files, contrast). Anything inferred rather than observed is labelled as a recommendation or inference.

---

## 1. Executive summary

**The site should look and behave far more like a carefully edited public record (a museum's catalogue of one civic life, set in excellent Hindi typography) than like any Indian politician's website.** Across 60+ references checked on 7 October 2026, no Indian personal political site offered a premium documentary model. They converge on the same template: utility bar, coloured nav, hero carousel, slogan or party symbol, icon tiles, social embeds, and Hindi as an afterthought, with even the most prominent example serving Hindi under `lang="en"` with no Devanagari web font ([narendramodi.in/hi](https://www.narendramodi.in/hi) [R]). The references that convey authority do so through **verifiable metadata rather than styling**: fixed fact labels ([GOV.UK](https://www.gov.uk/government/history/past-prime-ministers/clement-attlee) [H]), photographer and archive credits ([Willy Brandt biography](https://www.willy-brandt-biography.com/) [H]), plain-language rights and copyable credit lines ([Wellcome Collection](https://wellcomecollection.org/works/vq7jhqgp) [H]), honest approximate dates and "suggest an edit" ([MAP Bengaluru](https://map-india.org/collections/cumulus/photography/PHY.40025/?id=77515) [H]), and citation-first newspaper items ([Trove](https://trove.nla.gov.au/newspaper/article/2084491) [R]). That is the project's opportunity. The approved decisions (documentary posture, verification statuses, Hindi default with equivalent-page switching, citation-first press, hidden empty sections) already position it ahead of every Indian reference sampled. The visual work is to make that integrity *visible and beautiful*.

The top conclusions, each developed later:

1. **Lead with identity, then story.** The first screen is a typographic identity block (name in both scripts, a factual descriptor line, one captioned documentary portrait beside the text on desktop and never behind it), and the second screen is the record. Slogan heroes, carousels and full-bleed poster portraits are the category's signature failures ([§9](#9-cross-reference-design-patterns)).
2. **Typography carries the brand, and Hindi carries the typography.** A serif voice with true Devanagari parity, **Noto Serif Devanagari + Source Serif 4**, measured to sit within the ratio designed bilingual families use, at about 125 KB of fonts on a Hindi page ([§13.3](#133-typography)). The Hindi news sites sampled set text in Noto Sans or system sans fonts ([bbc.com/hindi](https://www.bbc.com/hindi), [amarujala.com](https://www.amarujala.com/) [H]), so a Hindi serif immediately reads as "book/archive", not "news portal".
3. **Captions are content.** One fixed grammar in both languages, *what · where · when · credit*, set below the image, never over it ([Magnum](https://www.magnumphotos.com/arts-culture/europes-living-room/), [Guardian](https://www.theguardian.com/news/series/the-long-read), [PARI](https://ruralindiaonline.org/article/in-2023-writing-with-light) [H]).
4. **Provenance is a quiet typographic label on the content, with details one tap away.** That is exactly the approved "labels + optional details" model, and no Indian reference shows per-item verification at all ([§16](#16-archive-ux-concept)).
5. **The archive must feel authored, not databased:** one curated "in focus" collection first, then three or four browse lenses with one-line definitions, no visible item counts, generous single items ([Churchill Archive](https://www.churchillarchive.com/), [Densho](https://ddr.densho.org/browse/), [Indian Memory Project](https://www.indianmemoryproject.com/) [H]).
6. **The palette comes from the geology, not from politics.** Marble off-white, granite ink, Narmada deep blue-green, and one pale warm note from the pink bands in the Bhedaghat marble. Every value has a physical referent, which is the factual argument against saffron ([UNESCO tentative list](https://whc.unesco.org/en/tentativelists/6531) [S]).
7. **Jabalpur appears through Devanagari place names and real photography, never motifs.** The local default (a linga, a circuit symbol, Wi-Fi icons and a river line stacked into one logo, as in [Jabalpur Smart City logo entries](https://www.mygov.in/task/jabalpur-smart-city-logo-competition) [S]) is the anti-reference; the river line appears once, as the Timeline spine.
8. **The timeline is vertical, periodised by role and quietly faceted.** It is not a carousel or a medallion wheel ([PMML](https://pmml.gov.in/) [R] versus [Brandt](https://www.willy-brandt-biography.com/) [H] and [Gandhi Heritage Portal](https://www.gandhiheritageportal.org/) [R]).
9. **Bilingual quality is the differentiator nobody in the category has achieved:** header endonym switch to the equivalent page, Hindi month names with Western digits, fully localised chrome, no tracked uppercase kickers in either language ([Canada.ca](https://design.canada.ca/common-design-patterns/language-toggle.html), [Hindwi](https://www.hindwi.org/) [H]).
10. **"Premium" here means restraint plus completeness:** fast on a mid-range Android phone, nothing empty, nothing promotional, every image credited, every claim labelled.

Research supports every approved decision. It suggests a small number of clarifications for review (x-default target, switch behaviour on single-language items, a cookie conflict, the brief's "Tiro with its matching Latin" and "sandstone/basalt" assumptions, the "two families" cap). These are listed in [§19](#19-recommended-next-design-decisions) and none is changed here.

---

## 2. Research methodology

**Streams.** Seven parallel research streams ran on 7 October 2026: (A) Indian politician, public-figure and memorial sites; (B) international public-service profile and legacy sites; (C) digital archives; (D) editorial, documentary and photography-led publications; (E) Jabalpur, Narmada and Madhya Pradesh visual identity; (F) Hindi + English bilingual UX; (G) bilingual Devanagari + Latin typography. No stream searched for or recorded anything about the person.

**Methods differed by stream, and the confidence level differs with them:**

| Stream | Method | What it can and cannot support |
|---|---|---|
| A. Indian public figures | Real browser: screenshots, computed CSS (fonts, colours), DOM headings; 375 px mobile viewport for PMML, narendramodi.in and shashitharoor.in | Strong on visual and typographic claims for homepages; inner pages not opened |
| B. International | Text fetcher (page text and structure) | Strong on IA, labels and captions; **typefaces, colours and above-the-fold layout not observed** |
| C. Archives | Fetch plus in-app browser where fetch was blocked (JFK, Trove) | Strong on item-page fields and wording; mobile layouts not tested |
| D. Editorial | `curl` of homepage HTML and linked CSS (font-family, woff2 names, max-width, reduced-motion rules, script counts), plus article fetches | Font identification reliable; layout inferred from markup, **no screenshots** |
| E. Jabalpur/MP | Search plus selected fetches (budget about 19 calls) | Landscape colours are qualitative; **no published colour data exists**; several institutional sites not fetched |
| F. Bilingual UX | Fetch of live sites and standards documents | Standards strongly verified; several Indian news sites blocked |
| G. Typography | Google Fonts metadata feed, CSS2 API file sizes (Chrome 130 UA), parsed TTF vertical metrics; live CSS of Hindi publishers | Sizes and metrics are **our measurements** (±10%); no device rendering test |

**Selection.** References were chosen for quality and transferability, not volume. Each stream shortlisted 5–8 strong references and kept weaker ones as anti-patterns or single-detail lessons. Personal political sites were sampled across parties (BJP-linked, INC, an NCP-symbol corporator) and alongside non-partisan institutions, to show the promotional pattern is category-wide rather than partisan ([§3](#3-indian-public-figure-benchmarks)).

**Synthesis rules.** Where references conflict, the report states the trade-off and recommends one path. Recommendations must fit the approved constraints. Where evidence suggests an approved decision deserves another look, it appears only in [§19](#19-recommended-next-design-decisions). Search-snippet claims are marked [S] and never carry a recommendation alone.

**Key limitations.** No Lighthouse or accessibility audits of reference sites. No rendering of Hindi type on a real low-end Android device. No user research with Jabalpur residents. Palette hex values are designer estimates. International and editorial layouts are inferred rather than seen. These limitations are carried into the open questions in [§19](#19-recommended-next-design-decisions) and the [README](README.md).

---

## 3. Indian public-figure benchmarks

The most useful Indian references are **institutional memorial and archive sites**, not personal politician sites. All were checked in a rendered browser on 7 October 2026 [R].

#### Prime Ministers Museum & Library

- **Website / organisation:** Prime Ministers Museum & Library (PMML), Ministry of Culture
- **URL:** https://pmml.gov.in/ [R, desktop and 375 px] (pmsangrahalaya.gov.in redirects here; pmml.nic.in refused connection [B])
- **Country/context:** India. National memorial museum and research library covering all Prime Ministers across parties.
- **What they do well:** An all-party, neutral framing of public life; archive-first IA ("Library / Archives / Research"); a serif and sans pairing (**Spectral** headings, **Geist** UI) on white with navy `#1B253C` type; a stacked English/Devanagari logo lockup; an explicit "Last Updated" date in the footer ([PMML](https://pmml.gov.in/)).
- **What we should learn from it:** Separate *life* (biography, timeline) from *record* (archive). Put a role line and date range under portraits. Show maintenance dates as a quiet trust signal.
- **What we should NOT copy:** The hero carousel; the rotating circular-medallion "Journey Through Time" timeline, which hides chronology; icon-tile grids; stat counters ("2.5Cr+ Documents"); a visitor counter; orange `#F37021` CTAs with political connotations; and Hindi delivered through a machine-translation layer (the DOM contains "Rate this translation"). On mobile the first viewport was a blank dark hero and grey placeholder tiles while images loaded ([PMML](https://pmml.gov.in/)).
- **Relevant area:** Archive IA, timeline, biography, typography, credibility signals.

#### Gandhi Heritage Portal

- **Website / organisation:** Gandhi Heritage Portal (Sabarmati Ashram Preservation & Memorial Trust)
- **URL:** https://www.gandhiheritageportal.org/ [R]; gallery and photo pages [H]
- **Country/context:** India. The closest Indian analogue to a one-person public-life archive; multilingual.
- **What they do well:** "Chronology" as a first-class nav item (Day-to-Day and Event Chronology); life events grouped by type (Marches, Fasts, Imprisonments, Tours) as well as by date; a full source citation under every quote; primary texts in several Indian languages; photo categories that are **life-event themes**, each photo carrying an "Acknowledgment" credit and a licence line; no promotion at all ([GHP](https://www.gandhiheritageportal.org/); [GHP Photos](https://www.gandhiheritageportal.org/photos-of-mahatma-gandhi)).
- **What we should learn from it:** Event-type facets plus chronology; a citation line (date · source · page) under quotes and documents; listing Hindi in its own script in the switcher.
- **What we should NOT copy:** Parchment/sepia textures and beige boxed widgets; a carousel photo viewer ("Showing: 18 / 725 Photos") with **no per-photo permalink**; truncated gallery titles ("Gandhi's .."); photo captions without dates; system fonts (Georgia, Arial, Verdana) ([GHP Gallery](https://www.gandhiheritageportal.org/gallery)).
- **Relevant area:** Archive taxonomy, timeline, citation, anti-patterns for viewers.

#### Rashtrapati Bhavan

- **Website / organisation:** Rashtrapati Bhavan (President's Secretariat)
- **URL:** https://rashtrapatibhavan.gov.in/ [R]
- **Country/context:** India. National institution and heritage site with a Digital Photo Library.
- **What they do well:** A **stacked Devanagari-over-Latin wordmark of equal weight** ("राष्ट्रपति भवन / RASHTRAPATI BHAVAN"); a dedicated Digital Photo Library; object-level navigation where each room or object is a page ([Rashtrapati Bhavan](https://rashtrapatibhavan.gov.in/)).
- **What we should learn from it:** A bilingual stacked lockup as the identity device; photographs as a first-class archive product with item pages.
- **What we should NOT copy:** Owl Carousel on nearly every block (107 carousel-class elements); a floating social rail; a four-font stack (Playfair Display, Roboto, Lato, Open Sans); the GIGW-style A+/A− utility bar clutter.
- **Relevant area:** Bilingual identity, photo archive, navigation.

#### Gandhi Ashram at Sabarmati

- **Website / organisation:** Gandhi Ashram at Sabarmati
- **URL:** https://www.gandhiashramsabarmati.org/en/ [R]
- **Country/context:** India. Memorial trust and museum site.
- **What they do well:** The calmest hero in the Indian set: **one wide, natural-light documentary photograph of a place**, captioned with a factual notice, and no carousel ([Sabarmati Ashram](https://www.gandhiashramsabarmati.org/en/)).
- **What we should learn from it:** A single still, captioned documentary image is enough to set a credible tone.
- **What we should NOT copy:** Roboto Condensed for everything; orange icon-circle tiles; "Quiz" and "Museum Shop" mixed into primary nav.
- **Relevant area:** Homepage photography, tone.

#### Dr Shashi Tharoor official website

- **Website / organisation:** Dr Shashi Tharoor official website
- **URL:** https://www.shashitharoor.in/ [R, desktop and 375 px]
- **Country/context:** India. Personal site of a sitting MP and author (INC).
- **What they do well:** The deepest **record taxonomy** of any personal site seen: parliamentary Questions, Debates & Speeches, Private Member's Bills and Committees are separated from Books, Interviews, Press and Writings, and "My Articles" is kept apart from "Articles by Others" ([Shashi Tharoor](https://www.shashitharoor.in/)).
- **What we should learn from it:** Distinguish material *by* the person from material *about* them, and both from the *official record*. That maps onto Coverage versus Source versus Document in the approved model.
- **What we should NOT copy:** The party symbol in the logo; a slogan carousel; Facebook, Twitter and YouTube feed embeds; boxed PDF-cover promotions; a stale contest nav item; a "© 2017" footer. On mobile, social icons and a full-height PDF cover fill the first screen.
- **Relevant area:** Record taxonomy, press, anti-patterns.

#### narendramodi.in

- **Website / organisation:** narendramodi.in (personal site of the sitting PM)
- **URL:** https://www.narendramodi.in/ and /hi [R, desktop and 375 px]
- **Country/context:** India. The most resourced personal political site in the category.
- **What they do well:** Separate "Biography" and "Timeline" products; a full parallel Hindi path; a serif/sans pairing (Georgia headlines, Inter UI) ([narendramodi.in](https://www.narendramodi.in/)).
- **What we should learn from it:** Even at this level of investment the bilingual layer is technically broken: the /hi pages keep `<html lang="en">`, and the Inter/Georgia stack has no Devanagari, so Hindi falls back to whatever system font exists ([narendramodi.in/hi](https://www.narendramodi.in/hi)). Getting `lang` and Devanagari type right is a cheap, decisive differentiator.
- **What we should NOT copy:** A slogan carousel with brush-stroke graphics and a handwritten signature; app-download and missed-call CTAs; an AI chatbot badge covering content on mobile; campaign-themed bands; crowd photography behind text; on mobile, cropped slogan graphics and clipped heading strips.
- **Relevant area:** Biography and timeline separation; bilingual (cautionary); anti-patterns.

#### Municipal corporator site

- **Website / organisation:** Municipal corporator site (Pune Municipal Corporation): an archetype
- **URL:** https://amolbalwadkar.com/ [R] (URL found via [Wikipedia](https://en.wikipedia.org/wiki/Amol_Ratan_Balwadkar))
- **Country/context:** India. The closest scale match (municipal) found.
- **What they do well:** Nothing transferable visually. It is useful as a precise picture of what the brief means by "outdated politician-website aesthetics".
- **What we should learn from it:** The municipal default is a WordPress page with a hot-pink party-poster hero, cut-out portraits of the corporator and a senior leader, a party symbol in header, hero and footer, a 40-page PDF flipbook as the "content", Marathi text under `lang="en-US"`, and no structured record ([amolbalwadkar.com](https://amolbalwadkar.com/)).
- **What we should NOT copy:** All of it. Every element above appears in [§18](#18-anti-patterns).
- **Relevant area:** Anti-pattern reference.

**Category conventions and lessons.** The Indian default is: utility bar, coloured nav bar, full-width carousel, icon-tile grid, "What's New" list, heavy policy footer ([PMML](https://pmml.gov.in/), [Rashtrapati Bhavan](https://rashtrapatibhavan.gov.in/), [Gandhi Smriti](https://gandhismriti.gov.in/) [R]). Institutions pair a heritage serif (Spectral, Playfair Display, Georgia, Garamond) with a generic sans; **no site paired its serif with a designed Devanagari face**. Palettes are saffron, orange, brown, sepia or party colours. Personal sites carry party symbols and slogans regardless of party, and generic templates are explicitly built for "donation calls-to-action", volunteers and testimonials ([WordPress.org Patterns Political](https://wordpress.org/themes/patterns-political/) [H]). Several personal sites were simply **offline** on the research date (mkstalin.in and shivrajsinghchouhan.org returned Cloudflare 522; abdulkalam.com returned 523 and had done so in the Wayback Machine since January 2025) [B]. For an archive, durability is itself a credibility signal. The lesson: borrow *structure* from PMML and the Gandhi portal, *record taxonomy* from Tharoor, the *bilingual lockup* from Rashtrapati Bhavan and the *calm hero* from Sabarmati, and borrow polish from international archives and editorial sites, because no Indian reference supplies it.

---

## 4. International public-service benchmarks

All entries in this section were verified from fetched page text [H]. Typefaces, colours and above-the-fold composition were **not** observed and are not claimed.

#### GOV.UK

- **Website / organisation:** GOV.UK: Past Prime Ministers
- **URL:** https://www.gov.uk/government/history/past-prime-ministers and https://www.gov.uk/government/history/past-prime-ministers/clement-attlee [H]
- **Country/context:** UK. Government history section.
- **What they do well:** A fixed **"fact sheet, then narrative"** template: "Born / Died / Dates in office / Political party / Major acts / Interesting facts / Biography / Related content". "Major acts" lists laws with one-line descriptions. The index is reverse-chronological, grouped by century and separated by rules, and date ranges use a plain "to" ([GOV.UK Attlee](https://www.gov.uk/government/history/past-prime-ministers/clement-attlee)).
- **What we should learn from it:** A facts block at the top of About and Public Life, with fixed bilingual labels, followed by prose. "Major works" at municipal scale is "major works/resolutions", each with one line and a year, and each with a provenance label.
- **What we should NOT copy:** Portraits without caption or credit; no author attribution; a utilitarian look without editorial photography.
- **Relevant area:** Biography, roles and terms, factual tone.

#### Willy Brandt online biography and Bundeskanzler Willy Brandt Stiftung

- **Website / organisation:** Willy Brandt online biography and Bundeskanzler Willy Brandt Stiftung
- **URL:** https://www.willy-brandt-biography.com/, https://www.willy-brandt-biography.com/politics/ and https://www.willy-brandt.de/ [H]
- **Country/context:** Germany/Norway. Joint foundation biography, trilingual; foundation site in German/English.
- **What they do well:** The life is split into **eight dated periods named after roles** ("1957-1966: Governing Mayor era"), each expanding into years. Twelve thematic essays carry the pattern "subtitle – topic + date range". A header switches between three languages. Photo credits name the archive and the photographer ("Bundesregierung/Georg Bauer, bpk/Hanns Hubmann"). The foundation keeps the person's record (biography, speeches, publications) under one nav item named after the person, separate from news ([Brandt biography](https://www.willy-brandt-biography.com/); [willy-brandt.de](https://www.willy-brandt.de/)).
- **What we should learn from it:** Periodise by role or term, not by arbitrary decades. Give Work & Initiatives thematic essays with date ranges. Credit "Photo: ‹name›, ‹collection›".
- **What we should NOT copy:** German captions left on English pages; the foundation's language switch in the **footer**; a large quotation used as a homepage tagline, which at municipal scale reads as a slogan.
- **Relevant area:** Biography, timeline, themes, credits, multilingual.

#### Barack Obama Presidential Library

- **Website / organisation:** Barack Obama Presidential Library (US National Archives)
- **URL:** https://www.obamalibrary.gov/ [H] (the /timeline content is JavaScript-rendered and unreadable to the fetcher)
- **Country/context:** USA. A presidential library, deliberately preferred over the foundation's marketing site.
- **What they do well:** Seven plain-noun nav items, with "News" last ("The Obamas, Timeline, Photos & Videos, Artifacts, Research, About Us, News"); photos carrying archival IDs such as "P101813PS-0012" ([Obama Library](https://www.obamalibrary.gov/)).
- **What we should learn from it:** Timeline and photographs as first-level destinations; catalogue IDs on every item; current activity last in the hierarchy.
- **What we should NOT copy:** A hero quote about the subject's own story (self-promotional at municipal scale); a JavaScript-only timeline; the Digital Research Room's FOIA-case-number framing ([DRR](https://www.obamalibrary.gov/digital-research-room) [H]). The foundation site ([obama.org](https://www.obama.org/) [H]) is the template to avoid: video hero, "Be an insider", membership, Donate.
- **Relevant area:** Navigation, cataloguing, timeline.

#### Václav Havel Library

- **Website / organisation:** Václav Havel Library ("1. prezidentská knihovna")
- **URL:** https://www.vaclavhavel.cz/ and https://www.vaclavhavel.cz/en/vaclav-havel/biography [H]
- **Country/context:** Czech Republic. Czech/English library and archive.
- **What they do well:** An "EN" toggle in the header with parallel /cs/ and /en/ paths; a homepage **milestone strip** (1936–2011) with thumbnail, date and short caption; the life organised by role (Dissident, Theatre, President, Works) plus "Havel's Place", which documents locations ([vaclavhavel.cz](https://www.vaclavhavel.cz/)).
- **What we should learn from it:** A short milestone glimpse on the homepage; place as a dimension of a life (for us, wards and localities as metadata, not pages).
- **What we should NOT copy:** The English biography page said "We are working on this page", so **never launch the second language half-built** (the approved parity gate prevents this); images without credits; E-shop and "Support us" in primary nav.
- **Relevant area:** Bilingual handling, timeline glimpse, place.

#### Nelson Mandela Foundation

- **Website / organisation:** Nelson Mandela Foundation: biography page
- **URL:** https://www.nelsonmandela.org/biography [H] (homepage https://www.nelsonmandela.org/ as counter-example [H])
- **Country/context:** South Africa. Foundation.
- **What they do well:** Chronological narrative under plain phase headings ("Entering politics", "The Treason Trial", "President"); exact dates written in full ("18 July 1918"); plain descriptive captions ("Nelson Mandela on the roof of Kholvad House in 1953"); notes that correct historical details ([Mandela biography](https://www.nelsonmandela.org/biography)).
- **What we should learn from it:** "Who, where, year" captions; full written dates; visible corrections as a mark of honesty. Under decision 0004 we take the corrections idea but not footnote markers (see [§15](#15-key-page-concepts)).
- **What we should NOT copy:** The homepage: a donation hero, an impact-metrics band ("9.1 million+ beneficiaries"), brand-campaign copy, merchandise, and the biography buried.
- **Relevant area:** Biography writing, captions, corrections, anti-patterns.

#### Bundeskanzler-Helmut-Schmidt-Stiftung

- **Website / organisation:** Bundeskanzler-Helmut-Schmidt-Stiftung
- **URL:** https://www.helmut-schmidt.de/ [H]
- **Country/context:** Germany. German/English foundation.
- **What they do well:** A header language toggle; **Sign Language** and **Easy Language** options; a dated, theme-tagged "Aktuelles" list; "©" and source on every thumbnail ("© BKHS", "© dpa/picture alliance") ([helmut-schmidt.de](https://www.helmut-schmidt.de/)).
- **What we should learn from it:** Current activity as a dated, tagged log, not a call to action; a credit on every image, including thumbnails.
- **What we should NOT copy:** The motto hero "DIALOG. IMPULSE. HALTUNG."; stock-image credits ("© Canva"), which undermine archival credibility.
- **Relevant area:** Updates, credits, accessibility.

#### Jimmy Carter Presidential Library and Museum

- **Website / organisation:** Jimmy Carter Presidential Library and Museum (NARA)
- **URL:** https://www.jimmycarterlibrary.gov/ [H]
- **Country/context:** USA. Presidential library.
- **What they do well:** Audience pathways (Museum Visitors, Researchers, Students & Educators), each paired with a dated archival photograph with a contextual caption ([Carter Library](https://www.jimmycarterlibrary.gov/)).
- **What we should learn from it:** Pair each homepage section with one dated, captioned archival image. The Press Kit acts as the "for journalists" pathway.
- **What we should NOT copy:** A hero built around visitor logistics and tickets.
- **Relevant area:** Homepage sectioning, audience routes.

#### LaGuardia and Wagner Archives

- **Website / organisation:** LaGuardia and Wagner Archives (CUNY)
- **URL:** https://laguardiawagnerarchive.lagcc.cuny.edu/ [H]
- **Country/context:** USA. The only verified **city-government-scale** (mayoral) reference.
- **What they do well:** Per-mayor collection tiles ("Investigate our [Mayor] collection"); catalogue IDs in image paths ("06.012.0672"); photo-reproduction requests ([LaGuardia & Wagner](https://laguardiawagnerarchive.lagcc.cuny.edu/)).
- **What we should learn from it:** Municipal records can be catalogued with the same rigour as national ones.
- **What we should NOT copy:** Its generic visual design.
- **Relevant area:** Cataloguing at municipal scale.

**Category conventions and lessons.** Credible international profiles are mostly **archives and state bodies**, and their authority comes from a custodial role. A personal site borrows that authority by adopting archival conventions: exact dates, consistent fact labels, credits, catalogue IDs, corrections and a third-person institutional voice ([GOV.UK](https://www.gov.uk/government/history/past-prime-ministers/clement-attlee), [Brandt](https://www.willy-brandt-biography.com/), [Obama Library](https://www.obamalibrary.gov/)). Promotion, even in respected foundations, shows up as donation heroes, impact counters, motto heroes and merchandise ([Mandela homepage](https://www.nelsonmandela.org/), [obama.org](https://www.obama.org/), [Schmidt](https://www.helmut-schmidt.de/)). Navigation is four to seven plain nouns with the person's record before institutional matters. Gaps: no living person's individual site and no Indian municipal legacy site with strong design was found. UK Parliament member pages returned 403 [B].

---

## 5. Archive benchmarks

#### Wellcome Collection

- **Website / organisation:** Wellcome Collection: catalogue item pages
- **URL:** https://wellcomecollection.org/works/vq7jhqgp and https://wellcomecollection.org/works/a2239muq [H]
- **Country/context:** UK. Museum and library; the standard reference for rights and credit on item pages.
- **What they do well:** A short item header (title, "Date", "Reference", format chips, View, Downloads in two sizes). A **"Licence and re-use"** block that names the licence, explains it in one plain sentence and offers a ready-made Credit line with a **"Copy credit information"** button. Uncertainty written into the field ("Photograph **probably** by …"). A "Permanent link — Copy URL". **"More works" built from the item's own facets**, including a decade chip ("From 1800s"). For in-copyright items, honest wording: "It is possible this item is protected by copyright…" ([Wellcome item](https://wellcomecollection.org/works/vq7jhqgp); [Wellcome book item](https://wellcomecollection.org/works/a2239muq)).
- **What we should learn from it:** The rights-and-credit block and facet-based related items are the core of our item page. "Probably" is the model for `supplied` and `media-reported` wording.
- **What we should NOT copy:** Library-only fields ("Where to find it", request, sign-in); catalogue-style titles that repeat type and date ("…Photograph, 1897."). Ours read as human captions.
- **Relevant area:** Item pages, rights, related items.

#### Museum of Art & Photography

- **Website / organisation:** Museum of Art & Photography (MAP), Bengaluru
- **URL:** https://map-india.org/collections/ and https://map-india.org/collections/cumulus/photography/PHY.40025/?id=77515 [H]
- **Country/context:** India. Private museum; the closest Indian institutional peer, including photographs of pre-Independence political life.
- **What they do well:** A three-tier collections landing: Browse by Department, then named **Special Collections**, then six highlights rather than the 100,000-object total. The catalogue entry stores **Period "1901-1950"** separately from the display **Date "early 20th century - mid 20th century"**, has a **Credit Line** naming the donor, and invites **"Suggest an edit: All catalogue entries at MAP are a work in progress…"** with the accession number ([MAP item](https://map-india.org/collections/cumulus/photography/PHY.40025/?id=77515)).
- **What we should learn from it:** A machine-sortable range alongside a human date string (our model already has `precision` and `approximate`); "supplied by the family" written as a credit line; a correction invitation that asks for the item reference.
- **What we should NOT copy:** JavaScript-heavy special-collection pages that rendered no text; accession codes as the headline of highlight cards; "Unknown" in the maker slot (our spec forbids "Unknown"). An item-level rights statement was not seen.
- **Relevant area:** Item metadata, approximate dates, corrections, collection landing.

#### Indian Memory Project

- **Website / organisation:** Indian Memory Project
- **URL:** https://www.indianmemoryproject.com/ and https://indianmemoryproject.com/232-2/ [H]
- **Country/context:** India/UK. Small, story-led community archive of family photographs.
- **What they do well:** Each item is an editorial headline, a caption naming people and relationships with a place (modern name in brackets) and "**Circa 1911**", a contributor credit that states the family relationship, and a narrative that admits uncertainty ("most likely", "no one knows"). Decade browsing and event buckets that hold only **12 and 7 entries** still feel rich because every entry carries a story. Image rights and text rights are separated, with a contributor-privacy promise ([IMP story](https://indianmemoryproject.com/232-2/); [IMP home](https://www.indianmemoryproject.com/)).
- **What we should learn from it:** The model for `supplied` material and for a small archive that feels human. Write "c." plainly.
- **What we should NOT copy:** Tag sprawl; generic WordPress slugs; threatening rights wording; no structured metadata. Naming private individuals conflicts with our privacy rules (spec G §6): name public figures only and describe others by role, unless consent is recorded.
- **Relevant area:** Captions, family provenance, small-archive design.

#### Densho Digital Repository

- **Website / organisation:** Densho Digital Repository
- **URL:** https://ddr.densho.org/, https://ddr.densho.org/browse/ and https://ddr.densho.org/interviews/ddr-densho-1000-1-1/ [H] (search behind a bot check [B])
- **Country/context:** USA. Community archive of oral histories, photographs and documents.
- **What they do well:** A one-sentence human promise on the landing page. **Four browse lenses, each defined in one line** (Narrators, Collections, Topics, Facilities). Interviews split into **segments** with a description, duration and position ("00:03:44 — Segment 1 of 37"), previous/next, and per-segment and full transcripts. A plain-language rights summary ("**Free to use** …") above the licence, plus "Preferred citation: Courtesy of Densho" ([Densho segment](https://ddr.densho.org/interviews/ddr-densho-1000-1-1/)).
- **What we should learn from it:** Chaptered video with one-line descriptions and transcripts; one-line lens definitions; a rights badge in plain words.
- **What we should NOT copy:** 30 identical "VIEW OBJECT" links (poor for screen readers); empty metadata fields left visible; transcripts as downloads only.
- **Relevant area:** Video, browse structure, rights badge.

#### John F. Kennedy Presidential Library

- **Website / organisation:** John F. Kennedy Presidential Library: asset viewer
- **URL:** https://www.jfklibrary.org/asset-viewer/archives/jfkwha-001 [R] (WebFetch returned 403 [B])
- **Country/context:** USA. One person's institutional archive.
- **What they do well:** An ordered "About" panel with Digital Identifier, Date(s) of Materials, short Copyright Status plus an expandable notice, **Preferred Citation**, **Associated Record(s)** linking other media of the same event, and "Page Last Updated" ([JFK asset](https://www.jfklibrary.org/asset-viewer/archives/jfkwha-001)).
- **What we should learn from it:** "Same event" linking across photo, clipping and video is the most valuable related-items rule for a public life.
- **What we should NOT copy:** Bureaucratic labels ("Archival Creator(s)") and long legal boilerplate.
- **Relevant area:** Item metadata, citation, cross-media linking.

#### Churchill Archive

- **Website / organisation:** Churchill Archive
- **URL:** https://www.churchillarchive.com/ and https://www.churchillarchive.com/taxonomy?id=CA_FCT_000006 [H]
- **Country/context:** UK. One person's document archive (800,000+ documents).
- **What they do well:** The homepage leads with a curated **"Topic in Focus"**, then "Explore by Topic / People / Place / Period", "Ask the Archivist" and "Previous topics in focus". Periods follow the life ("1914-1918", "1939-1945") ([Churchill Archive](https://www.churchillarchive.com/)).
- **What we should learn from it:** One curated feature first, then lenses; periods tied to life phases; a back catalogue of past features; an archivist or corrections route.
- **What we should NOT copy:** **Item counts on taxonomy links**, which suit 800,000 documents but would expose thin categories at our scale; paywalled research framing.
- **Relevant area:** Archive landing, period browsing.

#### Trove

- **Website / organisation:** Trove (National Library of Australia): newspaper article view
- **URL:** https://trove.nla.gov.au/newspaper/article/2084491 [R] (fetch blocked by a bot check [B])
- **Country/context:** Australia. National digitised newspapers.
- **What they do well:** The breadcrumb is a full citation (newspaper with years › date › page › headline); an article-text panel; previous/next article; a text-corrections counter; a digitisation funder credit ([Trove article](https://trove.nla.gov.au/newspaper/article/2084491)).
- **What we should learn from it:** A press item is *publication · date · page · headline · excerpt · link*, which is exactly the approved citation-first default (decision 0006).
- **What we should NOT copy:** Heavy chrome, sign-up prompts, dependence on a large OCR corpus.
- **Relevant area:** Press coverage, transcription, citation.

**Secondary archive references.** The [Rijksmuseum](https://www.rijksmuseum.nl/en/collection/SK-C-5) [H] puts a narrative paragraph *above* the metadata and lists "Persons depicted". The [1947 Partition Archive](https://in.1947partitionarchive.org/) [H] shows map-first place discovery, which is too heavy for our scale. [RightsStatements.org](https://rightsstatements.org/page/1.0/?language=en) [H] provides 12 standard rights statements, including "Copyright Undetermined", which suit family and press material. [Cogapp's review](https://www.cogapp.com/blog/what-makes-an-image-viewer-accessible) [H] found few accessible museum image viewers and recommends keyboard operation, labelled buttons, visible focus and long descriptions. The Mandela archive ([archive.nelsonmandela.org](https://archive.nelsonmandela.org/)) and loc.gov were behind bot checks [B].

**Category conventions and lessons.** No single archive combines what we need. Our ideal item page is **Wellcome's rights and credit + MAP's date honesty and "suggest an edit" + Indian Memory Project's human caption + JFK's associated records + Densho's segmented video**. The highest-value patterns concern *trust and voice*, not volume: plain-language provenance, honest approximation, a correction route, curated sets before browsing. The Indian peers are weaker than Western institutions on permalinks, rights clarity and accessibility. A carefully built static site could outclass them with modest effort.

---

## 6. Editorial/documentary benchmarks

Fonts and container widths below come from the sites' own CSS [H]. Layout descriptions are inferred from markup, not screenshots.

#### People's Archive of Rural India

- **Website / organisation:** People's Archive of Rural India (PARI)
- **URL:** https://ruralindiaonline.org/ and https://ruralindiaonline.org/article/in-2023-writing-with-light [H]
- **Country/context:** India. Multilingual journalism and archive platform ("15 भाषाओं में").
- **What they do well:** A single **Noto Sans superfamily with per-script variables**, so Hindi is never a fallback; every story anchored to a **place and date**; a visible language count and switcher per story; captions followed by the photographer in parentheses; nested containers (768 px text, up to 1232 px media) ([PARI](https://ruralindiaonline.org/); [PARI article](https://ruralindiaonline.org/article/in-2023-writing-with-light)).
- **What we should learn from it:** Script parity as infrastructure; place + date as the archival habit; a narrow text column inside a wide media frame.
- **What we should NOT copy:** A dense category homepage; donation prompts; an all-sans system that loses dignity at display sizes; an English date line on Hindi pages (see [§8](#8-hindi--english-ux-research)).
- **Relevant area:** Bilingual type, captions, layout widths.

#### Fifty Two

- **Website / organisation:** Fifty Two (52)
- **URL:** https://fiftytwo.in/ and https://fiftytwo.in/story/allegiance/ [H]
- **Country/context:** India. Weekly long-form narrative non-fiction, often historical.
- **What they do well:** The clearest Indian **four-role type system**: Hatton display serif, Literata book serif, Söhne sans for UI, Söhne Mono for metadata. Short titles with a descriptive deck, a "Synopsis" before the long read, and a full credits roll ([Fifty Two](https://fiftytwo.in/story/allegiance/)).
- **What we should learn from it:** Role-based typography; a synopsis/standfirst for the biography; transparent credits (writer, translator, photographer).
- **What we should NOT copy:** Loud coral `#f4526d` and amber `#fab234` accents; illustration-led, commercial magazine energy; a fashionable high-contrast display face likely to date ([Fifty Two homepage](https://fiftytwo.in/)).
- **Relevant area:** Typography hierarchy, long-form reading.

#### The Caravan

- **Website / organisation:** The Caravan: photo essays
- **URL:** https://caravanmagazine.in/communities/a-personal-archive-of-longing-that-traces-a-life-across-lost-cities [H]
- **Country/context:** India. Long-form politics and culture journal.
- **What they do well:** Long, contextual, dated captions that work as micro-narratives; separate credits ("Photographs by … text by …"); pull quotes in the *subject's* voice; horizontal rules instead of boxes; STIX Two Text with `max-width:42rem` text containers ([Caravan](https://caravanmagazine.in/communities/a-personal-archive-of-longing-that-traces-a-life-across-lost-cities)).
- **What we should learn from it:** Captions that carry provenance; rules over cards; a 42rem measure.
- **What we should NOT copy:** Mid-article paywall and contribution prompts; Montserrat labels.
- **Relevant area:** Captions, photo essays, layout rhythm.

#### Magnum Photos

- **Website / organisation:** Magnum Photos
- **URL:** https://www.magnumphotos.com/arts-culture/europes-living-room/ [H]
- **Country/context:** International photographers' cooperative.
- **What they do well:** A strict caption grammar: "The Devonshire Arms. London, UK. July 30, 2026. © Mark Power / Magnum Photos". Images grouped in runs of two or three with one witness quote. `prefers-reduced-motion` in CSS ([Magnum](https://www.magnumphotos.com/arts-culture/europes-living-room/)).
- **What we should learn from it:** A fixed, repeatable caption order; sequencing by event.
- **What we should NOT copy:** Commercial CTAs ("Commission a Magnum photographer"); 61 script tags on the homepage.
- **Relevant area:** Captions, photo sequencing.

#### The Guardian Long Read

- **Website / organisation:** The Guardian Long Read
- **URL:** https://www.theguardian.com/news/series/the-long-read [H via curl; WebFetch blocked]
- **Country/context:** UK. Daily newspaper long-form series.
- **What they do well:** Short noun-phrase H2 chapters named after places or themes; about four pull quotes and eight images per piece; every caption ending "Photograph: Name/Agency"; a fully custom type family including a slab ("Egyptian") text serif ([Guardian article](https://www.theguardian.com/news/2026/sep/29/why-am-i-obsessed-with-chinas-ancient-golden-age-i-took-my-daughter-on-a-trip-to-find-out)).
- **What we should learn from it:** Chapter headings that double as a table of contents; credit inside the caption.
- **What we should NOT copy:** Ads, support banners, dense nav, section colour coding, and the drop cap (which does not transfer to Devanagari; see [§17](#17-bilingual-design-system)).
- **Relevant area:** Long-form structure, captions.

#### Wellcome Collection Stories

- **Website / organisation:** Wellcome Collection Stories
- **URL:** https://wellcomecollection.org/stories and https://wellcomecollection.org/stories/close-encounter-with-a-medieval-birth-scroll [H]
- **Country/context:** UK. Editorial arm of a free museum and library.
- **What they do well:** Labelled story formats ("Article", "Photo story", "In pictures"); captions with photographer, year, catalogue reference and a CC licence line; "About the contributors"; IBM Plex Mono for metadata; stories that link back to catalogue items ([Wellcome Stories](https://wellcomecollection.org/stories)).
- **What we should learn from it:** Collections can be stories with a named author that link items; an institutional voice can still be warm.
- **What we should NOT copy:** A playful custom display face; pronoun-led bylines and museum-services footer.
- **Relevant area:** Collections as stories, captions with rights.

**Secondary editorial references.** [Emergence Magazine](https://emergencemagazine.org/essay/new-life-for-the-ezo-spruce) [H] credits the translator in the byline and offers audio versions. [The Pudding](https://pudding.cool/) [H] ships two script tags on its homepage, proof that lean is possible. [The Marshall Project](https://www.themarshallproject.org/) [H] shows a sober Scotch-roman serif suits civic gravity. [Serendipity Arts Festival](https://www.serendipityartsfestival.com/) [H] uses `max-width:65ch`. Counter-examples for weight: Aperture's homepage HTML alone is about 1.1 MB with 55 scripts ([Aperture](https://aperture.org/) [H]); Noema has 109 scripts ([Noema](https://www.noemamag.com/) [H]). NYT Magazine returned 403 [B].

**Category conventions and lessons.** Premium editorial sites use **three or four type roles** (display, book serif, sans for UI/captions, often mono for metadata), hold text to about 42rem/65ch inside a wider media frame, separate content with **rules and space rather than cards**, and let **photographs carry the colour** ([Fifty Two](https://fiftytwo.in/), [Caravan](https://caravanmagazine.in/), [PARI](https://ruralindiaonline.org/)). Every strong reference treats captions as content. Heavy script loads correlate with commerce, ads and page builders, not quality: homepage script counts ran from 2 (Pudding) and 4 (Caravan) to 61 (MAP, Magnum) and 109 (Noema) [M]. Fashionable display faces (Hatton, Syne at [Kochi-Muziris Biennale](https://kochimuzirisbiennale.org/), Eksell) give a "magazine of 2024–26" look that will date.

---

## 7. Jabalpur/Madhya Pradesh visual research

**What the place actually looks like.** The research produced a factual basis for the palette and photography. **Bhedaghat marble** is dolomitic, in "different shades like white, grey, pink and bluish grey" ([UNESCO tentative list 6531](https://whc.unesco.org/en/tentativelists/6531) [S, direct fetch 403]; mirrored at [worldheritagesite.org](https://www.worldheritagesite.org/tentative/id/6531)). It is described as mainly pure white with grey, yellow or pink tinges and dark green or black volcanic veins ([Marble Rocks, Wikipedia](https://en.wikipedia.org/wiki/Marble_Rocks) [H; the article is flagged for citations]). Madan Mahal fort stands on a **granite** hillock and was built of local granite ([Outlook Traveller](https://www.outlooktraveller.com/destinations/india/all-you-need-to-know-about-the-madan-mahal-in-madhya-pradesh); [Incredible India](https://www.incredibleindia.gov.in/en/madhya-pradesh/jabalpur/madan-mahal-fort) [S]). The Narmada is described as clear and blueish in the dry season ([eSamskriti](https://esamskriti.com/a/Madhya-Pradesh/Marble-Rocks-Jabalpur.aspx) [S]) and a deep, muddy torrent in the monsoon ([The Hitavada, Aug 2026](https://www.thehitavada.com//Encyc/2026/8/24/overflowing-reservoirs-seasonal-waterfalls-monsoon-brings-out-its-hidden-natural-beauty-in-sanskardhani.html) [S]). The civic city is **brick and lime**: the High Court by Henry Irwin is "constructed in brick-lime with ornamental towers and cornices" ([Wikipedia](https://en.wikipedia.org/wiki/Madhya_Pradesh_High_Court) [H; its construction dates conflict internally]). In 1923 the national flag was hoisted on the Jabalpur **municipal building** during the Flag Satyagraha ([The Hitavada](https://thehitavada.com/Encyc/2023/8/13/-Jhanda-Satyagraha-Nagpur-led-stand-against-the-British-100-years-ago.html) [S]), a civic-historical link that suits a municipal-scale public life better than temples or waterfalls. Jabalpur's literary identity is Hindi print and argument (Harishankar Parsai settled there and launched *Vasudha* in the mid-1950s ([Wikipedia](https://en.wikipedia.org/wiki/Harishankar_Parsai) [H])). That argues for excellent Devanagari typography and newspaper-archive presentation rather than iconography. **No published colour data exists** for the rock or the water, so every hex value in this report is an estimate.

#### Bharat Bhavan, Bhopal

- **Website / organisation:** Bharat Bhavan, Bhopal (architecture by Charles Correa)
- **URL:** https://www.architecturelab.net/bharat-bhavan-charles-correa/ [S]; https://charlescorreafoundation.org/2019/10/17/bharat-bhavan-listed-amongst-the-top-20-most-visited-ad-architecture-classics-by-archdaily/ [S]; official site not verified
- **Country/context:** Madhya Pradesh. State-commissioned multi-arts complex (1982) on terraces stepping down to the Upper Lake.
- **What they do well:** MP identity expressed through **landform, sequence and material**, not ornament; tribal and folk art shown with curatorial seriousness ([Architecture Lab](https://www.architecturelab.net/bharat-bhavan-charles-correa/)).
- **What we should learn from it:** Express "river" through structure: the Timeline as a calm path, content that steps down like ghats. Any regional art is curated and credited.
- **What we should NOT copy:** Its programme, architectural vocabulary or (unverified) signage.
- **Relevant area:** Timeline metaphor, art policy.

#### Museum of Tribal Heritage, Bhopal

- **Website / organisation:** Museum of Tribal Heritage, Bhopal (architect Revati Kamath)
- **URL:** https://www.kamathdesign.org/?p=2970 [S]; https://www.outlookindia.com/traveller/mp/inspire-me/culture/view-life-tribal-museum-bhopal/ [S]
- **Country/context:** Madhya Pradesh. State museum built with tribal artists, with a facade mural by the Gond artist Durga Bai.
- **What they do well:** Tribal art appears as **named authorship** and community making, not a pattern library.
- **What we should learn from it:** If Gond art ever appears, it is a named, commissioned, paid work with a museum-style caption.
- **What we should NOT copy:** Its maximal, saturated, immersive aesthetic, which is right for a museum and wrong for a civic archive.
- **Relevant area:** Art policy and ethics.

#### Supriya Lele and Jamie Hawkesworth, *Narmada*

- **Website / organisation:** Supriya Lele and Jamie Hawkesworth, *Narmada* (photobook, 2020)
- **URL:** https://www.anothermag.com/fashion-beauty/13006/supriya-lele-and-jamie-hawkesworths-dreamy-trip-down-the-narmada-river [H]
- **Country/context:** A photobook made in Jabalpur by a designer with Jabalpur family roots and a documentary photographer.
- **What they do well:** The clearest proof that Jabalpur and the Narmada can be shown through **people, everyday light and close observation** in a contemporary premium register, with no tourist cliché ([AnOther](https://www.anothermag.com/fashion-beauty/13006/supriya-lele-and-jamie-hawkesworths-dreamy-trip-down-the-narmada-river)).
- **What we should learn from it:** A tonal brief for the commissioned photographer: natural light, residents photographed with consent, river edges as lived space, soft colour without orange grading. The palette was not described in the article, so this is an inference.
- **What we should NOT copy:** Its fashion-editorial framing; its images (copyrighted, so neither reuse nor pastiche).
- **Relevant area:** Photography direction.

#### PARI

- **Website / organisation:** PARI: "The visual storyteller of Patangarh"
- **URL:** https://wagtail.ruralindiaonline.org/en/articles/the-visual-storyteller-of-patangarh/ [H via mirror; canonical path assumed]
- **Country/context:** Madhya Pradesh (Dindori district). Photo-story on a Pardhan Gond painter.
- **What they do well:** Names every artist and photographer; pairs work with portrait and place; documents that "paintings created by non-Gond artists are often sold as Gond art" ([PARI](https://wagtail.ruralindiaonline.org/en/articles/the-visual-storyteller-of-patangarh/)).
- **What we should learn from it:** Captioning discipline, and the factual case against using Gond art decoratively: it is a Dindori/Mandla tradition, not Jabalpur's, and its misuse harms artists.
- **What we should NOT copy:** Any Gond imagery; PARI's rural-reportage framing.
- **Relevant area:** Captions, art policy.

#### Jabalpur Smart City logo competition

- **Website / organisation:** Jabalpur Smart City logo competition (anti-reference)
- **URL:** https://www.mygov.in/task/jabalpur-smart-city-logo-competition [S]; mptourism.com and jabalpur.nic.in not fetched
- **Country/context:** Jabalpur. Public logo competition (112+ approved entries).
- **What they do well:** It documents the local civic visual default.
- **What we should learn from it:** Entries stack a Shiva linga, a circuit symbol, mountains and a blue river line, or a "J" made of roads with Wi-Fi symbols ([MyGov](https://www.mygov.in/task/jabalpur-smart-city-logo-competition)). **The river line is already a local trope**, so ours must be far quieter: one hairline, never a glyph or logo.
- **What we should NOT copy:** Symbol stacking, religious iconography, waterfall heroes, saturated gradients.
- **Relevant area:** Motif, logo, hero.

**Category conventions and lessons.** Credible MP institutions express place through architecture, material and credited authorship. Tourism and civic branding express it through stacked symbols. Serious Narmada photography exists (Samuel Bourne's 1860s albumen prints at the [Rijksmuseum](https://www.rijksmuseum.nl/en/collection/object/RP-F-2005-107-239--9caac1b1f59c920cdcb15c4be1f4efcc) [H]; a people-centred river photograph c.1920–40 at [Yale](https://collections.library.yale.edu/catalog/16718451) [H]), and it is about people and light, not spectacle. **The real landscape is cool and mineral (white, grey, blue-green water, dark rock) with one warm note** (the pink band in the marble, or monsoon silt). That supports the approved "Narmada accent plus at most one warm secondary" and gives a factual reason to avoid saffron. Local signage, ghats and bazaars were **not** documented in this research and need a local photographic survey.

---

## 8. Hindi + English UX research

### 8.1 Bilingual references

#### Canada.ca design system

- **Website / organisation:** Canada.ca design system: Language toggle
- **URL:** https://design.canada.ca/common-design-patterns/language-toggle.html [H]
- **Country/context:** Canada. Mandatory two-language toggle on federal pages; the closest structural analogue.
- **What they do well:** Top-right placement; shows **only the other language's endonym**; links to the **same page** in the other language; it is a link, not a button; marked for assistive technology and protected from browser auto-translation; 16 px desktop and 18 px mobile ([Canada.ca](https://design.canada.ca/common-design-patterns/language-toggle.html)).
- **What we should learn from it:** Our switch spec almost verbatim: "English" on /hi/, "हिंदी" on /en/, `lang`, `hreflang`, `translate="no"`.
- **What we should NOT copy:** "EN/FR" codes on mobile. "English" and "हिंदी" are short enough to stay in full, and "HI" is far less recognisable to Hindi readers (inference).
- **Relevant area:** Language switch.

#### Welsh Language Commissioner

- **Website / organisation:** Welsh Language Commissioner: *Bilingual Design Guide* (2014)
- **URL:** https://www.welshlanguagecommissioner.wales/media/niknstqs/bilingual-design-guide-eng.pdf [H, PDF text]
- **Country/context:** Wales. Statutory equal-treatment regime.
- **What they do well:** "Going straight to the same page in the other language"; toggle top right; neither language treated "less favourably" in "font, format, colour, size, clarity, prominence or quality"; no decorative typeface for one language only; start design with **real text in both languages** ([Bilingual Design Guide](https://www.welshlanguagecommissioner.wales/media/niknstqs/bilingual-design-guide-eng.pdf)).
- **What we should learn from it:** Typographic **parity** as a rule, including no English-only typographic devices (tracked uppercase kickers, drop caps) that Hindi cannot share.
- **What we should NOT copy:** The 2014 bilingual splash-page recommendation, which conflicts with newer guidance to land users on content ([Google Search Central](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites) [H]) and with the approved `/` → `/hi/` redirect.
- **Relevant area:** Parity, switch, design process.

#### Hindwi

- **Website / organisation:** Hindwi (Rekhta Foundation)
- **URL:** https://www.hindwi.org/ [H]
- **Country/context:** India. Hindi literature archive; the closest Hindi archive IA.
- **What they do well:** Short native nav nouns ("कवि", "कविता", "गद्य", "शब्दकोश", "संग्रहालय"); Latin slugs in a Hindi-first site; dates such as **"06 अक्तूबर 2026"** (Hindi month name, Western digits) ([Hindwi](https://www.hindwi.org/)).
- **What we should learn from it:** The Hindi date pattern that matches decision 0002; short, common Hindi labels.
- **What we should NOT copy:** The language selector in the **footer**; slugs that mix transliterated Hindi and English.
- **Relevant area:** Dates, nav labels, archive IA.

#### Amar Ujala

- **Website / organisation:** Amar Ujala
- **URL:** https://www.amarujala.com/ [H]
- **Country/context:** India. Major Hindi daily.
- **What they do well:** **Western digits throughout Hindi headlines** ("350 करोड़", "95 प्रतिशत"), large amounts as digits plus लाख/करोड़; English-word, date-suffixed slugs ([Amar Ujala](https://www.amarujala.com/)).
- **What we should learn from it:** Mainstream Hindi publishing supports the approved numeral decision.
- **What we should NOT copy:** **English month abbreviations ("07 Oct 2026") on Hindi pages**; dense, ad-heavy layout.
- **Relevant area:** Numerals, dates.

#### Reserve Bank of India

- **Website / organisation:** Reserve Bank of India
- **URL:** https://www.rbi.org.in/ [H]
- **Country/context:** India. Institution with a formal Hindi/English obligation.
- **What they do well:** A header endonym link spelled **"हिंदी"**, exactly the approved spelling ([RBI](https://www.rbi.org.in/)).
- **What we should learn from it:** Indian institutional precedent for the label.
- **What we should NOT copy:** Switching via ASP.NET `__doPostBack` (no crawlable URL); a redundant dropdown alongside the link.
- **Relevant area:** Switch label, URL anti-pattern.

### 8.2 Supporting standards and further references

| Reference | Verified | Key finding |
|---|---|---|
| [USWDS: two languages](https://designsystem.digital.gov/patterns/select-a-language/two-languages/) | [H] | Upper corner; native-language label; go to equivalent page; **avoid auto-redirect by location or browser**; avoid flags |
| [Google Search Central](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites) | [H] | Subdirectories recommended; URL parameters "Not recommended"; avoid automatic language redirects; boilerplate-only translation is a bad experience |
| [W3C i18n: language selection](https://www.w3.org/International/questions/qa-navigation-select) | [H] | Endonyms; "top right increases visibility"; avoid the bottom of the page |
| [Nasfi 2023, UNIGE](https://archive-ouverte.unige.ch/unige:174268) | [H] | Users show "a clear preference for the top position" on mobile and desktop |
| [PARI Hindi](https://ruralindiaonline.org/hi/) | [H] | Fully native Hindi chrome, but `?locale=hi` links and an **English date line** ("WEDNESDAY, OCTOBER 7, 2026") on Hindi pages |
| [Rekhta](https://www.rekhta.org/?lang=hi) | [H] | Identical IA across scripts (good); `?lang=` parameters and "ENG / HIN / URD" codes in the footer (bad) |
| [Constitution of India, Art. 343](https://www.constitutionofindia.net/articles/article-343-official-language-of-the-union) | [H] | Official numerals are "the international form of Indian numerals" |
| [GOV.UK Design Notes, 2024](https://designnotes.blog.gov.uk/2024/11/14/how-can-we-test-our-designs-with-welsh-speaking-users/) | [S] | Fluent bilingual users still switch to check technical or legal terms |
| [KPMG–Google, 2017](https://kpmg.com/ky/en/home/insights_new/2017/04/indian-language-internet-users.html) | [H] | Forecast: Indian-language users about 75% of Indian internet users by 2021, trusting local-language content more (a 2017 forecast, not a current measurement) |
| bbc.com/hindi, ndtv.in, india.gov.in, MeitY localisation PDF | [B] | Not verifiable by fetch for UX; GIGW 3.0 primary text not retrieved |

### 8.3 What the bilingual research concludes

The approved decisions match the standards: header endonym switch to the equivalent page, prefixed `/hi/` and `/en/`, shared Latin slugs, Western numerals and "हिंदी". **None of the Indian sites sampled combines path-prefixed URLs, a header endonym switch and fully localised chrome**, so the approved design is ahead of its peers. The recurring failures are **mixed-language chrome** (English dates on Hindi pages at PARI and Amar Ujala), **parameter or JavaScript switching** (Rekhta, PARI, RBI), **switches hidden in footers or labelled with codes** (Hindwi, Rekhta), **wrong `lang`** (narendramodi.in/hi) and **typographic inequality**. Two technical refinements emerged: `x-default` should target the 200-status `/hi/` URL rather than the redirecting `/`, and single-language items need a defined switch behaviour that avoids publishing untranslated bodies under translated chrome ([Google](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)). Both are listed for review in [§19](#19-recommended-next-design-decisions).

### 8.4 Dates, numerals and labels

Recommended formats: Hindi **"7 अक्टूबर 2026"**, English **"7 October 2026"**, generated from `Intl.DateTimeFormat` with `numberingSystem: 'latn'` and checked in the build runtime. Hindwi spells the month "अक्तूबर" while CLDR and most news use "अक्टूबर", so **the glossary must lock all twelve month names** ([Hindwi](https://www.hindwi.org/)). Never leave English months, weekdays or AM/PM in Hindi chrome. Large figures: digits plus लाख/करोड़ in Hindi, with the same underlying number in English. Precision-aware display (`year`, `month`, `day`, `approximate`) follows spec C. Approximate dates render as "लगभग 1985" / "c. 1985"; the exact Hindi wording is a glossary decision.

### 8.5 Mobile and Hindi-default mitigations

No evidence shows Hindi-default is a usability problem. The risk is to English-first visitors (journalists, researchers, diaspora). Mitigations within the approved decisions: "English" always visible in the header on mobile, outside the menu; Press Kit and media links shared as `/en/` URLs; correct hreflang so English searchers land on `/en/` ([Google](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)). A splash page is not recommended.

### 8.6 Typography findings: Devanagari + Latin

**Candidate faces (licence, weights, measured sizes).** All sizes are WOFF2 subsets served by the Google Fonts CSS2 API on 7 October 2026 [M], about ±10% for self-hosted subsets ([Google Fonts metadata](https://fonts.google.com/metadata/fonts); [CSS2 API](https://fonts.googleapis.com/css2?family=Noto+Serif+Devanagari:wght@400)).

| Family | Licence | Weights / axes | Devanagari subset (400) | Verdict |
|---|---|---|---|---|
| **Noto Serif Devanagari** | OFL | 100–900 variable, width 62.5–100 | **49.8 KB** (700: 54.1 KB; weight-axis variable 123.9 KB) | **Primary Hindi face** |
| **Tiro Devanagari Hindi** | OFL | **Regular and Italic only; no bold** | 96.5 KB | Most literary; alternative |
| Eczar | OFL | 400–800 variable | 45.0 KB (variable 85.8 KB) | Display accent only (a third family) |
| Noto Sans Devanagari | OFL | 100–900 variable | 49.2 KB | Fallback metrics; optional UI sans |
| IBM Plex Sans Devanagari | OFL | 7 static, no italic | 75.6 KB | Cooler, corporate alternative |
| Mukta / Hind | OFL | 7 / 5 static | 97.0 KB / 73.2 KB | Sound, but sans-only and heavy per weight |
| Anek Devanagari | OFL | weight + width | 91.9 KB static; **251.6 KB** variable | Too heavy |
| Martel | OFL | 7 weights | 44.3 KB | Tall matra extent (about 1.35 em) needs very loose leading |
| Murty Hindi | Free EULA **forbids web serving** | — | — | Not usable without a commercial licence ([Murty EULA](https://murtylibrary.com/end-user-license-agreement) [H]) |

Latin companions (Latin subset, static 400): **Source Serif 4** 19.6 KB (optical size 8–60, weight 200–900, italics); Literata 19.9 KB; Newsreader 22.0 KB [M]. **Fontshare offers no Devanagari faces**: all 100 families are tagged Latin ([Fontshare API](https://api.fontshare.com/v2/fonts) [M]). Tiro's own Latin is "a Latin subset including diacritics for transcription", **not a full text companion** ([Tiro Typeworks](https://tiro.com/fonts/tiro-devanagari-hindi) [H]).

**Metric matching.** Designed bilingual families put the Devanagari headline (shirorekha) at about **1.16–1.35×** the Latin x-height [M]. Measured ratios: Noto Serif Devanagari ÷ Source Serif 4 = **1.27**; Tiro ÷ Source Serif 4 = 1.26; Tiro ÷ Literata = 1.22, all in range with no size adjustment. Tiro ÷ EB Garamond (1.53) and ÷ Newsreader (1.41) fall outside, so small-x-height Latin faces would look undersized beside Hindi. The rule to match the Latin x-height to the shirorekha comes from [Alphabettes, "Devanagari Typography 101"](https://www.alphabettes.org/devanagari-typography-101-a-guide-for-typesetting-with-latin/) [H]. Noto Serif Devanagari's descender (−0.625 em) makes `line-height: normal` about 1.56, and Tiro's ascender under-reports its matras: **always set explicit unitless line-heights** [M].

**Rules the evidence supports.** Devanagari needs more leading: line-height 1.1 clipped every tested script, and 1.6 solved it ([SuttaCentral](https://discourse.suttacentral.net/t/testing-for-line-height-with-tall-scripts/6196) [H]; [Wikimedia T57995](https://phabricator.wikimedia.org/T57995) [H]). **Letter-spacing splits conjuncts in Gecko, Blink and WebKit** ([W3C Devanagari Gap Analysis](https://www.w3.org/TR/2023/DNOTE-deva-gap-20230614/) [H]). Justify by word space only, never hyphenate, never begin a line with a danda, and there is no case, so `text-transform` is meaningless ([r12a Hindi notes](https://r12a.github.io/scripts/deva/hi) [H]). Italic and bold are not traditional emphasis, and underlines clash with the script, so offset them about 0.3 em ([Alphabettes](https://www.alphabettes.org/devanagari-typography-101-a-guide-for-typesetting-with-latin/); [W3C underline styling](https://www.w3.org/International/articles/styling/underline) [H]). `::first-letter` and `initial-letter` do not select conjuncts reliably, so **no drop caps in Hindi** ([W3C Gap Analysis](https://www.w3.org/TR/2023/DNOTE-deva-gap-20230614/)).

**What Hindi publishers actually use.** BBC Hindi loads **no Devanagari web font** (Arial/Verdana stack, so the OS supplies Devanagari); Dainik Bhaskar self-hosts **Noto Sans Devanagari UI** with `font-display:swap`; Amar Ujala, Satya Hindi, Aaj Tak and PARI use Noto Sans ([bbc.com/hindi](https://www.bbc.com/hindi), [bhaskar.com](https://www.bhaskar.com/), [amarujala.com](https://www.amarujala.com/), [satyahindi.com](https://www.satyahindi.com/), [aajtak.in](https://www.aajtak.in/) [H]). **A serif Hindi text face therefore signals "book and archive" rather than "news portal".** System Devanagari defaults are sans: Kohinoor Devanagari and Devanagari Sangam MN on Apple ([Apple](https://developer.apple.com/fonts/system-fonts/) [H]), Nirmala UI on Windows ([Microsoft](https://learn.microsoft.com/ja-jp/typography/font-list/nirmala-ui) [H]), and likely Noto Sans Devanagari (UI) on Android (unverified).

**Synthesis for this section.** Bilingual excellence here is less about novelty than about getting a long list of small things right that the whole Indian category gets wrong: `lang` attributes, endonym switch placement, Hindi dates, localised chrome, a designed Devanagari serif, generous leading and no Latin-only typographic devices. The type choice is detailed in [§13](#13-proposed-visual-direction) and the behaviour rules in [§17](#17-bilingual-design-system).

---

## 9. Cross-reference design patterns

### 9.1 Patterns that recur across streams

| Pattern | Where it appears (strongest examples) | Signal it sends |
|---|---|---|
| Fixed fact labels before narrative | GOV.UK past PMs; MAP catalogue entry; JFK "About" panel | Authority through consistency |
| Periodisation by role or life phase | Brandt eras; Churchill periods; Havel roles; Mandela phases | A life read as chapters, not a CV |
| Caption grammar *what · where · when · credit* | Magnum, Guardian, PARI, Wellcome, Brandt | Documentary honesty |
| Honest approximation ("c.", "probably", "most likely") | Indian Memory Project, Wellcome, MAP | Trust through humility |
| Correction invitation tied to an item ID | MAP "Suggest an edit"; Trove corrections; Churchill "Ask the Archivist" | A maintained, accountable record |
| Curated feature before browse | Churchill "Topic in Focus"; MAP Special Collections; Wellcome Stories | An editor is present |
| Browse lenses with one-line definitions | Densho; Churchill; Gandhi Heritage Portal life-event themes | Orientation without search |
| Cross-media "same event" links | JFK Associated Records | Depth from a small archive |
| Narrow text column inside wide media frame | PARI, Caravan, Serendipity (65ch) | Editorial calm |
| Rules and space instead of cards | Caravan, Guardian, Emergence | Publication, not app |
| Endonym switch top right to equivalent page | Canada.ca, USWDS, W3C, Welsh guide, RBI | Bilingual respect |
| Carousels, slogans, party symbols, social embeds | narendramodi.in, Tharoor, PMML, corporator site | Campaign or dated portal |

### 9.2 Answers to the design questions

**Should the homepage lead with a large portrait or an editorial story?** Lead with **identity, not story, and not a poster**. First-time discoverers must "understand the person in under a minute on a phone" (spec A §3), and launch requires an approved public name in both scripts and an approved portrait (spec A §5.2). Story-first homepages work for institutions whose identity is already known ([Churchill](https://www.churchillarchive.com/) leads with "Topic in Focus"), but for a lesser-known municipal figure a story without identity confuses. At the other extreme, full-bleed or cut-out portraits are the campaign signature ([amolbalwadkar.com](https://amolbalwadkar.com/), [narendramodi.in](https://www.narendramodi.in/) [R]). Fact-led profiles pair a modest portrait with name and dates ([GOV.UK](https://www.gov.uk/government/history/past-prime-ministers) [H]), and the calmest Indian hero is a single captioned documentary photograph ([Sabarmati Ashram](https://www.gandhiashramsabarmati.org/en/) [R]). **Recommendation:** screen 1 is a typographic identity block plus one captioned, environmental documentary portrait at roughly 40–50% of the desktop width. The editorial story (a featured collection) arrives on screen 2–3. Trade-off accepted: the first screen is less dramatic than a story-led opening, in exchange for instant orientation and zero poster connotation.

**Text over image or beside it?** **Beside on desktop, above and below on mobile, never over.** Overlaid text is how campaign heroes deliver slogans ([narendramodi.in](https://www.narendramodi.in/)), it fails contrast unpredictably over photographs (WCAG 1.4.3), and every editorial reference places captions and credits below or beside the image ([Magnum](https://www.magnumphotos.com/arts-culture/europes-living-room/), [Guardian](https://www.theguardian.com/news/series/the-long-read) [H]).

**How much above the fold?** On a 360 × 640–740 px phone: compact header (name, "English", menu), the name as H1 in the page language, the other-script name, a one-line descriptor (‹role, years› · जबलपुर), and the top of the portrait. On desktop: the whole identity block, the portrait with caption, and three "explore" links. No buttons, counters or CTAs. This is the documentary first screen the Indian stream identified as missing across the category, where first viewports were filled by carousels, blank lazy-loaded tiles, social icons and floating widgets ([PMML](https://pmml.gov.in/), [Shashi Tharoor](https://www.shashitharoor.in/) [R]).

**Timeline vertical, horizontal or editorial?** **Vertical and editorial: a semantic ordered list, periodised by role, with year markers.** Horizontal and circular forms hide chronology and fail on mobile ([PMML's rotating medallions](https://pmml.gov.in/) [R]; [Obama Library's JavaScript-only timeline](https://www.obamalibrary.gov/) [H]). Vertical lists periodised by life phase are the strongest models ([Brandt](https://www.willy-brandt-biography.com/), [Churchill periods](https://www.churchillarchive.com/taxonomy?id=CA_FCT_000006), [Gandhi Heritage Portal Chronology](https://www.gandhiheritageportal.org/)). Havel's horizontal milestone strip ([vaclavhavel.cz](https://www.vaclavhavel.cz/) [H]) is acceptable only as a short homepage glimpse, and on mobile it becomes a vertical list of three to five items.

**How to communicate decades of public life?** Three layers. A **descriptor line** with the span ("‹role› · ‹first year›–‹last year›"). A **facts block** with fixed labels ([GOV.UK](https://www.gov.uk/government/history/past-prime-ministers/clement-attlee)). **Periods named after roles or terms** rather than raw decades ([Brandt](https://www.willy-brandt-biography.com/) "Governing Mayor era"). Decades remain an archive browse lens ([Indian Memory Project](https://www.indianmemoryproject.com/); [Wellcome decade chips](https://wellcomecollection.org/works/vq7jhqgp)). Sparse decades merge ("1960s–70s") rather than producing thin pages.

**How to surface archive collections?** One curated collection "in focus" with a short authored introduction, then named collections, then three or four lenses with one-line definitions, **with no visible counts** ([Churchill](https://www.churchillarchive.com/); [MAP Special Collections](https://map-india.org/collections/); [Densho Browse](https://ddr.densho.org/browse/) [H]). Format labels on cards (Photograph, Press, Document, Video, Collection) aid scanning ([Wellcome Stories](https://wellcomecollection.org/stories)).

**How should press coverage look?** As a **typographic citation**, not a fake newspaper clipping: masthead name in its original script as text, date, edition/page where known, the **headline in original language and script** with a reviewed translation beneath, a two-to-four-line excerpt, "Read at source" and "Archived copy" links, and the attribution label. This is Trove's breadcrumb-as-citation pattern ([Trove](https://trove.nla.gov.au/newspaper/article/2084491) [R]), and it is exactly the approved citation + excerpt + link default ([0006](../decisions/0006-archive-strategy.md)). A scan or headline crop appears only where rights are recorded.

**How to caption photographs?** Fixed order in both languages: **what/who · where · when · credit**, then on item pages **reference · source · rights**. Write in a human voice, name **public figures only** (spec C; spec G §6), describe others by role ("with residents of ‹ward›"), use "c." plainly, and omit unknown credit rather than printing "Unknown" ([Magnum](https://www.magnumphotos.com/arts-culture/europes-living-room/); [Indian Memory Project](https://indianmemoryproject.com/232-2/); [Mandela biography](https://www.nelsonmandela.org/biography); spec B §4.3).

**How much metadata visible?** **Three tiers.** Cards show type label and date (place if space allows). The item header shows a single line: date · type · place · reference. Everything else (source, credit, rights, people depicted, collection, language, citation, permanent link) sits in an "About this item" panel ordered like Wellcome's, with **empty fields omitted** ([Wellcome](https://wellcomecollection.org/works/vq7jhqgp); Densho's visible empty fields are the anti-pattern ([Densho](https://ddr.densho.org/interviews/ddr-densho-1000-1-1/))).

**Should source/verification be visible directly on content?** **Yes, as one short label at the level of the item or fact, never as footnote clutter.** The approved model is "concise labels + optional fuller source details" ([0004](../decisions/0004-content-and-verification-model.md)). The research supports a visible label: authority comes from metadata ([§4](#4-international-public-service-benchmarks)), and no Indian reference shows per-item verification, so this is the clearest differentiator ([§5](#5-archive-benchmarks)). References conflict on *granularity*: Mandela's biography uses footnotes ([Mandela](https://www.nelsonmandela.org/biography)), while Wellcome and JFK put provenance in a panel. **Recommendation:** labels sit on archive items, on each role row and each initiative, and on facts blocks. Long-form prose carries no inline markers; it ends with a "Sources and notes" block. Details open in a native `<details>` element, and every label links to How We Verify.

**How prominent should current updates be?** **Low.** Non-campaign sites place news last in navigation and treat it as a dated, tagged log ([Obama Library](https://www.obamalibrary.gov/); [Helmut Schmidt "Aktuelles"](https://www.helmut-schmidt.de/) [H]), and the approved homepage puts recent updates fifth, hidden after six months ([0003](../decisions/0003-information-architecture.md)). Updates never enter the hero and never use "join", "support" or countdown language.

**How should Jabalpur be visually present without being decorative?** Through **content-bearing elements only**: Devanagari place names as typographic anchors in descriptor lines, captions, role rows and timeline tags; commissioned documentary photography of everyday civic Jabalpur; a palette whose values come from the Bhedaghat marble, granite and the Narmada; and the river line used once, on the Timeline. Institutions that express MP well do it through structure and material ([Bharat Bhavan](https://www.architecturelab.net/bharat-bhavan-charles-correa/) [S]); the local civic default stacks symbols ([Smart City logo entries](https://www.mygov.in/task/jabalpur-smart-city-logo-competition) [S]).

**How should Hindi affect typography and spacing?** Body line-height about 1.75 (headings 1.3–1.4) versus about 1.6/1.1 for English; Hindi body about one pixel larger; a shorter measure; zero letter-spacing; no case transforms, faux bold or italic; underline offset about 0.3 em; padding on any line-clamped box; header and buttons sized for Devanagari's taller line box ([Alphabettes](https://www.alphabettes.org/devanagari-typography-101-a-guide-for-typesetting-with-latin/); [W3C Gap Analysis](https://www.w3.org/TR/2023/DNOTE-deva-gap-20230614/); [SuttaCentral](https://discourse.suttacentral.net/t/testing-for-line-height-with-tall-scripts/6196) [H]). Details in [§17](#17-bilingual-design-system).

**How much animation?** **Almost none.** The better-engineered references declare `prefers-reduced-motion` and ship little JavaScript ([MAP](https://map-india.org/), [Magnum](https://www.magnumphotos.com/), [Serendipity](https://www.serendipityartsfestival.com/); [Pudding](https://pudding.cool/) with two scripts [H]). Motion is limited to state changes (focus, hover, disclosure, lightbox) at 150–200 ms, all removed under reduced motion. Nothing scrolls, auto-advances, parallaxes or counts up.

**How should the mobile homepage differ from desktop?** The same modules in the same order, but **linear and denser in navigation**. The identity text comes before the portrait (the name must be readable before the image loads, avoiding PMML's blank first paint ([PMML](https://pmml.gov.in/) [R])). The portrait is cropped 4:5 at full content width. Explore links become full-width tap rows of at least 44 px. The timeline glimpse is a three-item vertical list. Collections stack rather than scroll sideways. The language switch stays visible in the header, never inside the menu ([Canada.ca](https://design.canada.ca/common-design-patterns/language-toggle.html); spec B §1).

### 9.3 Where references conflict

| Conflict | Positions | Recommendation |
|---|---|---|
| Splash language chooser vs direct landing | Welsh guide (splash) vs Google/USWDS (links, no auto-redirect) | Direct landing on `/hi/`, prominent "English" (as approved) |
| Footnotes vs labels | Mandela biography footnotes vs Wellcome/JFK panels and decision 0004 | Labels + details; "Sources and notes" at the end of long prose |
| Item counts | Churchill shows counts; small archives (IMP) thrive without them | Hide counts at MVP |
| One type family vs role-based system | PARI (one superfamily) vs Fifty Two/Guardian (three or four roles) | Two families (serif pair) plus system sans for chrome; see §13.3 |
| Equal vs larger Hindi body size | Typography stream (equal size) vs bilingual stream and spec D (Hindi slightly larger) | Hindi 19 px vs English 18 px, validated on device |
| Drop caps | Guardian uses one; Devanagari cannot | None in either language (parity) |

---

## 10. What we should adopt

### 10.1 Patterns worth adopting

1. **A facts block with fixed bilingual labels before narrative**, on About and Public Life ([GOV.UK](https://www.gov.uk/government/history/past-prime-ministers/clement-attlee)).
2. **Periods named after roles or terms** for biography and timeline ([Brandt](https://www.willy-brandt-biography.com/); [Churchill](https://www.churchillarchive.com/taxonomy?id=CA_FCT_000006)).
3. **Caption grammar *what · where · when · credit*** on every image, including thumbnails where space allows ([Magnum](https://www.magnumphotos.com/arts-culture/europes-living-room/); [Guardian](https://www.theguardian.com/news/series/the-long-read); [Helmut Schmidt](https://www.helmut-schmidt.de/)).
4. **Plain-language rights plus a copyable credit line** on item pages ([Wellcome](https://wellcomecollection.org/works/vq7jhqgp); [Densho](https://ddr.densho.org/interviews/ddr-densho-1000-1-1/)), with standard vocabulary from [RightsStatements.org](https://rightsstatements.org/page/1.0/?language=en).
5. **Honest approximation in the display string** ("c.", "probably") backed by sortable data ([MAP](https://map-india.org/collections/cumulus/photography/PHY.40025/?id=77515); [Indian Memory Project](https://indianmemoryproject.com/232-2/)).
6. **"Suggest a correction" on every item**, quoting its reference and linking to Corrections & Feedback, as a link rather than a form ([MAP](https://map-india.org/collections/cumulus/photography/PHY.40025/?id=77515); [0015](../decisions/0015-mvp-contact-strategy.md)).
7. **Curated collection first, lenses second** on the Archive hub ([Churchill](https://www.churchillarchive.com/); [MAP](https://map-india.org/collections/)).
8. **One-line definitions under each browse lens** ([Densho](https://ddr.densho.org/browse/)).
9. **Citation-first press items** with the original-script headline ([Trove](https://trove.nla.gov.au/newspaper/article/2084491); [0006](../decisions/0006-archive-strategy.md)).
10. **Segmented video with one-line chapter descriptions and transcripts** ([Densho](https://ddr.densho.org/interviews/ddr-densho-1000-1-1/)).
11. **Preferred citation and permanent link with copy buttons** ([JFK](https://www.jfklibrary.org/asset-viewer/archives/jfkwha-001); [Wellcome](https://wellcomecollection.org/works/vq7jhqgp)).
12. **Header endonym switch to the equivalent page**, a link with `lang`, `hreflang` and `translate="no"` ([Canada.ca](https://design.canada.ca/common-design-patterns/language-toggle.html); [USWDS](https://designsystem.digital.gov/patterns/select-a-language/two-languages/)).
13. **Hindi month names with Western digits** ([Hindwi](https://www.hindwi.org/); [Amar Ujala](https://www.amarujala.com/) for digits).
14. **A stacked Devanagari-over-Latin wordmark**, purely typographic ([Rashtrapati Bhavan](https://rashtrapatibhavan.gov.in/)).
15. **"Last updated" as a quiet trust signal** in the footer and on item pages ([PMML](https://pmml.gov.in/); [JFK](https://www.jfklibrary.org/asset-viewer/archives/jfkwha-001)).
16. **A narrow text column inside a wider media column, separated by rules and space rather than cards** ([PARI](https://ruralindiaonline.org/); [Caravan](https://caravanmagazine.in/communities/a-personal-archive-of-longing-that-traces-a-life-across-lost-cities)).
17. **Translator and photographer credits as named contributors** ([MAP exhibition](https://map-india.org/exhibition/a-moving-line-1500-years-of-indian-visual-storytelling); [Emergence](https://emergencemagazine.org/essay/new-life-for-the-ezo-spruce)).

### 10.2 Patterns worth adapting

| Source pattern | Adaptation for this project |
|---|---|
| Record taxonomy "My Articles / Articles by Others" ([Tharoor](https://www.shashitharoor.in/)) | *By the person* (speeches, writings), *about the person* (In the Press) and *official record* (Documents, Sources) kept visibly distinct through format labels, not extra nav items |
| Life-event photo categories ([Gandhi Heritage Portal](https://www.gandhiheritageportal.org/photos-of-mahatma-gandhi)) | Themes as a controlled vocabulary of civic work (e.g. ‹theme›), shown only when a theme has enough items |
| Milestone strip ([Havel](https://www.vaclavhavel.cz/)) | A three-to-five-item vertical "timeline glimpse" on the homepage, generated from Roles |
| "Topic in Focus" + "Previous topics" ([Churchill](https://www.churchillarchive.com/)) | One featured collection on the homepage and Archive hub; earlier features remain as normal collections |
| Associated Records ([JFK](https://www.jfklibrary.org/asset-viewer/archives/jfkwha-001)) | "From the same occasion" related group, derived from a shared TimelineEvent, Activity or Collection |
| Tombstone captions with accession numbers ([MAP](https://map-india.org/exhibition/a-moving-line-1500-years-of-indian-visual-storytelling)) | A reference ID shown in the "About this item" panel and citation, **not** on cards, and not encoding the date (dates get revised) |
| Contributor credit with family relationship ([Indian Memory Project](https://indianmemoryproject.com/232-2/)) | The `supplied` label, e.g. "From the family collection", naming individuals only with consent |
| Audience pathways ([Carter Library](https://www.jimmycarterlibrary.gov/)) | The Press Kit serves journalists; How We Verify serves researchers; both linked from the footer and the homepage's archive module |
| "Places" as a life dimension ([Havel](https://www.vaclavhavel.cz/en/vaclav-havel/biography)) | Places as metadata and filters, never standalone pages, consistent with the IA (spec B §2) |
| Easy Language option ([Helmut Schmidt](https://www.helmut-schmidt.de/)) | Plain-language writing rules for both languages in the content guide, not a separate site version |
| Monospace metadata role ([Wellcome](https://wellcomecollection.org/stories); [Fifty Two](https://fiftytwo.in/)) | Tabular numerals in the sans for dates and references; no mono family (budget, and no Devanagari mono of quality was assessed) |

---

## 11. What we should reject

### 11.1 Patterns we should deliberately reject

| Pattern | Observed at | Why we reject it |
|---|---|---|
| Hero carousels and sliders | [PMML](https://pmml.gov.in/), [Rashtrapati Bhavan](https://rashtrapatibhavan.gov.in/), [Gandhi Smriti](https://gandhismriti.gov.in/), [Tharoor](https://www.shashitharoor.in/), [narendramodi.in](https://www.narendramodi.in/) | Hides content, defeats permalinks, poor on mobile; forbidden by spec E §7 |
| Slogan or motto heroes | [narendramodi.in](https://www.narendramodi.in/), [Tharoor](https://www.shashitharoor.in/), [willy-brandt.de](https://www.willy-brandt.de/), [Helmut Schmidt](https://www.helmut-schmidt.de/), [Obama Library](https://www.obamalibrary.gov/) | Reads as campaign or brand at municipal scale ([0001](../decisions/0001-product-purpose-and-posture.md)) |
| Party symbols and party colour in the UI | [Tharoor](https://www.shashitharoor.in/), [amolbalwadkar.com](https://amolbalwadkar.com/) | Violates neutral posture and spec E §4 |
| Cut-out leader portraits, senior-leader pairings | [amolbalwadkar.com](https://amolbalwadkar.com/) | Poster language |
| App, missed-call, QR, chatbot widgets | [narendramodi.in](https://www.narendramodi.in/) | Promotional; covers content on mobile |
| Social-feed embeds and floating social rails | [Tharoor](https://www.shashitharoor.in/), [Rashtrapati Bhavan](https://rashtrapatibhavan.gov.in/) | Third-party scripts, stale content, clutter |
| PDF flipbooks or PDF covers as content | [amolbalwadkar.com](https://amolbalwadkar.com/), [Tharoor](https://www.shashitharoor.in/) | Unsearchable, inaccessible, not item-level |
| Stat counters, impact bands, visitor counters | [PMML](https://pmml.gov.in/), [Mandela homepage](https://www.nelsonmandela.org/) | Numbers as boasts; thin at our scale |
| Donation, membership, merchandise, "support us" | [Mandela homepage](https://www.nelsonmandela.org/), [obama.org](https://www.obama.org/), [Havel](https://www.vaclavhavel.cz/) | Out of scope (spec A §2) |
| Machine-translated Hindi | [PMML](https://pmml.gov.in/) | Forbidden ([0002](../decisions/0002-bilingual-strategy.md), [0018](../decisions/0018-content-integrity-rules.md)) |
| Wrong `lang`, query-parameter or JavaScript language switching | [narendramodi.in/hi](https://www.narendramodi.in/hi), [Rekhta](https://www.rekhta.org/?lang=hi), [RBI](https://www.rbi.org.in/) | Breaks screen readers, fonts and SEO |
| Language switch in the footer or as codes | [Hindwi](https://www.hindwi.org/), [Rekhta](https://www.rekhta.org/?lang=hi), [willy-brandt.de](https://www.willy-brandt.de/) | Standards say top right, endonyms |
| English dates or months on Hindi pages | [PARI Hindi](https://ruralindiaonline.org/hi/), [Amar Ujala](https://www.amarujala.com/) | Mixed-language chrome |
| Parchment, sepia, faux-paper textures | [Gandhi Heritage Portal](https://www.gandhiheritageportal.org/), [Gandhi Smriti](https://gandhismriti.gov.in/) | Dated; conflicts with honest archival presentation (spec E §3) |
| Photo viewers without permalinks; truncated titles | [GHP Gallery](https://www.gandhiheritageportal.org/gallery) | Items cannot be cited or shared |
| Identical link text ("VIEW OBJECT") | [Densho](https://ddr.densho.org/) | Fails screen-reader users |
| Visible empty metadata fields | [Densho](https://ddr.densho.org/interviews/ddr-densho-1000-1-1/) | Forbidden by spec B §4.3 |
| Visible item counts on thin taxonomies | [Churchill](https://www.churchillarchive.com/taxonomy?id=CA_FCT_000006) | Exposes thinness at small scale |
| Commercial CTAs and paywalls inside stories | [Magnum](https://www.magnumphotos.com/arts-culture/europes-living-room/), [Caravan](https://caravanmagazine.in/communities/a-personal-archive-of-longing-that-traces-a-life-across-lost-cities) | Interrupts the record |
| Loud accents and fashionable display faces | [Fifty Two](https://fiftytwo.in/), [Kochi-Muziris Biennale](https://kochimuzirisbiennale.org/) | Commercial energy; will date |
| Symbol-stacked local branding, religious iconography | [Smart City entries](https://www.mygov.in/task/jabalpur-smart-city-logo-competition) | Cliché; politically and religiously loaded |
| Gond or other tribal art as pattern | Documented misuse ([PARI](https://wagtail.ruralindiaonline.org/en/articles/the-visual-storyteller-of-patangarh/)) | Appropriation; not Jabalpur's tradition (spec E §5) |
| Heavy page-builder stacks | [Aperture](https://aperture.org/) (about 1.1 MB HTML), [Alipore Post](https://thealiporepost.com/) on Wix | Fails the 4G budget (spec A §8) |

---

## 12. Visual opportunity

**What could make this website look unmistakably different from a normal Indian politician or public-figure website?** The category has trained Indian visitors to expect noise: saffron or party colours, a slogan on a carousel, a cut-out portrait, social feeds and a Hindi version that is an afterthought. The single most distinctive move available is **silence used with precision**: a paper-white page, a beautifully set Hindi name, one honest photograph with a full caption, and a visible, sourced record underneath. Nothing in the Indian set looks like that ([§3](#3-indian-public-figure-benchmarks)). The site's thesis:

> **A public life, documented: a well-kept civic record with an editor's hand, set first in Hindi.**

It persuades only through evidence (principle 5, "archive over campaign"), and its visual language is the language of trustworthy records (captions, dates, sources, references) made warm by photography and by Devanagari typography of book quality.

- This should feel like **a museum's catalogue of one civic life** rather than **a party banner with a biography attached**.
- This should feel like **a Hindi literary journal** rather than **a Hindi news portal**.
- This should feel like **a documentary photobook of a city** rather than **an event gallery of crowds and garlands**.
- This should feel like **a ward register kept by a meticulous editor** rather than **a CV inflated into a website**.
- This should feel like **an archive you can cite** rather than **a brochure you scroll past**.
- This should feel like **Jabalpur light on marble and lime plaster** rather than **a tourism poster of the waterfall**.
- This should feel **equally at home in Hindi and English** rather than **English with Hindi poured in**.

**What "premium" concretely means here.** It is not gold, gradients, animation or luxury photography. In this context premium means:

1. **Typographic quality in Devanagari** equal to the Latin: a designed serif, correct leading, no clipped matras, no faux styles, correct `lang` everywhere.
2. **Completeness without padding:** no empty sections, no "coming soon", no "Unknown"; everything visible is finished (principle 3).
3. **Every image captioned and credited; every claim labelled.** Consistency is the luxury.
4. **Speed on the visitor's actual phone:** LCP ≤ 2.5 s on mid-range Android over 4G and near-zero JavaScript (spec A §8), with about 125 KB of fonts on a Hindi page ([§13.3](#133-typography)).
5. **Restraint:** one accent colour, one motif used once, no promotional element anywhere.
6. **Photography of real quality:** commissioned natural-light portraits and places, archival prints presented honestly, never filtered.
7. **Durability:** permalinks that never break, a static build that stays online, "last updated" dates that are true.
8. **Bilingual care in small things:** Hindi month names, localised error pages, translator credits, the switch landing on the same page.

---

## 13. Proposed visual direction

### 13.1 Brand character

**Documentary · composed · civic · mineral · literate.**

Documentary: real photographs, captions, sources. Composed: calm hierarchy, generous space, nothing shouting. Civic: about public service and place, not personality. Mineral: the cool off-white, grey, granite and river tones of the landscape. Literate: Hindi typography and writing of book quality. These test well against the spec's "premium, dignified, calm, editorial, modern and Indian" (spec E §1) while adding the two research-derived traits, *mineral* and *literate*, that make the site specifically Jabalpur's and specifically Hindi-first.

For the design phase's "two or three contrasting directions" (spec E §11), the research suggests three: **A. Civic record** (primary: the direction below); **B. Literary journal** (Tiro Devanagari Hindi + Literata, warmer paper, more prose-led); **C. Institutional modern** (IBM Plex Sans Devanagari + IBM Plex Serif, cooler, more grid-led). All three must use the same tokens structure and constraints.

### 13.2 Colour

All values are **estimates to be validated against real commissioned photography and contrast-checked in the token build**. Contrast ratios below are our calculations [M] against the stated background.

| Token | Hex (estimate) | Use | Physical referent | Contrast on paper |
|---|---|---|---|---|
| `--paper` | `#F5F3EE` | Page background | Sunlit saccharine Bhedaghat marble | — |
| `--stone` | `#ECE8E0` | Surfaces: facts block, item metadata panel, image mats | Shaded marble | — |
| `--ink` | `#1F2627` | Body text, headings | Granite / dark volcanic veins | 13.9:1 |
| `--ink-2` | `#4A5355` | Captions, secondary text (**all Hindi small text**) | Grey marble band | 7.1:1 |
| `--muted` | `#5C6568` | English-only metadata at ≥ 14 px | Bluish-grey marble | 5.4:1 |
| `--rule` | `#D6D8D4` | Decorative hairlines | Marble veining | 1.3:1 (decorative only) |
| `--rule-strong` | `#7E878A` | Component boundaries that must be perceivable | Grey marble | 3.3:1 (meets 1.4.11) |
| `--narmada` | `#1F5357` | **Primary accent**: links, focus ring, active states | Dry-season Narmada, deep water | 7.8:1 |
| `--narmada-deep` | `#174245` | Hover/pressed | Deep river | 10.0:1 |
| `--narmada-line` | `#3E7F7A` | The river line; large non-text marks only | Shallow river over marble | 4.2:1 (non-text ≥ 3:1) |
| `--band` | `#F0E6DC` | **The one warm secondary**: tint for press/citation surfaces and the homepage archive module | Pink-cream band in the marble | — (ink on band 12.5:1) |
| `--band-ink` | `#77613F` | Rare warm text/marks on paper (e.g. masthead names) | Monsoon silt | 5.3:1 |

**How Jabalpur and the Narmada shape the palette.** The real landscape is **cool and mineral with one warm note**: white, grey, pink and bluish-grey marble with dark veins ([UNESCO tentative list](https://whc.unesco.org/en/tentativelists/6531) [S]), granite at Madan Mahal ([Outlook Traveller](https://www.outlooktraveller.com/destinations/india/all-you-need-to-know-about-the-madan-mahal-in-madhya-pradesh) [S]), clear blue-green water in the dry season ([eSamskriti](https://esamskriti.com/a/Madhya-Pradesh/Marble-Rocks-Jabalpur.aspx) [S]). Each token has a physical referent, which makes the palette defensible in conversation with the family and explains, factually rather than politically, why saffron is absent. The warm secondary comes from the marble's pink band rather than from "sandstone/basalt" (spec E §4), because the research found no source for sandstone or basalt in Jabalpur city ([§19](#19-recommended-next-design-decisions), for review).

**Archive and media accents.** Do not colour-code media types or verification statuses. Distinguish them by **text labels and surface**: photographs sit on `--paper` with `--stone` mats; documents and press citations sit on `--band`, the warm "paper of record"; video sits in an `--ink` frame only while playing. Verification labels are typographic (text plus an optional small glyph in `--ink-2`). They **never use traffic-light green, amber or red**, which would read as a fact-check rating and convey meaning by colour (spec E §8).

**Colours to avoid.** Saffron and orange in any strength (PMML's `#F37021` is a reference point to stay far from); India green and tricolour combinations; party-associated pinks, blues and greens; aubergine and red display type (heritage-portal look); sepia and parchment; gradients of any kind; pure black `#000` on pure white `#FFF` (harsh and un-mineral). Keep the Narmada accent **blue-leaning and desaturated** so it never drifts towards a party green.

### 13.3 Typography

**Primary recommendation (Direction A).** Two families, a serif voice in both scripts, with the platform's own sans for interface chrome.

| Role | Hindi | English | Weights | Notes |
|---|---|---|---|---|
| Display and headings | **Noto Serif Devanagari** | **Source Serif 4** (opsz Display where available) | 600 | One heading weight per script keeps the budget |
| Body and long-form | Noto Serif Devanagari | Source Serif 4 | 400 (+ English italic 400) | Hindi emphasis uses 600, never italic |
| Captions | Noto Serif Devanagari | Source Serif 4 | 400 | Serif captions give the "book" quality |
| Interface chrome: nav, buttons, labels, filters, breadcrumbs, metadata line | System Devanagari sans (Noto Sans Devanagari / Kohinoor Devanagari / Nirmala UI) | System UI sans | 400/600 as available | Zero bytes; tabular numerals where supported |

**Why.** Shirorekha ÷ x-height = 1.27, inside the designed-family range, so the scripts sit together at equal `font-size` [M]. Both are OFL with full weight ranges. Noto Serif Devanagari has near-identical headline and matra proportions to Noto Sans Devanagari, the likely Android fallback (shirorekha 0.623 vs 0.622 em) [M], which limits visible shift when the web font swaps in. **Fonts per Hindi page: Devanagari 400 (≈50 KB) + 600 (≈54 KB, by analogy with the measured 700 file) + Source Serif 4 Latin 400 for digits and inline English (≈20 KB) ≈ 125 KB** [M], within a practical 110–160 KB budget. Western digits on Hindi pages come from the Latin face via `unicode-range`, so numerals look identical in both languages. English pages need about 60 KB (Source Serif 4 regular, italic, 600). Licence: SIL Open Font License 1.1 for both; self-host subsetted WOFF2 split by script with `unicode-range`, keep all OpenType layout features when subsetting, preload only the body file for the page's script, `font-display: swap` with a size-adjusted local fallback ([§8.6](#86-typography-findings-devanagari--latin)). Trade-off: Noto is widely used and less distinctive, so the premium character must come from size, spacing, layout and photography. The research judges this acceptable, since none of the Hindi news sites sampled sets its text in a serif.

**Alternative (Direction B, "Literary journal").** **Tiro Devanagari Hindi** (Hindi display, body, captions) + **Literata** (English; ratio 1.22). Strongest literary pedigree, from the Murty Classical Library and Nirnaya Sagar lineage ([Tiro Typeworks](https://tiro.com/fonts/tiro-devanagari-hindi) [H]). Costs: **one Hindi weight only**, so hierarchy comes from size and colour and `font-synthesis: none` is mandatory; Hindi ≈ 97 KB per page; its Latin is a transliteration subset, so Latin must be routed to Literata; ascender metrics under-report matras (body line-height ≥ 1.8). It is worth testing because its texture is visibly more "book", but it is riskier for UI and emphasis.

**Fallback (performance-first).** Noto Serif Devanagari 600 for headings only, with system Devanagari sans for Hindi body (the BBC Hindi model: zero body bytes, but texture varies by OS). Use only if device testing shows LCP failures.

**Rejected as core faces:** Anek (≈252 KB variable Devanagari), Mukta and Hind (sans-only, heavy per weight), Rozha One, Yatra One and Gotu (single-weight display, decorative), Martel (very tall matras), Eczar (display only, a third family), Murty Hindi (free licence forbids web serving), and anything from Fontshare (no Devanagari).

**Approximate type scale** (fluid between 360 px and 1280 px; validate on device):

| Token | English (Source Serif 4) | Hindi (Noto Serif Devanagari) |
|---|---|---|
| `display` (homepage name) | `clamp(2.5rem, 1.8rem + 3.2vw, 4.25rem)` / lh 1.08 / 600 | same size / lh 1.3 / 600 |
| `h1` | `clamp(2.25rem, 1.6rem + 2.8vw, 3.75rem)` / 1.1 | same / 1.3 |
| `h2` | `clamp(1.75rem, 1.4rem + 1.6vw, 2.5rem)` / 1.15 | same / 1.35 |
| `h3` | `clamp(1.375rem, 1.2rem + 0.8vw, 1.75rem)` / 1.25 | same / 1.4 |
| `lead` | 1.25rem / 1.5 | 1.3125rem / 1.7 |
| `body` | **1.125rem (18 px) / 1.6** | **1.1875rem (19 px) / 1.75** |
| `caption` | 0.9375rem / 1.5, `--muted` or `--ink-2` | 1rem / 1.7, `--ink-2` only |
| `label` (system sans) | 0.875rem / 1.4, sentence case | 0.9375rem / 1.6, no tracking |
| Minimum on screen | 14 px | 15 px |

**Readability rules.** English measure 38–42rem (about 65–70 characters); Hindi measure about 36–38rem, tested with real copy ([§8.6](#86-typography-findings-devanagari--latin)). Left-aligned, never justified. Tabular figures in timelines, tables and reference IDs (spec E §2; confirm `tnum` support in the chosen Source Serif 4 build). No uppercase or tracked kickers **in either language**, to keep parity under the Welsh guide's "not less favourably" principle. No drop caps in either language. Hindi titles of works sit in quotation marks at regular weight, while English uses italic.

### 13.4 Layout

- **Max widths:** page frame 80rem (1280 px) with gutters `clamp(1rem, 4vw, 3rem)`; media column 64rem; text column 40rem (English) and 37rem (Hindi). This is the three-width system implied by [PARI](https://ruralindiaonline.org/) (768/1232 px) and [Caravan](https://caravanmagazine.in/) (42rem/72rem/80rem) [H].
- **Grid philosophy:** 4/8/12 columns (spec E §6), used **asymmetrically** on desktop. Text sits on columns 1–6 or 2–7, images on 7–12, and captions may hang in the outer margin. This gives editorial tension without trendiness. Container queries let components (role rows, cards) reflow by their own width.
- **Spacing:** 4 px base, 8 px rhythm (spec E §6). Section spacing `clamp(4rem, 3rem + 5vw, 8rem)`; components 1.5–2.5rem apart; captions 0.5–0.75rem below images. Hindi gets proportionally more block spacing between headings and text (heading margin-block about 1.2× English).
- **Section rhythm:** each homepage module opens with a hairline rule and a sentence-case label, then content. Alternate full-width text modules with asymmetric image modules; never two image-heavy modules in a row.
- **Cards:** used only where items are genuinely parallel (collections, archive grids). Flat, no shadow, no rounded corners, no coloured backgrounds; image, label line, title, date. Lists of roles, press items and updates are **ruled lists, not cards**.
- **Borders and dividers:** 1 px `--rule` hairlines between sections and list rows; `--rule-strong` only for interactive boundaries; no boxes around text.
- **Image treatment:** square corners; no shadows, frames or filters; archival images keep their **original aspect ratio**, presented on a flat `--stone` mat inside a fixed-ratio slot in grids so rows stay even without cropping historic prints. One full-bleed image per long page at most.
- **Desktop versus mobile:** desktop is asymmetric with hanging captions; mobile is single-column with captions directly below images, full-width tap rows, and the language switch in the header bar. Nothing scrolls horizontally (spec A §8).

### 13.5 Photography

- **Hero portrait:** an **environmental documentary portrait**, commissioned, in natural light, in a real civic or neighbourhood setting in Jabalpur, at eye level, neutral expression, no garlands, podiums, party scarves or crowds. Portrait 4:5 on mobile, 4:5 or 3:4 beside text on desktop. Captioned and credited like every other image. The tonal brief draws on [Lele/Hawkesworth's *Narmada*](https://www.anothermag.com/fashion-beauty/13006/supriya-lele-and-jamie-hawkesworths-dreamy-trip-down-the-narmada-river): soft daylight, real people, no orange grading. That is a reference for tone, not imitation.
- **Portrait style elsewhere:** at work in context rather than posed; never cut out; never paired with other political figures for effect.
- **Archival treatment:** "as found". Black-and-white stays black-and-white, colour prints keep their colour cast, and borders and handwriting stay visible where they carry information. No sepia, colourisation, AI upscaling or reconstruction; any restoration beyond basic clean-up is disclosed (spec E §3; spec G).
- **Colour versus monochrome:** contemporary photographs in natural colour; never convert to monochrome for "gravitas". The page palette is neutral so photographs carry the colour ([§6](#6-editorialdocumentary-benchmarks)).
- **Cropping and ratios:** 4:5 (portraits), 3:2 (landscape documentary), 16:9 (video only), 1:1 avoided except optional contact-sheet thumbnails. Archival items are never cropped to fit a ratio: they are matted.
- **Captions:** *what/who · where · when · credit*, below the image, serif, `--ink-2`; credit format "फ़ोटो: ‹name› / ‹collection›" and "Photo: ‹name› / ‹collection›" (the nuqta spelling is a glossary decision); omit the credit line when unknown (spec E §3).
- **Galleries:** a calm "contact sheet" grid on browse pages; on collection pages, **sequences** of two to four images from one occasion with one caption voice ([Magnum](https://www.magnumphotos.com/arts-culture/europes-living-room/)). Lightbox via native `<dialog>`, keyboard-operable, focus returned, Escape to close ([Cogapp](https://www.cogapp.com/blog/what-makes-an-image-viewer-accessible)).
- **Documentary authenticity:** consent recorded for identifiable private individuals, no minors without guardian consent, no sensitive settings without consent (spec G §6); no stock, no AI imagery, ever.

### 13.6 Jabalpur visual language

Jabalpur is present through **four content-bearing channels and nothing else**: (1) **Devanagari place names** set with care in descriptor lines, captions, role rows and timeline tags ("‹ward›, जबलपुर"); (2) **commissioned place photography** of everyday civic Jabalpur, such as ghat steps in early light rather than the evening aarti spectacle, close crops of marble against green water rather than the Dhuandhar postcard, brick-lime civic facades shot straight-on, and ward streets with real Devanagari signage photographed with consent ([§7](#7-jabalpurmadhya-pradesh-visual-research)); (3) the **mineral palette**; and (4) **one river line**: a 1–1.5 px `--narmada-line` hairline used as the Timeline spine, nearly straight, bending gently only at period boundaries, never animated, never a wave icon, gradient, logo or watermark ([0005](../decisions/0005-design-direction.md)). Optionally it can be repeated once, as a short horizontal rule above the footer. Monsoon and flood photography appears only where content is about drainage, flooding or relief. **No** temples, lingas, diyas, aarti lamps, lotus, waterfall heroes, marble textures, Gond or Warli patterns, mandala or rangoli dividers, freedom-fighter portraits as branding, or "ethnic" Latin display fonts.

### 13.7 Motion

| Element | Behaviour | Reduced motion |
|---|---|---|
| Focus ring | Instant, 2 px `--narmada` with 2 px paper offset | Same |
| Links | Colour and underline-offset transition 120 ms | Instant |
| Images | Optional 150 ms opacity fade on load; reserved space prevents layout shift (CLS ≤ 0.1) | No fade |
| `<details>` disclosures (source details, transcripts) | Native open/close, no height animation | Same |
| Lightbox | 150 ms fade | Instant |
| Filter change (archive) | Optional cross-fade ≤ 200 ms on enhanced pages; full page loads without JS | Instant |
| Header, river line, timeline, counters, hero | **Static. No sticky-shrink, parallax, scroll-drawn lines, auto-advance or count-up** | — |
| Video | Never autoplays; click-to-load facade ([0011](../decisions/0011-image-and-media-strategy.md)) | — |

Page transitions: none at MVP (same-document navigation feels fastest and avoids View Transitions complexity across languages).

---

## 14. Homepage concept

The homepage follows the approved module order (spec B §4.2): Introduction, Public life at a glance, From the archive, Timeline glimpse, Recent updates, Connect strip. Each module hides itself when it has no content. The concept below adds no modules. It defines how the approved ones look and how the **opening two to three screens** answer, within seconds: *who is this, what is this site, why does the archive matter, what is the Jabalpur connection, where next*, without becoming a campaign landing page.

### 14.1 Wireframes

Desktop (≈1280 px), Hindi page. Labels in Devanagari are glossary candidates (see [§17](#17-bilingual-design-system)).

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ ‹नाम›                परिचय · सार्वजनिक जीवन · अभिलेखागार · गतिविधियाँ · संपर्क   English │
│ ‹public name›                                                                │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ‹सार्वजनिक नाम›                          ┌──────────────────────────────┐    │
│  ‹public name›  (lang="en", smaller)     │                              │    │
│                                          │                              │    │
│  ‹role, years› · ‹ward/area›, जबलपुर      │     ‹portrait› 4:5           │    │
│                                          │     natural light,           │    │
│  ‹2–3 sentence short bio, supplied,      │     civic setting            │    │
│   reviewed in both languages›            │                              │    │
│                                          └──────────────────────────────┘    │
│  परिचय  →    सार्वजनिक जीवन  →    अभिलेखागार  →   ‹caption · place · date›     │
│                                                  फ़ोटो: ‹credit›              │
│ ──────────────────────────────────────────────────────────────────────────── │
│  ‹site statement: a documented record of a public life, with sources›        │
│                                                    हम कैसे पुष्टि करते हैं →   │
├──────────────────────────────────────────────────────────────────────────────┤
│  सार्वजनिक जीवन एक नज़र में                                                   │
│  ───────────────────────────────────────────────────────────────────────     │
│  ‹years›      ‹role title›                 ‹ward/area›      ‹provenance›     │
│  ───────────────────────────────────────────────────────────────────────     │
│  ‹years›      ‹role title›                 ‹organisation›   ‹provenance›     │
│  ───────────────────────────────────────────────────────────────────────     │
│  पद और कार्यकाल →        समयरेखा →                                            │
├──────────────────────────────────────────────────────────────────────────────┤
│  अभिलेखागार से                                     (band-tinted module)        │
│  ┌──────────────────────────────────┐   ‹collection title›                   │
│  │   ‹featured image› 3:2           │   ‹standfirst, 2–3 lines›              │
│  └──────────────────────────────────┘   ‹author› · संग्रह देखें →              │
│  ┌──────┐ ┌──────┐ ┌──────┐                                                  │
│  │ item │ │ item │ │ item │   तस्वीरें · प्रेस में · दस्तावेज़ · वीडियो            │
│  └──────┘ └──────┘ └──────┘   ‹one-line definition under each›               │
├──────────────────────────────────────────────────────────────────────────────┤
│  समयरेखा की झलक        │ ‹year›  ‹milestone›                                  │
│                        │ ‹year›  ‹milestone›          (river line spine)      │
│                        │ ‹year›  ‹milestone›   →  पूरी समयरेखा                  │
├──────────────────────────────────────────────────────────────────────────────┤
│  हाल की गतिविधियाँ (hidden if newest > 6 months)                              │
│  ‹date› · ‹type› · ‹place› — ‹one factual line›                              │
├──────────────────────────────────────────────────────────────────────────────┤
│  संपर्क   ‹approved channel›  ·  ‹approved channel›  ·  ‹official profile›      │
├──────────────────────────────────────────────────────────────────────────────┤
│  ‹नाम / public name› lockup · sections · Press Kit · How We Verify ·           │
│  Corrections · Privacy · Terms · English · अंतिम अद्यतन: ‹date›                 │
└──────────────────────────────────────────────────────────────────────────────┘
```

Mobile (360 px), Hindi page, opening screens:

```text
┌────────────────────────────┐
│ ‹नाम›        English   ☰   │  ← switch visible, never in menu
├────────────────────────────┤
│ ‹सार्वजनिक नाम›  (H1)       │
│ ‹public name›              │
│ ‹role, years› · जबलपुर      │  ← screen 1 ends about here
│ ┌────────────────────────┐ │
│ │                        │ │
│ │   ‹portrait› 4:5       │ │
│ │                        │ │
│ └────────────────────────┘ │
│ ‹caption› · फ़ोटो: ‹credit› │
│ ‹short bio, 2–3 sentences› │
│ ────────────────────────── │
│ परिचय                   →  │  ← 48 px tap rows
│ सार्वजनिक जीवन           →  │
│ अभिलेखागार               →  │
│ ────────────────────────── │
│ सार्वजनिक जीवन एक नज़र में   │
│ ‹years›                    │
│ ‹role title›               │
│ ‹ward/area› · ‹provenance› │
│ …                          │
└────────────────────────────┘
```

### 14.2 Module by module

**1. Introduction (screen 1).**
- *Purpose:* say who the person is, what this site is and where to go next.
- *Visual treatment:* typographic identity block in the display serif; the name in the page's script first and the other script beneath at about 55% size (marked with `lang`); a descriptor line in the system sans with the Devanagari place name; the short bio in the lead size; the portrait beside it with caption and credit; three explore links; a one-line site statement and a link to How We Verify, separated by a hairline.
- *Content type:* Person (names, short bio, portrait), Role summary for the descriptor (generated only from published roles), approved site statement.
- *Desktop layout:* asymmetric: text columns 1–6, portrait columns 7–11, caption hanging below.
- *Mobile layout:* name and descriptor first, then the portrait at full width, caption, short bio, then explore links as tap rows.
- *Why it exists:* first-time discoverers must understand the person "in under a minute on a phone" (spec A §3). Identity before story avoids both the poster portrait and the context-free story ([§9.2](#92-answers-to-the-design-questions)).
- *When unavailable:* never hidden, as it is a launch requirement. If the descriptor has no published role, it shows only "जबलपुर / Jabalpur" with no empty separators. Explore links omit hidden sections.

**2. Public life at a glance (screen 2).**
- *Purpose:* show the span of public life factually.
- *Visual treatment:* a ruled list (not cards) with tabular years in the left column, role title, ward/area or organisation, and a provenance label at the row end; two links ("Roles & Terms", "Timeline").
- *Content type:* Role (generated), with verification labels.
- *Desktop layout:* four-column ruled table across the text-plus-media width.
- *Mobile layout:* stacked rows: years, then title, then place · label.
- *Why it exists:* communicates decades of public life in one glance ([GOV.UK](https://www.gov.uk/government/history/past-prime-ministers/clement-attlee); [Brandt](https://www.willy-brandt-biography.com/)), and labels make the evidence visible immediately.
- *When unavailable:* hidden when Roles & Terms is hidden. At most five rows; beyond five it shows the most significant (editorially ordered) and links on.

**3. From the archive (screen 3).**
- *Purpose:* show why the archive matters: the record, not rhetoric.
- *Visual treatment:* the one module on a `--band` tint; a featured collection with a 3:2 image, title, two-to-three-line standfirst and author; three hand-picked items with format labels; the visible archive lenses, each with a one-line definition. No counts.
- *Content type:* Collection (curated), Photo, Coverage, Document, Video.
- *Desktop layout:* image left (7 columns), text right; item thumbnails and lenses below.
- *Mobile layout:* image, then title and standfirst, then a two-column thumbnail grid, then lenses as tap rows.
- *Why it exists:* curated feature first, browse second ([Churchill](https://www.churchillarchive.com/); [MAP](https://map-india.org/collections/)).
- *When unavailable:* hidden if Archive is hidden. If no collection meets its three-item threshold, it shows three curated items and the lenses only.

**4. Timeline glimpse.**
- *Purpose:* a sense of chronology and an entry to the Timeline.
- *Visual treatment:* the river-line spine at inline-start with three to five milestones (year, one line); "Full timeline →".
- *Content type:* generated from Role start/end and major TimelineEvents.
- *Desktop layout:* label column left, list right.
- *Mobile layout:* vertical list, three items.
- *Why it exists:* the Havel milestone idea, adapted vertically ([vaclavhavel.cz](https://www.vaclavhavel.cz/)).
- *When unavailable:* hidden when Timeline is below its five-item threshold.

**5. Recent updates.**
- *Purpose:* show the living connection without making the homepage date-dependent.
- *Visual treatment:* up to three dated, ruled entries (date · type · place, one factual line), with a language label if single-language.
- *Content type:* Activity.
- *Desktop and mobile layout:* identical single-column list.
- *Why it exists:* the approved living-connection layer, kept low ([Helmut Schmidt](https://www.helmut-schmidt.de/)).
- *When unavailable:* **hidden automatically when the newest update is older than six months** ([0003](../decisions/0003-information-architecture.md)). The page above must feel complete without it.

**6. Connect strip.**
- *Purpose:* approved ways to make contact.
- *Visual treatment:* a single line of text links, with optional monochrome icons **with text labels**; no feeds, follower counts or brand-coloured buttons.
- *Content type:* ContactMethod and SocialLink (public only).
- *Desktop layout:* one line. *Mobile layout:* stacked 48 px rows using native handlers.
- *Why it exists:* links-only contact ([0015](../decisions/0015-mvp-contact-strategy.md)).
- *When unavailable:* hidden if Connect is hidden.

**Footer (always).** Stacked bilingual lockup, sections (visible only), utility pages, language switch, "Last updated" date ([PMML](https://pmml.gov.in/)).

**What the opening screens deliberately do not contain:** a slogan, a quote used as a tagline, a carousel, a video, a counter, a "join" or "support" call, social feeds, party symbols, other politicians' portraits, a news ticker, a cookie banner (none is needed at MVP), or a "Read in Hindi/English" splash.

---

## 15. Key page concepts

**Biography (About).** A long read in the page language. Order: H1 name, standfirst (2–3 sentences), a **facts block** on `--stone` with fixed bilingual labels (for example जन्म / Born only if the family approves under OD-23; पद / Roles; क्षेत्र / Area), an optional in-page chapter index (`<nav>` of anchors, no JavaScript), then chapters with short noun-phrase headings by period or place ([Guardian](https://www.theguardian.com/news/series/the-long-read); [Mandela biography](https://www.nelsonmandela.org/biography)). Each chapter may open with one captioned image in the media column. Pull quotes appear only from sourced speeches or interviews, with the citation beneath (no italic in Hindi). No inline footnote markers: the page ends with **"Sources and notes"** (sources by chapter, correction notes), translator credit, "Last reviewed" date and "Suggest a correction". Mobile: single column, chapter index collapsed in a `<details>`. Treated as `supplied` overall, with specific facts carrying source references (spec C §3).

**Public Life: Overview.** A section landing, not a dashboard. A one-paragraph factual summary, then the **period structure** of the public life: one ruled block per period, named by role or term ("‹role›, ‹years›"), each with two or three lines and links into Roles, Work and Timeline ([Brandt](https://www.willy-brandt-biography.com/)). Below, the three child sections with one-line descriptions. Hidden children vanish from the list.

**Timeline.** Generated, vertical, a semantic `<ol>`. Desktop: a date column (tabular, precision-aware: "1998", "मार्च 1998", "लगभग 1998"), the river-line spine, then entry content (title, type label, place, provenance label, link to the source item). Period headings (from roles) interrupt the list as chapter breaks, and decade markers sit on the spine. Thumbnails are optional and small, never a gallery. Filters by type (roles, work, coverage, activities) are static anchored views or progressive enhancement. Mobile: the spine moves to inline-start with dates above titles. No horizontal scrolling and no carousel ([§9.2](#92-answers-to-the-design-questions)).

**Roles & Terms.** A ruled table on desktop (Period · Role · How obtained · Ward/area · Organisation · Provenance), becoming stacked definition lists on mobile. Each row expands (`<details>`) to show sources and links to initiatives during that role. Party affiliation, if supplied and verified, is a plain text cell, never a colour or logo (spec A §2; [0001](../decisions/0001-product-purpose-and-posture.md)). Tabular numerals, full written dates where day precision exists.

**Work & Initiatives.** Thematic essays with date ranges, titled "‹theme› – ‹what›, ‹years›" ([Brandt Politics](https://www.willy-brandt-biography.com/politics/)). The index is a ruled list with title, years, place and a one-line summary, with an optional small image. The detail page has what / where / when, outcomes **only with sources** (spec C), related media in a short sequence, coverage citations and provenance. No "achievements in numbers" bands.

**Photograph archive.** Landing: an optional featured collection, lens navigation (decade/period, theme, collection) as a horizontal list of links that wraps (not scrolls), then a contact-sheet grid of matted thumbnails preserving ratio, each with a short caption title and date. Pagination with shareable URLs (spec E §7). Item page: see [§16](#16-archive-ux-concept).

**Documents.** A list view by default (documents read as records, not pictures): type label (certificate, letter, notice, report), title, date, issuing body, language. Detail page: the **redacted derivative** page images with a **transcription** beside (desktop) or below (mobile), marked "Transcription: ‹name›, ‹date›", the English or Hindi translation in a `<details>`, an "Original in Hindi/English" label, redaction status, and provenance (spec G §4). Multi-page documents use a simple page list, not a flipbook.

**In the Press.** A ruled list grouped by year: masthead (original script, as text, in `--band-ink`), date, headline in the original language, a translated headline in smaller text, outlet language label, and a "media-reported" provenance line. The detail page is a citation card on `--band`: headline, translation, two-to-four-line excerpt, page/edition, "Read at source" and "Archived copy" links, and a rights note. A scan or headline crop appears only with recorded rights ([Trove](https://trove.nla.gov.au/newspaper/article/2084491); [0006](../decisions/0006-archive-strategy.md)). Newspaper logos are never used.

**Video.** A click-to-load facade (poster still, play label, provider notice) ([0011](../decisions/0011-image-and-media-strategy.md)); title, date, place, duration; a **chapter list** (timestamp, one-line description) that seeks the player when JavaScript is available ([Densho](https://ddr.densho.org/interviews/ddr-densho-1000-1-1/)); captions; an inline collapsible transcript in the original language with a translated summary; credit and rights. The index is a list with poster stills (16:9) and durations.

**Updates.** A dated log, newest first, filterable by type (event, visit, announcement, appearance, community activity) through static pages. Upcoming events appear at the top in a short ruled block, automatically moved to past by date (FR-U2). Each entry: date · type · place, title, one factual paragraph, optional captioned photo, language label if single-language. No "join", RSVP or countdown.

**Press Kit.** A self-serve page for journalists: approved short bio (about 50 words) and long bio (about 150–250 words) in both languages with **copy buttons**, the preferred name spellings in both scripts and common romanisation (from the glossary), a facts block, approved photographs each with credit, rights and two download sizes ([Wellcome downloads](https://wellcomecollection.org/works/vq7jhqgp)), a ready-made credit line to copy, the press contact, and "Last updated". English URLs are the ones to share with media ([§8.5](#85-mobile-and-hindi-default-mitigations)).

**How We Verify.** A calm explanatory page that makes the system legible: what each label means, with a **specimen of each label exactly as it appears on the site**; what kinds of sources are kept; why unverified material is never shown; how translations are made and reviewed; how rights are handled (citation-first press); how to request a correction or removal. Short sections with plain headings, no jargon. It is the destination of every provenance label's "what this means" link.

---

## 16. Archive UX concept

**Archive landing (hub).** Order: a one-sentence human promise (in the manner of [Densho's](https://ddr.densho.org/) "Hear the story…", written by the editor), then a **featured collection** ("in focus"), then **lenses** with one-line definitions (Photographs, In the Press, Documents, Video; only visible ones), then **named collections**, then three to six hand-picked items, then a short note on sources linking to How We Verify. No item counts, no "browse all" grid at the top, no search box at MVP ([0017](../decisions/0017-search-deferred.md)).

**Collection cards.** Cover image (3:2), format label "संग्रह / Collection", title, one-line description, author/editor name. Flat, ruled, no shadows. The collection page opens with an authored introduction of 150–400 words with a byline ([Wellcome Stories](https://wellcomecollection.org/stories)), then items in a deliberate order, mixing media (a photo sequence, a press citation, a document), then "Sources and credits".

**Decade/period navigation.** Two complementary lenses. **Periods** (curated, named by role or life phase) are the default because they carry meaning ([Churchill](https://www.churchillarchive.com/taxonomy?id=CA_FCT_000006)). **Decades** are generated from date ranges. Sparse decades merge ("1960s–70s") until each holds enough items. On mobile, period and decade lists are wrapping link lists, never a horizontal scroller.

**Themes.** A controlled vocabulary (spec C) shown as a short list of links; a theme appears only when it has enough items (the same visibility logic). Themes are filters within Archive, not standalone pages (spec B §2). No tag clouds or tag sprawl ([Indian Memory Project](https://www.indianmemoryproject.com/) is the warning).

**Individual item pages.** Proposed order:
1. Breadcrumb (Archive › Photographs › ‹item›).
2. The media, large, in the media column, with the lightbox enhancement.
3. Caption in the page language, in a human voice.
4. Header line: date · type · place · reference.
5. **Provenance label** (one line) with "What this means" linking to How We Verify.
6. A narrative paragraph, if any, *before* the metadata ([Rijksmuseum](https://www.rijksmuseum.nl/en/collection/SK-C-5)).
7. **About this item** panel on `--stone`: description, date (display string), place, people depicted (public figures only), credit, source, collection, original language, rights (plain-language line + statement), reference.
8. **Use and cite:** a preferred citation and permanent link, each with a copy button ([JFK](https://www.jfklibrary.org/asset-viewer/archives/jfkwha-001); [Wellcome](https://wellcomecollection.org/works/vq7jhqgp)).
9. **Related:** "From the same occasion" first, then same period, same theme ([Wellcome "More works"](https://wellcomecollection.org/works/vq7jhqgp)).
10. **Suggest a correction** (quoting the reference; link to Corrections & Feedback).
Empty fields and their labels are omitted (spec B §4.3).

**Image captions.** As defined in [§13.5](#135-photography). On cards, only a short title and date. On item pages, the full caption. Alt text is separate from captions and written in each language.

**Provenance and source presentation (within "labels + optional details").** Level 1, always visible: a one-line label in the system sans, `--ink-2`, with a small glyph. Level 2, opened via `<details>`: source type, publisher/outlet, date, link or archive link, and "supplied by" wording. Internal sources and internal notes are never rendered (FR-C5). Candidate label wording, to be decided by the editors and human-reviewed in Hindi:

| Status | English candidate | Hindi candidate | Level 2 detail |
|---|---|---|---|
| `verified` | "Verified · Source: ‹source type›" | "पुष्ट · स्रोत: ‹source type›" | Source title, publisher, date, link |
| `supplied` | "Provided by the family" | "परिवार द्वारा उपलब्ध" | What was supplied, when (no private names) |
| `media-reported` | "Reported in ‹outlet›, ‹date›" | "‹outlet› में प्रकाशित, ‹date›" | Citation and link to the Coverage item |

The display level is configurable (FR-V2), so launch can show Level 1 on archive items and role rows, and leave the biography to its "Sources and notes" block.

**Related items.** Derived automatically from shared Place, Theme, Collection, Role and overlapping dates (FR-N4). Show **at most six**, grouped under plain headings, and prioritise same-occasion links across media types (photo ↔ clipping ↔ video), the JFK "Associated Records" idea.

**Press coverage.** Citation-first ([§15](#15-key-page-concepts)). The original-script headline is language-neutral data, with its translation localised (spec C §7). Group by year, filter by outlet language. Masthead names appear as text, never as logos.

**Documents.** Page images (redacted derivatives) plus transcription plus optional translation; type label; "Original in ‹language›".

**Video.** Facade, chapters, captions, inline transcript, related same-occasion items.

**Future search.** Taxonomy and markup are search-ready ([0017](../decisions/0017-search-deferred.md)). When search arrives, add a "Filters" sheet on mobile with an active-count badge and an honest empty state ([Wellcome search](https://wellcomecollection.org/search/works?query=jabalpur&workType=k)), and test Hindi search quality before adoption.

**How it feels editorial and human rather than a database.** Captions written by a person; a named editor on every collection; narrative before metadata; "c." and "probably" instead of false precision; "Suggest a correction" as an invitation; no counts or empty fields; generous single-column item pages; consistent sentence-case labels instead of uppercase database headers; sequences of photographs from one occasion rather than undifferentiated grids.

**Scale considerations for a small archive.** Start with **three to five editor-made collections** rather than a large grid ([MAP](https://map-india.org/collections/)). Merge sparse decades, hide thin themes and hide counts. Give each item a magazine-like single page, so that ten good items feel substantial ([Indian Memory Project](https://www.indianmemoryproject.com/)). Use the approved visibility thresholds (6 photos, 3 documents, 3 press items, 1 video; spec B §4.1) as the floor. The design must not show "1 of 3"-style pagination on tiny sets.

---

## 17. Bilingual design system

The system has **one set of components and two typographic profiles** selected by `:lang(hi)` and `:lang(en)` ([0009](../decisions/0009-modern-css-and-design-tokens.md)). Switching language changes type, spacing and copy, never structure or hierarchy. That is the parity principle ([Welsh guide](https://www.welshlanguagecommissioner.wales/media/niknstqs/bilingual-design-guide-eng.pdf)).

| Element | English (`/en/`) | Hindi (`/hi/`) |
|---|---|---|
| Typeface | Source Serif 4; system sans for chrome | Noto Serif Devanagari; system Devanagari sans for chrome; Latin runs routed to Source Serif 4 |
| Body | 18 px / 1.6 | 19 px / 1.75 |
| Headings | lh 1.08–1.25 | lh 1.3–1.4; extra block margin |
| Measure | 40rem | 37rem |
| Emphasis | italic for titles, 600 for strong | 600 for strong; quotation marks for titles; never italic or faux styles |
| Links | underline, offset about 0.15 em | underline offset about 0.3 em, thickness 0.06 em, `skip-ink: auto` |
| Kickers/labels | sentence case, no tracking (parity) | sentence case, no tracking, slightly larger |
| Navigation | flex-wrap; header height sized for Devanagari in both | the same; Hindi labels designed first |
| Buttons | min-height 44 px; padding-block 0.6em | min-height 44 px; padding-block 0.75em; label never truncated |
| Cards | title clamp allowed (3 lines) | title clamp 3–4 lines with ≥ 0.15 em padding-block, never `overflow: hidden` on single-line boxes |
| Captions | 15 px, `--muted`/`--ink-2` | 16 px, `--ink-2` (≥ 7:1) |
| Dates | "7 October 2026"; "c. 1998" | "7 अक्टूबर 2026"; "लगभग 1998" (glossary) |
| Numbers | Indian grouping; "1.2 lakh" or "120,000" per style guide | Western digits; Indian grouping; digits + लाख/करोड़ |
| Metadata labels | "Date", "Place", "Source" | "तिथि", "स्थान", "स्रोत" (glossary) |
| Punctuation | full stop | danda (।) for sentence end; never begin a line with a danda |
| Drop caps | none | none |
| Language of parts | `lang="hi"` on Devanagari names | `lang="en"` on Latin runs |

**Places where Hindi needs different layout behaviour.**
- **Navigation width:** design from the Hindi labels first. Prefer common nouns over Sanskritised forms ([Hindwi](https://www.hindwi.org/)), and test the full Hindi set at 360 px. Candidate labels for the glossary (to be reviewed by the Hindi editor): परिचय (About), सार्वजनिक जीवन (Public Life), अभिलेखागार or संग्रह (Archive; the former is precise but long), गतिविधियाँ (Updates), संपर्क (Connect), समयरेखा (Timeline), पद और कार्यकाल (Roles & Terms), कार्य और पहल (Work & Initiatives), तस्वीरें (Photographs), दस्तावेज़ (Documents), प्रेस में (In the Press), वीडियो (Video), प्रेस किट (Press Kit), हम कैसे पुष्टि करते हैं (How We Verify), सुधार और सुझाव (Corrections & Feedback), निजता (Privacy), शर्तें (Terms).
- **Headings:** allow Hindi headings to wrap to more lines rather than shrinking them, and test `text-wrap: balance` on Devanagari before relying on it.
- **Line-clamped and truncated text:** avoid truncation in Hindi lists. Prefer shorter editorial titles over ellipses, since ellipsis mid-conjunct is ugly and clipping cuts matras ([Wikimedia T57995](https://phabricator.wikimedia.org/T57995)).
- **Mixed-script lines:** English names inside Hindi text carry `lang="en"` and render in Source Serif 4 at the same `font-size` (ratio 1.27, so no size-adjust needed) [M].
- **Buttons and tap rows:** Devanagari's taller ink needs more vertical padding to look centred. Tune optically, not mathematically.
- **Social images:** generate per language and test Devanagari shaping (spec D §7).

**Do not force English conventions onto Hindi:** no uppercase or tracked kickers (removed in English too, for parity); no drop caps; no italic or synthetic bold (`font-synthesis: none`); no justified text; no hyphenation; no letter-spacing on headings; no underlines touching matras; no English month names, weekdays or AM/PM in Hindi chrome; no "Read more →" left in English on Hindi pages ([PARI Hindi](https://ruralindiaonline.org/hi/); [Amar Ujala](https://www.amarujala.com/)).

**Language switch behaviour.** The header shows only the *other* language: "English" on `/hi/`, "हिंदी" on `/en/`, as a plain link with `lang`, `hreflang`, `translate="no"` and an accessible description ("Read this page in English" / "यह पेज हिंदी में पढ़ें"), visible on mobile outside the menu ([Canada.ca](https://design.canada.ca/common-design-patterns/language-toggle.html)). It always targets the equivalent page. Behaviour for single-language items is a point for review ([§19](#19-recommended-next-design-decisions)).

**Single-language content in listings.** Show a small text label on each such item ("केवल अंग्रेज़ी में" / "In Hindi only") so visitors know before clicking (spec D §6).

---

## 18. Anti-patterns

### Things we must not build.

1. A hero carousel, slider, rotating banner or auto-advancing anything.
2. A slogan, motto or self-referential quote as the homepage headline.
3. Text overlaid on photographs (including darkened "hero overlays").
4. Full-bleed poster portraits, cut-out portraits, or portraits paired with other political figures.
5. Party symbols, party colours, tricolour gradients or saffron accents anywhere in the interface.
6. Vote, join, support, donate, volunteer, petition, missed-call, app-download or newsletter CTAs.
7. Countdown timers, "achievements in numbers" bands, animated counters, visitor counters.
8. Social-feed embeds, floating social rails, follower counts, share bars that follow the reader.
9. Chatbots, popups, interstitials, modals on entry, cookie banners (none needed at MVP).
10. PDF flipbooks or PDF covers as primary content; PDFs without an HTML equivalent.
11. A news ticker, marquee or "What's New" box at the top of the homepage.
12. A circular, horizontal-scrolling or JavaScript-only timeline.
13. Photo viewers without per-item permalinks; deep-zoom viewers that fail keyboard users.
14. Truncated titles with ellipses in archive grids; identical link text ("View", "Read more") without accessible names.
15. Visible empty fields, "Unknown", "N/A", "Coming soon" or empty sections.
16. Item counts on thin categories; tag clouds.
17. Traffic-light colours for verification statuses; verification conveyed by colour alone.
18. Academic footnote markers throughout prose.
19. Newspaper logos or full-page newspaper scans without recorded rights.
20. Machine-translated Hindi; English strings, months or dates in Hindi chrome; wrong `lang`.
21. A language switch in the footer only, as a dropdown, as flags, or as codes ("HI/EN").
22. Uppercase or letter-spaced labels in Devanagari; drop caps in Devanagari; faux bold or italic.
23. Marble, parchment, paper or stone textures; sepia or vintage filters; colourised or AI-upscaled archival photos.
24. Gond, Warli, mandala, rangoli, temple, linga, diya, lotus, waterfall or other regional/religious motifs as decoration.
25. A river line used as a logo, wave icon, animated line, gradient or watermark, or used more than once or twice.
26. Stock photography, AI-generated imagery, or illustrative "Indian city" clip art.
27. Parallax, scroll-jacking, scroll-triggered reveals, sticky-shrinking headers, autoplaying video or audio.
28. Rounded "SaaS" cards with shadows, gradients and pill buttons.
29. A standalone "Jabalpur" tourism page (spec B §2).
30. Infinite scroll in the archive (pagination with shareable URLs instead).
31. A search box at MVP ([0017](../decisions/0017-search-deferred.md)).
32. Heavy page-builder stacks, icon-font libraries or third-party scripts on content pages.

---

## 19. Recommended next design decisions

Ordered by impact on the design phase. Items marked **For review** touch an approved decision or the specification. They are **not changed by this research** and would need a new decision record if adopted.

**1. Final type system.** *Options:* (A) Noto Serif Devanagari + Source Serif 4 with system sans for chrome; (B) Tiro Devanagari Hindi + Literata; (C) the IBM Plex system; (D) the Noto superfamily only (Noto Serif + Noto Sans, both scripts). *Recommendation:* A, validated against B in a one-page bilingual test (dense Hindi paragraph, mixed English names, numerals, links, captions) on a mid-range Android phone over throttled 4G. *Evidence:* metric ratios and sizes ([§8.6](#86-typography-findings-devanagari--latin)); Hindi publishers' sans default ([bbc.com/hindi](https://www.bbc.com/hindi), [amarujala.com](https://www.amarujala.com/)). **For review (spec E §2):** the brief lists "Tiro Devanagari Hindi (with its matching Latin)", but Tiro's Latin is a transliteration subset, not a text companion ([Tiro Typeworks](https://tiro.com/fonts/tiro-devanagari-hindi)). The "at most two families" rule should be clarified as "two self-hosted families plus system sans for chrome", or replaced by a **byte budget** (about 125–160 KB of fonts per Hindi page).

**2. Palette validation and the warm secondary.** *Options:* marble pink-cream band (`#F0E6DC` tint) or monsoon silt (`#77613F`); validate either by sampling commissioned photography. *Recommendation:* the band tint for surfaces, silt only as its darker text partner, all contrast-checked in the token build. **For review (spec E §4):** the brief's "sandstone/basalt tones" lacks a Jabalpur source in this research. The documented materials are marble (white/grey/pink/bluish-grey), granite and brick-lime ([UNESCO tentative list](https://whc.unesco.org/en/tentativelists/6531) [S]; [Outlook Traveller](https://www.outlooktraveller.com/destinations/india/all-you-need-to-know-about-the-madan-mahal-in-madhya-pradesh) [S]; [Wikipedia, High Court](https://en.wikipedia.org/wiki/Madhya_Pradesh_High_Court)).

**3. Commissioned photography brief and budget (OD-17).** *Options:* commission a local documentary photographer for portrait and place; use family archive only; hybrid. *Recommendation:* commission one environmental portrait session plus a half-day place survey (ghats, civic facades, ward streets, signage), with consent records, briefed on tone from [Lele/Hawkesworth](https://www.anothermag.com/fashion-beauty/13006/supriya-lele-and-jamie-hawkesworths-dreamy-trip-down-the-narmada-river) and the [§13.5](#135-photography) rules. *Evidence:* the homepage concept depends on one strong captioned portrait, and the palette needs real photographs to validate.

**4. Verification label wording and launch display level (FR-V2).** *Options:* label only; label + `<details>`; label + panel. *Recommendation:* label + `<details>` on archive items and role rows; "Sources and notes" for long-form prose; candidate wording in [§16](#16-archive-ux-concept), with Hindi reviewed by the Hindi editor. *Evidence:* [Wellcome](https://wellcomecollection.org/works/vq7jhqgp), [Densho](https://ddr.densho.org/interviews/ddr-densho-1000-1-1/); [0004](../decisions/0004-content-and-verification-model.md). **For review (spec E §10):** the component list says "prose/biography layout with footnotes", which sits uneasily with 0004's "no academic-style footnote clutter". Clarify that it means an end-of-page "Sources and notes" block.

**5. Caption grammar, credit format and public reference IDs.** *Options:* show the internal `id`/slug; a separate short public reference; none. *Recommendation:* a short, stable public reference per item that does **not** encode the date (dates get corrected), shown in the "About this item" panel and citations but not on cards ([JFK](https://www.jfklibrary.org/asset-viewer/archives/jfkwha-001), [MAP](https://map-india.org/collections/cumulus/photography/PHY.40025/?id=77515)). Lock the caption order and credit prefixes in both languages in the glossary.

**6. Language switch on single-language items.** **For review (spec D §4 and §6; 0002 point 9).** Spec D says every page has a counterpart at the same path and that unavailable items show a notice and link. The research warns against publishing untranslated bodies under translated chrome as indexable pages ([Google Search Central](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)). *Options:* (a) a notice page at the counterpart path (localised chrome, short notice, link to the available version), marked `noindex` and excluded from hreflang pairs; (b) the switch points to the nearest bilingual parent with a notice. *Recommendation:* (a), because it honours spec D's "same path" promise while keeping search results clean. Note that archive items with bilingual metadata and an original-language artefact are **not** single-language pages: they get full pages in both languages with an "Original in Hindi" label.

**7. `x-default` target and the remembered-choice cookie.** **For review (spec D §3–4; 0002 point 4; spec A §8).** Spec D's table says x-default "points to it" (ambiguous between `/` and `/hi/`), while 0002 says "the Hindi version". *Recommendation:* point `x-default` at `/hi/` (a 200 page), not the redirecting `/` (hreflang targets should be final URLs; inference from [Google](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)). Separately, spec D §4 allows remembering the visitor's last choice "on their own device", but spec A §8 says "no cookies … at MVP", and a static `/` redirect cannot read local storage without JavaScript. *Recommendation:* do not implement remembered choice at MVP; reconsider with the analytics/privacy notice if wanted.

**8. Switch label in the IA sketch.** **For review (spec B §1).** The navigation sketch shows "[हिंदी | EN]", while 0002 specifies "English" and "हिंदी". The research recommends showing **only the other language, in full**, as a link ([Canada.ca](https://design.canada.ca/common-design-patterns/language-toggle.html); [USWDS](https://designsystem.digital.gov/patterns/select-a-language/two-languages/)). Align the sketch with 0002.

**9. Hindi navigation labels, month spellings and nuqta policy (with OD-20).** *Options:* Sanskritised formal terms versus common Hindi; "अक्टूबर" versus "अक्तूबर"; nuqta forms ("फ़ोटो" versus "फोटो"). *Recommendation:* common nouns, CLDR month spellings for consistency with generated dates, a stated nuqta policy, all locked in the glossary before design comps; test the full Hindi nav at 360 px. *Evidence:* [Hindwi](https://www.hindwi.org/); [§17](#17-bilingual-design-system).

**10. Timeline periods: derived or curated.** *Options:* derive periods from Role start/end automatically; add a curated period label per role; add a lightweight Period entity later. *Recommendation:* derive from Roles at MVP with an optional editor-supplied period title on the Role, and add a Period entity only if needed (fields are added when content requires, spec C §1). *Evidence:* [Brandt](https://www.willy-brandt-biography.com/); [Churchill](https://www.churchillarchive.com/taxonomy?id=CA_FCT_000006).

**11. "Same occasion" linking.** *Options:* rely on overlapping dates and places; link items explicitly to a TimelineEvent or Activity; use Collections. *Recommendation:* explicit optional reference from Photo, Coverage, Video and Document to a TimelineEvent or Activity, because date overlap is too noisy for a public life with many events. *Evidence:* [JFK Associated Records](https://www.jfklibrary.org/asset-viewer/archives/jfkwha-001).

**12. Archive hub at small scale.** *Options:* show all lenses always; show lenses only above thresholds; merge sparse decades. *Recommendation:* lenses follow visibility rules; decades merge below a configurable minimum; counts hidden; three to five launch collections. *Evidence:* [§16](#16-archive-ux-concept); [Indian Memory Project](https://www.indianmemoryproject.com/); [Churchill](https://www.churchillarchive.com/taxonomy?id=CA_FCT_000006).

---

## 20. Research references

Status key: **[R]** verified in a rendered browser · **[H]** verified via fetched HTML/CSS/text · **[M]** our own measurement from served files · **[S]** search snippet or secondary summary only (unverified) · **[B]** blocked or unreachable on 7 October 2026.

### A. Indian public-figure and memorial sites

| Reference | URL | Status |
|---|---|---|
| Prime Ministers Museum & Library | https://pmml.gov.in/ | [R] desktop + 375 px |
| Pradhanmantri Sangrahalaya (redirect) | https://www.pmsangrahalaya.gov.in/ | [R] redirects to PMML |
| PMML legacy domain | https://www.pmml.nic.in/ | [B] |
| Nehru Memorial legacy domain | https://nehrumemorial.nic.in/ | [B] |
| Gandhi Heritage Portal | https://www.gandhiheritageportal.org/ | [R] |
| Gandhi Heritage Portal: Gallery | https://www.gandhiheritageportal.org/gallery | [H] |
| Gandhi Heritage Portal: Photos | https://www.gandhiheritageportal.org/photos-of-mahatma-gandhi | [H] |
| Rashtrapati Bhavan | https://rashtrapatibhavan.gov.in/ | [R] |
| Gandhi Ashram at Sabarmati | https://www.gandhiashramsabarmati.org/en/ | [R] |
| Gandhi Smriti and Darshan Samiti | https://gandhismriti.gov.in/ | [R] |
| narendramodi.in | https://www.narendramodi.in/ | [R] desktop + 375 px |
| narendramodi.in Hindi | https://www.narendramodi.in/hi | [R] |
| Dr Shashi Tharoor | https://www.shashitharoor.in/ | [R] desktop + 375 px |
| Municipal corporator site (Pune) | https://amolbalwadkar.com/ | [R] |
| Wikipedia (source of corporator URL) | https://en.wikipedia.org/wiki/Amol_Ratan_Balwadkar | [H] |
| WordPress.org: Patterns Political | https://wordpress.org/themes/patterns-political/ | [H] |
| Compete Themes round-up | https://www.competethemes.com/blog/political-campaign-wordpress-themes/ | [H] |
| ThemeForest political themes | https://themeforest.net/search/politicia | [B] bot check; snippet only |
| TemplateMonster Lidership theme | https://www.templatemonster.com/wordpress-themes/lidership-political-multipurpose-wordpress-theme-77034.html | [S] |
| Deccan Herald (government website quality) | https://www.deccanherald.com/amp/story/india%2Fcentre-asks-ministries-improve-quality-2573550 | [S] |
| Business Today (2009, party websites) | https://businesstoday.in/magazine/current/story/a-political-web-245378-2009-04-02 | [S] |
| rahulgandhi.in | https://www.rahulgandhi.in/ | [B] |
| abdulkalam.com | https://www.abdulkalam.com/ | [B] Cloudflare 523 |
| mkstalin.in | https://mkstalin.in/ | [B] Cloudflare 522 |
| shivrajsinghchouhan.org | https://www.shivrajsinghchouhan.org/ | [B] Cloudflare 522 |

### B. International public-service profiles

| Reference | URL | Status |
|---|---|---|
| GOV.UK Past Prime Ministers | https://www.gov.uk/government/history/past-prime-ministers | [H] |
| GOV.UK profile (Attlee) | https://www.gov.uk/government/history/past-prime-ministers/clement-attlee | [H] |
| Willy Brandt online biography | https://www.willy-brandt-biography.com/ | [H] |
| Willy Brandt biography: Politics | https://www.willy-brandt-biography.com/politics/ | [H] |
| Bundeskanzler Willy Brandt Stiftung | https://www.willy-brandt.de/ | [H] |
| Barack Obama Presidential Library | https://www.obamalibrary.gov/ | [H] (timeline JS not readable) |
| Obama Library Digital Research Room | https://www.obamalibrary.gov/digital-research-room | [H] |
| Obama Foundation (counter-example) | https://www.obama.org/ | [H] |
| Václav Havel Library | https://www.vaclavhavel.cz/ | [H] |
| Václav Havel EN biography | https://www.vaclavhavel.cz/en/vaclav-havel/biography | [H] (placeholder page) |
| Nelson Mandela Foundation: biography | https://www.nelsonmandela.org/biography | [H] |
| Nelson Mandela Foundation: homepage | https://www.nelsonmandela.org/ | [H] |
| Helmut Schmidt Foundation | https://www.helmut-schmidt.de/ | [H] |
| Jimmy Carter Library | https://www.jimmycarterlibrary.gov/ | [H] |
| LaGuardia and Wagner Archives | https://laguardiawagnerarchive.lagcc.cuny.edu/ | [H] |
| UK Parliament member pages | https://members.parliament.uk/ | [B] HTTP 403 |
| National Archives of Australia, PMs | — | [B] timed out |

### C. Digital archives

| Reference | URL | Status |
|---|---|---|
| Wellcome Collection item (photograph) | https://wellcomecollection.org/works/vq7jhqgp | [H] |
| Wellcome Collection item (book) | https://wellcomecollection.org/works/a2239muq | [H] |
| Wellcome Collection search | https://wellcomecollection.org/search/works?query=jabalpur&workType=k | [H] |
| MAP Bengaluru: Collections | https://map-india.org/collections/ | [H] |
| MAP item PHY.40025 | https://map-india.org/collections/cumulus/photography/PHY.40025/?id=77515 | [H] |
| MAP Gandhi Collection | https://map-india.org/collections/cumulus/gandhi-collection/ | [H] (JS-rendered; little text) |
| Indian Memory Project | https://www.indianmemoryproject.com/ | [H] |
| Indian Memory Project story | https://indianmemoryproject.com/232-2/ | [H] |
| Densho Digital Repository | https://ddr.densho.org/ | [H] (search [B]) |
| Densho Browse | https://ddr.densho.org/browse/ | [H] |
| Densho interview segment | https://ddr.densho.org/interviews/ddr-densho-1000-1-1/ | [H] |
| JFK Library asset viewer | https://www.jfklibrary.org/asset-viewer/archives/jfkwha-001 | [R] (fetch [B] 403) |
| Churchill Archive | https://www.churchillarchive.com/ | [H] |
| Churchill Archive period taxonomy | https://www.churchillarchive.com/taxonomy?id=CA_FCT_000006 | [H] |
| Trove newspaper article | https://trove.nla.gov.au/newspaper/article/2084491 | [R] (fetch [B]) |
| Rijksmuseum object SK-C-5 | https://www.rijksmuseum.nl/en/collection/SK-C-5 | [H] |
| 1947 Partition Archive | https://in.1947partitionarchive.org/ | [H] |
| 1947 Partition Archive collections | https://in.1947partitionarchive.org/collections | [H] |
| RightsStatements.org | https://rightsstatements.org/page/1.0/?language=en | [H] |
| Cogapp: accessible image viewers | https://www.cogapp.com/blog/what-makes-an-image-viewer-accessible | [H] |
| University of St Andrews accessibility statement | https://www.st-andrews.ac.uk/library/accessibility/statements/collections/ | [S] |
| Ex Libris ideas forum (Universal Viewer AV) | https://ideas.exlibrisgroup.com/forums/308179-rosetta/suggestions/49126487-iiif-universal-viewer-delivery-of-audio-visual-m | [S] |
| FDLP Chronicling America slides | https://fdlp.gov/sites/default/files/training/20221213-wn-chronicling-america-using-historical-newspapers-slides.pdf | [S] |
| Nelson Mandela Foundation Archive | https://archive.nelsonmandela.org/ | [B] bot check |
| Google Europe blog (Mandela archive, 2012) | https://europe.googleblog.com/2012/03/explore-mandelas-archives-online.html | [S] |
| NMF archive announcement | https://nelsonmandela.org/news/entry/mandela-archive-goes-live-on-the-web | [S] |
| Library of Congress / Chronicling America | https://www.loc.gov/ | [B] bot check |

### D. Editorial and documentary publications

| Reference | URL | Status |
|---|---|---|
| PARI | https://ruralindiaonline.org/ | [H] HTML/CSS |
| PARI article | https://ruralindiaonline.org/article/in-2023-writing-with-light | [H] |
| PARI Hindi album | https://ruralindiaonline.org/hi/albums/women-wheels-work | [S] |
| Fifty Two | https://fiftytwo.in/ | [H] HTML/CSS |
| Fifty Two story | https://fiftytwo.in/story/allegiance/ | [H] |
| The Caravan | https://caravanmagazine.in/ | [H] HTML/CSS |
| The Caravan photo essay | https://caravanmagazine.in/communities/a-personal-archive-of-longing-that-traces-a-life-across-lost-cities | [H] |
| MAP Bengaluru homepage | https://map-india.org/ | [H] HTML/CSS |
| MAP exhibition page | https://map-india.org/exhibition/a-moving-line-1500-years-of-indian-visual-storytelling | [H] |
| Magnum Photos | https://www.magnumphotos.com/ | [H] HTML/CSS |
| Magnum story | https://www.magnumphotos.com/arts-culture/europes-living-room/ | [H] |
| Guardian Long Read series | https://www.theguardian.com/news/series/the-long-read | [H] curl only |
| Guardian Long Read article | https://www.theguardian.com/news/2026/sep/29/why-am-i-obsessed-with-chinas-ancient-golden-age-i-took-my-daughter-on-a-trip-to-find-out | [H] curl only |
| Wellcome Collection Stories | https://wellcomecollection.org/stories | [H] |
| Wellcome story (birth scroll) | https://wellcomecollection.org/stories/close-encounter-with-a-medieval-birth-scroll | [H] |
| Emergence Magazine | https://emergencemagazine.org/ | [H] |
| Emergence essay | https://emergencemagazine.org/essay/new-life-for-the-ezo-spruce | [H] |
| The Pudding | https://pudding.cool/ | [H] |
| Noema | https://www.noemamag.com/ | [H] |
| Aeon | https://aeon.co/ | [H] CSS only |
| Rest of World | https://restofworld.org/ | [H] |
| The Marshall Project | https://www.themarshallproject.org/ | [H] |
| Aperture | https://aperture.org/ | [H] |
| Serendipity Arts Festival | https://www.serendipityartsfestival.com/ | [H] |
| Kochi-Muziris Biennale | https://kochimuzirisbiennale.org/ | [H] |
| Scroll magazine | https://scroll.in/magazine | [H] |
| Mint Lounge | https://www.livemint.com/mint-lounge | [H] |
| The Alipore Post | https://thealiporepost.com/ | [H] |
| New York Times | https://www.nytimes.com/ | [B] HTTP 403 |
| Fonts in Use (NYT, 2013) | https://fontsinuse.com/uses/3907/the-new-york-times-article-redesign-may-2013 | [S] |
| Roger Black (type for the Times) | https://rogerblack.com/blog/post/type_for_the_times | [S] |

### E. Jabalpur, Narmada and Madhya Pradesh

| Reference | URL | Status |
|---|---|---|
| UNESCO tentative list 6531 (Bhedaghat) | https://whc.unesco.org/en/tentativelists/6531 | [S] (direct fetch [B] 403) |
| World Heritage Site mirror | https://www.worldheritagesite.org/tentative/id/6531 | [S] |
| Marble Rocks (Wikipedia) | https://en.wikipedia.org/wiki/Marble_Rocks | [H] (needs-citations flag) |
| Madan Mahal (Outlook Traveller) | https://www.outlooktraveller.com/destinations/india/all-you-need-to-know-about-the-madan-mahal-in-madhya-pradesh | [S] |
| Madan Mahal Fort (Incredible India) | https://www.incredibleindia.gov.in/en/madhya-pradesh/jabalpur/madan-mahal-fort | [S] |
| Madan Mahal (Wikipedia) | https://en.wikipedia.org/wiki/Madan_Mahal,_Jabalpur | [S] |
| eSamskriti, Marble Rocks | https://esamskriti.com/a/Madhya-Pradesh/Marble-Rocks-Jabalpur.aspx | [S] |
| The Hitavada, monsoon 2026 | https://www.thehitavada.com//Encyc/2026/8/24/overflowing-reservoirs-seasonal-waterfalls-monsoon-brings-out-its-hidden-natural-beauty-in-sanskardhani.html | [S] |
| Rijksmuseum, Samuel Bourne print | https://www.rijksmuseum.nl/en/collection/object/RP-F-2005-107-239--9caac1b1f59c920cdcb15c4be1f4efcc | [H] |
| Rijksmuseum, Marble Rocks view | https://www.rijksmuseum.nl/en/collection/object/View-of-the-Marble-Rocks-on-the-Narmada-River--f94bde40bdd19cac09679a6ab8818c99 | [H] |
| Yale Library, Narmada bathers c.1920–40 | https://collections.library.yale.edu/catalog/16718451 | [H] |
| MP High Court (Wikipedia) | https://en.wikipedia.org/wiki/Madhya_Pradesh_High_Court | [H] |
| Victorian Web, Henry Irwin | https://victorianweb.org/victorian/art/architecture/irwin/das/3.html | [S] |
| The Hitavada, Flag Satyagraha | https://thehitavada.com/Encyc/2023/8/13/-Jhanda-Satyagraha-Nagpur-led-stand-against-the-British-100-years-ago.html | [S] |
| Flag Satyagraha (Wikipedia) | https://www.wikipedia.com/wiki/Flag_Satyagraha | [S] |
| Travel Trends Today | https://www.traveltrendstoday.in/patel-observes-flag-satyagraha-in-jabalpur | [S] |
| Britannica, Jabalpur | https://www.britannica.com/place/Jabalpur | [S] |
| New India Samachar (Makhanlal Chaturvedi) | https://newindiasamachar.pib.gov.in/WriteReadData/flipbook/2022/May/2nd/English/files/basic-html/page81.html | [S] |
| Harishankar Parsai (Wikipedia) | https://en.wikipedia.org/wiki/Harishankar_Parsai | [H] |
| The Week, Parsai centenary | https://www.theweek.in/wire-updates/national/2024/08/21/bom24-satirist-parsai-100-years.html | [S] |
| Madhavrao Sapre (Wikipedia) | https://en.wikipedia.org/wiki/Madhavrao_Sapre | [S] |
| Bharat Bhavan (Architecture Lab) | https://www.architecturelab.net/bharat-bhavan-charles-correa/ | [S] |
| Charles Correa Foundation | https://charlescorreafoundation.org/2019/10/17/bharat-bhavan-listed-amongst-the-top-20-most-visited-ad-architecture-classics-by-archdaily/ | [S] |
| Tribal Museum (Kamath Design) | https://www.kamathdesign.org/?p=2970 | [S] |
| Tribal Museum (Outlook Traveller) | https://www.outlookindia.com/traveller/mp/inspire-me/culture/view-life-tribal-museum-bhopal/ | [S] |
| MeMeraki, Tribal Museum | https://www.memeraki.com/blogs/posts/inside-bhopal-s-tribal-museum-exploring-the-stories-of-tribal-art-and-culture | [S] |
| AnOther, *Narmada* photobook | https://www.anothermag.com/fashion-beauty/13006/supriya-lele-and-jamie-hawkesworths-dreamy-trip-down-the-narmada-river | [H] |
| PARI, "The visual storyteller of Patangarh" | https://wagtail.ruralindiaonline.org/en/articles/the-visual-storyteller-of-patangarh/ | [H] (mirror) |
| MyGov, Jabalpur Smart City logo | https://www.mygov.in/task/jabalpur-smart-city-logo-competition | [S] |
| Hinduism Today, *Benevolent Narmada* | https://www.hinduismtoday.com/?p=2073 | [S] |
| Down To Earth, *Images of Narmada* | https://www.downtoearth.org.in/environment/candid-camera-19262 | [S] |
| The Boar, *Parikrama* | https://theboar.org/2025/05/parikrama-uk-asian-film-festival-2025-provided-thought-provoking-if-flawed-look-at-indias-narmada-river | [S] |
| Scroll, Gond art politics | https://scroll.in/magazine/1046722/scroll_in | [S] |
| ATB Legal, folk art and moral rights | https://atblegal.com/blog/intellectual-property-laww/folk-art-traditional-works-copyright-gi-tag-moral-rights/ | [S] |
| International Journal of Intangible Heritage | https://ijih.org/volumes/article/1045 | [S] |
| MP Tourism, Jabalpur High Court | https://www.mptourism.com/jabalpur-high-court.html | Not fetched |
| Jabalpur district site | https://jabalpur.nic.in/ | Not fetched |

### F. Bilingual UX

| Reference | URL | Status |
|---|---|---|
| Hindwi | https://www.hindwi.org/ | [H] |
| Rekhta (Hindi view) | https://www.rekhta.org/?lang=hi | [H] |
| PARI Hindi | https://ruralindiaonline.org/hi/ | [H] |
| Amar Ujala | https://www.amarujala.com/ | [H] |
| Reserve Bank of India | https://www.rbi.org.in/ | [H] |
| Constitution of India, Art. 343 | https://www.constitutionofindia.net/articles/article-343-official-language-of-the-union | [H] |
| Welsh Language Commissioner, Bilingual Design Guide | https://www.welshlanguagecommissioner.wales/media/niknstqs/bilingual-design-guide-eng.pdf | [H] PDF text |
| Canada.ca language toggle | https://design.canada.ca/common-design-patterns/language-toggle.html | [H] |
| USWDS: two languages | https://designsystem.digital.gov/patterns/select-a-language/two-languages/ | [H] |
| USWDS: select a language | https://designsystem.digital.gov/patterns/select-a-language/ | [H] |
| Google Search Central, multi-regional sites | https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites | [H] |
| W3C i18n: language selection | https://www.w3.org/International/questions/qa-navigation-select | [H] |
| Nasfi 2023 (UNIGE thesis) | https://archive-ouverte.unige.ch/unige:174268 | [H] |
| GOV.UK Design Notes (Welsh users) | https://designnotes.blog.gov.uk/2024/11/14/how-can-we-test-our-designs-with-welsh-speaking-users/ | [S] |
| Localize.js on flags | https://localizejs.com/articles/why-using-flag-icons-can-confuse-your-users | [S] vendor blog |
| KPMG–Google 2017 report | https://kpmg.com/ky/en/home/insights_new/2017/04/indian-language-internet-users.html | [H] |
| KPMG–Google 2017 PDF | https://assets.kpmg.com/content/dam/kpmg/in/pdf/2017/04/Indian-languages-Defining-Indias-Internet.pdf | [H] |
| W3C Indic Layout Requirements | https://www.w3.org/TR/ilreq/ | [H] |
| websnp (Nepali web typography) | https://www.websnp.com/help/nepali-unicode-fonts-website-typography | [S] practitioner blog |
| Wikipedia: Hindustani numerals | https://en.wikipedia.org/wiki/Hindustani_numerals | [S] |
| IU Pressbooks: Hindi script | https://iu.pressbooks.pub/hindiscript/?p=340 | [S] |
| digit.in on GIGW 3.0 | https://www.digit.in/features/general/what-is-gigw-3-0-indian-govts-design-guidelines-for-official-websites-and-apps.html/amp/ | [S] |
| Skynet Technologies on GIGW 3.0 | https://www.skynettechnologies.com/blog/gigw-3-0-government-website-accessibility-in-india | [S] |
| BBC Hindi, NDTV India, india.gov.in, MeitY localisation PDF | — | [B] for UX fetch |

### G. Bilingual typography

| Reference | URL | Status |
|---|---|---|
| Google Fonts metadata | https://fonts.google.com/metadata/fonts | [M] |
| Google Fonts CSS2 API (sizes) | https://fonts.googleapis.com/css2?family=Noto+Serif+Devanagari:wght@400 | [M] |
| Tiro Typeworks: Tiro Devanagari Hindi | https://tiro.com/fonts/tiro-devanagari-hindi | [H] |
| Fontsource: Tiro Devanagari Hindi | https://fontsource.org/fonts/tiro-devanagari-hindi/about | [H] |
| Murty Library EULA | https://murtylibrary.com/end-user-license-agreement | [H] |
| CentAUR: Murty Hindi | https://centaur.reading.ac.uk/68487 | [S] |
| CentAUR: Adobe Devanagari | https://centaur.reading.ac.uk/18185 | [S] |
| EkType/Anek | https://github.com/EkType/Anek | [H] |
| ITF Halant README | https://github.com/itfoundry/halant/blob/master/README.md | [H] |
| Fontshare API | https://api.fontshare.com/v2/fonts | [M] |
| MyFonts: Kohinoor Devanagari Variable | https://www.myfonts.com/de/collections/kohinoor-devanagari-variable-font-indian-type-foundry | [H] (web licence unverified) |
| MyFonts: ITF Devanagari | https://www.myfonts.com/fonts/indian-type-foundry/itf-devanagari/?refby=m | [H] |
| Fontspring: Adobe Devanagari | https://fontspring.com/sku/ADB1146696 | [H] (web licence unverified) |
| Fontspring: Skolar PE | https://www.fontspring.com/fonts/rosettatype/skolar-pe | [H] |
| Rosetta licence v5.7 | https://dev.rosettatype.com/assets/licence/Rosetta-licence_v5.7.pdf | [H] |
| Rosetta: Skolar Devanagari (old page) | https://old.rosettatype.com/SkolarDevanagari | [H] |
| Apple system fonts | https://developer.apple.com/fonts/system-fonts/ | [H] |
| Microsoft: Nirmala UI | https://learn.microsoft.com/ja-jp/typography/font-list/nirmala-ui | [H] |
| Wikipedia: Nirmala UI | https://en.wikipedia.com/wiki/Nirmala_UI | [S] |
| Homebrew: Noto Sans Devanagari UI | https://formulae.brew.sh/cask/font-noto-sans-devanagari-ui | [S] |
| Alphabettes, "Devanagari Typography 101" | https://www.alphabettes.org/devanagari-typography-101-a-guide-for-typesetting-with-latin/ | [H] |
| W3C Devanagari Gap Analysis (2023) | https://www.w3.org/TR/2023/DNOTE-deva-gap-20230614/ | [H] |
| W3C Devanagari Script Resources (2024) | https://www.w3.org/TR/2024/DNOTE-deva-lreq-20240920/ | [H] |
| r12a, Hindi orthography notes | https://r12a.github.io/scripts/deva/hi | [H] |
| W3C, Styling underlines | https://www.w3.org/International/articles/styling/underline | [H] |
| MDN: ascent-override | https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/ascent-override | [H] |
| MDN: font-size-adjust | https://developer.mozilla.org/en-US/docs/Web/CSS/font-size-adjust | [H] |
| SuttaCentral line-height testing | https://discourse.suttacentral.net/t/testing-for-line-height-with-tall-scripts/6196 | [H] |
| Wikimedia Phabricator T57995 | https://phabricator.wikimedia.org/T57995 | [H] |
| IndiaFont typography tips | https://indiafont.com/blog/indian-typography-tips | [S] commercial blog |
| BBC Hindi (CSS) | https://www.bbc.com/hindi | [H] HTML/CSS |
| Dainik Bhaskar (CSS) | https://www.bhaskar.com/ | [H] HTML/CSS |
| Amar Ujala (CSS) | https://www.amarujala.com/ | [H] HTML/CSS |
| Satya Hindi (CSS) | https://www.satyahindi.com/ | [H] HTML/CSS |
| Aaj Tak (CSS) | https://www.aajtak.in/ | [H] HTML/CSS |
| PARI Hindi (CSS) | https://ruralindiaonline.org/hi/ | [H] HTML/CSS |
| Navbharat Times (CSS) | https://navbharattimes.indiatimes.com/ | [H] HTML/CSS |
