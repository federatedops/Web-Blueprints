# CI/CD and preview sites

How the two workflows in `.github/workflows/` publish the production site and
one preview site per pull request to GitHub Pages, and why it's built this way.
For the click-by-click setup see the [README](../README.md#start-a-new-site-from-this-blueprint).

## The moving parts

```
                     ┌──────────────────────── gh-pages branch ────────────────────────┐
push to main ──────► │  index.html, news/, _astro/, 404.html …     ← deploy.yml        │
                     │  .nojekyll                                                      │
PR #12 opened/push ► │  pr-preview/pr-12/  (a full site built for that subpath)        │ ◄── preview.yml
PR #12 closed ─────► │  pr-preview/pr-12/  removed                                     │
                     └─────────────────────────────────────────────────────────────────┘
                                         │
                       GitHub Pages: "Deploy from a branch", gh-pages, / (root)
                                         ▼
          https://<owner>.github.io/<repo>/                  production
          https://<owner>.github.io/<repo>/pr-preview/pr-12/ preview
```

- **`deploy.yml`**: on every push to `main` (and on demand via
  *Run workflow*): `npm ci`, `npm run build`, `touch dist/.nojekyll`, then
  [`JamesIves/github-pages-deploy-action`](https://github.com/JamesIves/github-pages-deploy-action)
  commits `dist/` to the root of `gh-pages`.
- **`preview.yml`**: on `pull_request` `opened`, `reopened`, `synchronize` and
  `closed`: builds with a preview base path and hands `dist/` to
  [`rossjrw/pr-preview-action`](https://github.com/rossjrw/pr-preview-action),
  which commits it to `gh-pages/pr-preview/pr-<number>/` and posts or
  updates a sticky comment with the URL. On `closed` it skips the build and
  deletes that directory instead.

## Why "Deploy from a branch" and not the "GitHub Actions" Pages source

GitHub's newer Pages source (`actions/deploy-pages`) publishes a single
artifact per deployment: whatever you upload *replaces* the whole site. There's
no way to keep `/pr-preview/pr-12/` alive alongside production. Publishing to
a branch lets production and any number of previews coexist as directories,
each updated independently. The cost is a `gh-pages` branch that grows with
every deploy (see [Housekeeping](#housekeeping)).

## One build, any base path

Every internal URL the site emits is built against Astro's `base`:

| Build | `BASE_PATH` | Site served at |
| --- | --- | --- |
| Local `npm run dev` | default in `astro.config.mjs` (`/Web-Blueprints`) | `http://localhost:4321/Web-Blueprints/` |
| Production (`deploy.yml`) | `/${{ repo name }}` | `https://<owner>.github.io/<repo>/` |
| Preview (`preview.yml`) | `/${{ repo name }}/pr-preview/pr-<n>` | `…/<repo>/pr-preview/pr-<n>/` |
| Custom domain | repository variable `BASE_PATH=/` | `https://www.example.com/` |

The workflows compute the values from the repository's own name and owner,
so a copy of the blueprint deploys correctly without editing the YAML.
`astro.config.mjs` normalizes the joins (`/` + `/pr-preview/pr-3` →
`/pr-preview/pr-3`).

Three things make every URL follow the base:

1. **`withBase()`** (`src/utils/base.ts`) for hrefs/srcs written in components
   and pages.
2. **`remark-base-links.mjs`** for root-relative links and images written in
   Markdown content.
3. **Astro itself** for its own assets (`/_astro/…`), images from
   `astro:assets`, redirects and pagination.

The `PUBLIC_PR_NUMBER` and `PUBLIC_REPO_URL` variables set by `preview.yml`
turn on the yellow preview ribbon and force `noindex` (see
`src/layouts/BaseLayout.astro`).

## Details that matter

**`clean-exclude: pr-preview/`** in `deploy.yml`: the deploy action normally
deletes everything on the branch that isn't in `dist/`. Without this, every
production deploy would wipe all open previews.

**`force: false`** in `deploy.yml`: a preview and a production deploy can
push to `gh-pages` at the same moment. With `force: false` the deploy action
rebases onto the branch's latest state (retrying a few times) instead of
force-pushing over the other job's commit.

**`touch dist/.nojekyll`**: without it, Pages runs Jekyll over the files,
and Jekyll drops directories starting with `_`, including Astro's `_astro/`.

**Concurrency:** production deploys share one group with
`cancel-in-progress: false`, so a deploy is never killed halfway. Previews
are grouped per PR with `cancel-in-progress: true`, so a new push supersedes
an in-flight build of the old commit.

**`action:` is explicit** (`closed` → `remove`, anything else → `deploy`).
The action's `auto` mode ignores `reopened`, which would leave a reopened PR
without a preview.

**Forks:** a `pull_request` run from a fork gets a read-only token and can't
push to `gh-pages` or comment. The `preview` job is skipped for forks and the
`build-check` job runs instead, with `contents: read`, so outside
contributions still get a pass/fail build. (Don't switch this to
`pull_request_target` to give forks previews: that runs untrusted code with a
write token.)

**Permissions:** the workflows request `contents: write` (push to
`gh-pages`) and, for previews, `pull-requests: write` (the comment). If your
organization's policy caps workflow tokens at read-only, the jobs fail with a
403; see the README's troubleshooting section.

**404s:** GitHub Pages serves the site's root `404.html` for any missing URL,
including missing URLs inside a preview. The 404 page links back with the
production base.

## Custom domain

Set three repository variables (Settings → Secrets and variables → Actions →
Variables). The workflows read them with fallbacks, so nothing in the YAML
changes:

| Variable | Example | Used by |
| --- | --- | --- |
| `SITE_URL` | `https://www.example.com` | Both builds (canonical and og: URLs) |
| `BASE_PATH` | `/` | Both builds |
| `PREVIEW_BASE_URL` | `www.example.com` | `pr-preview-action`'s `pages-base-url`, for the comment's link |

Add `public/CNAME` with the domain so each deploy keeps it (the deploy action
replaces the branch's files with `dist/`, and `public/` is copied into
`dist/`).

## Previews are public

Pages sites are public on every plan except GitHub Enterprise Cloud with
private Pages. The previews are noindexed, and their URLs are only posted on
the pull request, but anyone who has a URL can open it. Keep embargoed
content out of pull requests, or put an access-controlled host in front of
it.

## Housekeeping

- **Stale previews:** if a run was cancelled when a PR closed, its directory
  can linger. Delete it on the `gh-pages` branch (or re-open and close the PR).
- **Branch size:** each deploy is a commit with the full site. For a site
  with many large images, consider occasionally squashing `gh-pages` history
  (the branch is regenerated output; nothing on it is hand-edited).
- **Action versions:** the workflows pin major versions (`@v7`, `@v4`, `@v1`).
  Dependabot can keep them current:

  ```yaml
  # .github/dependabot.yml
  version: 2
  updates:
    - package-ecosystem: github-actions
      directory: /
      schedule: { interval: monthly }
  ```

## Adding checks

Anything that should block a merge can go in a job alongside `preview` in
`preview.yml`, or in its own workflow on `pull_request`: `astro check` for
type errors, a link checker over `dist/`, Lighthouse CI against the preview
URL (`steps.<id>.outputs.preview-url` from `pr-preview-action`). Then mark
the job as required under Settings → Branches → branch protection for `main`.
