import Image from 'next/image';

function ProductImage({ image }) {
	return (
		<div className='w-full md:w-1/2 max-w-md border border-palette-lighter bg-white rounded shadow-lg'>
			<img src={image} alt='Product Image' layout='fill' />
		</div>
	);
}

export default ProductImage;
