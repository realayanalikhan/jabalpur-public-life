# H. Open Decisions

**Status:** Living list. When an item is decided, record it in [`../decisions/`](../decisions/)
and mark it resolved here with a link.

This list deliberately does **not** ask for the person's actual information. Part 3 only names
the *topics* that will need to be collected later.

## 1. Decisions for the product/technical decision partner

These can be decided without any person-specific information.

| ID | Decision | Options / recommendation | Blocks | Ref |
|---|---|---|---|---|
| OD-01 | Default language at `/` | English or Hindi. Root redirects to it; `x-default` points to it. | URL setup, SEO | D §3 |
| OD-02 | How much provenance visitors see | Labels only · labels + footnotes · full source panel per item · policy page only | Design of content pages | C §3, A FR-V2 |
| OD-03 | Section visibility thresholds | Proposed values in B §4.1 | Build configuration | B §4 |
| OD-04 | Digits on Hindi pages | Devanagari (०–९) or Western (0–9) | Formatting | D §9 |
| OD-05 | Hindi spelling of "Hindi" and transliteration convention | "हिन्दी" or "हिंदी"; one romanisation convention | Glossary | D §9 |
| OD-06 | Rights policy for newspaper scans and press photos | Citation + excerpt + link only (default) · full scans with attribution · case by case | Archive design, Coverage pages | G §10 |
| OD-07 | Contact features at launch | Email · phone · WhatsApp link · social links · contact form | Connect page; privacy notice | F §7, G §2 |
| OD-08 | Public contributions (memories, photos, corrections) | Not at launch (recommended) · later phase | Phase planning | A §6 |
| OD-09 | Analytics | Cloudflare Web Analytics (recommended) · none | Privacy notice | F §11 |
| OD-10 | Single-language Updates | Require both languages · allow one language with label | Update workflow | D §6 |
| OD-11 | Dark mode | Support · light only | Design system | E §4 |
| OD-12 | Jabalpur/Narmada motif | River line · marble texture · palette only | Design system | E §5 |
| OD-13 | When to add search | Proposed ~100 published archive items | Phase planning | F §6 |
| OD-14 | Homepage "recent updates" maximum age | Proposed 6 months | Homepage | B §4.2 |
| OD-15 | Branch protection on private repo | Upgrade plan · organisation on paid plan · rely on process | CI enforcement | F §10 |
| OD-16 | Who reviews Hindi and English translations | Named reviewer(s), professional or family | Translation workflow | D §5 |
| OD-17 | Budget | Professional photography, human translation, legal review, domain | Design, launch | E §3, G |
| OD-18 | Legal review | Who reviews privacy notice, terms, takedown policy, and when | Launch | G |
| OD-19 | Launch target | Date or milestone-based | Planning | A §5 |

## 2. Technical approvals pending

Full detail and recommendations in [F §14](06-technical-architecture.md#14-approvals-requested).

| ID | Decision | Recommendation |
|---|---|---|
| T-01 | Framework | Astro + TypeScript (strict), static |
| T-02 | Styling | Modern CSS + design tokens (Tailwind acceptable alternative) |
| T-03 | Content storage format | YAML entities + per-language Markdown prose |
| T-04 | Image strategy | Repo masters at MVP; object storage at growth trigger |
| T-05 | Video | YouTube with click-to-load facade |
| T-06 | Search | None at MVP; Pagefind later |
| T-07 | Contact | Links only at MVP |
| T-08 | Hosting | Cloudflare |
| T-09 | Environments | Local / restricted preview / production |
| T-10 | CI/CD | GitHub Actions with listed checks |
| T-11 | Analytics tool | Cloudflare Web Analytics (if OD-09 = yes) |
| T-12 | Runtime / package manager | Node 24 LTS, pnpm |

## 3. Requires input from the person or family (later)

**Not being requested now.** Listed only so that the architecture leaves room for them.

| ID | Topic | Why it matters |
|---|---|---|
| FI-01 | Domain name and who owns the domain, hosting and repository | Ownership, security, handover (G §11) |
| FI-02 | Who will maintain content after launch, how often, and their technical comfort | CMS need, Updates cadence |
| FI-03 | Archive inventory: approximate numbers and types of photos, clippings, documents and videos; whether digitised; who holds originals | Archive scope, storage strategy (F §5) |
| FI-04 | Where restricted materials and preservation masters will be kept | G §1, §14 |
| FI-05 | Preferences on party affiliation display | Public Life content, design |
| FI-06 | Preferred public name and spellings in both scripts | Glossary, SEO |
| FI-07 | Policy on personal details such as date of birth and family members | G §3 |
| FI-08 | Approved public contact channels and who responds | Connect, Corrections, Press Kit |
| FI-09 | Official social and video channels | Connect, impersonation protection, video hosting |
| FI-10 | Topics or materials to avoid or treat with care | Editorial review |
| FI-11 | Consent arrangements for people appearing in photographs | G §6 |

## 4. Resolved

| ID | Decision | Record |
|---|---|---|
| — | Product purpose, posture, language support, IA, design direction, principles, archive approach, content model direction, verification statuses, no CMS initially | Accepted 2026-10-07; to be recorded in `docs/decisions/` when instructed |
