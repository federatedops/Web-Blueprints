/**
 * Site-wide settings: the one file to edit first when starting a new site
 * from this blueprint. Colors and fonts live in src/layouts/BaseLayout.astro
 * (the :root tokens); the menu lives in src/data/nav.ts.
 */
export const site = {
	/** Shown in the header, page titles ("Page | Name") and share cards. */
	name: 'Web Blueprints',
	tagline: 'Static sites with built-in previews',
	/** Default meta description for pages that don't set their own. */
	description: 'A blueprint for fast, low-maintenance company websites: Astro, Markdown content, GitHub Pages, and a live preview site for every pull request.',
	/** Default byline on news posts (each post can override it with `author:`). */
	defaultAuthor: 'Web Blueprints Team',
	/** Locale used for dates ("November 17, 2026"). */
	locale: 'en-US',
	/** Image for share cards on pages that don't have their own. A
	 *  root-relative path under src/assets/media/ (see README.md, "Images"). */
	defaultShareImage: '/media/defaults/share-default.jpg',
	/** Fallback featured image for news posts without one. */
	defaultPostImage: '/media/defaults/post-default.jpg',
	/** X/Twitter handle without the @, for twitter:site and share links.
	 *  Leave empty if there isn't one. */
	xHandle: '',
	/**
	 * false: every page carries <meta name="robots" content="noindex">, so
	 * search engines skip the site while it's being built. Flip to true at
	 * launch (README.md, "Going live"). Preview builds are always noindex.
	 */
	indexable: false,
} as const;
