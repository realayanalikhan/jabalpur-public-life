# Demonstration data (decision 0028)

Everything under `demo/content/` is **fictional demonstration data** for the separate demo site
(`https://realayanalikhan.github.io/jabalpur-public-life-demo/`). It exists only so the design can be
reviewed live before real content exists.

## Rules

- Loaded **only** by demo builds (`pnpm build:demo`, `SITE_ENV=demo`). Local, preview and production
  builds never read this folder, and demo builds never read `src/content/` (except the glossary).
- Every entry has `demo: true`. Checks D1, D2 and SC2 fail any build or scan that mixes demo and
  real data, in either direction.
- The subject is a generic, explicitly fictional "उदाहरण व्यक्ति / Example Person (demonstration)" in
  a fictional "उदाहरण नगर / Example Town". Its roles, wards, events, organisations and sources are
  fictional and labelled as examples.
- Nothing here may name, imply or resemble the real subject of the site or any other real person,
  political party, ward or event. There is no portrait of anyone.
- Real images (see `ASSETS.md`) are openly licensed photographs and a painting of **real places**,
  with no identifiable private individuals. They are linked only to those places (Jabalpur,
  Bhedaghat, Madan Mahal), never to the fictional person, roles or events.
- `[DEV]` fixtures never appear here (SC2). Nothing here ever moves into `src/content/`.

## Adding demo data

Add files under `demo/content/<collection>/` with `demo: true` and fictional, clearly labelled
values. Archive items need a reference in `demo/content/registry/references.yaml` (generate one
with `pnpm ref:new`). Then run `pnpm build:demo` and `pnpm check:repo`.
