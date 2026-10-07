/** Prints integrity issues and fails the build when any check fails (scaffold plan §6). */
import type { Issue } from './types.ts';

export function reportIssues(stage: string, issues: Issue[], log: (msg: string) => void = console.warn): void {
  const fails = issues.filter((i) => i.severity === 'fail');
  const blockers = issues.filter((i) => i.severity === 'blocker');
  const warns = issues.filter((i) => i.severity === 'warn');
  const line = (i: Issue) => `  [${i.check}] ${i.message}${i.where ? ` (${i.where})` : ''}`;
  if (warns.length) log(`\nIntegrity warnings — ${stage}:\n${unique(warns.map(line)).join('\n')}`);
  if (blockers.length)
    log(`\nLaunch blockers (not failing until launch.ready) — ${stage}:\n${unique(blockers.map(line)).join('\n')}`);
  if (fails.length) {
    throw new Error(`Integrity checks failed — ${stage}:\n${unique(fails.map(line)).join('\n')}`);
  }
}

const unique = (lines: string[]) => [...new Set(lines)];
