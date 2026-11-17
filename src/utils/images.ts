import { getImage } from 'astro:assets';
import { withBase } from './base';
import { resolveMedia } from './media';

/**
 * Build-time resized copies of content images, so each spot on the site
 * loads only the size it needs instead of the original upload.
 *
 * The house standard for a featured image is a 3:2 photo at 1920×1280 (see
 * README.md, "Images"). Originals can be any size: these helpers never enlarge
 * past what the file has (Astro's image service won't upscale), so a small
 * original just yields fewer, smaller copies.
 *
 * Anything not under src/assets/media/, and any GIF (Sharp keeps only a
 * GIF's first frame, which would silently kill an animation), falls back to
 * the original file's URL.
 */

export interface ResponsiveImage {
	src: string;
	/** Empty when only one size exists (fallback, or a small original). */
	srcset: string;
	/** Intrinsic size of the largest copy (0 when unknown). */
	width: number;
	height: number;
}

function optimizable(path: string) {
	const asset = resolveMedia(path);
	return asset && !/\.gif$/i.test(path) ? asset : undefined;
}

/** WebP copies at each of `widths` the original can fill (plus the
 *  original's own width when it's smaller than the largest requested). */
export async function responsiveImage(path: string, widths: number[]): Promise<ResponsiveImage> {
	const asset = optimizable(path);
	if (!asset) {
		const known = resolveMedia(path);
		return { src: known?.src ?? withBase(path), srcset: '', width: known?.width ?? 0, height: known?.height ?? 0 };
	}
	const usable = [...new Set(widths.map((w) => Math.min(w, asset.width)))].sort((a, b) => a - b);
	const copies = await Promise.all(usable.map((width) => getImage({ src: asset, width, format: 'webp' })));
	const largest = usable[usable.length - 1];
	return {
		// Browsers pick from srcset; plain src is the smallest copy.
		src: copies[0].src,
		srcset: copies.length > 1 ? copies.map((c, i) => `${c.src} ${usable[i]}w`).join(', ') : '',
		width: largest,
		height: Math.round((asset.height * largest) / asset.width),
	};
}

/** The URL of the largest copy in a ResponsiveImage. */
export function largestUrl(img: ResponsiveImage): string {
	return img.srcset ? img.srcset.split(', ').pop()!.split(' ')[0] : img.src;
}

export type SocialFocus = 'top' | 'center' | 'bottom';

export const SHARE_WIDTH = 1200;
export const SHARE_HEIGHT = 630;

export interface ShareImage {
	src: string;
	width: number;
	height: number;
}

/**
 * The JPEG for Facebook / LinkedIn / X previews: a 1.91:1 crop from the
 * middle of the image (or its top/bottom with `focus`), 1200×630 when the
 * original is at least 1200 wide, otherwise the same shape at the
 * original's own width. Returns null when the file can't be processed, so
 * the caller can fall back to the original as-is.
 */
export async function shareImage(path: string, focus: SocialFocus = 'center'): Promise<ShareImage | null> {
	const asset = optimizable(path);
	if (!asset) return null;
	const ratio = SHARE_WIDTH / SHARE_HEIGHT;
	const width = Math.min(SHARE_WIDTH, asset.width, Math.floor(asset.height * ratio));
	const height = Math.round(width / ratio);
	const image = await getImage({ src: asset, width, height, fit: 'cover', position: focus, format: 'jpg', quality: 82 });
	return { src: image.src, width, height };
}
