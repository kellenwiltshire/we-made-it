import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

function ProductCards({ itemID, image, title, item }) {
	console.log(item);
	const price = item.itemData.variations[0].itemVariationData.priceMoney.amount;
	console.log(price / 100);
	let roundedPrice = (price / 100).toFixed(2);
	console.log(roundedPrice);
	return (
		<Link
			href={{
				pathname: '/Products/[product]',
				query: { product: itemID },
			}}
		>
			<a>
				<div className='flex flex-wrap bg-white w-28 sm:w-40 md:w-80 shadow-lg cursor-pointer rounded transform hover:scale-105 duration-300 ease-in-out m-5'>
					<div>
						<img src={image} alt='' width='600px' height='auto' />
					</div>
				</div>
				<div className='w-full'>
					<h2 className='text-xs sm:text-base md:text-2xl uppercase text-center'>
						{title}
					</h2>
					<h2 className='ml-5'>${roundedPrice}</h2>
				</div>
			</a>
		</Link>
	);
}

export default ProductCards;
