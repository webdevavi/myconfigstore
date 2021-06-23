/** @type {import("next-seo").NextSeoProps} */
const seo = {
	defaultTitle: "MyConfigStore",
	titleTemplate: "%s | MyConfigStore",
	canonical: process.env.NEXT_PUBLIC_CANONICAL_URL,
	description: "A simple, fast, secure and highly available remote store for all your dynamic configs.",
	twitter: {
		site: "@myconfigstore",
		handle: "@myconfigstore",
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
				url: `${process.env.NEXT_PUBLIC_CANONICAL_URL}/myconfigstore-logo-512x512.png`,
				alt: "MyConfigStore Logo",
				height: 512,
				width: 512,
			},
			{
				url: `${process.env.NEXT_PUBLIC_CANONICAL_URL}/myconfigstore-logo-196x196.png`,
				alt: "MyConfigStore Logo",
				height: 196,
				width: 196,
			},
		],
	},
}

module.exports = { seo }
