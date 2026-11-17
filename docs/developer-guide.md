# Developer guide

The conventions that keep this codebase easy to change. Content editors want
the [README](../README.md) instead; the deploy pipeline is in
[ci-cd.md](ci-cd.md).

## Stack

- [Astro](https://docs.astro.build/) 7, static output. No client-side
  framework; the few interactive bits (mobile menu, news search, copy link)
  are small `<script>` blocks in their components.
- Content collections with Zod schemas (`src/content.config.ts`).
- `astro:assets` / Sharp for images.
- Node 22.12+ locally, Node 24 in CI.

Start the dev server with `npm run dev` (or `npx astro dev --background`, then
`astro dev status | logs | stop`) and open `http://localhost:4321/<base>/`.
The bare root 404s, which is expected.

## Links: always go through the base path

The same build runs at `/Web-Blueprints/`, at
`/Web-Blueprints/pr-preview/pr-12/`, and at `/` on a custom domain
([ci-cd.md](ci-cd.md#one-build-any-base-path)). So:

- In `.astro`/`.ts` files, wrap every internal href and src in
  **`withBase('/path/')`** from `src/utils/base.ts`. It leaves full URLs,
  `mailto:`, `tel:` and `#anchors` alone.
- In Markdown, write plain root-relative links (`/about/`);
  `remark-base-links.mjs` prefixes them at build time.
- Never hard-code the repository name in a path.
- Data files (`src/data/nav.ts`) store unprefixed paths; the component that
  renders them applies `withBase`.
- To check a change against all three bases, build with
  `BASE_PATH=/x/pr-preview/pr-1 npm run build` and `BASE_PATH=/ npm run build`
  too.

## Images

Content stores images as path strings (`/media/uploads/2026/11/a.jpg`).
Astro can only optimize images it imports, so:

| File location | What happens |
| --- | --- |
| `src/assets/media/<path>` | Found by `resolveMedia()` (an eager `import.meta.glob`), resized to WebP copies, and cropped for share cards |
| `public/media/<path>` | Served as-is at the base path (Markdown body images can live here) |
| Any `.gif` | Passed through untouched: Sharp keeps only the first frame |

Helpers in `src/utils/images.ts`:

- `responsiveImage(path, widths)` → `{ src, srcset, width, height }`. It never
  upscales: widths beyond the original collapse to the original's width.
- `shareImage(path, focus)` → a 1.91:1 JPEG, 1200×630 when the source
  allows. `BaseLayout` uses it for `og:image`.
- `largestUrl(img)` → the biggest copy, for "view full size" links.

`MediaImage.astro` is the drop-in `<img>` for a path string, with the same
fallbacks. If an image "looks unoptimized", it's almost always a file that's
only in `public/`.

## Content schemas

`src/content.config.ts` defines `pages` and `news`. Adding a field:

1. Add it to the schema with a doc comment (editors read these). Prefer
   `.optional()` or `.default()` so existing files stay valid.
2. Use it in the template.
3. Add it to the README's field table.

Bad frontmatter fails `astro build` with the file and field named. That's the
safety net for browser-based editors, so keep schemas strict about types.

News URL slugs come from `slug:` or, by default, the file name minus its
`YYYY-MM-DD-` prefix (`postSlug()` in `src/utils/news.ts`). Category pages are
generated from whatever categories posts use; `categoryLabel()` title-cases
slugs, with an override map for exceptions such as `faq` → `FAQ`.

Search: `src/pages/news/search-index.json.ts` emits every published post's
searchable fields at build time; `NewsSearch.astro` fetches it on first
keystroke and filters client-side. That's fine into the low thousands of
posts. Beyond that, consider [Pagefind](https://pagefind.app/).

## Styling

**Design tokens** live in the `:root` block of `src/layouts/BaseLayout.astro`
(`--color-primary`, `--color-accent`, fonts, radius, shadows, max width,
section padding, button colors). Components use the tokens, never raw
colors, so a rebrand is an edit to that block.

**Global vs scoped:** shared building blocks (`.btn`, `.wrap`, `.section`,
`.card-grid`, `.chip`, `.prose`, `.heading-line`, `.sr-only`) are global, in
`BaseLayout.astro`. Everything else is scoped in its component's `<style>`.
Markup that's also generated in the browser (news cards in search results)
must have global styles, which is why `NewsCard.astro` uses `<style is:global>`.

**Overriding a scoped style from outside: change a custom property, not the
property.** Astro adds a hidden attribute selector to every rule in a
component's `<style>`, which makes them more specific than any plain global
class. A global `.tight { padding: 1rem }` loses to the component's own
`padding`. Instead, components read a variable
(`padding: var(--content-section-padding) 0`) and the global modifier sets
the variable (`.pad-sm { --content-section-padding: 1.5rem; }`). There's
only one `padding` declaration, fed a different value, so there's no
specificity contest. Button colors work the same way: `.btn` reads `--btn-*`,
and `.btn-primary` / `.btn-accent` only reassign them, so hover and focus
rules are written once.

**Per-page variations of a shared component: pass a class in.** Components
accept `class` and put it on their root or inner wrapper (`PageBanner`,
`FeatureRow`, `CtaBand`); the variant's styles live in that component, e.g.
`.page-banner-narrow` in `PageBanner.astro`. A parent's scoped `<style>`
can't reach elements a child component renders, so don't try to restyle a
child's internals from the page.

**Absolutely positioned images:** `position: absolute; inset: …` doesn't
stretch an `<img>` the way it stretches a `<div>`; replaced elements fall
back to their intrinsic size. Set `width`/`height` explicitly
(`calc(100% - …)`) alongside `inset`.

## Class names

A class name should say what the thing is and where it sits, without opening
the CSS.

- **Component or page first, then the part:** `news-card`, `news-card-media`,
  `feature-row-text`, `site-footer-legal`.
- **One prefix per component, spelled out:** `feature-row-…`, not `fr-…`.
  Shared site-wide pieces have no prefix: `btn`, `wrap`, `chip`, `section`.
- **Short is fine when everyone reads it the same way:** `btn`, `nav`, `cta`,
  `img`. Initials and cut-down words (`fr-`, `bignum`, `opanel`) are not.
- **Variations use `--`:** `feature-row--alt`, `feature-row-grid--reverse`.
- **States use `is-` / `has-`:** `is-active`, `is-open`, `has-children`.
- **IDs that appear in URLs stay short and plain:** `#mission`, `#team`.

## Page composition

Keep page files readable top to bottom, the way the page looks. Extract
repeated sections into components, but leave the *order* of sections
explicit in the page (see `src/pages/index.astro`) rather than driving it
from a config array. It's easier to rearrange and to review.

For editor-managed variation, expose it as frontmatter (like `rows:` and
`cta:` on Markdown pages) rather than asking editors to touch `.astro` files.

## Verifying a change

- `npm run build` must pass. It's what CI runs, and it validates content.
- Look at it: dev server or the PR preview, at desktop and phone widths
  (≈390px). Several real bugs on the original site only showed up visually.
- For performance questions, measure a production build
  (`npm run build && npm run preview`), not the dev server.
- The preview link on the pull request is the review surface; put it in
  front of whoever approves the change.

## Hiding the site until launch

`site.indexable` in `src/data/site.ts` controls `<meta name="robots"
content="noindex, nofollow">` sitewide; preview builds are always noindex.
Flip it at launch.
