---
title: Review changes on a preview site, not a diff
description: How the pull-request preview works, and how to use it when you review someone else's change.
pubDate: 2026-11-16
categories: [guides]
tags: [ci-cd, previews, github-actions]
featuredImage: /media/uploads/2026/11/preview-sites.jpg
socialFocus: top
---

Every pull request on this repository gets its own copy of the site. A
comment on the pull request links to it, and a yellow ribbon across the top
of every preview page names the pull request it shows.

## How to review with it

1. Open the pull request and find the comment from the preview bot.
2. Click through to the pages the change touches. Check them at phone width
   too (your browser's developer tools can do this).
3. Leave comments on the pull request as usual.

When the author pushes a fix, the preview rebuilds within a minute or two;
refresh the page.

## How it works

The `preview.yml` workflow builds the site with a different **base path**,
`/Web-Blueprints/pr-preview/pr-<number>`, so every link and image points
inside the preview's folder. It then commits the build to the `gh-pages`
branch under `pr-preview/`, alongside the live site. Closing the pull request
runs the same workflow, which deletes that folder.

The production deploy (`deploy.yml`) replaces everything on `gh-pages`
*except* `pr-preview/`, so open previews survive a release.

> Previews are public, like the live site. Don't put anything in a pull
> request you wouldn't publish.
