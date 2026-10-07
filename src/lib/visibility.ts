/**
 * Section visibility ([0003] point 4; spec B §4.1; [0021] point 8). A section exists only when it has
 * enough published items; each item counts once, whatever its language.
 */
import type { Dataset, Entry } from '../validation/types.ts';
import type { SiteConfig } from '../../site.config.ts';

export type SectionKey =
  | 'publicLife'
  | 'timeline'
  | 'roles'
  | 'work'
  | 'archive'
  | 'photographs'
  | 'documents'
  | 'press'
  | 'video'
  | 'updates'
  | 'events'
  | 'announcements'
  | 'connect'
  | 'pressKit';

/** URL path (after `/{lang}/`) of each section, for routing and the I19 check. */
export const SECTION_PATHS: Record<SectionKey, string> = {
  publicLife: 'public-life/',
  timeline: 'public-life/timeline/',
  roles: 'public-life/roles/',
  work: 'public-life/work/',
  archive: 'archive/',
  photographs: 'archive/photographs/',
  documents: 'archive/documents/',
  press: 'archive/press/',
  video: 'archive/video/',
  updates: 'updates/',
  events: 'updates/events/',
  announcements: 'updates/announcements/',
  connect: 'connect/',
  pressKit: 'press-kit/',
};

const list = (d: Dataset, c: string): Entry[] => d[c] ?? [];
const has = (v: unknown): boolean => v !== undefined && v !== null;

export function computeVisibility(built: Dataset, config: SiteConfig): Record<SectionKey, boolean> {
  const t = config.visibility;
  const count = (c: string, pred: (e: Entry) => boolean = () => true) => list(built, c).filter(pred).length;

  const roles = count('roles') >= t.roles;
  const work = count('initiatives') >= t.work;
  const dated =
    count('roles', (e) => has(e.data['period'])) +
    count('initiatives', (e) => has(e.data['period'])) +
    count('activities') +
    count('coverage', (e) => has(e.data['date'])) +
    count('occasions', (e) => e.data['onTimeline'] === true) +
    count('timeline-events');
  const timeline = dated >= t.timeline;
  const photographs = count('photos') >= t.photographs;
  const documents = count('documents') >= t.documents;
  const press = count('coverage') >= t.press;
  const video = count('videos') >= t.video;
  const updates = count('activities') >= t.updates;
  const events = updates && count('activities', (e) => e.data['type'] === 'event') >= t.events;
  const announcements = updates && count('activities', (e) => e.data['type'] === 'announcement') >= t.announcements;
  const connect =
    count('contact-methods', (e) => e.data['public'] === true) +
      count('social-links', (e) => e.data['public'] === true) >=
    1;
  const person = list(built, 'person')[0];
  const bio = person?.data['shortBio'] as { hi?: string; en?: string } | undefined;
  const pressKit = Boolean(bio?.hi && bio?.en) && count('photos', (e) => e.data['pressApproved'] === true) >= 1;

  return {
    publicLife: roles || work || timeline,
    timeline,
    roles,
    work,
    archive: photographs || documents || press || video,
    photographs,
    documents,
    press,
    video,
    updates,
    events,
    announcements,
    connect,
    pressKit,
  };
}
