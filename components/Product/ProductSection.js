import ProductImage from './ProductImage';
import ProductDetails from './ProductDetails';

export default function ProductSection({
	productData,
	price,
	isSale,
	itemLocations,
	setPrice,
	setItemID,
	itemID,
}) {
	return (
		<div className='flex flex-col justify-center items-center md:flex-row md:items-start space-y-8 md:space-y-0 md:space-x-4 lg:space-x-8 max-w-6xl w-11/12 mx-auto'>
			<ProductImage image={productData.image} />
			<ProductDetails
				productData={productData}
				price={price}
				isSale={isSale}
				itemLocations={itemLocations}
				setPrice={setPrice}
				setItemID={setItemID}
				itemID={itemID}
			/>
		</div>
	);
}
