# 09. Language Glossary and Content Conventions

- **Version:** 2.2 (terminology approved for implementation, 2026-10-08)
- **Status:** Conventions and terminology that can be fixed **without family-specific information**.
  - **Approved editorial:** the conventions approved by decision records or the final review, **and
    all terminology**, approved by the decision partner for the scaffold and implementation
    (2026-10-08). The appointed Hindi/English reviewer (OD-16) has **final confirmation authority
    before launch**. Implementation does not wait for the reviewer. Any change the reviewer asks for
    is made deliberately through the glossary keys (`src/content/glossary/glossary.yaml`), never
    silently.
  - **Family-confirmed:** proper names and person-specific terms (§12); none exist yet, and none are
    inferred.
  - **Open:** romanisation (OD-20).

  The summary is in [§14](#14-final-status-summary).
- **Based on:** [0002](../decisions/0002-bilingual-strategy.md), [0021](../decisions/0021-language-switching-and-single-language-content.md),
  [0023](../decisions/0023-public-reference-identifiers.md), [0024](../decisions/0024-typography-system.md),
  [0026](../decisions/0026-verification-and-source-presentation.md), [spec B](02-information-architecture.md),
  [research §8, §17](../research/01-visual-product-research.md#17-bilingual-design-system),
  [design implementation brief](../design/07-implementation-brief.md).

## 1. Purpose and authority

- This document is the **source of truth for bilingual wording and conventions**: interface labels,
  recurring terms, dates, numbers, punctuation, captions, verification wording and metadata labels.
- At implementation, every interface string is read from glossary keys
  ([technical scaffold plan §9](../implementation/01-technical-scaffold-plan.md#9-bilingual-routing-and-strings)).
  No Hindi page may show English interface text, and no wording drifts between pages.
- **Tone:** natural, dignified, editorial Hindi, neither bureaucratic nor colloquial. English is
  plain British English. Translation is by meaning, not word for word: the two editions say the same
  thing in the way each language says it best.
- **Proper names are never translated by assumption.** Family-confirmed spellings override every
  convention in this document (§12, §13).

## 2. Status system

| Status | Meaning | Set by | May be published? |
|---|---|---|---|
| **Proposed** | A candidate under discussion | Anyone, with a reason | No (mock-ups and tests only) |
| **Recommended** | A proposal this document recommends for approval | This glossary | No, until approved |
| **Approved editorial** | Approved wording for generic terms and conventions | Decision partner; Hindi entries confirmed by the reviewer (OD-16) when appointed | Yes |
| **Family-confirmed** | A proper name, spelling, title or personal fact confirmed by the person or family | Family input (spec H §4) | Yes. **Overrides** any generic convention or translation assumption for that name |
| **Deprecated** | Withdrawn or replaced; kept so old usage can be found and fixed | Decision partner | No. Must name its replacement |
| **Open** | A convention not yet chosen (e.g. romanisation) | — | Not applicable; nothing may depend on it for published content |

Rules:
- Only **Approved editorial** and **Family-confirmed** entries may appear in published content.
- Keys are never reused.
- A change to an approved entry creates a new entry, and the old one is deprecated.

## 3. Navigation and interface labels

Principles:
- Prefer **common, dignified nouns** over Sanskritised officialese or loanwords, unless a loanword is
  the natural word (वीडियो, मीडिया, प्रेस किट).
- The same concept uses the same word in navigation, headings, breadcrumbs and links.
- Labels must fit the mobile menu without truncation. The Hindi primary navigation measured about
  371 px, so the menu is used below about 400 px ([0024](../decisions/0024-typography-system.md)).

| Key | English | Hindi | Reason | Status |
|---|---|---|---|---|
| `nav.home` | Home | मुखपृष्ठ | Standard, dignified Hindi for a site's home page; used in breadcrumbs. "होम" is a loan and less editorial | Approved editorial |
| `nav.about` | About | परिचय | Natural "introduction/about"; short | Approved editorial |
| `nav.about.biography` | Biography | जीवन-परिचय | The established Hindi term for a biographical account. "जीवनी" suggests a book-length biography | Approved editorial |
| `nav.public-life` | Public Life | सार्वजनिक जीवन | Direct and natural; matches the site's thesis | Approved editorial |
| `nav.public-life.overview` | Overview | एक नज़र में | Natural editorial "at a glance". "अवलोकन" reads as government-report language | Approved editorial |
| `nav.public-life.timeline` | Timeline | समयरेखा | Widely understood (also used on Hindi Wikipedia). "कालक्रम" is more literary but less familiar | Approved editorial |
| `nav.public-life.roles` | Roles & Terms | पद और कार्यकाल | Natural pairing; "कार्यकाल" is the ordinary word for a term of office | Approved editorial |
| `nav.public-life.work` | Work & Initiatives | कार्य और पहल | Natural; "पहल" (initiative) is common and does not imply success or scale | Approved editorial |
| `nav.archive` | Archive | **अभिलेखागार** | See §4 | Approved editorial |
| `nav.archive.photographs` | Photographs | तस्वीरें | The everyday word; warm rather than technical. "छायाचित्र" is formal; "फ़ोटो" is a loan | Approved editorial |
| `nav.archive.documents` | Documents | दस्तावेज़ | The standard word (with nuqta, §6) | Approved editorial |
| `nav.archive.press` | In the Press | मीडिया में | **Confirmed in the final review** (§3.1). Coverage includes print, online, TV, radio and interviews; "प्रेस में" suggests print only, and "समाचारों में" excludes interviews and features. Concise and accurate | Approved editorial |
| `nav.archive.video` | Video | वीडियो | Standard loan | Approved editorial |
| `nav.updates` | Updates | गतिविधियाँ | Kept after the final review (§3.1). Matches the content model (every update is an Activity: event, visit, announcement, appearance, community activity). It is timeless (no recency promise), avoids news connotations and overlap with मीडिया में, and avoids the loan अपडेट. The homepage module adds recency: `home.recent-updates` | Approved editorial |
| `nav.updates.events` | Events | कार्यक्रम | The ordinary word for events and programmes | Approved editorial |
| `nav.updates.announcements` | Announcements | घोषणाएँ | Standard; chandrabindu per §6 | Approved editorial |
| `nav.connect` | Connect | संपर्क | Standard for contact; "कॉन्टैक्ट" is avoided | Approved editorial |
| `nav.press-kit` | Press Kit | प्रेस किट | The term journalists use; a Hindi coinage would be less clear | Approved editorial |
| `nav.how-we-verify` | How We Verify | हम जानकारी कैसे जाँचते हैं | **Changed in the final review** (§3.1). It describes a process ("how we check information"), mirrors the English, and claims no certification. Also the page title | Approved editorial |
| `nav.corrections` | Corrections & Feedback | सुधार और सुझाव | Natural pairing ("corrections and suggestions") | Approved editorial |
| `nav.privacy` | Privacy | निजता | Standard (page title "निजता नीति") | Approved editorial |
| `nav.terms` | Terms / Takedown | उपयोग की शर्तें और सामग्री हटाने का अनुरोध | **Changed in the final review** (§3.1). "Terms of use and request to remove content": names the object (सामग्री) so the removal route is clear to people seeking it. Footer link may wrap | Approved editorial |
| `lang.switch.to-en` | English | — | Label on Hindi pages | **Approved editorial** ([0021](../decisions/0021-language-switching-and-single-language-content.md)) |
| `lang.switch.to-hi` | — | हिंदी | Label on English pages | **Approved editorial** ([0002](../decisions/0002-bilingual-strategy.md)) |
| `lang.switch.a11y` | Read this page in English | यह पेज हिंदी में पढ़ें | Accessible name of the switch (each text in its own language) | Approved editorial |
| `ui.menu` | Menu | मेनू | The understood loan | Approved editorial |
| `ui.skip` | Skip to content | मुख्य सामग्री पर जाएँ | Natural imperative | Approved editorial |
| `ui.breadcrumb` | You are here | आप यहाँ हैं | Accessible label for the breadcrumb | Approved editorial |
| `ui.last-updated` | Last updated | अंतिम संशोधन | Dignified, short | Approved editorial |
| `ui.read-more` | Read more | आगे पढ़ें | Natural | Approved editorial |
| `ui.not-found` | Page not found | यह पेज नहीं मिला | Plain | Approved editorial |
| `home.recent-updates` | Recent updates | हाल की गतिविधियाँ | Homepage module label: recency belongs to the module, not the section | Approved editorial |

### 3.1 Final terminology review (product language, 2026-10-08)

**Updates (section containing current activities, events, announcements and public updates)**

| Option | In context ("मेनू › … › कार्यक्रम · घोषणाएँ") | Assessment |
|---|---|---|
| **गतिविधियाँ** | Reads as "what ‹the person› is doing": activities, events, visits; announcements as a sub-type | Matches the Activity content model; timeless; dignified. Weakness: "announcements" are not literally activities, which the घोषणाएँ sub-section and a one-line section introduction cover. **Recommended (kept)** |
| अपडेट | Clear "updates" sense, common on Hindi websites | A loanword where a natural Hindi word exists; reads as a feed. Runner-up if the decision partner prefers the explicit "update" sense |
| ताज़ा जानकारी / हाल की गतिविधियाँ | "Latest information" / "recent activities" | Promises freshness. When the newest item is months old the label looks stale, against the timeless-homepage principle. Used only as the homepage module label (`home.recent-updates`) |
| समाचार / ख़बरें | "News" | Suggests journalism or self-published news; overlaps with the media coverage section (मीडिया में). Rejected |
| सूचनाएँ | "Notices" | Covers announcements only; official-sounding. Rejected |

**How We Verify (how this website checks and documents information)**

| Option | Assessment |
|---|---|
| स्रोत और पुष्टि (v2) | A noun pair, "sources and confirmation". It names topics but not a process, and "पुष्टि" in a title can read as the site confirming things on its own authority |
| **हम जानकारी कैसे जाँचते हैं** | "How we check information": a process, modest (जाँचना = to check, not to certify), mirrors the English first person. **Recommended** |
| हम जानकारी की पुष्टि कैसे करते हैं | Accurate but longer, and leans towards "confirm" |
| सत्यापन / प्रमाणन नीति | "Verification / certification policy": institutional, implies official attestation. Rejected |
| स्रोत और प्रमाण | "Sources and proof": "proof" overclaims. Rejected |

The item-level status label stays **स्रोत से पुष्ट** (§9): the page explains the *process* (checking); the label states the *outcome* (confirmed from a source).

**In the Press:** **मीडिया में** confirmed (see table above).

**Terms / Takedown:** "उपयोग की शर्तें और हटाने के अनुरोध" lacked an object ("requests to remove" what?). **Recommended:** "उपयोग की शर्तें और सामग्री हटाने का अनुरोध". It is natural and plain, and it makes the removal route findable by the people who need it (spec G §9).

**Archive:** **अभिलेखागार kept.** No compelling reason to change was found. It is also the term used by national institutions (e.g. "राष्ट्रीय अभिलेखागार"), which supports its historical meaning. The distinction stays: अभिलेखागार (archive), संग्रह (collection), सामग्री (item).

## 4. "Archive": resolved recommendation

| Candidate | Meaning and register | Works for landing / types / collections / items? | Assessment |
|---|---|---|---|
| **अभिलेखागार** | "Archive" in the institutional, historical sense (a repository of records) | Landing: yes. Types: "अभिलेखागार › तस्वीरें" works. Collections stay **संग्रह**, so there's no clash. Items are **सामग्री** | **Strongest historical meaning; unambiguous.** Longer (fits the menu and desktop navigation; measured within the Hindi navigation width) |
| अभिलेख | "Record(s)" (also inscription) | Ambiguous: the site's thesis calls the whole site a "record" (अभिलेख), and documents are a separate type | Conflates "the record" with "the archive section" |
| संग्रह | "Collection" | Clashes with Collections (curated sets); sounds generic | Weakens the historical meaning, which the brief warns against |
| पुरालेख | Archives / inscriptions (technical) | Too specialised; reads as epigraphy | Rejected |
| संग्रहालय | Museum | Wrong institution | Rejected |

**Recommendation: अभिलेखागार** for the section and landing page.

| Concept | Term |
|---|---|
| Archive landing | अभिलेखागार |
| Photograph archive | अभिलेखागार › तस्वीरें |
| Documents | अभिलेखागार › दस्तावेज़ |
| Press | अभिलेखागार › मीडिया में |
| Video | अभिलेखागार › वीडियो |
| Collections | संग्रह (singular and plural) |
| An individual archive item | सामग्री (e.g. "इस सामग्री के बारे में" = "About this item") |
| "The record" in prose | अभिलेख (e.g. "सार्वजनिक जीवन का अभिलेख") |

Status: **Approved editorial** (implementation, 2026-10-08).

## 5. Dates and numbers

**Approved editorial** (already decided): Western digits on Hindi pages ([0002](../decisions/0002-bilingual-strategy.md)) and
Indian digit grouping (spec D §9). Dates are always written in words for the month, never as
numeric dates such as `07/10/2026`, which are ambiguous.

| Case | Hindi | English | Rule |
|---|---|---|---|
| Year | 1998 | 1998 | Bare year in metadata. In prose, "1998 में" / "in 1998" |
| Month + year | मार्च 1998 | March 1998 | Month name, then year |
| Full date | 7 अक्टूबर 2026 | 7 October 2026 | Day-month-year, no ordinal, no comma, no weekday |
| Approximate | लगभग 1998 | c. 1998 | One word only: **"लगभग"** in Hindi, **"c."** in English. Not "करीब", "सन्" or "circa" spelled out |
| Approximate month | लगभग मार्च 1998 | c. March 1998 | As above |
| Decade | 1990 का दशक | 1990s | Merged decades: "1960–70 के दशक" / "1960s–70s" |
| Date range (years) | 1998–2003 | 1998–2003 | Unspaced en dash between single tokens |
| Date range (full dates) | 7 मार्च – 12 अप्रैल 1998 | 7 March – 12 April 1998 | Spaced en dash when either side contains spaces |
| Ongoing | 1998 से अब तक | 1998–present | Only when currency is confirmed by a source or the family |
| Before | 1998 से पहले | before 1998 | Only for a known upper bound |
| After | 1998 के बाद | after 1998 | Only for a known lower bound |
| Unknown date | *(omitted)* | *(omitted)* | Never "अज्ञात", "Unknown" or "N/A". The date field and its label are omitted. Undated items sort last and do not appear on the Timeline (spec B §4.3) |
| Calendar | Gregorian | Gregorian | Other calendars only inside quotations from sources |
| Large numbers | 2,50,000 · 2.5 लाख · 3 करोड़ | 2,50,000 · 2.5 lakh · 3 crore | Indian grouping in both. In prose, digits + लाख/करोड़ or lakh/crore |
| Currency | ₹2,50,000 | ₹2,50,000 | Rupee sign, no space |

Status:
- **Approved editorial:** Western numerals ([0002](../decisions/0002-bilingual-strategy.md)); Indian digit
  grouping (spec D §9); en dash for ranges (confirmed in the final review).
- **Approved editorial (implementation, 2026-10-08):** the date wordings ("लगभग", "c.", "से पहले",
  "के बाद", decades, "unknown date omitted") and the large-number style.

### 5.1 Month names: resolved convention

**Recommendation:** use the spellings produced by the standard locale data (CLDR) for `hi-IN`,
which the platform's date formatting outputs:

> जनवरी · फ़रवरी · मार्च · अप्रैल · मई · जून · जुलाई · अगस्त · सितंबर · **अक्टूबर** · नवंबर · दिसंबर

**Rationale:**
- Generated dates need no overrides, so no inconsistency between hand-written and generated dates.
  Checked against CLDR 48 / ICU 78 on 2026-10-07: `7 अक्टूबर 2026`.
- "अक्टूबर" (with ट) is the more widespread spelling in Hindi media.
- Anusvara forms (सितंबर, नवंबर, दिसंबर) and the nuqta in फ़रवरी match §6.
- **Rejected alternatives:** अक्तूबर, सितम्बर, नवम्बर, दिसम्बर, फरवरी.

**Guard:** an implementation test asserts these exact strings. If future locale data changes them,
the test fails and the glossary wins (override), not the library.

Status: **Approved editorial** (confirmed in the final review).

## 6. Spelling and nuqta conventions

Rules, not a dictionary:

1. **Nuqta.** Use the nuqta in established loanwords where it marks the source sound: **क़ ख़ ग़ ज़ फ़**
   (e.g. फ़ोटो, फ़रवरी, दस्तावेज़, ज़िला, नज़र, अख़बार, ख़बर, क़ानून, अंग्रेज़ी).
   - Never in native words.
   - ड़ and ढ़ are always written as standard letters (सड़क, पढ़ें).
   - Proper names follow family-confirmed or official spellings, not this rule.
2. **Anusvara and nasal consonants.** Use anusvara for nasal + consonant clusters: हिंदी, संपर्क,
   संबंध, सितंबर (not हिन्दी, सम्पर्क).
3. **Chandrabindu.** Use ँ where there is no vowel sign above the headline (गतिविधियाँ, घोषणाएँ,
   जाँच, यहाँ). Use anusvara where a vowel sign sits above (हैं, में, नहीं).
4. **English loans with "o" sounds** take ॉ: रिकॉर्ड, कॉलेज, डॉक्टर, ऑनलाइन (not रिकार्ड).
5. **Prefer an established Hindi word** to a loanword in interface text when one is natural
   (संपर्क not कॉन्टैक्ट; अभिलेख not रिकॉर्ड). Use the loan when it is the ordinary word (वीडियो,
   मीडिया, फ़ोटो in credits, प्रेस किट, लिंक).
6. **Hyphenated compounds:** use a hyphen only in established compounds (जीवन-परिचय, जल-आपूर्ति).

High-frequency site words:

| Concept | Use | Avoid |
|---|---|---|
| Photo | फ़ोटो (credits), तस्वीर (general) | फोटो |
| Press | प्रेस (Press Kit only); मीडिया (coverage) | — |
| Video | वीडियो | विडियो, विडिओ |
| Contact | संपर्क | कॉन्टैक्ट |
| Record | अभिलेख; loan form रिकॉर्ड only if unavoidable | रिकार्ड |
| Link | लिंक | कड़ी (less understood) |
| Document | दस्तावेज़ | दस्तावेज |
| Newspaper | अख़बार / समाचार-पत्र | अखबार |
| English (language) | अंग्रेज़ी | अंग्रेजी |
| Hindi (language) | हिंदी (**Approved editorial**, [0002](../decisions/0002-bilingual-strategy.md)) | हिन्दी |
| Information | जानकारी | सूचना (= notice) |
| Date | तिथि | दिनांक (bureaucratic), तारीख़ (colloquial) |

Status:
- **Approved editorial:** हिंदी ([0002](../decisions/0002-bilingual-strategy.md)); the nuqta rule
  (rule 1) and the anusvara rule (rule 2), both confirmed in the final review.
- **Approved editorial (implementation, 2026-10-08):** rules 3–6 and the high-frequency word list.

## 7. Punctuation (bilingual)

| Mark | Hindi | English | Rule |
|---|---|---|---|
| Sentence end | । (danda), no space before | . (full stop) | Never a full stop at the end of a Hindi sentence. A line never begins with a danda. ॥ is not used |
| Question / exclamation | ? ! | ? ! | Same characters; no space before |
| Quotation marks | “ ” outer, ‘ ’ inner | “ ” outer, ‘ ’ inner | Curly quotes in both; never straight quotes in published text |
| Titles of works | In quotation marks | In *italics* | Hindi has no italics ([0024](../decisions/0024-typography-system.md)) |
| Colon | `:` (ASCII colon) | `:` | **Never the visarga (ः, U+0903) as a colon.** No space before, one space after ("तिथि: 1998") |
| Em dash | — (unspaced) | — (unspaced) | For a break in a sentence; one convention in both languages |
| En dash | – | – | Ranges only: unspaced between single tokens (1998–2003); spaced when a side contains spaces |
| Metadata separator | · (spaced middle dot) | · | "1992 · तस्वीर · ग्वारीघाट, जबलपुर" |
| Date separators | — | — | No numeric dates in display; ISO dates (2026-10-07) only in data and machine-readable markup |
| Parentheses | ( ) | ( ) | No inner spaces |
| Slash | " / " (spaced) | " / " | Only in credits ("‹name› / ‹collection›"); not for "and/or" |
| Ellipsis | … (single character) | … | Omissions in quotations as […]. No truncation ellipsis in Hindi listings ([0024](../decisions/0024-typography-system.md)) |
| Abbreviations | Avoided; full forms | Minimal: "c.", "p." / "pp." in citations | Hindi citations use "पृ." for page |
| Honorifics | None by default in running text | None by default | Neutral documentary posture ([0001](../decisions/0001-product-purpose-and-posture.md)). How the person is referred to is family-confirmed (§12) |

Status:
- **Approved editorial** (confirmed in the final review): danda in Hindi; curly quotation marks;
  plain ASCII colon (never the visarga); en dash for ranges; spaced middle dot as the metadata
  separator.
- **Approved editorial (implementation, 2026-10-08):** em dash, parentheses, slash, ellipsis, abbreviations and honorific default.

## 8. Captions

Order (approved, [design 03 §6](../design/03-visual-direction.md#6-photography)):
**what → where → when → credit**, separated by spaced middle dots, below the image.

| Part | Hindi | English |
|---|---|---|
| What / who | Short phrase in a human voice; public figures named; others described by role | Same |
| Where | ‹place›, जबलपुर | ‹place›, Jabalpur |
| When | Per §5 (e.g. लगभग 1992) | Per §5 (c. 1992) |
| Credit, photographs | फ़ोटो: ‹name› / ‹collection› | Photo: ‹name› / ‹collection› |
| Credit, other material | सौजन्य: ‹holder or collection› | Courtesy ‹holder or collection› |
| Credit, video | वीडियो: ‹name or channel› | Video: ‹name or channel› |

**Examples** (placeholders only):
- "ग्वारीघाट की सीढ़ियों पर बैठक · ग्वारीघाट, जबलपुर · लगभग 1992 · फ़ोटो: ‹नाम› / परिवार संग्रह"
- "A meeting on the steps at Gwarighat · Gwarighat, Jabalpur · c. 1992 · Photo: ‹Name› / Family collection"

**Rules:**
- One or two lines on mobile, no academic apparatus.
- Unknown parts are **omitted**, never "unknown".
- Captions do not carry the reference identifier unless genuinely needed ([0023](../decisions/0023-public-reference-identifiers.md)).
- Alt text is separate from captions and written in each language.

Status:
- **Approved editorial:** the order what → where → when → credit (approved caption order).
- **Approved editorial (implementation, 2026-10-08):** the credit labels (फ़ोटो / सौजन्य / वीडियो) and the wording rules.

## 9. Source and verification wording

Per [0026](../decisions/0026-verification-and-source-presentation.md). The Hindi wording for
"verified" must state **source status, not endorsement**.

| Key | English | Hindi | Reason | Status |
|---|---|---|---|---|
| `verify.source` | Source | स्रोत | Standard | Approved editorial |
| `verify.notes` | Sources and notes | स्रोत और टिप्पणियाँ | Section heading on long pages | Approved editorial |
| `verify.credit` | Credit | श्रेय | Standard | Approved editorial |
| `verify.rights` | Rights | अधिकार | Short; full phrase in the rights line ("उपयोग के अधिकार: …") | Approved editorial |
| `verify.verified` | Verified · Source: ‹source type› | **स्रोत से पुष्ट** · ‹source type› | "Confirmed from a source": ties the status to evidence. "सत्यापित" reads as official attestation; "प्रमाणित" as certification; a bare "पुष्ट" can read as approval. None of these imply endorsement here | Approved editorial |
| `verify.supplied` | Provided by the family | परिवार द्वारा दी गई जानकारी | "Information given by the family": plain attribution. "Family" includes the person; if a different attribution is wanted, it is family-confirmed | Approved editorial |
| `verify.media-reported` | As reported by ‹outlet›, ‹date› | ‹outlet› की रिपोर्ट के अनुसार, ‹date› | Attribution ("according to"), not endorsement; works for print, online and broadcast | Approved editorial |
| `verify.unverified` | *(never shown publicly)* | *(अपुष्ट: internal use only)* | [0018](../decisions/0018-content-integrity-rules.md) | Approved editorial |
| `verify.what-this-means` | What this means | इसका क्या अर्थ है | Link to the verification page | Approved editorial |
| `verify.details` | Source details | स्रोत का विवरण | Level-2 disclosure label | Approved editorial |
| `correction.noun` | Correction | सुधार | Standard | Approved editorial |
| `correction.suggest` | Suggest a correction | सुधार सुझाएँ | Polite imperative | Approved editorial |
| `correction.note` | Corrected on ‹date›: ‹what changed› | ‹date› को सुधारा गया: ‹क्या बदला› | Public correction note (spec G §8) | Approved editorial |
| `correction.quote-ref` | Please quote reference ‹ref› | कृपया संदर्भ ‹ref› लिखें | Correction pathway ([0023](../decisions/0023-public-reference-identifiers.md)) | Approved editorial |

## 10. Archive metadata labels

Short enough for one-line mobile metadata (system sans, 15 px Hindi).

| Key | English | Hindi | Status |
|---|---|---|---|
| `meta.date` | Date | तिथि | Approved editorial |
| `meta.place` | Place | स्थान | Approved editorial |
| `meta.type` | Type | प्रकार | Approved editorial |
| `meta.collection` | Collection | संग्रह | Approved editorial |
| `meta.occasion` | Occasion | अवसर | Approved editorial |
| `meta.reference` | Reference | संदर्भ | Approved editorial |
| `meta.source` | Source | स्रोत | Approved editorial |
| `meta.credit` | Credit | श्रेय | Approved editorial |
| `meta.rights` | Rights | अधिकार | Approved editorial |
| `meta.people` | People shown | व्यक्ति | Approved editorial |
| `meta.original-form` | Original | मूल रूप | Approved editorial |
| `meta.original-language` | Original in ‹language› | मूल ‹भाषा› में | Approved editorial |
| `meta.only-in` | In Hindi only *(on English pages)* | केवल अंग्रेज़ी में *(on Hindi pages)* | Approved editorial |
| `item.about` | About this item | इस सामग्री के बारे में | Approved editorial |
| `item.cite` | Use and cite | उपयोग और उद्धरण | Approved editorial |
| `item.copy-citation` / `item.copy-link` | Copy citation / Copy link | उद्धरण कॉपी करें / लिंक कॉपी करें | Approved editorial |
| `related.same-occasion` | From the same occasion | इसी अवसर से | Approved editorial |
| `related.same-period` | From this period | इसी दौर से | Approved editorial |
| `lens.type` / `lens.time` / `lens.period` / `lens.decade` / `lens.theme` / `lens.place` | Type / Time / Period / Decade / Theme / Place | प्रकार / समय / दौर / दशक / विषय / स्थान | Approved editorial |
| `type.photo` / `type.document` / `type.coverage` / `type.video` | Photograph / Document / Media coverage / Video | तस्वीर / दस्तावेज़ / मीडिया रिपोर्ट / वीडियो | Approved editorial |
| `format.print` / `format.online` / `format.tv` / `format.radio` / `format.interview` | Print / Online / Television / Radio / Interview | अख़बार-पत्रिका / ऑनलाइन / टीवी / रेडियो / साक्षात्कार | Approved editorial (coverage format; an interview is labelled साक्षात्कार, not रिपोर्ट) |
| `notice.not-available` | This item is available only in Hindi. | यह सामग्री केवल अंग्रेज़ी में उपलब्ध है। | Approved editorial (each text names the *other* language; [0021](../decisions/0021-language-switching-and-single-language-content.md)) |

## 11. Romanisation (OD-20: open)

**Not resolved here.**

- **Why one convention is needed:** consistent English spellings of names, places and Hindi terms
  across pages, slugs, citations, structured data and SEO. Inconsistency splits search results and
  undermines credibility.
- **Where it will appear:**
  - URL slugs (Latin, no diacritics; [0002](../decisions/0002-bilingual-strategy.md));
  - English text naming places and institutions;
  - transliterated Hindi terms in English text;
  - citations;
  - structured data (`alternateName`);
  - file and reference naming where readable.
- **What it will not be used for:**
  - the person's own name, which is **family-confirmed** whatever the convention;
  - official names that already have an established English form (use that form);
  - Hindi pages (Devanagari is used);
  - public reference identifiers, which are opaque ([0023](../decisions/0023-public-reference-identifiers.md)).
- **Candidates to evaluate:**
  1. established or official English spellings, where they exist;
  2. Hunterian transliteration (the Government of India standard for geographic names);
  3. ISO 15919 / IAST (precise, with diacritics; unsuitable for slugs);
  4. a hybrid: official spellings where they exist, otherwise a documented scheme without
     diacritics.
- **Information required before choosing:**
  - a sample of the actual place, ward and institution names in the record (archive inventory,
    FI-03);
  - the family's preferred spellings (FI-06);
  - official English spellings used by the municipal body;
  - the slug format the scaffold expects.

  The decision then goes to the decision partner, with the Hindi/English reviewer (OD-16).

## 12. Family-specific terminology (never inferred)

These are **Family-confirmed only**. No convention, translation, transliteration or research may
supply them.

| Item | Note |
|---|---|
| Public name | FI-06 |
| Hindi spelling of the name | FI-06 |
| English (Latin) spelling of the name | FI-06; independent of OD-20 |
| Preferred honorific or form of reference, if any | Default is none ([0001](../decisions/0001-product-purpose-and-posture.md)) |
| Political and public role names, designations | As in official records and confirmed by the family; glossary §5 of v1 listed the concepts only |
| Organisation names (including any party name and how it is shown) | FI-05; official names only |
| Ward and locality spellings | Official usage, then confirmed |
| Initiative names | From the family and sources |
| Quotations | Exact source wording only; never paraphrased into quotation marks |
| Dates | From sources or the family, with precision as recorded |
| Personal details | FI-07 policy |

## 13. Precedence

1. **Family-confirmed** entries, for proper names and personal terms.
2. Decision records, for conventions they fix (e.g. हिंदी, Western numerals, switch labels).
3. **Approved editorial** entries in this glossary.
4. Locale-library output (e.g. CLDR month names), only where it matches this glossary.
5. Never: machine translation or inference.

## 14. Final status summary

| Status | Items |
|---|---|
| **Approved editorial** (conventions; decisions and final review) | हिंदी; Western numerals; Indian digit grouping; language-switch labels (English / हिंदी); CLDR `hi-IN` month names (जनवरी … फ़रवरी … सितंबर, अक्टूबर, नवंबर, दिसंबर); nuqta rule; anusvara rule; danda; curly quotation marks; plain colon (never visarga); en dash for ranges; middle dot for metadata; caption order what → where → when → credit; "unverified is never shown" (0018) |
| **Approved editorial** (terminology; approved for implementation 2026-10-08; reviewer confirms before launch, OD-16) | All navigation and interface labels (§3), including अभिलेखागार, गतिविधियाँ, मीडिया में, हम जानकारी कैसे जाँचते हैं, उपयोग की शर्तें और सामग्री हटाने का अनुरोध; date wordings (§5); spelling rules 3–6 and word list (§6); remaining punctuation (§7); caption credit labels (§8); source and verification wording (§9), including स्रोत से पुष्ट; metadata, lens, type and format labels (§10), including साक्षात्कार |
| **Family-confirmed** (none yet; never inferred) | Public name; Hindi and English spellings; honorific or form of reference; role and designation names; organisation names (incl. any party); ward and locality spellings; initiative names; quotations; dates; personal details (§12) |
| **Open** | Romanisation convention (**OD-20**, §11). Nothing else is open in this glossary |

**In code:** the approved wording is in `src/content/glossary/glossary.yaml` (status
`approved-editorial`), the only source of interface text. Production fails on any missing or
non-approved key (scaffold check I14). Reviewer-requested changes before launch are made there,
deliberately, and noted in the pull request. The glossary is not reopened unless implementation
exposes a genuine contradiction.
