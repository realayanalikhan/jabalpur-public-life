/**
 * Print a new, unused public reference identifier ([0023]). It does not modify files: add the code
 * to the item (`reference:`) and to src/content/registry/references.yaml in the same pull request.
 */
import { readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { siteConfig } from '../site.config.ts';
import { generateReference } from '../src/lib/reference.ts';

const taken = new Set<string>();
const keyPattern = new RegExp(`^([${siteConfig.reference.alphabet}]{${siteConfig.reference.length}}):`, 'gm');
for (const file of ['src/content/registry/references.yaml', 'src/content/_dev/registry/references.yaml']) {
  if (!existsSync(file)) continue;
  for (const m of readFileSync(file, 'utf8').matchAll(keyPattern)) if (m[1]) taken.add(m[1]);
}
const files = execFileSync('git', ['ls-files', '--cached', '--others', '--exclude-standard', 'src/content'], {
  encoding: 'utf8',
})
  .split('\n')
  .filter((f) => f.endsWith('.yaml'));
for (const f of files) {
  for (const m of readFileSync(f, 'utf8').matchAll(/^reference:\s*["']?([A-Z0-9]+)/gm)) if (m[1]) taken.add(m[1]);
}
console.log(generateReference(siteConfig.reference, taken));
