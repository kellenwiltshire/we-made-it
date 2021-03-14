import React from 'react';

function CheckoutCard({
	index,
	deleteItem,
	name,
	price,
	description,
	quantity,
}) {
	const removeItem = () => {
		deleteItem(index);
	};

	console.log('Checkout Name: ', name);

	return (
		<div className='md:flex border rounded border-black md:mx-auto w-full h-64 m-5'>
			<img
				className='h-full w-1/3  object-cover rounded-lg rounded-r-none'
				src='/pictureComingSoon.png'
				alt='bag'
			/>
			<div className='w-2/3 px-4 py-4 bg-white rounded-lg'>
				<div className='flex items-center'>
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
						className='bg-white text-red-500 px-4 py-2 rounded mr-auto hover:underline'
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
}

export default CheckoutCard;
