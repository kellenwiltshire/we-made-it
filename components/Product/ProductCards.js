import React, { useState } from 'react';
import Link from 'next/link';
import Price from '../Checkout/Price';

function ProductCards({ itemID, title, item, price, image, salePrice }) {
	if (salePrice) {
		return (
			<Link
				href={{
					pathname: '/Products/[product]',
					query: { product: itemID },
				}}
			>
				<a className='flex justify-center flex-wrap bg-white w-36 sm:w-40 md:w-80 cursor-pointer rounded transform hover:shadow-2xl duration-300 ease-in-out md:m-5 border border-purple-400 m-1'>
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
							Sale Price: ${salePrice}
						</p>
					</div>
				</a>
			</Link>
		);
	} else {
		return (
			<Link
				href={{
					pathname: '/Products/[product]',
					query: { product: itemID },
				}}
			>
				<a className='flex justify-center flex-wrap bg-white w-36 sm:w-40 md:w-80 cursor-pointer rounded transform hover:shadow-2xl duration-300 ease-in-out md:m-5 border border-purple-400 m-1'>
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
}

export default ProductCards;
