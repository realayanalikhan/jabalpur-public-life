# G. Security, Privacy & Content Integrity

**Status:** Working direction. Principles accepted (product principles 1, 2, 9 and 10).
Procedures are proposed and will be refined before launch.

> **Not legal advice.** Relevant frameworks include India's Digital Personal Data Protection
> Act 2023 and DPDP Rules 2025 (obligations phasing in; most apply from around mid-2027), the
> Information Technology Act 2000 and rules under it, the Copyright Act 1957, and, if the
> person's posture ever changes, Election Commission rules including the Model Code of Conduct.
> Privacy notice, terms and takedown policy should be reviewed by a qualified professional
> before launch (OD-18, see H). Nothing here is presented as legally approved.

## 1. Data classification

| Class | Examples | Location | Rules |
|---|---|---|---|
| **Public** | Published content, approved derivatives | Repository; public site | Must pass all publish gates. |
| **Internal** | Internal notes, internal-only sources, records of who supplied what, consent *references* | Repository | Never rendered, never shipped to the browser, never in structured data. |
| **Restricted** | Original scans containing personal data, identity documents, private contact details, signed consent forms, family-private material, unredacted documents | **Never in git.** Family-controlled storage (location: open decision) | Access limited to named people; backed up. |

**Assume the repository could one day become public.** Nothing restricted may ever be committed,
because git history is permanent. If restricted data is committed by mistake, follow §12.

## 2. Visitor personal data

- **MVP collects no visitor personal data:** no cookies, no forms, no accounts
  ([0015](../decisions/0015-mvp-contact-strategy.md)). Analytics (Cloudflare Web Analytics) are
  cookieless and can be disabled ([0016](../decisions/0016-analytics-strategy.md)).
- Contact happens through links (email, phone, WhatsApp, social). Messages go directly to those
  services, not through the website. The privacy notice explains this.
- **Any future data-collecting feature** (contact form, registration, newsletter, submissions)
  requires, before it is built:
  - a stated purpose and data minimisation (collect only what is needed);
  - a notice in English and Hindi, and consent where required;
  - a retention period and deletion process;
  - a list of processors (e.g. email provider);
  - a grievance/contact point for data requests;
  - protection against spam and abuse (bot protection, rate limiting);
  - no knowing collection of children's data (DPDP requires verifiable parental consent for
    under-18s); registration features in particular need specific review.

## 3. The person's and family's personal data

- Publish only what the family explicitly approves for publication.
- Use dedicated public contact channels; never publish personal mobile numbers or home addresses.
- Prefer minimal personal detail (e.g. publishing a birth year or no birth date rather than a full
  date of birth). Policy requires family input (FI-07).
- Information about other family members is published only with their consent.

## 4. Archive documents

Intake pipeline for every document and photograph:

```
receive → catalogue (restricted storage) → rights check → personal-data check
        → redact (on a copy; master untouched) → review → approve → derivative into repository
```

- **Personal data to redact** before publication: Aadhaar, PAN and other ID numbers, phone
  numbers, private addresses, signatures, bank details, medical information, and private
  information about third parties.
- **Redaction must be destructive.** Flatten scans or rasterise redacted areas; drawing a black
  box over text in a PDF can leave the text recoverable.
- Extracted (OCR) text is generated **after** redaction, from the redacted derivative.
- Each document records its redaction status; unredacted documents cannot be published.

## 5. Image metadata

- All published images are re-encoded, which strips EXIF/XMP/IPTC metadata including GPS
  location, camera serials and editing history.
- A CI check rejects committed images that still contain GPS metadata.
- Credit, rights and provenance live in the content model and are shown in the interface,
  because embedded metadata is removed.
- Particular care with recent photographs: location metadata can reveal homes and routines.

## 6. Minors and private individuals

- **Minors:** do not publish identifiable images of minors without guardian consent. Otherwise
  choose another image, crop, or blur. Never name minors.
- **Private individuals:** never name private individuals without consent. Crowd and event
  photos where people are incidental are acceptable, but removal requests are honoured promptly.
- **Sensitive contexts:** photos of people in distress, hospitals, grievance meetings, religious
  ceremonies or other sensitive settings are not published without consent.
- Consent records are kept as **restricted** data; the content entry stores only a reference and
  a consent flag.

## 7. Provenance and integrity

- Every claim-bearing item carries a verification status; `unverified` cannot be published
  (enforced at build).
- Sources are retained even when not publicly displayed.
- **Quotes** are published only with a source and are never altered. Translations of quotes are
  labelled as translations.
- **Images** are not manipulated in ways that change meaning. No AI-generated or AI-reconstructed
  images are presented as historical. Restorations beyond basic cleanup are disclosed.
- **Statements about other people** (officials, opponents, organisations) are avoided unless
  necessary. When necessary, they are attributed to a source, neutral in tone and reviewed before
  publication, to avoid defamation risk.
- **Change history:** git history is the internal record. Pages display a last-updated date;
  material factual changes carry a public correction note (§8).

## 8. Corrections

- A public Corrections & Feedback page with at least one link-based channel ([0015](../decisions/0015-mvp-contact-strategy.md); which channels depends on FI-08).
- **Response times: proposed guidance only, not a decided requirement.** Proposal: acknowledge
  within 7 days; resolve or explain within 30 days. Whether to commit publicly to response times,
  and which ones, is open (OD-24 in [H](08-open-decisions.md)). It depends on who handles
  corrections (FI-02, FI-08). The Corrections & Feedback page must not state a response time until
  this is decided.
- Outcomes: correct, clarify, add a source, remove, or retain with an explanatory note.
- Material corrections to facts (not typos) receive a dated correction note on the page.
- An internal log records the request, the decision and the reason.

## 9. Takedowns

- Who can request: people shown in content, rights holders, people whose personal data appears.
- **Privacy or safety requests about minors or private individuals:** remove first, review
  afterwards.
- **Copyright requests:** review the rights record; remove or replace with a citation-only entry
  if rights cannot be established.
- Process and contact are published on the Terms / Takedown page in both languages.
- Decisions are logged internally.

## 10. Copyright and rights

Every asset records a rights status:

| Rights status | May reproduce in full? |
|---|---|
| Owned by the person/family (and creator is known or assigned) | Yes |
| Licensed / permission granted (recorded) | Yes, within the permission |
| Public domain or official publication permitting reuse | Yes, with attribution |
| Third-party, rights unclear (e.g. newspaper clippings, press photographers) | **Default: citation, short excerpt and link only.** Full reproduction only where rights or permission are established and recorded ([0006](../decisions/0006-archive-strategy.md)). |
| Unknown | No. Citation only. |

- Photographer credits are shown wherever known.
- Logos and party symbols are used only as factual references, if at all, and in line with any
  applicable rules.

## 11. Account and infrastructure security

- **Two-factor authentication** (preferably passkeys or hardware keys) on GitHub, Cloudflare,
  domain registrar, email accounts used for the site, YouTube and social profiles.
- **Ownership:** domain, hosting and repository should ultimately be owned by the person/family
  (or an organisation account they control), with the developer as a collaborator. The repository
  currently sits on a personal account; transfer plan is open (FI-01, see H).
- Least-privilege access; remove access when people leave.
- Registrar transfer lock and DNSSEC.
- No secrets in the repository; secrets stored in the hosting provider's encrypted settings;
  secret scanning enabled where the plan allows.
- Branch protection on `main` where the plan allows (see F §10).
- Security headers and a strict Content Security Policy; no unapproved third-party scripts.
- Dependency alerts and reviewed updates.
- Recovery codes held by the account owner, stored offline.

## 12. Incident response (summary)

| Incident | Response |
|---|---|
| Restricted data committed to git | Remove from the site immediately; rewrite history to purge; rotate anything secret; assess whether it was ever deployed or cloned. |
| Private data published on the site | Unpublish and redeploy immediately; request cache purge; notify affected people where appropriate. |
| Account compromise / defacement | Revoke sessions and tokens; restore from git; review access; enable stronger 2FA. |

## 13. Impersonation

- The Connect page and footer list the **official** social profiles and channels, so visitors can
  identify fake accounts.
- Official profiles should link back to the website where platforms allow.

## 14. Archive preservation

- The website is a presentation layer, not the archive of record.
- Preservation masters are kept in at least three copies, on two types of storage, with one
  off-site (3-2-1 rule), under family control.
- Digitisation guidance (scan resolution, file formats, naming, intake metadata) to be issued
  before mass scanning begins.

## 15. Political and electoral compliance

The site is documentary, not a campaign site. If the person's posture changes (e.g. a decision
to stand for election), a legal review is required **before** any change in content or features,
covering the Model Code of Conduct, expenditure disclosure and platform rules.
