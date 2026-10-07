import { describe, expect, it } from 'vitest';
import { buildableStatuses, fixturesAllowed, isReservedHost, readBuildEnv } from '../../src/lib/env.ts';

describe('build environment', () => {
  it('defaults to production rules when SITE_ENV is unset', () => {
    const env = readBuildEnv({});
    expect(env.siteEnv).toBe('production');
    expect(env.defaulted).toBe(true);
    expect(env.deployment).toBe(true);
    expect(env.siteUrlMissing).toBe(true);
    expect(env.siteUrlReserved).toBe(true);
  });

  it('treats SITE_VERIFY_ONLY as a production verification build, not a deployment', () => {
    const env = readBuildEnv({ SITE_ENV: 'production', SITE_VERIFY_ONLY: '1' });
    expect(env).toMatchObject({
      siteEnv: 'production',
      verifyOnly: true,
      deployment: false,
      siteUrl: 'https://example.invalid',
    });
  });

  it('rejects SITE_VERIFY_ONLY outside production and unknown environments', () => {
    expect(() => readBuildEnv({ SITE_ENV: 'preview', SITE_VERIFY_ONLY: '1' })).toThrow();
    expect(() => readBuildEnv({ SITE_ENV: 'staging' })).toThrow();
  });

  it('uses placeholders for local and preview, never an invented domain', () => {
    expect(readBuildEnv({ SITE_ENV: 'local' }).siteUrl).toBe('http://localhost:4321');
    expect(readBuildEnv({ SITE_ENV: 'preview' }).siteUrl).toBe('https://preview.invalid');
  });

  it('accepts a supplied production domain', () => {
    const env = readBuildEnv({ SITE_ENV: 'production', SITE_URL: 'https://real-domain.in/' });
    expect(env.siteUrl).toBe('https://real-domain.in');
    expect(env.siteUrlReserved).toBe(false);
    expect(env.siteUrlMissing).toBe(false);
  });

  it('recognises reserved hosts', () => {
    for (const u of [
      'https://x.invalid',
      'http://localhost:4321',
      'https://example.com',
      'https://a.test',
      'not a url',
    ]) {
      expect(isReservedHost(u)).toBe(true);
    }
    expect(isReservedHost('https://real-domain.in')).toBe(false);
  });

  it('limits statuses and fixtures per environment', () => {
    expect([...buildableStatuses({ siteEnv: 'production' })]).toEqual(['published']);
    expect([...buildableStatuses({ siteEnv: 'preview' })].sort()).toEqual(['published', 'review']);
    expect(fixturesAllowed({ siteEnv: 'local' })).toBe(true);
    expect(fixturesAllowed({ siteEnv: 'preview' })).toBe(false);
    expect(fixturesAllowed({ siteEnv: 'production' })).toBe(false);
  });
});
