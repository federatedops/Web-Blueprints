import { site } from '../data/site';

/**
 * Share links. Facebook and LinkedIn only take the page URL: their crawlers
 * build the preview card from that page's own og:title / og:description /
 * og:image (see BaseLayout.astro). X's intent link also takes text, so it
 * gets the title, trimmed to fit X's limit alongside the link and the
 * "via @handle" credit.
 */
const X_URL_WEIGHT = 23; // X counts every link as a 23-character t.co link
const X_LIMIT = 280;

export type SharePlatform = 'facebook' | 'linkedin' | 'x';

export function buildShareUrl(platform: SharePlatform, url: string, title: string): string {
	if (platform === 'facebook') {
		return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
	}
	if (platform === 'linkedin') {
		return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
	}
	const via = site.xHandle ? ` via @${site.xHandle}` : '';
	const budget = X_LIMIT - X_URL_WEIGHT - via.length - 1;
	const text = title.length > budget ? `${title.slice(0, Math.max(budget - 1, 0)).trimEnd()}…` : title;
	const params = new URLSearchParams({ text, url });
	if (site.xHandle) params.set('via', site.xHandle);
	return `https://x.com/intent/post?${params}`;
}
