# 0020 — Occasion as the connective archive entity

- **Status:** Accepted (amends [0004](0004-content-and-verification-model.md))
- **Date:** 2026-10-07
- **Deciders:** Product/technical decision partner (relayed by the project owner)
- **Related:** [Spec C §4–§6, §11](../spec/03-content-architecture.md), [Spec B §3, §6](../spec/02-information-architecture.md), [Spec A FR-A6, FR-N4](../spec/01-product-requirements.md); [0006](0006-archive-strategy.md), [0018](0018-content-integrity-rules.md), [0022](0022-archive-browsing-model.md); [Research §16, §19 item 11](../research/01-visual-product-research.md); [Reconciliation A-01](../research/02-research-to-spec-reconciliation.md)

## Context

A single real-world occasion in a public life often leaves material of several kinds: photographs,
a newspaper report, a document, a video, a timeline milestone, perhaps a current update. The
research found that the strongest archives connect these as one story (JFK Library "Associated
Records"; research §16). It also found that inferring the connection from overlapping dates and
places is unreliable when a public life contains many events.

The content model accepted in [0004](0004-content-and-verification-model.md) cannot do this cleanly:

- **TimelineEvent** is defined as "a milestone not represented by another entity", so ordinary past
  occasions have no proper home, and every TimelineEvent appears on the Timeline.
- **Activity** is built for current Updates. It doesn't fit historical occasions, and it is both
  "the happening" and "the post about it".
- **Collection** is editorial curation, not a factual record of an occasion.
- **Photo, Coverage, Video and Document** have no link to the occasion they document.

Three different things are mixed together: the **happening** (a fact), the **timeline milestone**
(an editorial judgement) and the **update** (a publication).

## Decision

1. **Definition.** An **Occasion** is a real-world event or episode, dated and placed, that can
   connect multiple records. It may be a single day or a short span (an episode).
2. **Key principle.** The archive should be able to tell the complete story of one occasion
   **without duplicating the same event information across unrelated content types**. The facts
   about the occasion (what, when, where) are recorded once, on the Occasion.
3. **Minimal content.** Conceptual only; fields are added in stages
   ([spec C §1](../spec/03-content-architecture.md)):
   - title (Hindi and English);
   - date with precision, approximation and optional range (spec C §2);
   - place(s);
   - optional short summary;
   - verification status and sources;
   - optional themes;
   - optional related Role and related Initiative;
   - an **`onTimeline` flag**.
4. **What can reference an Occasion.** Every reference is optional, and each item references **at
   most one** Occasion:
   - **archive items:** Photo, Video, Document, Coverage;
   - **updates:** Activity (an update reporting on or announcing the occasion).
5. **What an Occasion can reference.** Place(s), Theme(s), Source(s); optionally the **Role** during
   which it happened and the **Initiative** it belongs to (when it is part of a sustained programme
   of work).
6. **Interaction with TimelineEvent.**
   - An Occasion that deserves a Timeline entry is flagged **`onTimeline`**. It then appears on the
     Timeline, and **no separate TimelineEvent is created for it**.
   - **TimelineEvent remains**, but only for milestones that have **no** Occasion, meaning no
     connected material.
   - If material about such a milestone arrives later, the milestone becomes an Occasion and the
     TimelineEvent is retired. One fact, one place.
7. **Interaction with Updates (Activity).**
   - **Activity remains the publication**: the dated post in Updates.
   - It may reference the Occasion it reports on.
   - An Occasion is created for a current happening only when material of more than one kind will
     connect to it, or it is expected to enter the archive. Otherwise the Activity alone is enough.
     Occasions are not created for every update.
8. **What Occasion does not replace:**
   - **Collection:** an authored, curated story that may span many occasions;
   - **Initiative:** a sustained programme of work over time, which may include several occasions;
   - **Role:** a position and term;
   - **Activity:** the update publication;
   - **TimelineEvent:** milestones without material;
   - **Theme / Place:** taxonomy.
9. **Verification and publishing.**
   - An Occasion is claim-bearing: it uses the same statuses, and an `unverified` Occasion is never
     published ([0018](0018-content-integrity-rules.md)).
   - A published item may reference only a **published** Occasion; otherwise the reference counts as
     broken and the build fails.
   - Each archive item keeps its **own** verification status. Linking to an Occasion does not verify
     the item, and the item does not verify the Occasion.
10. **Presentation (minimal; no IA change).**
    - Item pages show **"From the same occasion"** as the first group of related items.
    - Occasions flagged `onTimeline` appear on the Timeline and link to their material.
    - Whether Occasions also get standalone public pages is a **design-phase decision (DP-07)**. No
      route or navigation is added by this record.
11. **Staging.** "When content warrants": introduced once at least two published items document the
    same occasion. Not required for MVP.
12. **Not implemented yet.** No schema is created by this record.

## Rationale

- Gives "From the same occasion" a single, reliable anchor, which is the research's
  highest-value cross-media pattern for an archive (research §16, §19 item 11).
- Separates the happening (Occasion), the editorial judgement (`onTimeline`), the publication
  (Activity) and curation (Collection), so these concepts don't become interchangeable.
- Keeps facts in one place (spec C §1, "one fact, one place").
- Works for any decade, and for current activities that later become history.
- Adds one entity and optional references. It does not redesign the model.

## Alternatives considered

- **Optional references to a TimelineEvent or an Activity** (the research's lighter option): small,
  but keeps the mix. TimelineEvent would have to stretch beyond milestones, the link would point to
  one of two different types, and Activities become historical without changing type. Rejected.
- **Model occasions as Collections:** mixes curation with fact; collections need an authored
  introduction and occasions do not. Rejected.
- **Infer connections from date and place:** too unreliable for a public life with many events.
  Rejected as the primary mechanism (it remains for general related items).
- **Replace TimelineEvent and Activity with Occasion:** over-models, and removes the distinction
  between the happening and the publication. Rejected.

## Consequences

- Spec C gains an Occasion entry, a comparison of Occasion, TimelineEvent, Activity, Initiative and
  archive items, an updated diagram, derived views and staging. Spec B (Timeline sources, related
  items) and spec A (FR-A6, FR-N4) are updated (spec v1.2).
- [0004](0004-content-and-verification-model.md) stays accepted; its status notes "amended by 0020".
- The Hindi term for "Occasion" is a glossary entry ([spec 09](../spec/09-language-glossary.md)).
- Editors need guidance on when to create an Occasion (operations guide, spec A FR-M2).
