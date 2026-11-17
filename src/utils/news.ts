import { getCollection, type CollectionEntry } from 'astro:content';
import { site } from '../data/site';
import { withBase } from './base';

export type Post = CollectionEntry<'news'>;

/** Posts that should be on the site (drafts left out), newest first. */
export async function getPublishedPosts(): Promise<Post[]> {
	const posts = await getCollection('news', ({ data }) => !data.draft);
	return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/**
 * The URL slug of a post: its `slug:` frontmatter when set, otherwise the
 * file name without a leading date, so "2026-11-17-hello-world.md" is
 * /news/hello-world/.
 */
export function postSlug(post: Post): string {
	return post.data.slug ?? post.id.replace(/^\d{4}-\d{2}-\d{2}-/, '');
}

/** Base-prefixed link to a post. */
export function postUrl(post: Post): string {
	return withBase(`/news/${postSlug(post)}/`);
}

/** The post's featured image path, or the site default. */
export function postImage(post: Post): string {
	return post.data.featuredImage ?? site.defaultPostImage;
}

export const formatDate = (d: Date) => d.toLocaleDateString(site.locale, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

/**
 * Display labels for category slugs. The slug (in URLs and frontmatter)
 * never changes; only how it reads as a heading or chip. Anything not listed
 * is title-cased from the slug ("product-news" → "Product News").
 */
const CATEGORY_LABELS: Record<string, string> = {
	faq: 'FAQ',
};

export function categoryLabel(category: string): string {
	return (
		CATEGORY_LABELS[category] ??
		category
			.split('-')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ')
	);
}

export function categoryUrl(category: string): string {
	return withBase(`/news/category/${category}/`);
}

/** Every category in use with its post count, most-used first. */
export function categoryCounts(posts: Post[]): { category: string; count: number }[] {
	const counts = new Map<string, number>();
	for (const post of posts) for (const c of post.data.categories) counts.set(c, (counts.get(c) ?? 0) + 1);
	return [...counts].map(([category, count]) => ({ category, count })).sort((a, b) => b.count - a.count || a.category.localeCompare(b.category));
}

/** Up to `limit` other posts sharing a category with this one, newest first. */
export function relatedPosts(post: Post, all: Post[], limit = 3): Post[] {
	return all.filter((p) => p.id !== post.id && p.data.categories.some((c) => post.data.categories.includes(c))).slice(0, limit);
}
