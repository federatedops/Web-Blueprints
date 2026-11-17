import type { APIRoute } from 'astro';
import { site } from '../../data/site';
import { getPublishedPosts, postImage, postUrl, formatDate } from '../../utils/news';
import { responsiveImage } from '../../utils/images';

/**
 * /news/search-index.json: every published post's searchable fields, built
 * at the same time as the site. NewsSearch.astro fetches it the first time
 * someone types in the search box, so search works on a static host with no
 * server or third-party service. Links and image URLs already include the
 * base path.
 */
export const GET: APIRoute = async () => {
	const posts = await getPublishedPosts();
	const index = await Promise.all(
		posts.map(async (post) => ({
			url: postUrl(post),
			title: post.data.title,
			description: post.data.description,
			date: post.data.pubDate.toISOString(),
			dateLabel: formatDate(post.data.pubDate),
			author: post.data.author ?? site.defaultAuthor,
			categories: post.data.categories,
			tags: post.data.tags,
			// The same 640-wide copy NewsCard uses.
			image: (await responsiveImage(postImage(post), [640])).src,
			imageAlt: post.data.featuredImageAlt,
		})),
	);
	return new Response(JSON.stringify(index), { headers: { 'Content-Type': 'application/json' } });
};
