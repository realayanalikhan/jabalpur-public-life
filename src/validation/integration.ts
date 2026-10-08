/**
 * Astro integration: checks the content source files for fixture-marker contamination (SC1) before
 * anything is loaded or rendered, resets the integrity manifest before a build and runs the
 * output-level checks after it. A failing check fails `astro build` (scaffold plan §6, §13).
 */
import type { AstroIntegration } from 'astro';
import { mkdir, readFile, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { readBuildEnv } from '../lib/env.ts';
import { siteConfig } from '../../site.config.ts';
import { runPostBuildChecks } from './post-build.ts';
import { MANIFEST_DIR, MANIFEST_FILE, type IntegrityManifest } from './manifest.ts';
import { reportIssues } from './report.ts';
import { checkFixtureContamination, formatSourceIssues, readContentSources } from './source-content.ts';

export function integrity(): AstroIntegration {
  return {
    name: 'jpl-integrity',
    hooks: {
      // SC1 runs at configuration time for builds and the dev server: before the content layer loads
      // any entry and before any page renders, in every environment.
      'astro:config:setup': ({ command, config }) => {
        if (command !== 'build' && command !== 'dev') return;
        const issues = checkFixtureContamination(readContentSources(fileURLToPath(config.root)));
        if (issues.length) {
          throw new Error(`Integrity checks failed — source content:
${formatSourceIssues(issues)}`);
        }
      },
      'astro:build:start': async () => {
        await rm(MANIFEST_DIR, { recursive: true, force: true });
        await mkdir(MANIFEST_DIR, { recursive: true });
      },
      'astro:build:done': async ({ dir, logger }) => {
        const env = readBuildEnv();
        let manifest: IntegrityManifest;
        try {
          manifest = JSON.parse(await readFile(MANIFEST_FILE, 'utf8')) as IntegrityManifest;
        } catch {
          throw new Error('Integrity manifest missing: the content layer did not run its checks.');
        }
        const issues = await runPostBuildChecks(fileURLToPath(dir), env, siteConfig, manifest);
        reportIssues('post-build', issues, (m) => logger.warn(m));
        logger.info(`Integrity checks passed (${env.siteEnv}${env.verifyOnly ? ', verification' : ''}).`);
      },
    },
  };
}
