import React from 'react';
import ProductSection from '../../components/Product/ProductSection';
import SEO from '../../components/SEO/SEO';
import { getProduct, getProductSlugs } from '../../lib/shopify';

export default function ShopProduct({ productData }) {
	console.log(productData);

	return (
		<div className='min-h-screen py-12 sm:pt-20 container'>
			<SEO title={`${productData.title} || We Made It`} />
			<ProductSection productData={productData} />
		</div>
	);
}

export async function getStaticPaths() {
	const productSlugs = await getProductSlugs();

	const paths = productSlugs.map((slug) => {
		const product = String(slug.node.handle);
		return {
			params: { product },
		};
	});

	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	const productData = await getProduct(params.product);

	return {
		props: {
			productData,
		},
	};
}
