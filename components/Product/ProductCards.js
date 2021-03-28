import React, { useState } from 'react';
import Link from 'next/link';

function ProductCards({ itemID, title, item, price, defaultImage }) {
	const [image, setImage] = useState(defaultImage);

	if (item.imageId) {
		fetch('https://we-made-it-api.herokuapp.com/imageRequest', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				item: item.imageId,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				setImage(data.image);
			})
			.catch((err) => console.log(err));
	}
	return (
		<Link
			href={{
				pathname: '/Products/[product]',
				query: { product: itemID },
			}}
		>
			<a className='flex justify-center flex-wrap bg-white w-36 sm:w-40 md:w-80 md:shadow-lg cursor-pointer rounded transform hover:scale-105 duration-300 ease-in-out md:m-5'>
				<div className='flex flex-wrap bg-white w-36 sm:w-40 md:w-80 shadow cursor-pointer rounded m-5'>
					<div>
						<img src={image} alt='' width='600px' height='auto' />
					</div>
				</div>
				<div className='flex flex-wrap bg-white w-28 sm:w-40 md:w-80'>
					<h2 className='text-xs sm:text-base md:text-xl uppercase text-center w-full font-title'>
						{title}
					</h2>
					<p className='md:ml-5 text-center md:text-left w-full text-xs md:text-base font-body'>
						${price}
					</p>
				</div>
			</a>
		</Link>
	);
}

export default ProductCards;
