import { visit } from 'unist-util-visit';

/**
 * Prefixes root-relative links and images written in Markdown content
 * (e.g. "[Contact](/contact/)" or "![](/media/uploads/2026/11/photo.jpg)")
 * with the site's base path at build time, so content authors write plain
 * site paths and they still resolve on a GitHub Pages project site or inside
 * a pull-request preview. A no-op when the base is "/" (a custom domain).
 *
 * Full URLs, protocol-relative URLs (//cdn...), anchors (#top) and relative
 * paths (../foo) are left alone.
 */
export default function remarkBaseLinks(base) {
	const prefix = base.replace(/\/$/, '');
	return (tree) => {
		if (!prefix) return;
		visit(tree, (node) => {
			if (
				(node.type === 'link' || node.type === 'image' || node.type === 'definition') &&
				typeof node.url === 'string' &&
				node.url.startsWith('/') &&
				!node.url.startsWith('//') &&
				!node.url.startsWith(`${prefix}/`)
			) {
				node.url = prefix + node.url;
			}
		});
	};
}
