/** @type {import("next-seo").NextSeoProps} */
const seo = {
	defaultTitle: "MyConfigStore",
	titleTemplate: "%s | MyConfigStore",
	canonical: process.env.NEXT_PUBLIC_CANONICAL_URL,
	description: "A simple, fast, secure and highly available remote store for all your dynamic configs.",
	twitter: {
		site: "@myconfigstore",
		handle: "@myconfigstore",
		cardType: "summary_large_image",
	},
	facebook: {
		appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID ?? "",
	},
	openGraph: {
		site_name: "MyConfigStore",
		url: process.env.NEXT_PUBLIC_CANONICAL_URL,
		type: "website",
		images: [
			{
				url: `${process.env.NEXT_PUBLIC_CANONICAL_URL}/banner.jpg`,
				alt: "MyConfigStore Banner",
				height: 876.84,
				width: 1666,
			},
		],
	},
}

module.exports = { seo }
