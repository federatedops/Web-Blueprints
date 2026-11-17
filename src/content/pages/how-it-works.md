---
title: How This Site Works
description: The path from a Markdown file to a live page, including the preview site every pull request gets.
---

This site is built from a GitHub repository. Nothing runs on a server: every
page is an HTML file, built ahead of time and hosted on GitHub Pages.

## From a change to the live site

1. **Edit** a Markdown file (or a component) on a branch.
2. **Open a pull request.** A GitHub Action builds the whole site and
   publishes it to its own address, `…/pr-preview/pr-<number>/`, then posts
   the link on the pull request. A yellow ribbon on every preview page says
   which pull request it shows.
3. **Review the preview.** Every push to the branch rebuilds it.
4. **Merge.** A second Action builds `main` and replaces the live site. The
   preview is deleted when the pull request closes.

| Event | Workflow | Result |
| --- | --- | --- |
| Pull request opened or updated | `preview.yml` | Preview built and linked on the PR |
| Pull request merged or closed | `preview.yml` | Preview deleted |
| Push to `main` | `deploy.yml` | Live site rebuilt |

## Where things live

| You want to change | Edit |
| --- | --- |
| The site name, tagline, default author | `src/data/site.ts` |
| The menu | `src/data/nav.ts` |
| Colors and fonts | the `:root` block in `src/layouts/BaseLayout.astro` |
| A page like this one | `src/content/pages/*.md` |
| A news post | `src/content/news/*.md` |
| An image | `src/assets/media/…` |

## Read more

The repository's [README](https://github.com/federatedops/Web-Blueprints#readme)
is the full guide, from copying the blueprint to launch day. The
[Resources](/resources/) page links to each part.
