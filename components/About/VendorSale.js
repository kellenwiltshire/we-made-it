import React, { useEffect, useState } from 'react';
import Headers from '../Layout/Headers';
import { vendors } from '../../VendorList/VendorList';
import Link from 'next/link';

function VendorSale() {
	const [sales, setSales] = useState([]);
	const checkForSales = () => {
		const currentSales = vendors.filter((sale) => {
			if (sale.sale) {
				return sale;
			} else {
				return;
			}
		});
		return currentSales;
	};
	useEffect(() => {
		setSales(checkForSales());
	}, []);
	return (
		<div className='w-full flex flex-row flex-wrap justify-center'>
			<Headers
				title='Current Vendor Sales'
				subtitle='Discount Applied at Checkout'
			/>
			<div className='pb-2 sm:w-1/2 w-full flex flex-row justify-center'>
				{sales.map((vendor, i) => {
					const shortenedVendor = sales[i].vendor.split(' ').join('');
					return (
						<Link
							key={i}
							href={{
								pathname: `/search/[...searchitems]`,
								query: {
									searchitems: shortenedVendor,
									search: sales[i].vendor,
								},
							}}
						>
							<a>
								<div
									key={i}
									className='flex mx-1 mt-5 px-3 py-2 bg-purple-200 text-gray-700 rounded-lg cursor-pointer font-title'
								>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='icon icon-tabler icon-tabler-discount-2'
										width='24'
										height='24'
										viewBox='0 0 24 24'
										strokeWidth='1.5'
										stroke='#604195'
										fill='none'
										strokeLinecap='round'
										strokeLinejoin='round'
									>
										<path stroke='none' d='M0 0h24v24H0z' fill='none' />
										<line x1='9' y1='15' x2='15' y2='9' />
										<circle cx='9.5' cy='9.5' r='.5' fill='currentColor' />
										<circle cx='14.5' cy='14.5' r='.5' fill='currentColor' />
										<path d='M5 7.2a2.2 2.2 0 0 1 2.2 -2.2h1a2.2 2.2 0 0 0 1.55 -.64l.7 -.7a2.2 2.2 0 0 1 3.12 0l.7 .7a2.2 2.2 0 0 0 1.55 .64h1a2.2 2.2 0 0 1 2.2 2.2v1a2.2 2.2 0 0 0 .64 1.55l.7 .7a2.2 2.2 0 0 1 0 3.12l-.7 .7a2.2 2.2 0 0 0 -.64 1.55v1a2.2 2.2 0 0 1 -2.2 2.2h-1a2.2 2.2 0 0 0 -1.55 .64l-.7 .7a2.2 2.2 0 0 1 -3.12 0l-.7 -.7a2.2 2.2 0 0 0 -1.55 -.64h-1a2.2 2.2 0 0 1 -2.2 -2.2v-1a2.2 2.2 0 0 0 -.64 -1.55l-.7 -.7a2.2 2.2 0 0 1 0 -3.12l.7 -.7a2.2 2.2 0 0 0 .64 -1.55v-1' />
									</svg>
									<span className='font-title text-dark-purple ml-5'>
										{sales[i].vendor}
									</span>
									<span className='font-title text-dark-purple ml-5'>
										{sales[i].sale}% Off!
									</span>
								</div>
							</a>
						</Link>
					);
				})}
			</div>
		</div>
	);
}

export default VendorSale;
