# Web Blueprints

A ready-to-copy starting point for company websites that are **fast, cheap to
run, and safe to change**. Pages are simple text files, the site is published
for free on GitHub Pages, and **every proposed change gets its own live preview
site** before it goes public.

**Live demo:** <https://federatedops.github.io/Web-Blueprints/>.
The demo *is* this repository, published by the same automation you get when
you copy it.

These building blocks come from a real company website rebuild that moved off
WordPress. This repository keeps the parts that kept paying off and strips out
everything specific to that company.

---

## Contents

- [What you get](#what-you-get)
- [How it works](#how-it-works)
- [Start a new site from this blueprint](#start-a-new-site-from-this-blueprint)
- [Making changes](#making-changes)
- [Adding and editing content](#adding-and-editing-content)
  - [News posts](#news-posts) · [Pages](#pages) · [Images](#images) · [The menu](#the-menu) · [Name, colors and fonts](#name-colors-and-fonts) · [Moving a page](#moving-or-renaming-a-page)
- [Reviewing a change with its preview site](#reviewing-a-change-with-its-preview-site)
- [Going live](#going-live)
- [Troubleshooting](#troubleshooting)
- [What's in the repository](#whats-in-the-repository)
- [For developers](#for-developers)

---

## What you get

| Feature | What it means for you |
| --- | --- |
| **Automatic publishing** | Approve a change and the live site updates itself within about two minutes. No server to log into, no upload step. |
| **A preview site for every change** | Every proposed change (a *pull request*) is built into its own temporary copy of the website with its own address. Reviewers click through real pages, on a phone too, before anything goes live. A yellow banner on every preview page says which change it shows. The preview is deleted when the change is approved or abandoned. |
| **Content as simple text files** | Pages and news posts are [Markdown](https://www.markdownguide.org/basic-syntax/) files: plain text with a few labeled fields at the top (title, date, image). They can be edited in the browser on GitHub. |
| **Mistakes caught before they go live** | If a post is missing its title, or a date is mistyped, the build stops and names the file and field. The broken change never reaches the live site. |
| **Images sized for you** | Upload one large photo. The site makes every smaller size it needs in a modern, lightweight format, plus the 1200 × 630 picture Facebook, LinkedIn and X show when someone shares a link. |
| **News section** | Newest-first listing, categories (each with its own page), page numbers, share buttons, related posts, and a search box that searches the whole archive. All of it runs without a server or a search service. |
| **Hidden from Google until launch** | Search engines are told to skip the site until you flip one setting. Preview sites are always hidden. |
| **Free hosting** | GitHub Pages hosts public sites at no cost. There is no database or plugin to patch, and nothing to hack. |
| **Works with phones** | Every layout adapts down to phone width, with a tap-to-open menu. |

## How it works

```
  You edit a file          GitHub builds a            Someone reviews        Approved: the live
  on a new branch   ───►   preview site for it   ───► the preview      ───►  site updates and the
  and open a PR            and links it on the PR      and approves           preview is deleted
```

Behind the scenes there are two automated jobs (GitHub Actions), already set
up in the `.github/workflows/` folder:

| When this happens… | …this job runs | …and this is the result |
| --- | --- | --- |
| A pull request is opened, or new changes are pushed to it | **Deploy PR preview** (`preview.yml`) | The site is built and published at `…/pr-preview/pr-<number>/`. A bot comments the link on the pull request. |
| The pull request is merged or closed | **Deploy PR preview** (`preview.yml`) | That preview is deleted. |
| Anything lands on the `main` branch | **Deploy to GitHub Pages** (`deploy.yml`) | The live site is rebuilt and replaced. Open previews are left alone. |

Both jobs publish to a branch called `gh-pages`, which GitHub Pages serves as
the website. You never need to edit that branch yourself.

---

## Start a new site from this blueprint

Plan for about 15 minutes. You'll need a GitHub account with permission to
create repositories in your organization. Everything below happens in the
browser.

### 1. Make your copy

1. At the top of [this repository's page](https://github.com/federatedops/Web-Blueprints),
   click **Use this template** → **Create a new repository**.
2. Choose the **owner** (your organization) and a **repository name**. The name
   becomes part of the site's address: a repository named `acme-site` owned by
   `acme` is published at `https://acme.github.io/acme-site/`.
3. Choose **Public**. Free GitHub Pages hosting needs a public repository; a
   private repository needs a paid GitHub plan, and **the published website is
   public either way**.
4. Click **Create repository**.

### 2. Name your site

1. In your new repository, open `src/data/site.ts` and click the **pencil**
   icon (Edit).
2. Change `name`, `tagline`, `description` and `defaultAuthor` to your own. The
   comments in the file explain each setting.
3. Click **Commit changes…**, keep **Commit directly to the `main` branch**, and
   confirm.

You can change everything else (menu, colors, the demo content) later.

### 3. Publish it the first time

1. Open the **Actions** tab. If GitHub asks, click **I understand my
   workflows, go ahead and enable them**.
2. In the left list click **Deploy to GitHub Pages**, then **Run workflow** →
   **Run workflow**. (Your commit in step 2 may already have started it; that's
   fine.)
3. Wait for the green check mark (about a minute). This creates the `gh-pages`
   branch that holds the built website.

If the run fails with a permissions error, see
[Troubleshooting](#the-deploy-fails-with-permission-denied-or-403).

### 4. Turn on GitHub Pages

1. Go to **Settings** → **Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Set **Branch** to **`gh-pages`** and the folder to **`/ (root)`**, then
   **Save**.
4. After a minute or two, the page shows **"Your site is live at …"**. Open that
   link. You should see the demo site with your name in the header.

> Don't choose "GitHub Actions" as the source. That option can publish only one
> version of the site at a time, so preview sites wouldn't work.

### 5. Try a preview

1. Open any file, for example `src/content/pages/about.md`, and click the
   **pencil** icon.
2. Change a sentence.
3. Click **Commit changes…**, choose **Create a new branch for this commit and
   start a pull request**, and confirm. On the next screen click **Create pull
   request**.
4. Within a couple of minutes a comment appears on the pull request with a
   link to the preview. Open it: you'll see your change, with a yellow
   "Preview of pull request #1" banner at the top.
5. Click **Merge pull request** to publish the change, or **Close pull
   request** to throw it away. Either way the preview is cleaned up.

That's the whole system working. From here on it's content.

---

## Making changes

### The everyday routine (in the browser)

1. Find the file on GitHub (see [What's in the repository](#whats-in-the-repository)).
2. Click the **pencil** to edit it, or **Add file** → **Create new file** /
   **Upload files** in a folder.
3. **Commit changes…** → **Create a new branch… and start a pull request**.
4. Wait for the preview link, check it, ask a colleague to review.
5. **Merge**. The live site updates in about two minutes.

Tip: press the <kbd>.</kbd> key on any repository page to open a full editor in
the browser (github.dev), handy for changing several files in one pull request.

### Working on your own computer (optional)

Useful for design work or bigger changes, because you see every edit instantly.
You'll need [Node.js](https://nodejs.org/) 22.12 or newer and
[Git](https://git-scm.com/).

```sh
git clone https://github.com/<owner>/<repo>.git
cd <repo>
npm install          # once, downloads the tools
npm run dev          # starts a local copy of the site
```

Then open **<http://localhost:4321/Web-Blueprints/>**. The part after the port
is the repository name. **The bare `localhost:4321` shows a 404**, which is
expected. In your copy, change `DEFAULT_BASE_PATH` (and
`DEFAULT_SITE_URL`) in `astro.config.mjs` to your own repository name and
owner so the local address matches the live one.

| Command | What it does |
| --- | --- |
| `npm run dev` | Local site that refreshes as you save files |
| `npm run build` | Builds the finished site into `dist/`, the same check the automation runs |
| `npm run preview` | Serves the built `dist/` folder locally |

---

## Adding and editing content

### News posts

Each post is one file in **`src/content/news/`**. The easiest start is to copy
an existing post.

**File name:** the date, then a few words of the title, with dashes and no
spaces: `2026-11-17-new-warehouse-opens.md`. The date keeps the folder in
order; the web address is the rest: `/news/new-warehouse-opens/`.

**The top of the file** (the "frontmatter", between the two `---` lines) holds
the post's details:

```yaml
---
title: New warehouse opens in Richmond
description: One or two sentences. Shown on the news cards, in search results, and in link previews.
pubDate: 2026-11-17
categories: [announcements]
tags: [warehouse, richmond]
featuredImage: /media/uploads/2026/11/richmond-warehouse.jpg
featuredImageAlt: The new warehouse's loading docks at sunrise
---

The story starts here, written in Markdown.

## A subheading

Paragraphs, **bold**, lists, [links to other pages](/about/) and images all work.
```

| Field | Required? | What it does |
| --- | --- | --- |
| `title` | Yes | The headline. |
| `description` | Yes | Short summary for cards, search and share previews. |
| `pubDate` | Yes | Publish date, `YYYY-MM-DD`. Posts are listed newest first. |
| `categories` | No | One or more category names in lowercase with dashes, e.g. `[announcements, product-news]`. Each category automatically gets its own page at `/news/category/<name>/` and a filter chip. A new category needs no setup. |
| `tags` | No | Extra search words, shown as chips under the post. |
| `featuredImage` | No | The post's main photo (see [Images](#images)). Without one, the site's default image is used. |
| `featuredImageAlt` | No | A short description of the photo for screen readers. |
| `author` | No | Byline. Defaults to `defaultAuthor` in `src/data/site.ts`. |
| `updatedDate` | No | Shows "Updated …" beside the date. |
| `draft` | No | `true` keeps the post off the site entirely until you remove it. |
| `cta` | No | An orange call-to-action band under the headline (below). |
| `socialImage`, `socialFocus` | No | Control the link-preview picture (see [Images](#images)). |
| `slug` | No | Overrides the web address, e.g. `slug: richmond` gives `/news/richmond/`. |

A call-to-action band, for posts with a clear next step (register, sign up…):

```yaml
cta:
  title: Register for the open house
  text: One line under the title (optional)
  button: Register now          # optional, defaults to "Learn More"
  href: https://example.com/register   # a full address opens in a new tab; /contact/ stays on the site
```

**Links inside the text:** to link to another page on your own site, start the
address with `/` (for example `[our team](/about/)`). Don't include the
repository name. The site adds it, so the same link works on the live site and
in every preview.

### Pages

Each file in **`src/content/pages/`** becomes a page at its file name:
`about.md` → `/about/`, `careers.md` → `/careers/`. The page gets the site's
header, footer and a title banner automatically.

```yaml
---
title: About Us
description: Shown in search results and link previews.
---

Markdown text for the page.
```

Pages can also have an optional `cta:` band (same as posts) and **image + text
sections** (`rows:`), which alternate left and right down the page. See
`src/content/pages/about.md` for a working example:

```yaml
rows:
  - heading: Built from a real site
    paragraphs:
      - First paragraph.
      - Second paragraph.
    image: /media/uploads/2026/11/welcome.jpg
    imageAlt: Describe the photo
    cta:
      label: How it works
      href: /how-it-works/
  - heading: Next section
    paragraphs:
      - Rows alternate image left/right and white/gray automatically.
```

Add a new page to the menu as described in [The menu](#the-menu). A page
that isn't in the menu still works; people just need a link to find it.

A page that needs a completely custom layout (like the homepage,
`src/pages/index.astro`) is built by a developer as its own file in
`src/pages/`.

### Images

**Where to put them:** save image files under
**`src/assets/media/uploads/YYYY/MM/`** (create the year/month folders as
needed), and refer to them in posts and pages **without** the
`src/assets` part:

```yaml
featuredImage: /media/uploads/2026/11/richmond-warehouse.jpg
```

Use lowercase letters, numbers and dashes in file names, with no spaces.

**Featured image size:** **1920 × 1280 pixels** (a 3:2 landscape photo),
saved as JPEG at about 85% quality, in sRGB color. That one file is all a
post needs. The site creates the smaller copies for cards and phones, and
the 1200 × 630 share picture. Photos down to 900 × 600 are fine; don't
enlarge small photos just to hit 1920. Avoid white or black bars around the
photo.

**Keep faces, logos and text inside the "safe area"**, because link previews
on Facebook, LinkedIn and X crop the top and bottom of the photo. On a 1920 ×
1280 image, anything between **115 and 1805 pixels across** and **160 and 1120
pixels down** shows everywhere. The image at the top of
[this demo post](https://federatedops.github.io/Web-Blueprints/news/preparing-images/)
draws that box.

In Photoshop: make a 1920 × 1280 template with guides at 160 and 1120
(horizontal) and 115 and 1805 (vertical); place each photo to cover the whole
canvas; **File › Export › Export As**, JPEG, quality 85, **Convert to sRGB**
on. Aim for under 1 MB.

**Link-preview controls** (optional, per post):

```yaml
socialFocus: top        # keep the top of the photo in the share crop (or bottom); default is the middle
socialImage: /media/uploads/2026/11/richmond-share.jpg   # use a different, designed 1200 × 630 picture instead
```

**Checking a share preview** after the page is live: paste its link into the
[Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) or
[LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/). Both
remember old previews, so click **Scrape Again** / **Inspect** after changing
an image.

**Images inside the text** of a post or page work the same way:
`![Description of the photo](/media/uploads/2026/11/photo.jpg)`. Animated GIFs
are kept as-is, so they keep their animation.

**Replacing an image:** upload the new file, point the post at it, then search
the repository for the old file's name. If nothing else uses it, delete it, so
unused images don't pile up.

### The menu

The header menu (and the footer's link columns) come from
**`src/data/nav.ts`**:

```ts
{
  label: 'News',
  href: '/news/',
  children: [                       // optional: makes a dropdown
    { label: 'All News', href: '/news/' },
    { label: 'Announcements', href: '/news/category/announcements/' },
  ],
},
{ label: 'Our Partner', href: 'https://example.com', external: true },   // opens in a new tab
```

Write site addresses starting with `/`, without the repository name. The
current page's menu item is highlighted automatically. Social media icons
(`socialLinks`) and the footer's small-print links (`legalNav`) are in the
same file.

### Name, colors and fonts

- **Site name, tagline, default author, default images:** `src/data/site.ts`.
- **Colors and fonts:** the `:root` block at the bottom of
  `src/layouts/BaseLayout.astro`. Change `--color-primary` (the blue) and
  `--color-accent` (the orange) and the whole site follows: banners,
  buttons, links, cards.
- **Logo:** the header shows a colored square and the site name (the
  `brand` section in the same file). A developer can swap in an image logo
  in a few minutes.
- **Browser tab icon:** `public/favicon.svg`.

### Moving or renaming a page

When a page's address changes, add the old address to `redirects` in
`astro.config.mjs` so old links and bookmarks still work:

```js
redirects: {
  '/about-us': `${base === '/' ? '' : base}/about/`,
},
```

---

## Reviewing a change with its preview site

1. Open the pull request and find the comment from **github-actions** with
   the preview link. It updates itself on every new push.
2. Click through the pages the change touches. Check at phone width too:
   shrink the browser window, or use your phone. The yellow banner confirms
   you're on the preview, not the live site.
3. Comment on the pull request as usual. When it looks right, approve and
   merge.

Things to know:

- **Previews are public.** Anyone with the link can open one (search engines
  are told to skip them). Don't put anything in a pull request you wouldn't
  publish.
- A new push takes a minute or two to show up on the preview; refresh the
  page. If a preview page 404s right after the comment appears, wait a minute
  for GitHub Pages to catch up.
- Pull requests from a **fork** (someone outside your organization) don't get
  a preview, for security; they get a build check only.
- An address that doesn't exist inside a preview shows the live site's "Page
  not found" page.

---

## Going live

Before announcing the site:

- [ ] Replace the demo content: the posts in `src/content/news/`, the pages in
      `src/content/pages/` (including the placeholder **privacy policy**),
      and the sample images in `src/assets/media/`.
- [ ] Replace the homepage text in `src/pages/index.astro` and the default
      share image (`defaultShareImage` in `src/data/site.ts`).
- [ ] Set your social links in `src/data/nav.ts` and `xHandle` in
      `src/data/site.ts`.
- [ ] Set your colors and favicon ([Name, colors and fonts](#name-colors-and-fonts)).
- [ ] **Let search engines in:** set `indexable: true` in `src/data/site.ts`.
- [ ] Point your own domain at the site, if you have one (below).
- [ ] Share a page on LinkedIn or Facebook (or use the debuggers in
      [Images](#images)) to check the link previews.
- [ ] Add redirects for important old addresses if this replaces an older
      site ([Moving a page](#moving-or-renaming-a-page)).

### Using your own domain

To serve the site at, say, `www.example.com` instead of
`owner.github.io/repo/`:

1. **Tell the site its new home.** Go to **Settings → Secrets and variables →
   Actions → Variables** and add three **repository variables**:

   | Name | Value | Why |
   | --- | --- | --- |
   | `SITE_URL` | `https://www.example.com` | Full addresses in link previews and search results |
   | `BASE_PATH` | `/` | The site now lives at the top of the domain, not under `/<repo>/` |
   | `PREVIEW_BASE_URL` | `www.example.com` | So preview links on pull requests use the domain too |

2. **Add a `CNAME` file:** create `public/CNAME` containing just
   `www.example.com`. (Without it, every deploy would remove the domain
   setting.)
3. **Point the domain at GitHub:** in your DNS provider, add a `CNAME` record
   for `www` pointing to `<owner>.github.io`. For a bare domain
   (`example.com`), follow
   [GitHub's instructions for apex domains](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain).
4. **Settings → Pages → Custom domain:** enter `www.example.com`, **Save**,
   wait for the DNS check, then tick **Enforce HTTPS**.
5. Merge any change (or run **Deploy to GitHub Pages** from the Actions tab)
   so the site is rebuilt with the new addresses.

Previews then live at `www.example.com/pr-preview/pr-<number>/`.

---

## Troubleshooting

#### A red ✗ on my pull request or commit

The build found a problem. Click the ✗ → **Details** to open the log, and look
near the bottom for the file name and the field it complains about, for
example `news → 2026-11-17-new-warehouse.md: pubDate: Invalid date`. Fix the
file in the same branch; the check runs again automatically. Until it's
fixed, nothing from that branch reaches the live site.

#### The site, or the local copy, shows "404" at the top-level address

The site lives under the repository name: `https://<owner>.github.io/<repo>/`
(note the trailing part), and locally `http://localhost:4321/<repo>/`. If the
full address 404s on GitHub, check that **Settings → Pages** is set to the
`gh-pages` branch ([step 4](#4-turn-on-github-pages)).

#### The deploy fails with "Permission denied" or "403"

Your organization limits what automation can do by default. Go to **Settings →
Actions → General → Workflow permissions**, choose **Read and write
permissions**, **Save**, and re-run the failed job (open it in the Actions tab →
**Re-run jobs**). If the option is greyed out, an organization owner has to
allow it under the organization's own **Settings → Actions → General**.

#### No preview comment appeared on my pull request

- Open the **Actions** tab and look for a **Deploy PR preview** run. If it
  failed, see the permission fix above.
- Pull requests from forks don't get previews (by design).
- The very first preview needs GitHub Pages turned on ([step 4](#4-turn-on-github-pages)).

#### My change merged but the live site didn't change

Give it two minutes, then refresh with a cache bypass (<kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>R</kbd>).
Check the **Actions** tab for a failed **Deploy to GitHub Pages** run.

#### An image looks blurry or loads slowly

It's probably smaller than recommended, or it's in `public/` instead of
`src/assets/media/`. Only images under `src/assets/media/` get resized
copies. See [Images](#images).

#### A link works on the live site but not in the preview (or the other way round)

The link probably includes the repository name, like `/Web-Blueprints/about/`.
Write site links as `/about/`; the site adds the rest.

---

## What's in the repository

```
.github/workflows/
  deploy.yml            Publishes the live site when main changes
  preview.yml           Builds, publishes and removes pull-request previews
src/
  content/
    news/               News posts (Markdown)
    pages/              Pages (Markdown)
  assets/media/         Images used by posts and pages (resized at build time)
  data/
    site.ts             Site name, tagline, defaults, "hide from search engines"
    nav.ts              The menu, footer links and social icons
  layouts/
    BaseLayout.astro    Header, footer, <head> tags, and the colors/fonts (:root)
  components/           Reusable building blocks (banner, cards, search, …)
  pages/                The page templates: homepage, news, Markdown pages, 404
  utils/                Helpers for links, images, news and sharing
  content.config.ts     The list of allowed fields for posts and pages
public/                 Files copied as-is (favicon, CNAME)
astro.config.mjs        Site address, base path and redirects
docs/                   Technical notes for developers
```

---

## For developers

The site is a standard [Astro](https://docs.astro.build/) project (static
output, no client framework, TypeScript). Two notes go deeper:

- **[docs/ci-cd.md](docs/ci-cd.md):** how the deploy and preview workflows
  fit together, the `gh-pages` branch layout, base-path handling, race
  conditions, forks, and why the branch-based Pages source is used.
- **[docs/developer-guide.md](docs/developer-guide.md):** the conventions:
  links and `withBase()`, the image pipeline, content schemas, design
  tokens, the scoped-style override technique, class naming, and how to
  verify a change.

`CLAUDE.md` / `AGENTS.md` carry the same conventions in short form for AI
coding assistants.

## License

[MIT](LICENSE). Use it, copy it, change it.
