// @ts-check
import { defineConfig } from 'astro/config';
import remarkBaseLinks from './remark-base-links.mjs';

/**
 * Where the site is served from. The workflows in .github/workflows/ set both
 * of these; locally you normally set neither and get the production values.
 *
 *   SITE_URL   The origin: https://<owner>.github.io, or your custom domain.
 *   BASE_PATH  The path the site lives under on that origin:
 *                /<repo>                      GitHub Pages project site (default)
 *                /                            behind a custom domain
 *                /<repo>/pr-preview/pr-12     a pull-request preview
 *
 * Every internal link and asset is built against BASE_PATH (see
 * src/utils/base.ts and remark-base-links.mjs), which is what lets one build
 * run unchanged at the production root and inside a preview subdirectory.
 *
 * When you copy this blueprint, change the two defaults below to your own
 * repository so `npm run dev` serves the site at the same paths it has live.
 */
const DEFAULT_SITE_URL = 'https://federatedops.github.io';
const DEFAULT_BASE_PATH = '/Web-Blueprints';

const site = process.env.SITE_URL || DEFAULT_SITE_URL;
const base = normalizeBase(process.env.BASE_PATH ?? DEFAULT_BASE_PATH);

/** "/", or a path with one leading slash and no trailing slash. Joins like
 *  "/" + "/pr-preview/pr-3" (a custom domain's preview) come out clean. */
function normalizeBase(path) {
	const trimmed = `/${path}`.replace(/\/{2,}/g, '/').replace(/\/$/, '');
	return trimmed || '/';
}

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
	site,
	base,
	trailingSlash: 'ignore',
	// Old addresses that moved. A static build writes a small redirect page at
	// each one. Destinations need the base path, as here.
	redirects: {
		'/about-us': `${base === '/' ? '' : base}/about/`,
	},
	markdown: {
		remarkPlugins: [[remarkBaseLinks, base]],
	},
});
