import { useState } from 'react';
import BackToProductButton from '../Buttons/BackToProductButton';
import ProductInfo from './ProductInfo';
import ProductForm from './ProductForm';

function ProductDetails({
	productData,
	price,
	isSale,
	itemLocations,
	setPrice,
	setItemID,
	itemID,
}) {
	return (
		<div className='flex flex-col justify-between h-full w-full md:w-1/2 max-w-xs mx-auto space-y-4 min-h-128'>
			<BackToProductButton />
			<ProductInfo
				title={productData.itemName}
				description={productData.itemDescription}
				price={price}
				isSale={isSale}
				itemLocations={itemLocations}
			/>
			<ProductForm
				productData={productData}
				setPrice={setPrice}
				setItemID={setItemID}
				itemID={itemID}
			/>
		</div>
	);
}

export default ProductDetails;
