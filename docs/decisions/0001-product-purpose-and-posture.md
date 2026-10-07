# 0001 — Product purpose and political posture

- **Status:** Accepted
- **Date:** 2026-10-07
- **Deciders:** Product/technical decision partner (relayed by the project owner)
- **Related:** [Spec A](../spec/01-product-requirements.md)

## Context

The website is about a former councillor and public representative associated with Jabalpur,
Madhya Pradesh. Most websites for Indian political figures are campaign tools: promotional,
election-focused and quickly outdated. The project needs a defined purpose and tone that hold up
over time, whether or not an election is under way. The person has not decided whether to stand
for election in future.

## Decision

1. **Purpose.** The website is a premium bilingual digital public-life profile and archive
   documenting the person's public life, connection with Jabalpur, public and community work,
   historical record, media coverage and ongoing activities. It combines four layers:
   **personal profile + public-service record + historical archive + living connection to
   Jabalpur.**
2. **Posture.** Neutral, documentary and factual. It is not a campaign or election website. It
   avoids slogans, vote appeals, aggressive party branding, exaggerated claims, unsupported
   achievements and election-focused calls to action.
3. **Political facts.** Party affiliation, political roles and historical political activity may
   be displayed as factual information once supplied and verified.
4. **Flexibility.** The site is not designed around a future candidacy. The architecture must
   allow a future change of posture through content, configuration and additional modules,
   without a rebuild.
5. **Core principles** (binding on all later decisions):
   1. Evidence before claims.
   2. Never invent person-specific information.
   3. Empty sections are hidden.
   4. The homepage remains timeless.
   5. Archive over campaign.
   6. Hindi and English are equal first-class experiences.
   7. The public website remains factual and dignified.
   8. The architecture supports future growth.
   9. The archive preserves provenance and rights information.
   10. Sensitive or private information must never reach the public site accidentally.

## Rationale

- A documentary posture makes the site credible to every audience: residents, journalists,
  researchers and people who already know the person.
- A site that does not depend on the election cycle stays useful and maintained between elections.
- Separating factual political information from promotional framing lets the site state political
  history accurately without becoming campaign material.

## Alternatives considered

- **Campaign-style site:** effective only during elections; dates quickly; undermines
  credibility as a record. Rejected.
- **Biography-only static page:** cannot hold an archive or ongoing activities; does not reflect
  the intended "living connection". Rejected.
- **Designing for a future candidacy now:** assumes a decision that has not been made. Rejected;
  flexibility is kept instead.

## Consequences

- No campaign UI patterns (countdowns, vote CTAs, slogan banners) are built.
- Every content type must carry provenance (see [0004](0004-content-and-verification-model.md)
  and [0018](0018-content-integrity-rules.md)).
- If the posture changes later, a new decision record and legal review are required before
  content or features change (spec G §15).
