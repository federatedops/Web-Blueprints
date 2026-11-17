---
title: Writing a news post
description: Copy a post, change the frontmatter, write the story in Markdown, open a pull request.
pubDate: 2026-11-10
author: Docs Team
categories: [guides]
tags: [content, markdown]
---

A news post is a Markdown file in `src/content/news/`. Name it with the date
and a few words of the title: `2026-11-10-writing-a-news-post.md`. The date
prefix keeps the folder in order; the address is the rest,
`/news/writing-a-news-post/`.

## The frontmatter

```yaml
---
title: Writing a news post
description: One or two sentences for the card and search results.
pubDate: 2026-11-10
categories: [guides]
tags: [content, markdown]
featuredImage: /media/uploads/2026/11/my-photo.jpg
---
```

Only `title`, `description` and `pubDate` are required. This post has no
`featuredImage`, so it shows the site's default image. It sets
`author: Docs Team`; leave `author` out to use the site's default byline.

## The story

Plain Markdown: `## Headings`, **bold**, lists, [links](/news/) and images.
Links to other pages on the site start with `/` and work on the live site
and in previews alike.

Set `draft: true` to keep a finished post off the site until it's ready.
