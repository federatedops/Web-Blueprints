---
title: About Us
description: Who maintains Web Blueprints and why it exists.
cta:
  title: Have a question about the blueprint?
  text: Open an issue on GitHub and we'll get back to you.
  button: Open an issue
  href: https://github.com/federatedops/Web-Blueprints/issues
rows:
  - heading: Built from a real site
    paragraphs:
      - Web Blueprints was extracted from a production company website that moved off WordPress onto a static site. The pieces here are the ones that kept paying off after launch.
      - Everything you see on this demo is the blueprint itself, published by the same workflows you get when you copy it.
    image: /media/uploads/2026/11/welcome.jpg
  - heading: Boring on purpose
    paragraphs:
      - No server, no database, no plugins to patch. The site is HTML files on GitHub Pages, rebuilt from Git on every change.
      - That makes it cheap to run, fast to load, and hard to break.
    image: /media/uploads/2026/11/image-pipeline.jpg
  - heading: Yours to change
    paragraphs:
      - Swap the colors in one block of CSS, the name in one settings file, and the menu in another. The rest is ordinary Astro you can grow in any direction.
    cta:
      label: How it works
      href: /how-it-works/
---

This page is a Markdown file, `src/content/pages/about.md`. The banner, the
orange call-to-action band and the three image sections above all come from
its frontmatter; this paragraph is its Markdown body.
