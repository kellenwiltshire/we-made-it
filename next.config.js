const nextConfig = {
	experimental: {
		staticPageGenerationTimeout: 1800,
	},
};

const images = {
	domains: ['cdn.shopify.com'],
};

module.exports = { nextConfig, images: { domains: ['cdn.shopify.com'] } };
