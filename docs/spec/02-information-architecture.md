# B. Information Architecture

**Status:** Accepted. Visibility thresholds are open (see [H](08-open-decisions.md)).
URL paths below are illustrative; the URL scheme is defined in [D](04-bilingual-architecture.md).

## 1. Navigation

### Primary navigation

```
[Wordmark → Home]   About · Public Life · Archive · Updates · Connect   [EN | हिन्दी]
```

- The wordmark (the person's public name, once supplied) links to Home.
- Hidden sections are removed from navigation entirely (see §4).
- The language switch is always visible in the header, including on mobile. It is **not**
  hidden inside the menu.

### Mobile navigation

- Header: wordmark, language switch, menu button.
- Menu: the primary sections, then a short utility group (Press Kit, How We Verify).
- No mega-menus. Sub-sections are reached from section landing pages.

### Footer

Primary sections · Press Kit · How We Verify · Corrections & Feedback · Privacy ·
Terms / Takedown · Official social profiles · Language switch · Last-updated date.

## 2. Page hierarchy

```
/{lang}/                                   Home
├── about/                                 About (Biography)
├── public-life/                           Public Life — Overview
│   ├── timeline/                          Timeline
│   ├── roles/                             Roles & Terms
│   └── work/                              Work & Initiatives
│       └── {initiative}/                  Initiative detail
├── archive/                               Archive — hub
│   ├── photographs/                       Photographs
│   │   └── {photo}/                       Photo detail
│   ├── documents/                         Documents
│   │   └── {document}/                    Document detail
│   ├── press/                             In the Press
│   │   └── {coverage}/                    Coverage detail
│   ├── video/                             Video
│   │   └── {video}/                       Video detail
│   └── collections/{collection}/          Collection (story/album)
├── updates/                               Updates — all
│   ├── events/                            Events (upcoming, then past)
│   ├── announcements/                     Announcements
│   └── {activity}/                        Activity detail
├── connect/                               Connect
├── press-kit/                             Press Kit
├── how-we-verify/                         How We Verify
├── corrections/                           Corrections & Feedback
├── privacy/                               Privacy
└── terms/                                 Terms / Takedown
```

"Current activities" in the accepted IA corresponds to the Updates index plus activity types such
as visits, appearances and community activities. These are filters on Updates, not separate pages,
unless volume justifies them.

**Deliberately absent:** a standalone "Jabalpur" page. Jabalpur is woven through the biography,
roles (wards/areas), work (places), archive (place metadata) and updates (locations).
Standalone Theme and Place pages are also not created at v1, to avoid thin pages.
They are filters within Archive and Public Life.

## 3. Page responsibilities

| Page | Responsibility | Draws from | Visibility |
|---|---|---|---|
| **Home** | A timeless introduction; route visitors to the record and archive | Person, Role, Collection/Photo (curated), Activity | Always (launch requires identity + short bio) |
| **About** | The person's story in prose; Jabalpur connection as a thread | Person (bios), Place, Photo | Always (launch requirement) |
| **Public Life — Overview** | A factual summary of public life with links into detail | Role, Organisation, Initiative, TimelineEvent | When any child page is visible |
| **Timeline** | Chronological view of all dated content | Generated from Role, Initiative, Activity, Coverage, TimelineEvent | When threshold met |
| **Roles & Terms** | Positions held, with periods, places and sources | Role, Organisation, Place, Source | When ≥ 1 publishable role |
| **Work & Initiatives** | Public-service and community work | Initiative, Place, Theme, Photo, Source | When ≥ 1 publishable initiative |
| **Initiative detail** | One initiative: what, where, when, outcomes (sourced only), media | Initiative and relations | Per item |
| **Archive hub** | Entry to all archive types; featured collections | All archive types, Collection | When any archive child is visible |
| **Photographs** | Browse photos by decade/theme/collection | Photo | When threshold met |
| **Documents** | Browse documents | Document | When threshold met |
| **In the Press** | Media coverage by date/outlet/language | Coverage | When threshold met |
| **Video** | Videos and interviews | Video | When threshold met |
| **Archive item detail** | The item, its caption, credit, rights, provenance and related items | Item + Source, Place, Theme | Per item |
| **Collection** | A curated set or narrative story | Collection + items | Per collection |
| **Updates** | Dated current activities, newest first | Activity | When ≥ 1 published activity |
| **Events** | Upcoming events first, then past | Activity (type = event) | When ≥ 1 event |
| **Announcements** | Official announcements | Activity (type = announcement) | When ≥ 1 announcement |
| **Connect** | Approved contact methods and official social profiles | ContactMethod, SocialLink | When ≥ 1 public method or link (launch requirement) |
| **Press Kit** | Approved short/long bio, approved photos with credits, press contact | Person, Photo (press-approved), ContactMethod | When approved bio and ≥ 1 press-approved photo exist |
| **How We Verify** | Explains verification statuses, sources and corrections | Static policy content | Always |
| **Corrections & Feedback** | How to report an error or share information | Static content + ContactMethod | Always (needs at least one channel) |
| **Privacy** | Privacy notice | Static policy content | Always |
| **Terms / Takedown** | Terms of use; copyright and takedown process | Static policy content | Always |
| **404** | Bilingual not-found page with links to main sections | — | Always |

## 4. Conditional display

### 4.1 Section visibility rule

Every section and sub-section declares a **visibility rule**: a minimum number of publishable
items. If the rule is not met:

- the page is not generated;
- it is removed from navigation, footer, breadcrumbs, sitemap and any "related" links;
- parent pages hide links to it;
- the preview build lists it in a maintainer-only "hidden sections" report, with the reason.

Proposed starting thresholds (open decision, see H):

| Section | Proposed minimum |
|---|---|
| Timeline | 5 dated, publishable items |
| Roles & Terms | 1 role |
| Work & Initiatives | 1 initiative |
| Photographs | 6 photos |
| Documents | 3 documents |
| In the Press | 3 coverage items |
| Video | 1 video |
| Updates | 1 activity |
| Events / Announcements | 1 item of that type |
| Collections | Each collection needs ≥ 3 items |

### 4.2 Homepage modules

The homepage is a stack of modules. Each module hides itself if it has no content.

| Order | Module | Condition |
|---|---|---|
| 1 | Introduction: name, portrait, short bio | Required for launch |
| 2 | Public life at a glance (roles summary) | Roles & Terms visible |
| 3 | From the archive (curated selection or featured collection) | Archive visible |
| 4 | Timeline glimpse | Timeline visible |
| 5 | Recent updates | Updates visible **and** newest update is younger than a configured age (proposed: 6 months) |
| 6 | Connect strip | Connect visible |

Module 5 sits low on the page and hides itself when stale. This supports the timeless-homepage
principle.

### 4.3 Within-page conditional fields

Optional fields that are empty (e.g. no photographer credit, no place) are omitted along with their
labels. The site never renders "Unknown", "N/A", "TBD" or empty headings to visitors.

## 5. Utility pages

| Page | Purpose |
|---|---|
| **Press Kit** | Self-serve material for media. Downloads are limited to approved assets with credits. |
| **How We Verify** | Public explanation of `verified`, `supplied` and `media-reported`, and of how sources are kept. |
| **Corrections & Feedback** | Channel and process for corrections; expected response time. |
| **Privacy** | What data the site collects (none at MVP), analytics, contact handling, rights. |
| **Terms / Takedown** | Use of materials, copyright, how to request removal, response process. |
| **Language switch** | Present on every page (not a page itself). |

## 6. Cross-linking

Relationships in the content model drive navigation between sections:

- a Role links to its Place, its Organisation and to Initiatives carried out during it;
- an Initiative links to Places, Themes, Photos and Coverage;
- an archive item links to related items by shared Place, Theme, Collection or date range;
- Timeline entries link to their source item.

Search is added only when the archive justifies it (see F §6).
