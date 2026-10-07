# A. Product Requirements Document

**Status:** Accepted. MVP scope and numeric targets are working direction.

## 1. Purpose

The website is a premium bilingual (English and Hindi) digital public-life profile and archive.
It documents the person's public life, connection with Jabalpur, community and public-service
work, historical record, media coverage and ongoing activities.

It combines four things:

| Layer | Job | Rate of change | Basis of credibility |
|---|---|---|---|
| **Profile** | Who the person is, briefly and with dignity | Rare | Supplied by the person/family, attributed |
| **Public-service record** | Roles, terms, work, initiatives | Rare | Verified with sources |
| **Archive** | Photographs, documents, press coverage, video, collections | Grows over time | The item itself plus its provenance |
| **Living connection** | Current activities, events, announcements, contact | Frequent | First-party, dated |

The site must remain useful regardless of whether an election is taking place.

## 2. Posture and non-goals

**Posture:** neutral, documentary, factual.

The site is **not** (initially):

- a campaign or election website;
- a vehicle for slogans, vote appeals, election-focused calls to action, or "best leader" language;
- a party-branded site;
- a fundraising or donation platform;
- a social platform (no user accounts, no public comments);
- a news site or a general guide to Jabalpur.

Party affiliation, political roles and historical political activity may be shown **as factual
information** once supplied and verified.

**Flexibility requirement:** the architecture must allow a future change in posture (for
example, if the person decides to stand for election) through content, configuration and
additional modules, without rebuilding the site. No such modules are built now.

## 3. Users

| User | What they need | Where they go | Success looks like |
|---|---|---|---|
| **Jabalpur residents** | Understand who the person is and what they have done locally | Home, About, Public Life | Clear, credible summary in their preferred language |
| **People who already know the person** | Recognise them; find old photos and events; get in touch | Archive, Updates, Connect | Find a remembered photo or event; reach the person |
| **First-time discoverers** | A quick, trustworthy introduction | Home, About | Understand the person in under a minute on a phone |
| **Journalists and media** | Accurate bio, approved photos, dates, press contact | Press Kit, Public Life, In the Press | Get usable, attributable material without emailing |
| **Researchers, students, historians** | Dated, sourced record; original documents and coverage | Timeline, Archive, How We Verify | Cite items with confidence |
| **Community members and organisations** | Current activities and events; how to connect | Updates, Connect | Know what is happening and whom to contact |
| **People wanting to contact the person** | A clear, appropriate channel | Connect | Reach the right channel quickly |
| **Family and maintainers** (internal) | Add content, review translations, check what is published | Repository, preview builds | Publish safely without breaking anything or leaking private data |

## 4. Product principles

| # | Principle | In practice |
|---|---|---|
| 1 | **Evidence before claims** | Every factual claim has a verification status; unverified claims never go public. |
| 2 | **Never invent person-specific information** | No placeholder biography, dates, roles or quotes, in development or production. |
| 3 | **Empty sections are hidden** | Visitors never see "coming soon" or placeholder text; sections appear when content exists. |
| 4 | **Timeless homepage** | The homepage reads well even if no update has been posted for a long time. |
| 5 | **Archive over campaign** | Persuasion comes from the documented record, not rhetoric. |
| 6 | **Hindi and English are equal** | Both are first-class; translations are human-reviewed; neither is an afterthought. |
| 7 | **Factual and dignified** | Neutral tone; no exaggeration; no attacks on others. |
| 8 | **Grow without rebuilding** | New content and new content types can be added without reworking the site. |
| 9 | **Preserve provenance and rights** | Every archive item records its source, credit and rights status. |
| 10 | **Private information never leaks** | Sensitive data is kept out of the public build by design, not by care alone. |

## 5. MVP

The MVP is defined by **capabilities**, not by content quantity. Because the amount of content is
unknown, each section is built so it can launch empty-and-hidden and appear when content arrives.

### 5.1 MVP capabilities (built)

- Home, About (Biography), Public Life (Overview, Timeline, Roles & Terms, Work & Initiatives),
  Archive (Photographs, In the Press; Documents and Video if inventory justifies), Updates, Connect.
- Utility pages: How We Verify, Corrections & Feedback, Privacy, Terms / Takedown, Press Kit,
  bilingual 404.
- Full English and Hindi routing with language switch and hreflang.
- Repository-based content with schema validation and publish gates.
- Automatic section visibility.
- Archive browsing by type, decade and theme (no full-text search at MVP).
- Contact via links only (e.g. email, WhatsApp, social) unless a form is approved (see H).

### 5.2 Launch criteria (minimum content to go public)

| Requirement | Detail |
|---|---|
| Identity | Approved public name in both scripts and an approved portrait. |
| About | Short biography, reviewed in both languages. |
| At least one substantive section | E.g. Roles & Terms or a Photographs set with meaningful content. |
| Connect | At least one approved public contact channel or social link. |
| Policies | Privacy, Terms / Takedown, How We Verify, Corrections & Feedback, in both languages. |
| Quality gates | All technical non-functional checks (§7) pass. |

### 5.3 Not in MVP

Full-text search, public contribution forms, event registration, newsletter, maps, CMS,
user accounts, comments.

## 6. Future phases (indicative)

| Phase | Scope | Trigger |
|---|---|---|
| **2. Enrichment** | Collections/stories, richer Timeline, Documents and Video sections, expanded Press Kit | Content inventory supports it |
| **3. Discovery** | Full-text archive search; browse by place; Git-based CMS | Archive size or maintenance workflow justifies it |
| **4. Engagement** | Contact form, public contributions (memories/photos/corrections), interviews/oral history with transcripts | Approved after privacy review |
| **Contingent** | Posture modules (e.g. election-period content) | Only if the person's posture changes; requires legal review |

## 7. Functional requirements

IDs are stable so later work can reference them.

### Content and publishing (FR-C)

- **FR-C1** Content is stored in the repository in structured, validated form.
- **FR-C2** Each item has a workflow status (`draft`, `review`, `published`, `archived`); only `published` reaches production.
- **FR-C3** Each claim-bearing item has a verification status; `unverified` items cannot be published (build fails).
- **FR-C4** Development fixtures are marked and cause a production build to fail if present.
- **FR-C5** Internal notes and internal-only sources are never rendered or shipped to the browser.
- **FR-C6** References between items (e.g. a photo's place, a role's organisation) are validated at build time.
- **FR-C7** Dates support precision (year, month, day), approximation ("circa") and ranges.

### Information architecture and navigation (FR-N)

- **FR-N1** Sections and sub-sections appear only when they meet their visibility rule; hidden sections are removed from navigation, sitemap and internal links.
- **FR-N2** Every page has an equivalent in the other language, or a clear notice if it does not.
- **FR-N3** Breadcrumbs on all pages below section level.
- **FR-N4** Related content is linked automatically through shared entities (place, theme, role, date range).

### Bilingual (FR-L)

- **FR-L1** English and Hindi routes for every public page.
- **FR-L2** A language switch on every page leads to the equivalent page.
- **FR-L3** Translation status is tracked per item; a translation goes stale automatically when its source text changes.
- **FR-L4** Machine translations may be drafts but cannot be published without human review.
- **FR-L5** A shared glossary defines the standard rendering of recurring names and terms.

### Archive (FR-A)

- **FR-A1** Archive items (photo, document, coverage, video) have their own pages with caption, date, place, credit, rights and provenance.
- **FR-A2** Archive browsing by type, decade and theme, with shareable URLs.
- **FR-A3** Collections group items into curated sets or stories.
- **FR-A4** Coverage items record outlet, date, original-language headline, link, archive link and rights status.
- **FR-A5** Items with unknown or restrictive rights are displayed as citations, not reproductions.

### Updates (FR-U)

- **FR-U1** Activities have a type (event, visit, announcement, appearance, community activity), date, place and optional media.
- **FR-U2** Upcoming and past events are distinguished automatically by date.
- **FR-U3** The homepage updates module hides itself when the most recent update is older than a configured age.

### Connect (FR-K)

- **FR-K1** Contact methods and social links are managed as content and shown only if marked public.
- **FR-K2** Any data-collecting feature (form, registration) requires prior approval and a privacy notice.

### Verification and provenance (FR-V)

- **FR-V1** Sources are stored as separate entries and linked to the items they support.
- **FR-V2** How much provenance is visible to visitors is configurable (decision pending, see H).
- **FR-V3** A public "How We Verify" page explains the verification statuses.
- **FR-V4** Material factual corrections can carry a public correction note.

### SEO (FR-S)

- **FR-S1** Unique title and description per page per language.
- **FR-S2** hreflang (`en`, `hi`, `x-default`), self-referencing canonicals, per-language sitemaps, robots.txt.
- **FR-S3** schema.org structured data (`ProfilePage`/`Person`, `ImageObject`, `Event`, `BreadcrumbList`), emitted only from published, non-unverified data.
- **FR-S4** Open Graph and social images per language, with correct Devanagari rendering.

### Maintenance (FR-M)

- **FR-M1** Preview builds show a report of hidden sections and why they are hidden (maintainers only).
- **FR-M2** A short operations guide explains how to add each content type.
- **FR-M3** Content can be added without changing code.

## 8. Non-functional requirements

Numeric targets are working direction and may be tuned in the technical phase.

| Area | Requirement |
|---|---|
| **Performance** | Measured on a mid-range Android phone over 4G at the 75th percentile: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1. Content pages ship near-zero JavaScript. Responsive, modern-format images. Fonts subset and self-hosted. |
| **Accessibility** | WCAG 2.2 AA. Correct `lang` on all text, including inline phrases in the other language. Usable by keyboard and screen readers in both languages. |
| **Mobile-first** | Designed from a 360 px viewport upward; no horizontal scrolling; touch targets ≥ 44 px. |
| **Browser support** | Current and previous major versions of Chrome (incl. Android), Safari (incl. iOS), Firefox, Edge; graceful on older Android WebViews. Works without JavaScript. |
| **Security** | Static output by default; minimal third-party scripts; security headers; 2FA on all accounts (see G). |
| **Privacy** | No cookies or visitor data collection at MVP; cookieless analytics only if approved. |
| **Reliability** | Static hosting on a global CDN; no runtime dependency for core pages. |
| **Maintainability** | Minimal dependencies; typed schemas; documented content workflow; decision records. |
| **Portability** | Static output deployable to any static host; content in open formats (Markdown, YAML/JSON, standard image files). |
| **Longevity** | Archive originals preserved independently of the website. |
| **Cost** | Aim for free-tier hosting; domain registration as the main recurring cost (to be confirmed). |

## 9. Success measures

Measures avoid vanity metrics and focus on credibility and usefulness.

- 100% of published factual claims have a verification status, and every `verified` item has at least one source.
- Core pages have reviewed versions in both languages at all times.
- Performance and accessibility budgets pass on every deployment.
- Correction requests are acknowledged within an agreed time (see G).
- Journalists can get an approved bio and photos from the Press Kit without contacting anyone.
