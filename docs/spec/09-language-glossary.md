# 09. Language Glossary (framework)

**Status:** Framework (spec v1.2). **This is not a finished glossary.** No entry below is approved
unless its status says so. The person's names and all person-specific terms are deliberately absent.

## 1. Purpose and authority

- This glossary will become the **source of truth for bilingual content**: interface labels,
  recurring terms, date and number formats, punctuation, romanisation, and the canonical spellings
  of names and places.
- Translators, editors and the Hindi/English reviewer (OD-16) must follow it. Deviations are
  reviewed, not improvised.
- It implements [0002](../decisions/0002-bilingual-strategy.md):
  - "हिंदी", Western numerals and one romanisation convention;
  - human-reviewed translations;
  - the label and notice wording required by
    [0021](../decisions/0021-language-switching-and-single-language-content.md).
- **Relationship to the content model:** spec C defines a `GlossaryTerm` entity. This document is
  the authoring source until implementation, when approved entries move into the content
  collections. After that, the content collection is authoritative and this document describes the
  conventions.
- **Do not invent:** no personal names, no political terminology, no claims. Where research proposed
  candidate wording, it is shown with status **proposed** and its source.

## 2. Status system

| Status | Meaning | Who sets it | May appear in published content? |
|---|---|---|---|
| **proposed** | A candidate, from research or an editor. Not decided. | Anyone, with a source | **No.** Allowed in design mock-ups and visual tests only |
| **approved** | Decided for use | Decision partner, with the Hindi/English reviewer for language entries (OD-16) | Yes |
| **family-confirmed** | A name, spelling or personal fact confirmed by the person or family | Recorded from family input (FI-06 and related) | Yes. Required for the person's names and family-related entries |
| **deprecated** | Replaced or withdrawn; kept so old usage can be found and corrected | Decision partner | No. Must point to its replacement |

Rules:
- Only **approved** or **family-confirmed** entries may be used in published content.
- Names of the person and family-related terms need **family-confirmed**. "approved" alone is not
  enough.
- Entries are never deleted. They are deprecated, and their key is never reused.

## 3. Entry format

| Field | Description |
|---|---|
| **Key** | Stable identifier in Latin script (e.g. `nav.archive`, `date.approximate`) |
| **Concept** | What the term means and where it is used |
| **English** | The English form |
| **Hindi** | The Hindi form (Devanagari) |
| **Romanised** | Romanised form, where needed (names, places, slugs), per §9 |
| **Usage notes** | Context, length limits (e.g. must fit navigation at 360 px), grammatical notes |
| **Avoid** | Rejected variants, so they are not reintroduced |
| **Status** | proposed · approved · family-confirmed · deprecated |
| **Source** | Research reference, official usage, family input, or editor |
| **Decided by / date** | For approved and family-confirmed entries |
| **Related** | Decision records or spec sections |

## 4. Navigation and interface labels

Decisions needed for every label below:
- **Register:** common, everyday Hindi or formal/Sanskritised Hindi. The research recommends common
  nouns (research §17, [Hindwi](https://www.hindwi.org/)).
- **Length:** the full Hindi navigation must fit at 360 px without truncation (spec B §1).
- **Consistency:** the same concept always uses the same word across navigation, headings and
  breadcrumbs.

| Key | English | Hindi | Status | Source / note |
|---|---|---|---|---|
| `lang.switch.to-en` | English | — | **approved** | Label shown on Hindi pages ([0021](../decisions/0021-language-switching-and-single-language-content.md)) |
| `lang.switch.to-hi` | — | हिंदी | **approved** | Label shown on English pages ([0002](../decisions/0002-bilingual-strategy.md), [0021](../decisions/0021-language-switching-and-single-language-content.md)) |
| `lang.switch.a11y` | Read this page in English | यह पेज हिंदी में पढ़ें | proposed | Accessible names (research §17) |
| `nav.home` | Home | — | — | To be proposed |
| `nav.about` | About | परिचय | proposed | Research §17 |
| `nav.public-life` | Public Life | सार्वजनिक जीवन | proposed | Research §17 |
| `nav.archive` | Archive | अभिलेखागार / संग्रह | proposed (choose one) | Research §17: the first is precise but long; the second is short but also means "collection" (see `archive.collection`) |
| `nav.updates` | Updates | गतिविधियाँ | proposed | Research §17 |
| `nav.connect` | Connect | संपर्क | proposed | Research §17 |
| `nav.public-life.overview` | Overview | — | — | To be proposed |
| `nav.public-life.timeline` | Timeline | समयरेखा | proposed | Research §17 |
| `nav.public-life.roles` | Roles & Terms | पद और कार्यकाल | proposed | Research §17. Must agree with §5 terminology |
| `nav.public-life.work` | Work & Initiatives | कार्य और पहल | proposed | Research §17 |
| `nav.archive.photographs` | Photographs | तस्वीरें | proposed | Research §17 |
| `nav.archive.documents` | Documents | दस्तावेज़ | proposed | Research §17. Nuqta policy (§8) applies |
| `nav.archive.press` | In the Press | प्रेस में | proposed | Research §17 |
| `nav.archive.video` | Video | वीडियो | proposed | Research §17 |
| `nav.updates.current` | Current activities | — | — | To be proposed |
| `nav.updates.events` | Events | — | — | To be proposed |
| `nav.updates.announcements` | Announcements | — | — | To be proposed |
| `nav.press-kit` | Press Kit | प्रेस किट | proposed | Research §17 |
| `nav.how-we-verify` | How We Verify | हम कैसे पुष्टि करते हैं | proposed | Research §17 |
| `nav.corrections` | Corrections & Feedback | सुधार और सुझाव | proposed | Research §17 |
| `nav.privacy` | Privacy | निजता | proposed | Research §17 |
| `nav.terms` | Terms / Takedown | शर्तें | proposed | Research §17. Takedown wording still needed |
| `ui.menu`, `ui.skip-to-content`, `ui.breadcrumb.home`, `ui.last-updated`, `ui.404.*` | — | — | — | Interface strings to be proposed. English must never remain on Hindi pages |
| `notice.not-available` | This item is available in Hindi only | यह सामग्री केवल अंग्रेज़ी में उपलब्ध है | proposed | Notice pages ([0021](../decisions/0021-language-switching-and-single-language-content.md)). Each language's text describes the *other* language: the English text appears on `/en/` notice pages for Hindi-only items, and the Hindi text on `/hi/` notice pages for English-only items. Final wording by reviewer |
| `label.only-in` | In Hindi only | केवल अंग्रेज़ी में | proposed | Listing labels (research §17). As above, each language's text names the other language |

## 5. Public-life terminology

These terms describe roles and public service. Hindi forms are **deliberately not proposed here**.
They must follow **official usage in the relevant records** (e.g. the designation as used by the
municipal body) and be reviewed by the Hindi/English reviewer. Nothing here asserts any fact about
the person.

| Key | Concept (English) | Decision needed |
|---|---|---|
| `role.councillor` | The municipal councillor designation | Official Hindi and English designation as used in municipal records; whether to show both |
| `role.ward` | Ward (municipal electoral area) | Official form; how ward names and numbers are written |
| `role.term` | Term of office | Wording for a term and for date ranges of terms |
| `role.how-obtained.*` | Elected / appointed / nominated / other | Neutral, factual wording for each value |
| `role.committee` | Committee membership | Official committee names as used in records |
| `org.municipal-body` | The municipal body | Official name in both languages |
| `org.party` | Political party (if displayed) | Depends on FI-05. Official party names only, as text |
| `work.initiative` | Initiative (sustained programme of work) | Term that does not imply success or scale |
| `work.public-service` | Public service | Neutral term; avoid promotional epithets |
| `work.community-activity` | Community activity | Neutral term |
| `occasion` | Occasion ([0020](../decisions/0020-occasion-connective-archive-entity.md)) | Hindi term (e.g. a neutral word for "occasion/event") |

Principles to decide (proposed):
- Use official designations rather than descriptive or honorific ones.
- Avoid promotional epithets in either language.
- Use the same term for the same role everywhere.

## 6. Archive terminology

| Key | English | Hindi | Status | Source / note |
|---|---|---|---|---|
| `archive.photograph` | Photograph | तस्वीर | proposed | Research §17 (plural in navigation) |
| `archive.document` | Document | दस्तावेज़ | proposed | Research §17; nuqta policy (§8) |
| `archive.press` | Press coverage | — | — | To be proposed; must agree with `nav.archive.press` |
| `archive.video` | Video | वीडियो | proposed | Research §17 |
| `archive.collection` | Collection | संग्रह | proposed | Research §16. Conflicts with `nav.archive` if संग्रह is chosen there |
| `meta.date` | Date | तिथि | proposed | Research §17 |
| `meta.place` | Place | स्थान | proposed | Research §17 |
| `meta.source` | Source | स्रोत | proposed | Research §16–§17 |
| `meta.credit` | Credit | — | — | To be proposed |
| `meta.photo-credit` | Photo: ‹name› | फ़ोटो: ‹name› | proposed | Research §13.5; nuqta policy (§8) |
| `meta.rights` | Rights / usage | — | — | To be proposed |
| `meta.original-language` | Original in ‹language› | मूल ‹language› में | proposed | Spec D §6 |
| `meta.reference` | Reference | — | — | [0023](../decisions/0023-public-reference-identifiers.md) accepted; Hindi label to be proposed. Shown only in item details, citation and correction pathway |
| `verify.verified` | Verified · Source: ‹source type› | पुष्ट · स्रोत: ‹source type› | proposed | Research §16; final wording DP-03 |
| `verify.supplied` | Provided by the family | परिवार द्वारा उपलब्ध | proposed | Research §16; final wording DP-03 |
| `verify.media-reported` | Reported in ‹outlet›, ‹date› | ‹outlet› में प्रकाशित, ‹date› | proposed | Research §16; final wording DP-03 |
| `verify.what-this-means` | What this means | — | — | Link to How We Verify |
| `notes.heading` | Sources and notes | स्रोत और टिप्पणियाँ | proposed | Spec C §3 |
| `related.same-occasion` | From the same occasion | — | — | [0020](../decisions/0020-occasion-connective-archive-entity.md) |
| `item.cite` | Use and cite | — | — | Research §16 |
| `item.suggest-correction` | Suggest a correction | — | — | Research §16 |
| `lens.type`, `lens.time`, `lens.period`, `lens.decade`, `lens.theme`, `lens.place` | Type, Time, Period, Decade, Theme, Place | — | — | [0022](../decisions/0022-archive-browsing-model.md) |

## 7. Date terminology

Approved already: **Western numerals** on Hindi pages ([0002](../decisions/0002-bilingual-strategy.md));
Indian digit grouping (spec D §9). Everything else below needs a decision.

| Key | Concept | English (proposed) | Hindi decision needed |
|---|---|---|---|
| `date.month-names` | Month names | January … December | **Spelling of each Hindi month** (e.g. अक्टूबर vs अक्तूबर). Choose either the spelling produced by the date-formatting library (CLDR data) or a house spelling, in which case generated dates must be overridden to match |
| `date.full` | Full date | 7 October 2026 | Order and form (research proposes "7 अक्टूबर 2026", day-month-year, no ordinal) |
| `date.month-year` | Month and year | October 2026 | Form |
| `date.year` | Year only | 1998 | Whether a word for "year" (सन् / वर्ष) is used before years, or the bare year |
| `date.approximate` | Approximate date | c. 1998 | Word or abbreviation (research proposes लगभग; alternatives to consider) and placement |
| `date.range` | Date range | 1998–2003 | En dash versus a "से … तक" construction; open-ended ranges ("since ‹year›") |
| `date.decade` | Decade | 1990s | Form (e.g. a "का दशक" construction) and merged decades ("1960s–70s") |
| `date.uncertain-month` | Month uncertain, year known | 1998 | Display only what is recorded (spec C §2) |
| `date.calendar` | Calendar system | Gregorian | Proposed: Gregorian only; other calendars only when quoting a source |
| `date.weekday` | Weekdays | Not used | Proposed: not shown; needs a Hindi form if ever used |

## 8. Typography and punctuation conventions

| Key | Convention | Decision needed | Notes |
|---|---|---|---|
| `type.nuqta` | Nuqta usage (e.g. फ़ोटो vs फोटो, दस्तावेज़ vs दस्तावेज) | Always / never / follow source in quotations | Affects labels, captions and credits |
| `type.anusvara` | Anusvara vs chandrabindu and conjunct forms | General rule beyond the approved "हिंदी" | 0002 fixes "हिंदी" only |
| `punct.sentence-end` | Danda (।) vs full stop in Hindi | Proposed: danda (research §17) | Never begin a line with a danda |
| `punct.quotes` | Quotation marks | Form of double/single quotes in Hindi and English | Titles of works: Hindi in quotation marks, English in italics (research §13.3), to be confirmed |
| `punct.dash` | Dashes and hyphens | En dash for ranges; hyphen policy | No automatic hyphenation (spec D §8) |
| `num.digits` | Numerals | **approved:** Western numerals | [0002](../decisions/0002-bilingual-strategy.md) |
| `num.grouping` | Large numbers | **approved:** Indian grouping | Spec D §9; whether to use digits plus लाख/करोड़ in prose |
| `abbr.policy` | Abbreviations | Whether and how to abbreviate in Hindi (e.g. "Dr", organisation acronyms written in Latin or Devanagari) | Applies to both languages |
| `abbr.honorifics` | Honorifics and titles in running text | Whether honorifics are used, and how, consistent with the neutral documentary posture ([0001](../decisions/0001-product-purpose-and-posture.md)) | Must be consistent across the site |
| `type.emphasis` | Emphasis | Proposed: weight, never italic, in Hindi (spec D §8) | — |

## 9. Romanisation (OD-20, open)

One convention is required ([0002](../decisions/0002-bilingual-strategy.md)). **It is not chosen
here.** Options to evaluate:

| Option | Strengths | Weaknesses |
|---|---|---|
| Common/official English spellings as used in official English documents | Familiar; matches existing records and press | Inconsistent across words; may not exist for every term |
| Hunterian transliteration (the Government of India's standard for geographic names) | Official basis; no diacritics; slug-friendly | Less familiar for personal names; still needs rules for edge cases |
| ISO 15919 / IAST (with diacritics) | Precise and reversible | Diacritics are unfriendly in URLs and for general readers |
| Hybrid: an official or established spelling where one exists, otherwise a documented scheme without diacritics | Practical | Needs clear precedence rules |

Constraints:
- URL slugs are Latin script without diacritics ([0002](../decisions/0002-bilingual-strategy.md)).
- The person's romanised name is **family-confirmed** (FI-06), whatever convention is chosen.

## 10. Names and places

- **The person:** canonical names and spellings in Devanagari and Latin, and any known variants,
  come **only from family-approved information** (FI-06). Status: **family-confirmed**. Nothing is
  entered until then.
- **Family members and private individuals:** named only with consent (spec G §6). Spellings are
  family-confirmed.
- **Other public figures:** spellings as in the cited sources; status approved.
- **Places** (wards, localities, landmarks): proposed principle — use official names (municipal or
  government usage) in both scripts, with established local variants recorded under "Avoid" or
  usage notes. Not yet approved.
- **Institutions and organisations:** official names in both languages where they exist.
- **Newspapers and outlets:** masthead names as printed, in their original script, never as logos
  ([research §16](../research/01-visual-product-research.md#16-archive-ux-concept)).

## 11. Workflow

1. An editor or the research adds an entry as **proposed**, with a source.
2. The Hindi/English reviewer (OD-16) and the decision partner review it. It becomes **approved**, or
   is rejected and recorded under "Avoid".
3. Names and personal entries additionally need **family-confirmed** status from family input.
4. Changes to an approved entry create a new entry. The old one is marked **deprecated**, with its
   replacement.
5. At implementation, approved entries move into the content collection. Interface strings are read
   from glossary keys, so no Hindi page shows English chrome and no wording drifts.

## 12. What must be resolved, and when

| Before… | These categories must be **approved** |
|---|---|
| The bilingual visual test (DP-01) | None. **Proposed** navigation labels, date formats and archive labels are enough to test with |
| Homepage and page wireframes (DP-05) | Navigation register and `nav.archive` choice (§4); date forms (§7) |
| Content implementation | All of §4, §6, §7 and §8; romanisation (§9, OD-20); place and institution conventions (§10) |
| Launch | The person's names (§10, **family-confirmed**); public-life terminology used in published content (§5) |
