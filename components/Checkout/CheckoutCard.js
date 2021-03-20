import React from 'react';

function CheckoutCard({
	index,
	deleteItem,
	name,
	price,
	description,
	quantity,
	image,
}) {
	const removeItem = () => {
		deleteItem(index);
	};

	return (
		<div className='flex flex-row flex-wrap border rounded border-black w-full h-auto'>
			<img className='h-auto w-1/4 object-cover' src={image} alt='bag' />
			<div className='w-2/3 px-4 py-4 bg-white rounded-lg'>
				<div className='flex flex-row flex-wrap items-center'>
					<h2 className='text-xl text-gray-800 font-medium mr-auto'>{name}</h2>
					<div className='flex flex-wrap'>
						<p className='text-gray-800 font-semibold tracking-tighter w-full'>
							${price}
						</p>
						<p className='text-gray-800 font-semibold tracking-tighter'>
							quantity: {quantity}
						</p>
					</div>
				</div>
				<p className='text-sm text-gray-700 mt-4'>{description}</p>
				<div className='flex items-center justify-end mt-4 top-auto'>
					<button
						onClick={removeItem}
						className='bg-white text-red-500 py-2 rounded mr-auto hover:underline'
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
}

export default CheckoutCard;
