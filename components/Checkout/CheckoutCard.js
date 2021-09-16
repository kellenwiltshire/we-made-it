import React from 'react';

function CheckoutCard({
	index,
	deleteItem,
	name,
	price,
	description,
	quantity,
	image,
	discount,
}) {
	const removeItem = () => {
		deleteItem(index);
	};

	return (
		<div className='m-2 flex flex-row flex-wrap border rounded border-black w-96 h-auto'>
			<div className='block relative h-48 rounded overflow-hidden'>
				<img
					className='h-auto object-cover object-center'
					src={image}
					alt='bag'
				/>
			</div>
			<div className='px-4 py-4 bg-white rounded-lg'>
				<div className='flex flex-row flex-wrap'>
					<h2 className='text-xl text-gray-800 font-medium mr-auto font-title w-full'>
						{name}
					</h2>
					<div className='flex flex-wrap font-body'>
						<p className='text-center md:text-left w-full text-xs md:text-base font-body'>
							{discount ? 'Sale Price: $' + price : '$' + price}
						</p>
						<p className='text-center md:text-left w-full text-xs md:text-base font-body'>
							quantity: {quantity}
						</p>
					</div>
				</div>
				<p className='text-sm text-gray-700 mt-4 font-body'>{description}</p>
				<div className='flex items-center justify-end mt-4 top-auto'>
					<button
						onClick={removeItem}
						className='bg-white text-red-500 py-2 rounded mr-auto hover:underline font-body'
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
}

export default CheckoutCard;
