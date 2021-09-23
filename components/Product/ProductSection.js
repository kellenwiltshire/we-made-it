import ProductImage from './ProductImage';
import ProductDetails from './ProductDetails';

export default function ProductSection({ productData }) {
	return (
		<div className='flex flex-col justify-center items-center md:flex-row md:items-start space-y-8 md:space-y-0 md:space-x-4 lg:space-x-8 mx-auto'>
			<ProductImage images={productData.images.edges} />
			<ProductDetails productData={productData} />
		</div>
	);
}
