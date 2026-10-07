/** Integrity manifest written during the build and read by the post-build checks. */
export const MANIFEST_DIR = '.integrity';
export const MANIFEST_FILE = `${MANIFEST_DIR}/manifest.json`;

export interface IntegrityManifest {
  /** Titles and references of entries that must not appear in production output (I10). */
  nonPublishedMarkers: string[];
  /** internalNotes text and internal source titles (I11). */
  internalStrings: string[];
  /** Site paths of hidden sections, e.g. "/hi/updates/" (I19). */
  hiddenSectionPaths: string[];
  /** Paths of "not available in this language" notice pages (I18). */
  noticePaths: string[];
  /** Glossary problems recorded while rendering (I14). */
  glossaryIssues: Array<{ key: string; lang: string; reason: string }>;
}
