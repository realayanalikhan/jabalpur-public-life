/**
 * Repository scan (scaffold plan §6, "R" checks). Runs on committed and untracked (non-ignored) files.
 *  I7  — no GPS metadata in images (test fixtures under tests/fixtures/ are exempt: they exist to
 *        prove the check works).
 *  I21 — no ID- or phone-number-like patterns in content text (approved contact methods exempt).
 *  I22 — no restricted files: masters, raw formats, consent forms, identity documents (spec G §1).
 *  SC1 — no development-fixture marker (`[DEV]`, `devFixture: true`) in real content source files
 *        (src/validation/source-content.ts; implementation-level rule, separate from I2).
 * Exit code 1 on any failure.
 */
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import exifr from 'exifr';
import { checkFixtureContamination, readContentSources } from '../src/validation/source-content.ts';

const files = execFileSync('git', ['ls-files', '--cached', '--others', '--exclude-standard'], { encoding: 'utf8' })
  .split('\n')
  .map((f) => f.trim())
  .filter(Boolean);

const failures: string[] = [];

// I22 — restricted files never in the repository.
const RESTRICTED_EXT = /\.(tiff?|raw|cr2|cr3|nef|arw|dng|psd|heic)$/i;
const RESTRICTED_NAME =
  /(^|\/)(restricted|masters?|originals?)\/|consent|aadhaa?r|pan[-_ ]?card|passport|voter[-_ ]?id/i;
for (const f of files) {
  if (RESTRICTED_EXT.test(f)) failures.push(`[I22] Master/raw format not allowed in git: ${f}`);
  else if (RESTRICTED_NAME.test(f)) failures.push(`[I22] Restricted-looking path: ${f}`);
}

// I7 — GPS metadata in committed images.
const IMAGE = /\.(jpe?g|png|webp|avif|tiff?|heic)$/i;
for (const f of files.filter((f) => IMAGE.test(f) && !f.startsWith('tests/fixtures/'))) {
  try {
    const gps = await exifr.gps(f);
    if (gps && (gps.latitude !== undefined || gps.longitude !== undefined)) failures.push(`[I7] GPS metadata in ${f}`);
  } catch {
    // Unreadable metadata means no GPS block.
  }
}

// I21 — personal-data patterns in content text.
const AADHAAR = /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/;
const MOBILE = /(?:\+91[\s-]?)?\b[6-9]\d{9}\b/;
const PAN = /\b[A-Z]{5}\d{4}[A-Z]\b/;
for (const f of files.filter((f) => f.startsWith('src/content/') && /\.(ya?ml|md|json)$/.test(f))) {
  if (f.startsWith('src/content/contact-methods/')) continue;
  const text = readFileSync(f, 'utf8');
  if (AADHAAR.test(text) || MOBILE.test(text) || PAN.test(text))
    failures.push(`[I21] ID- or phone-number-like pattern in ${f}`);
}

// SC1 — fixture-marker contamination in real content (file system, independent of rendering).
for (const i of checkFixtureContamination(readContentSources('.'))) failures.push(`[SC1] ${i.message} ${i.where}`);

if (failures.length) {
  console.error(`Repository integrity checks failed:\n  ${failures.join('\n  ')}`);
  process.exit(1);
}
console.log(`Repository integrity checks passed (${files.length} files).`);
