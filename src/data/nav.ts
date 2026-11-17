export type NavLink = {
	label: string;
	/** A site path ("/news/") or, with `external`, a full URL. Site paths get
	 *  the base path added for you; never write the base path here. */
	href: string;
	external?: boolean;
	children?: NavLink[];
};

/**
 * The header menu (and the footer's link columns). A top-level item with
 * `children` opens a dropdown on desktop and an accordion on phones. The
 * active item is worked out from the current URL in NavMenu.astro.
 */
export const primaryNav: NavLink[] = [
	{ label: 'Home', href: '/' },
	{
		label: 'About',
		href: '/about/',
		children: [
			{ label: 'About Us', href: '/about/' },
			{ label: 'How This Site Works', href: '/how-it-works/' },
		],
	},
	{
		label: 'News',
		href: '/news/',
		children: [
			{ label: 'All News', href: '/news/' },
			{ label: 'Announcements', href: '/news/category/announcements/' },
			{ label: 'Guides', href: '/news/category/guides/' },
		],
	},
	{
		label: 'Resources',
		href: '/resources/',
		children: [
			{ label: 'Resources', href: '/resources/' },
			{ label: 'Astro Docs', href: 'https://docs.astro.build/', external: true },
			{ label: 'GitHub Pages Docs', href: 'https://docs.github.com/pages', external: true },
		],
	},
];

/** Small print links in the footer. */
export const legalNav: NavLink[] = [{ label: 'Privacy Policy', href: '/privacy-policy/' }];

/** Social profiles, shown as icons in the header and footer. Delete the
 *  ones you don't have; add an icon path below for any new label. */
export const socialLinks: NavLink[] = [
	{ label: 'GitHub', href: 'https://github.com/federatedops/Web-Blueprints', external: true },
	{ label: 'LinkedIn', href: 'https://www.linkedin.com/', external: true },
];

/** SVG path data (24×24 viewBox) for each social label above. */
export const socialIcons: Record<string, string> = {
	GitHub:
		'M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5',
	Facebook:
		'M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12',
	X: 'M18.9 2h3.3l-7.2 8.2L23.4 22h-6.6l-5.2-6.8L5.6 22H2.3l7.7-8.8L1 2h6.8l4.7 6.2Zm-1.2 18h1.8L7 3.9H5.1Z',
	LinkedIn:
		'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5M3 9h4v12H3ZM9 9h3.8v1.7h.1c.5-.9 1.8-1.9 3.7-1.9 4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21H9Z',
	YouTube:
		'M23.5 7.2s-.2-1.6-.9-2.3c-.9-.9-1.9-.9-2.4-1C16.9 3.6 12 3.6 12 3.6h0s-4.9 0-8.2.3c-.5.1-1.5.1-2.4 1-.7.7-.9 2.3-.9 2.3S.2 9.1.2 11v1.9c0 1.9.2 3.8.2 3.8s.2 1.6.9 2.3c.9.9 2.1.9 2.6 1 1.9.2 8.1.3 8.1.3s4.9 0 8.2-.3c.5-.1 1.5-.1 2.4-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.8V11c0-1.9-.2-3.8-.2-3.8ZM9.7 14.9V8.6l6.4 3.2Z',
};
