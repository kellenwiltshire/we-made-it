import BackToProductButton from '../Buttons/BackToProductButton';
import ProductInfo from './ProductInfo';
import ProductForm from './ProductForm';
import React, { useState } from 'react';

function ProductDetails({ productData }) {
	const [variantPrice, setVariantPrice] = useState(
		productData.variants.edges[0].node.price,
	);
	return (
		<div className='flex flex-col justify-between h-full w-full md:w-1/2 max-w-xs mx-auto space-y-4 min-h-128'>
			<BackToProductButton />
			<ProductInfo
				title={productData.title}
				description={productData.description}
				vendor={productData.vendor}
				price={variantPrice}
			/>
			<ProductForm
				title={productData.title}
				handle={productData.handle}
				variants={productData.variants.edges}
				mainImg={productData.images.edges[0].node}
				setVariantPrice={setVariantPrice}
			/>
		</div>
	);
}

export default ProductDetails;
