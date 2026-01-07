Goal (incl. success criteria):
- Update `heroImage` for all Japanese posts to appropriate images from `src/assets/記事用`, ensuring schema compatibility and successful build.

Constraints/Assumptions:
- Images reside under `src/assets/記事用`.
- `heroImage` must satisfy `z.string().url()` in [src/content.config.ts](src/content.config.ts).
- Therefore, local root-relative paths (e.g. /images/...) are INVALID until schema is relaxed.

Key decisions:
- Map each JA post to a semantically appropriate image from `src/assets/記事用`.
- Serve images locally from `public/images/articles` and reference them with root-relative paths (e.g. `/images/articles/<filename>`).
- Update `heroImage` schema to accept either absolute URLs or root-relative paths so `heroImage` can be served from the site itself.

State:
- Current files temporarily reference `raw.githubusercontent.com` URLs (interim).
- Decision changed: target is now local serving from `public/images/articles` using root-relative paths.
- Migration plan created; steps tracked in TODO list.

Done:
- Created continuity ledger.
- Inventoried `src/assets/記事用` images.
- Temporarily updated JA posts to use `raw.githubusercontent.com` URLs to satisfy current schema and validated build.

Now:
- Preparing migration to local delivery: schema change, move/copy images to `public/images/articles`, update frontmatter to root-relative paths, then rebuild.

Next:
- Implement migration steps tracked in TODOs: update schema, move images, replace frontmatter, build & validate, finalize ledger.

Open questions (UNCONFIRMED if needed):
- Confirm you want me to perform the migration now (apply schema change, copy images to `public/`, update all JA posts, run build). If yes, I will proceed.
- Any images you want swapped or excluded from migration?

Working set (files/ids/commands):
- [src/content.config.ts](src/content.config.ts)
- [src/content/posts/ja](src/content/posts/ja)
- [src/assets/記事用](src/assets/%E8%A8%98%E4%BA%8B%E7%94%A8)
- Command: `npm run build`
