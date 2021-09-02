import Price from '../Checkout/Price';

function ProductInfo({ title, description, price, itemLocations, isSale }) {
	return (
		<div className='font-title'>
			<h1 className='leading-relaxed font-extrabold text-3xl text-purple-400 py-2 sm:py-4'>
				{title}
			</h1>
			<p className='font-medium text-lg font-body'>{description}</p>
			<div className='text-xl text-purple-400 font-medium py-4 px-1'>
				{isSale ? (
					<div>
						<span className='text-red-400'>Sale: </span>
						<Price num={price} numSize='text-2xl text-red-400' />
					</div>
				) : (
					<Price num={price} numSize='text-2xl' />
				)}
			</div>
			<div>
				<span className='mr-3'>Available At: </span>
				{itemLocations.map((loc) => {
					return <p key={loc}>{loc}</p>;
				})}
			</div>
		</div>
	);
}

export default ProductInfo;
