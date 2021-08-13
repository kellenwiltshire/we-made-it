import React, { useState } from 'react';
import Link from 'next/link';

function ProductCards({ itemID, title, price, image, salePrice }) {
	if (salePrice) {
		return (
			<Link
				href={{
					pathname: '/Products/[product]',
					query: { product: itemID },
				}}
			>
				<a className='h-auto w-72 rounded shadow-lg mx-auto my-2 border border-purple-200'>
					<div className=' border-b-2 border-purple-200 relative'>
						<img src={image} alt={title} layout='fill' />
					</div>
					<div className='h-48 relative'>
						<div className='font-title text-2xl pt-4 px-4 font-semibold'>
							{title}
						</div>

						<div
							className='font-body font-medium text-base absolute bottom-0 right-0 mb-4 pl-8 pr-4 pb-1 pt-2 bg-red-200
            rounded-tl-sm triangle'
						>
							<div className=''>Sale: ${price}</div>
						</div>
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
				<a className='h-auto w-72 rounded shadow-lg mx-auto my-2 border border-purple-200'>
					<div className=' border-b-2 border-purple-200 relative'>
						<img src={image} alt={title} layout='fill' />
					</div>
					<div className='h-48 relative'>
						<div className='font-title text-2xl pt-4 px-4 font-semibold'>
							{title}
						</div>

						<div
							className='font-body font-medium text-base absolute bottom-0 right-0 mb-4 pl-8 pr-4 pb-1 pt-2 bg-purple-200
            rounded-tl-sm triangle'
						>
							<div className=''>${price}</div>
						</div>
					</div>
				</a>
			</Link>
		);
	}
}

export default ProductCards;
