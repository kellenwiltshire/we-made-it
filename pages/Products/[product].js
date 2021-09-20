import React from 'react';
import ProductSection from '../../components/Product/ProductSection';
import SEO from '../../components/SEO/SEO';
import { getProduct } from '../../lib/shopify';

export default function ShopProduct({ productData }) {
	console.log(productData);

	return (
		<div className='min-h-screen py-12 sm:pt-20'>
			<SEO title={`${productData.title} || We Made It`} />
			<ProductSection productData={productData} />
		</div>
	);
}

export async function getServerSideProps({ query }) {
	const productData = await getProduct(query.product);

	return {
		props: {
			productData,
		},
	};
}
