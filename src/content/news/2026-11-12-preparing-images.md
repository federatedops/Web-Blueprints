---
title: Preparing a featured image
description: One 1920×1280 photo is all a post needs. Keep faces and text inside the safe area and the build does the rest.
pubDate: 2026-11-12
categories: [guides]
tags: [images, social]
featuredImage: /media/uploads/2026/11/safe-area-guide.jpg
---

Every news post can have one featured image. Export it at **1920 × 1280**
(3:2), JPEG at about 85% quality, in sRGB. The build makes every other size
from that one file: the article image, the news cards, and the 1200 × 630
crop that Facebook, LinkedIn and X show when someone shares the post.

## Keep the important parts in the safe area

Share previews crop the top and bottom of the photo. Anything inside the box
from **115 to 1805 px across** and **160 to 1120 px down** shows everywhere:
this post's own image marks it out.

If a photo's subject sits near the top, add `socialFocus: top` to the post's
frontmatter and the share crop keeps the top instead of the middle. For a
designed graphic instead of a crop, set `socialImage:` to a separate
1200 × 630 file.

## Where the file goes

Save it under `src/assets/media/uploads/YYYY/MM/` and refer to it as
`/media/uploads/YYYY/MM/file-name.jpg`. Letters, numbers and dashes only in
file names.

The full guide, including a Photoshop template setup, is the
[Images section of the README](https://github.com/federatedops/Web-Blueprints#images).
