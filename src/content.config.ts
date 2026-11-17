import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Content collections: Markdown files with typed frontmatter. A file with a
 * missing or mistyped field fails the build with a message naming the file
 * and field, so mistakes are caught in the pull request's build, not on the
 * live site. See README.md ("Adding and editing content") for every field with examples.
 *
 * Image fields take a root-relative path such as
 * "/media/uploads/2026/11/photo.jpg"; the file goes under src/assets/media/
 * at the same path (README.md, "Images").
 */

/** An orange call-to-action band (CtaBand.astro). */
const cta = z.object({
	title: z.string(),
	text: z.string().optional(),
	button: z.string().default('Learn More'),
	/** A site path ("/contact/") or a full URL (opens in a new tab). */
	href: z.string(),
});

/** One alternating image + text section (FeatureRow.astro). */
const row = z.object({
	heading: z.string(),
	paragraphs: z.array(z.string()),
	image: z.string().optional(),
	imageAlt: z.string().default(''),
	cta: z.object({ label: z.string(), href: z.string() }).optional(),
	/** Image on the right instead of the left. Rows alternate by default. */
	reverse: z.boolean().optional(),
	variant: z.enum(['default', 'alt']).optional(),
});

const pages = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		/** Image for this page's share card. */
		shareImage: z.string().optional(),
		cta: cta.optional(),
		/** Sections rendered between the banner and the Markdown body. */
		rows: z.array(row).optional(),
	}),
});

const news = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
	schema: z.object({
		title: z.string(),
		/** One or two sentences: the card excerpt and the meta description. */
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		/** Defaults to the site's defaultAuthor (src/data/site.ts). */
		author: z.string().optional(),
		/** URL slug. Defaults to the file name without its leading date. */
		slug: z.string().optional(),
		/** true: left out of every listing, the search index and the build. */
		draft: z.boolean().default(false),
		/** Category slugs, e.g. [announcements, guides]. Each one gets a
		 *  listing page at /news/category/<slug>/. */
		categories: z.array(z.string()).default([]),
		tags: z.array(z.string()).default([]),
		/** 3:2, ideally 1920×1280 (README.md, "Images"). */
		featuredImage: z.string().optional(),
		featuredImageAlt: z.string().default(''),
		/** A different image for the share card, e.g. a designed 1200×630 graphic. */
		socialImage: z.string().optional(),
		/** Which part of the image the 1.91:1 share crop keeps. */
		socialFocus: z.enum(['top', 'center', 'bottom']).optional(),
		cta: cta.optional(),
	}),
});

export const collections = { pages, news };
