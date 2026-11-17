/**
 * Prefixes a root-relative site path ("/news/") with the configured base path
 * (see astro.config.mjs), so links work on a GitHub Pages project site
 * (/<repo>/news/) and inside a pull-request preview
 * (/<repo>/pr-preview/pr-12/news/) without changing any page code.
 *
 * Full URLs, mailto:, tel: and #anchors pass through untouched.
 *
 * Use it for every internal href/src you write in a component or page.
 * Markdown content doesn't need it: remark-base-links.mjs does the same job
 * for links and images written in .md files.
 */
export function withBase(href: string): string {
	if (/^([a-z][a-z0-9+.-]*:)?\/\//i.test(href) || /^(mailto|tel):/i.test(href) || href.startsWith('#')) {
		return href;
	}
	const base = import.meta.env.BASE_URL.replace(/\/$/, '');
	return base + (href.startsWith('/') ? href : `/${href}`);
}

/** True when this build is a pull-request preview (see preview.yml). */
export const isPreviewBuild = Boolean(import.meta.env.PUBLIC_PR_NUMBER);
