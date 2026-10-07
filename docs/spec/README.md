# Project Specification v1

- **Version:** 1.0
- **Date:** 2026-10-07
- **Overall status:** Product-level decisions accepted. Technical architecture proposed, pending approval.

This folder is the project specification. Decisions that are formally approved are
recorded separately in [`../decisions/`](../decisions/).

## Documents

| # | Document | Status |
|---|---|---|
| A | [Product Requirements](01-product-requirements.md) | Accepted (MVP scope and targets: working direction) |
| B | [Information Architecture](02-information-architecture.md) | Accepted (visibility thresholds: open) |
| C | [Content Architecture](03-content-architecture.md) | Working direction |
| D | [Bilingual Architecture](04-bilingual-architecture.md) | Working direction (implementation pending technical approval) |
| E | [Design Brief](05-design-brief.md) | Working direction |
| F | [Technical Architecture Proposal](06-technical-architecture.md) | **Proposed — not approved. Do not implement.** |
| G | [Security, Privacy & Content Integrity](07-security-privacy-integrity.md) | Working direction (principles accepted) |
| H | [Open Decisions](08-open-decisions.md) | Living list |

## Status legend

| Status | Meaning |
|---|---|
| **Accepted** | Approved by the product/technical decision partner. |
| **Working direction** | Direction approved; details may be refined during design or implementation. |
| **Proposed** | A recommendation awaiting approval. Must not be implemented. |
| **Open** | Requires a decision or information. Tracked in [08](08-open-decisions.md). |

## Ground rules for everything in this specification

1. **No person-specific information.** This specification describes structure only. It contains
   no name, party, ward, dates, roles, achievements, quotes or contact details, and none may be
   added to the repository until supplied by the person or family and processed under
   [document G](07-security-privacy-integrity.md).
2. **No fictional demo content.** Development data must be obviously synthetic, marked as a
   development fixture, and blocked from production builds.
3. **Evidence before claims.** See principle 1 in [document A](01-product-requirements.md#4-product-principles).

## Terms used in this specification

| Term | Meaning |
|---|---|
| **The person** | The public figure the website is about. |
| **The family** | The person and/or family members who supply and approve content. |
| **Maintainer** | Whoever adds and edits content after launch (to be decided). |
| **Decision partner** | The product/technical decision maker who approves this specification. |
| **Provenance** | Where an item or claim came from, and the evidence for it. |
| **Verification status** | One of `verified`, `supplied`, `media-reported`, `unverified` (see C §3). |
| **Publish gate** | An automated rule that blocks content from the public site if requirements are unmet. |
| **Section visibility** | The rule that a section appears only when it has enough published content. |

## Change log

| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-10-07 | First specification from accepted product decisions and the initial architecture analysis. |
