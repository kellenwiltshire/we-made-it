import React from 'react';

function CheckoutCard({ item, index, deleteItem }) {
	const itemName = item.item.object.itemData.name;
	const price =
		item.item.object.itemData.variations[0].itemVariationData.priceMoney.amount;
	const roundedPrice = (price / 100).toFixed(2);
	const description = item.item.object.itemData.description;
	const quantity = item.quantity;

	const removeItem = () => {
		deleteItem(index);
	};

	return (
		<div className='md:flex shadow-lg md:mx-auto w-full h-64'>
			<img
				className='h-full w-1/3  object-cover rounded-lg rounded-r-none'
				src='/big-purple-splash.png'
				alt='bag'
			/>
			<div className='w-2/3 px-4 py-4 bg-white rounded-lg'>
				<div className='flex items-center'>
					<h2 className='text-xl text-gray-800 font-medium mr-auto'>
						{itemName}
					</h2>
					<div className='flex flex-wrap'>
						<p className='text-gray-800 font-semibold tracking-tighter w-full'>
							${roundedPrice}
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
