import { describe, expect, it } from 'vitest';
import { runContentChecks } from '../../src/validation/checks.ts';
import type { Issue } from '../../src/validation/types.ts';
import { ctx, entry, envs } from '../helpers.ts';

const by = (issues: Issue[], check: string) => issues.filter((i) => i.check === check);
const sev = (issues: Issue[], check: string) => by(issues, check).map((i) => i.severity);

const photo = (id: string, extra: Record<string, unknown> = {}) =>
  entry('photos', id, {
    verification: 'supplied',
    alt: { hi: 'वैकल्पिक पाठ', en: 'Alt text' },
    rights: { status: 'family-owned', fullReproductionAllowed: true },
    consent: { privateIndividuals: 'none', minors: 'none' },
    ...extra,
  });

describe('content integrity checks (scaffold plan §6)', () => {
  it('I1: unverified published content fails production and preview', () => {
    const e = entry('activities', 'a', { verification: 'unverified', title: { hi: 'शीर्षक' } });
    expect(sev(runContentChecks(ctx(envs.deploy, [e])), 'I1')).toEqual(['fail']);
    expect(sev(runContentChecks(ctx(envs.preview, [e])), 'I1')).toEqual(['fail']);
    const review = entry('activities', 'b', { status: 'review', verification: 'unverified', title: { hi: 'शीर्षक' } });
    expect(sev(runContentChecks(ctx(envs.preview, [review])), 'I1')).toEqual(['warn']);
  });

  it('I2: development fixtures fail preview and production', () => {
    const e = entry('themes', 't', { devFixture: true, label: { hi: 'विषय' } });
    expect(sev(runContentChecks(ctx(envs.preview, [e])), 'I2')).toEqual(['fail']);
    expect(sev(runContentChecks(ctx(envs.verify, [e])), 'I2')).toEqual(['fail']);
    expect(sev(runContentChecks(ctx(envs.local, [e])), 'I2')).toEqual([]);
    // A draft fixture (not buildable) still fails: fixtures must not be included at all.
    const draftFixture = entry('themes', 'u', { devFixture: true, status: 'draft', label: { hi: 'विषय' } });
    expect(sev(runContentChecks(ctx(envs.verify, [draftFixture])), 'I2')).toEqual(['fail']);
  });

  it('I5: verified without a source fails everywhere', () => {
    const e = entry('roles', 'r', { verification: 'verified', sources: [], title: { hi: 'पद' } });
    for (const env of [envs.local, envs.preview, envs.deploy])
      expect(sev(runContentChecks(ctx(env, [e])), 'I5')).toEqual(['fail']);
  });

  it('I6: missing references fail; published → unpublished references fail production', () => {
    const missing = entry('roles', 'r', {
      verification: 'supplied',
      places: [{ collection: 'places', id: 'nowhere' }],
    });
    expect(sev(runContentChecks(ctx(envs.deploy, [missing])), 'I6')).toEqual(['fail']);
    const draftPlace = entry('places', 'p', { status: 'draft', name: { hi: 'स्थान' }, type: 'locality' });
    const role = entry('roles', 'r2', { verification: 'supplied', places: [{ collection: 'places', id: 'p' }] });
    expect(sev(runContentChecks(ctx(envs.deploy, [draftPlace, role])), 'I6')).toEqual(['fail']);
  });

  it('I8: photo alt text required in each published language', () => {
    const e = photo('p', { alt: { hi: 'वैकल्पिक पाठ' }, caption: { hi: 'कैप्शन', en: 'Caption' } });
    expect(sev(runContentChecks(ctx(envs.deploy, [e])), 'I8')).toEqual(['fail']);
  });

  it('I9: a TimelineEvent may not duplicate an on-timeline Occasion', () => {
    const occ = entry('occasions', 'o', {
      verification: 'supplied',
      title: { hi: 'अवसर' },
      date: { value: '1999' },
      onTimeline: true,
    });
    const te = entry('timeline-events', 't', {
      verification: 'supplied',
      title: { hi: 'अवसर' },
      date: { value: '1999' },
    });
    expect(sev(runContentChecks(ctx(envs.deploy, [occ, te])), 'I9')).toEqual(['fail']);
  });

  it('I12: references must exist, be valid, unique and registered', () => {
    const noRef = photo('a');
    expect(sev(runContentChecks(ctx(envs.deploy, [noRef])), 'I12')).toEqual(['fail']);
    const bad = photo('b', { reference: '123456' });
    expect(by(runContentChecks(ctx(envs.deploy, [bad])), 'I12').some((i) => /invalid format/.test(i.message))).toBe(
      true,
    );
    const ok = photo('c', { reference: 'K7QM4X' });
    const registry = [{ reference: 'K7QM4X', collection: 'photos', item: 'c', retired: false }];
    expect(sev(runContentChecks(ctx(envs.deploy, [ok], { registry })), 'I12')).toEqual([]);
    const reused = photo('d', { reference: 'K7QM4X' });
    expect(sev(runContentChecks(ctx(envs.deploy, [reused], { registry })), 'I12')).toEqual(['fail']);
  });

  it('I13: machine-draft translations are never published', () => {
    const e = entry('activities', 'a', {
      verification: 'supplied',
      title: { hi: 'शीर्षक', en: 'Title' },
      translations: { en: { state: 'machine-draft' } },
    });
    expect(sev(runContentChecks(ctx(envs.deploy, [e])), 'I13')).toEqual(['fail']);
  });

  it('I15–I17: redaction, consent and rights gates', () => {
    const doc = entry('documents', 'd', {
      verification: 'supplied',
      redactionStatus: 'pending',
      rights: { status: 'family-owned', fullReproductionAllowed: true },
      reference: 'K7QM4X',
    });
    expect(sev(runContentChecks(ctx(envs.preview, [doc])), 'I15')).toEqual(['fail']);
    const unknownConsent = photo('p', { consent: { privateIndividuals: 'unknown', minors: 'none' } });
    expect(sev(runContentChecks(ctx(envs.deploy, [unknownConsent])), 'I16')).toEqual(['fail']);
    const noRights = photo('q', { rights: { status: 'unknown', fullReproductionAllowed: false } });
    expect(sev(runContentChecks(ctx(envs.deploy, [noRights])), 'I17')).toEqual(['fail']);
  });

  it('I21: ID- and phone-number-like text fails', () => {
    const e = entry('activities', 'a', { verification: 'supplied', title: { hi: 'संपर्क 9876543210' } });
    expect(sev(runContentChecks(ctx(envs.deploy, [e])), 'I21')).toEqual(['fail']);
  });

  it('I3/I23: launch readiness is a blocker in verification, a failure in deployment, a warning in preview', () => {
    expect(sev(runContentChecks(ctx(envs.verify, [])), 'I3').every((s) => s === 'blocker')).toBe(true);
    expect(sev(runContentChecks(ctx(envs.deploy, [])), 'I3').every((s) => s === 'fail')).toBe(true);
    expect(sev(runContentChecks(ctx(envs.preview, [])), 'I3').every((s) => s === 'warn')).toBe(true);
    expect(sev(runContentChecks(ctx(envs.verify, [])), 'I23').every((s) => s === 'blocker')).toBe(true);
    expect(sev(runContentChecks(ctx(envs.deploy, [])), 'I23').every((s) => s === 'fail')).toBe(true);
  });

  it('a clean, complete-looking dataset raises no content failures beyond launch readiness', () => {
    const e = photo('c', { reference: 'K7QM4X' });
    const registry = [{ reference: 'K7QM4X', collection: 'photos', item: 'c', retired: false }];
    const fails = runContentChecks(ctx(envs.verify, [e], { registry })).filter((i) => i.severity === 'fail');
    expect(fails).toEqual([]);
  });
});
