# 08. Homepage additions: product decision analysis

- **Date:** 2026-10-07
- **Status:** **Both additions remain Proposed** (HP-01, HP-02 in [spec H](../spec/08-open-decisions.md)).
  Neither is an approved requirement or a launch requirement until the decision partner approves it.
- **Source:** [04 homepage wireframe](04-homepage-wireframe.md) (sections H2 and H6), compared with
  the approved homepage modules in [spec B §4.2](../spec/02-information-architecture.md#42-homepage-modules).

## HP-01 · Site statement

*A short paragraph explaining that this is a documented public record and that items show their
sources.*

| Question | Analysis |
|---|---|
| **Why it is useful** | First-time visitors, journalists and researchers learn within seconds what kind of site this is, and why it reads differently from a politician's website. It turns the source labels further down the page into a stated promise rather than unexplained metadata |
| **Problem it solves** | Answers "What does this website represent?" ([04 §1](04-homepage-wireframe.md#1-what-the-opening-screens-must-answer)). Without it, the identity block shows *who* but not *what kind of record*, and the documentary posture ([0001](../decisions/0001-product-purpose-and-posture.md)) is only implied |
| **Duplication** | Partial overlap with the short biography (identity) and with How We Verify (method). Different job: the biography is about the person; How We Verify is the full method; the statement is one sentence or two about the site. Duplication is avoided by keeping it to one or two sentences and linking to How We Verify |
| **Insufficient content** | Not content-dependent. It is fixed editorial copy in both languages, reviewed by the Hindi/English reviewer (OD-16). It must still be truthful: it should promise only what the published site delivers (e.g. not "every item is verified") |
| **Homepage or elsewhere** | Belongs on the homepage, directly after the identity block, because that is where the question arises. A version also belongs at the top of How We Verify |
| **Essential or optional** | **Recommended, not essential.** The site works without it, but the opening is weaker for first-time visitors. Low cost: no data, no component beyond prose |
| **Risks** | It could drift into a mission statement or slogan. Mitigation: factual tone, no adjectives about the person, reviewed wording |

**Recommendation:** approve as an **optional homepage module**, recommended for launch, with
wording approved through the glossary and review process. Do not make it a launch blocker.

## HP-02 · Places in the record

*A browse-by-place section connecting the public record to Jabalpur localities.*

| Question | Analysis |
|---|---|
| **Why it is useful** | It makes the Jabalpur connection concrete and factual (wards and localities that appear in the record) instead of decorative. Residents can find "their" area, which is one of the strongest reasons for a local visitor to explore |
| **Problem it solves** | Answers "What connects this story to Jabalpur?" through content, consistent with [0003](../decisions/0003-information-architecture.md) (no standalone Jabalpur page) and [0005](../decisions/0005-design-direction.md) |
| **Duplication** | It overlaps with the archive's **place lens** ([0022](../decisions/0022-archive-browsing-model.md)), which it links to. Place names also appear in role rows and captions. The homepage section adds a **surface**, not new data |
| **Insufficient content** | With few places, or places with only one item each, the list looks thin and directory-like. It must follow the same configuration-driven visibility rules: hidden unless enough places have enough published items. It must never show a placeholder list of wards |
| **Homepage or elsewhere** | Its natural home is the **Archive hub** (place lens), where it is already approved. On the homepage it is a secondary entry point, and only if the inventory supports it |
| **Essential or optional** | **Optional, content-dependent.** Valuable if the archive has broad local coverage; otherwise it is better left to the Archive hub |
| **Risks** | It could become a "Jabalpur guide" by stealth (contrary to 0003), or expose thin categories. Mitigation: list only places with published items, use no imagery beyond a captioned documentary photo, and apply visibility thresholds |

**Recommendation:** keep as **Proposed** until the archive inventory (FI-03) is known. If approved,
make it a **conditional, threshold-governed** homepage module. The place lens in the Archive hub
already delivers the function in any case.

## Effect on the homepage principle

The approved homepage principle stays:

**identity → context → public record → archive → timeline/places → current activity → connect.**

Content availability decides which sections appear. There are no empty modules, placeholder cards,
fake activity or invented archive content.

HP-01 would fill "context" and HP-02 would fill "places". Without them:
- **context** is carried by the identity block's descriptor and short biography;
- **places** are reached through the Archive hub.
