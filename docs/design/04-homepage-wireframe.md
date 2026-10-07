# 04. Homepage wireframe

- **Date:** 2026-10-07
- **Status:** Conceptual wireframe (DP-05 open). **No production code. No invented content:** every
  value is a placeholder (‹public name›, ‹descriptor›, ‹role, years›…). H2 and H6 are **proposals**
  (HP-01, HP-02), analysed in [08](08-homepage-additions-analysis.md) and not approved.
- **Constraints:**
  - [spec B §4.2](../spec/02-information-architecture.md#42-homepage-modules) (homepage modules);
  - [0003](../decisions/0003-information-architecture.md) (timeless homepage, hidden empty sections);
  - [0001](../decisions/0001-product-purpose-and-posture.md) (no campaign UI);
  - [03 visual direction](03-visual-direction.md).

## 1. What the opening screens must answer

| # | Question | Answered by | Screen (360 × ~640 px phone) |
|---|---|---|---|
| 1 | **Who is this?** | Public name in both scripts and a factual descriptor line (§H1) | First screen |
| 2 | **What does this website represent?** | A one-paragraph site statement: a documented public record with sources (§H2) | Second screen |
| 3 | **What public record is available?** | "Public life at a glance": roles and terms as a ruled list (§H3) | Second–third screen |
| 4 | **Why explore the archive?** | Featured archive collection with an editor's introduction, plus hand-picked items (§H4) | Third screen |
| 5 | **What connects this story to Jabalpur?** | "जबलपुर" in the descriptor line, place names in every role row and caption, a documentary portrait in a Jabalpur setting, and the places list (§H6) | Throughout, starting on screen 1 |

**Not allowed:**
- a campaign-style hero, carousel or slogan;
- full-bleed poster portraits, or text over a photograph;
- counters, "join", "donate" or "vote" calls to action;
- social feeds or pop-ups.

## 2. Page at a glance

```
DESKTOP (≥ 1024 px)                                   MOBILE (360 px)
┌──────────────────────────────────────────────┐      ┌──────────────────────────┐
│ ‹wordmark›   About · Public Life · Archive ·  │      │ ‹wordmark›  English [मेनू]│ H0
│              Updates · Connect       English  │      ├──────────────────────────┤
├──────────────────────────────────────────────┤      │ ‹सार्वजनिक नाम›           │ H1
│ ‹सार्वजनिक नाम›           ┌────────────┐      │      │ ‹Public name›            │
│ ‹Public name›             │            │      │      │ ‹descriptor›, जबलपुर      │
│ ‹descriptor›, जबलपुर       │ ‹portrait› │      │      │ ┌──────────────────────┐ │
│                           │   4:5      │      │      │ │      ‹portrait›      │ │
│ ‹short biography, 2–3     │            │      │      │ │         4:5          │ │
│  sentences›               └────────────┘      │      │ └──────────────────────┘ │
│ → Public life  → Archive  ‹caption · credit›  │      │ ‹caption · credit›       │
├──────────────────────────────────────────────┤      │ ‹short biography›        │
│ ‹site statement: a documented public record… │ H2   │ → Public life → Archive  │
│  sources labelled · How we verify›           │      ├──────────────────────────┤
├──────────────────────────────────────────────┤      │ ‹site statement›         │ H2
│ Public life at a glance                       │ H3   ├──────────────────────────┤
│ ‹role› · ‹ward/area› · ‹years›  ‹provenance› │      │ Public life at a glance  │ H3
│ ‹role› · ‹ward/area› · ‹years›  ‹provenance› │      │ ‹role› ‹ward› ‹years›    │
│ → All roles and the timeline                  │      │ ‹provenance›             │
├──────────────────────────────────────────────┤      ├──────────────────────────┤
│ From the archive                              │ H4   │ From the archive         │ H4
│ ┌─────────────────┐  ‹collection title›       │      │ ┌──────────────────────┐ │
│ │ ‹cover 3:2›     │  ‹editor's intro line›    │      │ │      ‹cover 3:2›     │ │
│ └─────────────────┘  ‹by ‹editor››            │      │ └──────────────────────┘ │
│ ‹item› ‹item› ‹item›   → Explore the archive   │      │ ‹title› ‹intro›          │
├──────────────────────────────────────────────┤      │ ‹item›‹item›‹item›(list) │
│ Timeline glimpse  │‹year› ‹milestone›          │ H5   ├──────────────────────────┤
│  (river line)     │‹year› ‹milestone›          │      │ │ ‹year› ‹milestone›     │ H5
├──────────────────────────────────────────────┤      ├──────────────────────────┤
│ Places in the record: ‹ward› · ‹locality› …   │ H6   │ Places: ‹ward› · ‹loc›   │ H6
├──────────────────────────────────────────────┤      ├──────────────────────────┤
│ Recent updates (only if recent)               │ H7   │ Recent updates (cond.)   │ H7
├──────────────────────────────────────────────┤      ├──────────────────────────┤
│ Connect: ‹email› ‹phone› ‹WhatsApp› ‹profiles›│ H8   │ Connect                  │ H8
├──────────────────────────────────────────────┤      ├──────────────────────────┤
│ Footer: utility pages · last updated · हिंदी  │ H9   │ Footer                   │ H9
└──────────────────────────────────────────────┘      └──────────────────────────┘
```

## 3. Sections

**Relationship to spec B §4.2.** H1, H3, H4, H5, H7 and H8 correspond to the six approved homepage
modules. **H2 (site statement) and H6 (places in the record) are proposed additions.** They
should be confirmed when the design decisions are formalised, as a small spec B §4.2 update.
No other IA change is implied.

Terms used in "Static or dynamic":
- **Fixed** is copy that rarely changes.
- **Derived** is generated at build time from content, so it updates when content changes.
- **Curated** is chosen by an editor.

Everything is static HTML. Nothing changes in the browser.

### H0 · Header

| | |
|---|---|
| **Purpose** | Identity, orientation, language |
| **Content** | Wordmark (‹public name›; family-confirmed, FI-06); primary navigation; language switch (the other language only, [0021](../decisions/0021-language-switching-and-single-language-content.md)) |
| **Layout / hierarchy** | Wordmark left; navigation; switch at the end. Hairline below. Not sticky |
| **Desktop** | Inline navigation |
| **Mobile** | Wordmark, "English" link, menu button. Navigation in the menu (Hindi labels need about 371 px) |
| **Missing content** | Hidden sections are dropped from navigation. Before the name is confirmed, development builds use a placeholder (never in production) |
| **Static / dynamic** | Derived (navigation follows section visibility) |
| **Relationship** | Entry to every section |

### H1 · Identity block (screen 1)

| | |
|---|---|
| **Purpose** | **Who is this?** Name, a factual descriptor, a documentary portrait and a short biography. No slogan |
| **Content** | Public name in both scripts (page language first, large; other script smaller); **descriptor line**: a short, factual, verified or supplied description ending with "जबलपुर" / "Jabalpur" (e.g. "‹former role›, जबलपुर"; wording from approved content only); approved portrait with caption and credit; short biography (2–3 sentences, from Person `shortBio`); two quiet text links: Public life → Archive → |
| **Layout / hierarchy** | Name (display size) → descriptor (lead, ink-2) → biography → links. Portrait **beside** the text, never behind it |
| **Desktop** | Asymmetric: text on columns 1–6; portrait 4:5 on columns 8–12, with the caption hanging below |
| **Mobile** | One column: name → descriptor → portrait (full width, 4:5) → caption → biography → links. The first screen shows the name, the descriptor and the top of the portrait |
| **Missing content** | **Without an approved portrait**, the block is purely typographic (name, descriptor, biography) and still complete; no placeholder image. A launch needs a short biography and the name (spec A §5.2) |
| **Static / dynamic** | Derived from Person (and its portrait Photo) |
| **Relationship** | Links to About (full biography) and the Archive |

### H2 · Site statement (screen 2)

| | |
|---|---|
| **Purpose** | **What does this website represent?** States plainly that this is a documented public record whose items carry their sources |
| **Content** | One short paragraph (editor-written, both languages, reviewed), e.g. "‹This website is a documented record of the public life of ‹public name› in Jabalpur. Each item shows where its information comes from.›" with a link to How We Verify |
| **Layout / hierarchy** | Lead-size serif text on the text column; hairline above |
| **Desktop / mobile** | Same; full width on mobile |
| **Missing content** | Required for launch (fixed copy); no fallback needed |
| **Static / dynamic** | Fixed |
| **Relationship** | How We Verify; sets the documentary posture |

### H3 · Public life at a glance (screen 2–3)

| | |
|---|---|
| **Purpose** | **What public record is available?** A factual summary of roles and terms |
| **Content** | Ruled list of published Roles: title · ward/area (place name) · years (with date precision), each with its Level-1 provenance label. Link: "All roles and the timeline →" |
| **Layout / hierarchy** | Section label → rows. No icons, no cards. At most about 5 rows, then the link |
| **Desktop** | Two columns of text in each row (role and place on the left; years and provenance on the right) |
| **Mobile** | Stacked row: role → place · years → provenance |
| **Missing content** | Hidden when Roles & Terms is not visible ([0003](../decisions/0003-information-architecture.md)). Rows never show "Unknown" |
| **Static / dynamic** | Derived (Roles) |
| **Relationship** | Public Life → Roles & Terms, Timeline |

### H4 · From the archive (screen 3)

| | |
|---|---|
| **Purpose** | **Why explore the archive?** Shows that the record has depth and a human voice |
| **Content** | One featured Collection: 3:2 cover, title, one-line editor's introduction and editor name. Then three hand-picked items (photo / press / document), each with type · date and title. Link: "Explore the archive →" |
| **Layout / hierarchy** | Collection first and larger; items as a short ruled list (mobile) or a three-column row (desktop) |
| **Desktop** | Cover on columns 1–7, text on 8–12; items below |
| **Mobile** | Cover full width → title → introduction → item list |
| **Missing content** | No featured collection → show three to six hand-picked items. No visible archive content → section hidden |
| **Static / dynamic** | Curated (featured collection and items set in configuration) |
| **Relationship** | Archive hub; Collections; items |

### H5 · Timeline glimpse

| | |
|---|---|
| **Purpose** | Communicates the span of public life over decades at a glance |
| **Content** | Four to six milestones (year · short title) drawn from the Timeline view: Occasions flagged `onTimeline`, Role starts, TimelineEvents ([0020](../decisions/0020-occasion-connective-archive-entity.md)). Link to the full Timeline |
| **Layout / hierarchy** | **The river line** as the vertical spine (its main appearance); years in tabular figures |
| **Desktop** | Horizontal arrangement is **not** used. A short vertical list beside a period summary |
| **Mobile** | Vertical list with the line at the left edge |
| **Missing content** | Hidden when the Timeline is not visible |
| **Static / dynamic** | Derived; milestones may be pinned in configuration |
| **Relationship** | Timeline; Occasions |

### H6 · Places in the record

| | |
|---|---|
| **Purpose** | **What connects this story to Jabalpur?** Shows the localities the record covers, through content rather than decoration |
| **Content** | A short list of Place names (wards and localities) that have published items, each linking to the archive's place lens ([0022](../decisions/0022-archive-browsing-model.md)); optionally one documentary place photograph with caption |
| **Layout / hierarchy** | Section label "Places in the record" / "अभिलेख में स्थान" (glossary); text links separated by middle dots |
| **Desktop / mobile** | Wrapping list; the photograph (if any) beside the list on desktop and above it on mobile |
| **Missing content** | Hidden when the place lens is not visible. **Not a "Jabalpur" information page** and no tourism content (0003) |
| **Static / dynamic** | Derived (Places with published items) |
| **Relationship** | Archive place lens |

### H7 · Recent updates

| | |
|---|---|
| **Purpose** | Shows that the record is living, without making the homepage depend on it |
| **Content** | Up to three latest Activities (type · date · title), with a link to Updates |
| **Layout / hierarchy** | Low on the page; ruled list; small |
| **Desktop / mobile** | Same list |
| **Missing content** | **Hidden when the newest update is older than the configured age (6 months)** or when Updates is not visible ([0003](../decisions/0003-information-architecture.md)). The page reads as complete without it |
| **Static / dynamic** | Derived (Activities) |
| **Relationship** | Updates; may link to Occasions |

### H8 · Connect

| | |
|---|---|
| **Purpose** | How to reach the person, through approved channels |
| **Content** | Approved public contact methods and official profiles (FI-08, FI-09). Links only ([0015](../decisions/0015-mvp-contact-strategy.md)). Link to Press Kit |
| **Layout / hierarchy** | Single quiet row of text links; no icon wall |
| **Desktop / mobile** | Row / stacked list with 44 px targets |
| **Missing content** | Hidden when Connect is not visible (a launch requires at least one channel) |
| **Static / dynamic** | Derived (ContactMethod, SocialLink) |
| **Relationship** | Connect page; Press Kit |

### H9 · Footer

| | |
|---|---|
| **Purpose** | Utility and trust |
| **Content** | Primary sections; Press Kit · How We Verify · Corrections & Feedback · Privacy · Terms / Takedown; official profiles; language switch; "Last updated ‹date›"; optional short river rule above |
| **Missing content** | Hidden sections are dropped; utility pages always present |
| **Static / dynamic** | Derived |

## 4. Why this order

1. **Identity before story.** The research found that the category leads with slogans and
   carousels. This page leads with a name, a fact and a face, then explains itself (research §9, §14).
2. **Statement before record.** Telling visitors that every item carries its source turns the rest of
   the page into evidence rather than promotion.
3. **Record before archive.** Roles give the frame; the archive gives depth.
4. **Updates last.** The homepage stays timeless (principle 4).
