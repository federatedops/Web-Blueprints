# Working in this repository

An Astro static site published to GitHub Pages, with a preview site per pull
request. Human docs: `README.md` (editors), `docs/developer-guide.md` and
`docs/ci-cd.md` (developers). Read the developer guide before structural changes.

## Development

Start the dev server in background mode:

```
npx astro dev --background
```

Manage it with `astro dev stop`, `astro dev status`, and `astro dev logs`.

The site is served under its base path: open
`http://localhost:4321/Web-Blueprints/`. The bare root 404s; that's expected.

`npm run build` is the correctness check CI runs; it also validates every
content file against `src/content.config.ts`.

## Rules that are easy to break

- **Links:** wrap every internal href/src in `.astro`/`.ts` files with
  `withBase()` from `src/utils/base.ts`. Never hard-code the repository name
  or base path. Markdown content uses plain `/path/` links (a remark plugin
  adds the base). The same build must work at `/<repo>/`,
  `/<repo>/pr-preview/pr-N/`, and `/`.
- **Images** referenced from content go under `src/assets/media/` (optimized);
  `public/` files are served unoptimized. Keep the GIF pass-through.
- **Colors and fonts** come from the `:root` tokens in
  `src/layouts/BaseLayout.astro`. No raw colors in components.
- **Overriding a component's scoped style globally:** set a custom property
  the component reads (the `.pad-sm` / `--btn-*` pattern), don't fight
  specificity. For per-page variants, pass `class` into the component and
  style the variant inside that component.
- **Class names:** component prefix spelled out, `--` for variations, `is-`/
  `has-` for states (see the developer guide).
- **Page files** stay readable top to bottom; don't drive section order
  from config arrays.
- Don't edit the `gh-pages` branch or `dist/`; they're build output.
- Verify visual changes in a browser at desktop and ~390px wide, not just by
  reading the code.

## Documentation

Full documentation: https://docs.astro.build

- [Routing](https://docs.astro.build/en/guides/routing/)
- [Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Content collections](https://docs.astro.build/en/guides/content-collections/)
- [Images](https://docs.astro.build/en/guides/images/)
- [Styling](https://docs.astro.build/en/guides/styling/)
