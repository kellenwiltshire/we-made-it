import Price from '../Checkout/Price';

function ProductInfo({ title, description, price, vendor }) {
	return (
		<div className='font-title'>
			<h1 className='leading-relaxed font-extrabold text-3xl text-purple-400 pt-2 sm:pt-4'>
				{title}
			</h1>
			<p className='pb-2 sm:pb-4'>By: {vendor}</p>
			<p className='font-medium text-lg font-body'>{description}</p>
			<div className='text-xl text-purple-400 font-medium py-4 px-1'>
				<Price num={price} numSize='text-2xl' />
			</div>
		</div>
	);
}

export default ProductInfo;
