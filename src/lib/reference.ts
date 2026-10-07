/**
 * Public reference identifiers ([0023]): short, opaque, non-sequential; never encode dates,
 * claims, categories or ordering; never reused.
 */
import { randomInt } from 'node:crypto';

export interface ReferenceFormat {
  alphabet: string;
  length: number;
}

/** Valid if it uses only the configured alphabet and length, and does not look like a number or date. */
export function isValidReference(ref: string, fmt: ReferenceFormat): boolean {
  if (ref.length !== fmt.length) return false;
  if (![...ref].every((c) => fmt.alphabet.includes(c))) return false;
  const letters = [...ref].filter((c) => /[A-Z]/.test(c)).length;
  // At least two letters: excludes number-like codes that could be read as dates or sequence numbers.
  return letters >= 2;
}

export function generateReference(fmt: ReferenceFormat, taken: ReadonlySet<string>, rand = randomInt): string {
  for (let attempt = 0; attempt < 10_000; attempt++) {
    let ref = '';
    for (let i = 0; i < fmt.length; i++) ref += fmt.alphabet[rand(fmt.alphabet.length)];
    if (isValidReference(ref, fmt) && !taken.has(ref)) return ref;
  }
  throw new Error('Could not generate an unused reference identifier.');
}
