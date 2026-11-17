import type { ImageMetadata } from 'astro';

/**
 * Content (Markdown frontmatter, data files) refers to images by a plain
 * string path such as "/media/uploads/2026/11/team-photo.jpg". Astro can only
 * resize and re-encode images it imports, not files in public/, so the files
 * those paths name live under src/assets/media/ and this lookup turns a path
 * string into the imported image.
 *
 * Eagerly globbed, so lookups are synchronous. See docs/developer-guide.md, "Images".
 */
const files = import.meta.glob<{ default: ImageMetadata }>('/src/assets/media/**/*.{jpg,jpeg,png,gif,webp,avif}', {
	eager: true,
});

/** The imported image for a "/media/..." path, or undefined when the file
 *  isn't under src/assets/media/ (e.g. it's only in public/). */
export function resolveMedia(path: string): ImageMetadata | undefined {
	return files[`/src/assets${path}`]?.default;
}
