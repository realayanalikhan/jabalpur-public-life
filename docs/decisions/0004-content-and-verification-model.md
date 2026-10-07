# 0004 — Content model and verification model

- **Status:** Accepted (entity model as working direction); amended by [0020](0020-occasion-connective-archive-entity.md)
- **Date:** 2026-10-07
- **Deciders:** Product/technical decision partner (relayed by the project owner)
- **Related:** [Spec C](../spec/03-content-architecture.md); OD-02

## Context

The site's credibility depends on every claim being traceable. Content will arrive over time,
in two languages, with varying levels of evidence. The model must support missing data, imprecise
historical dates, provenance and future growth without rebuilding.

## Decision

1. **Entities (working direction):** Person, Role, Organisation, Place, Initiative, Activity,
   TimelineEvent, Coverage, Source, Photo, Video, Document, Collection, Theme, SocialLink,
   ContactMethod, GlossaryTerm. Fields are added when real content needs them; this decision does
   not require implementing every field immediately.
2. **Person-specific values remain empty** until supplied by the person or family.
3. **Verification statuses** for claim-bearing items:

   | Status | Meaning | Publishable |
   |---|---|---|
   | `verified` | Confirmed by reliable documentation or an appropriate independent source | Yes, with ≥ 1 source |
   | `supplied` | Provided by the person/family | Yes, attributed |
   | `media-reported` | Reported by media coverage | Yes, attributed to the outlet |
   | `unverified` | Not yet confirmed | **Never** |

4. **Sources** are separate entries linked to the items they support, and are retained even when
   not shown publicly.
5. **Public provenance (OD-02): labels + optional source details.** Pages show concise provenance
   where useful (for example, "Source: Municipal record"), with a way to open fuller source
   information. No academic-style footnote clutter. The How We Verify page explains the system.
   The display level is configurable (spec A FR-V2).
6. **Common fields:** workflow status, verification, sources, original language, per-language
   translation state, internal notes (never rendered), development-fixture flag.
7. **Dates** carry precision (year, month, day), an approximate flag, and optional ranges.
8. **Derived views:** the Timeline, Public Life overview, related items and structured data are
   generated from entities, never re-entered.
9. **Data classification:** public, internal (in the repository, never rendered) and restricted
   (never in git).

## Rationale

- Separating Source from content allows one source to support many items, and many sources to
  support one item.
- The four statuses let content go live honestly (`supplied`, `media-reported`) while
  verification continues, without ever exposing unconfirmed claims.
- Concise labels give visitors trust signals without making the site feel like an academic paper.
- Deriving the timeline prevents the same fact being entered twice and drifting.

## Alternatives considered

- **Free-form pages without structured entities:** fast to start but cannot enforce provenance,
  visibility rules or bilingual parity. Rejected.
- **Binary verified/unverified:** cannot distinguish family-supplied information from documented
  fact. Rejected.
- **Full academic footnotes on every page:** cluttered for general visitors. Rejected for OD-02.
- **Provenance kept internal only:** loses a key credibility signal. Rejected for OD-02.

## Consequences

- Content entry requires recording verification and sources; this is deliberate.
- Long-form prose (e.g. biography) needs editorial review to remove unsupportable statements,
  since this cannot be fully automated.
- Publish gates are defined in [0018](0018-content-integrity-rules.md).
