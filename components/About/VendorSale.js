import React, { useEffect, useState } from 'react';
import Headers from '../Layout/Headers';
import Link from 'next/link';
import DiscountIcon from '../Icons/DiscountIcon';

function VendorSale({ vendorSales }) {
	return (
		<div className='w-full flex flex-row flex-wrap justify-center'>
			<Headers title='Current Vendor Sales' subtitle='Prices as Marked' />
			<div className='pb-2 sm:w-1/2 w-full flex flex-row justify-center flex-wrap'>
				{vendorSales.map((vendor, i) => {
					const fixedVendor = vendor.vendor.replace(/\s+/g, '%20');
					return (
						<Link
							key={i}
							href={{
								pathname: '/vendorsearch/[vendorsearch]',
								query: { vendorsearch: fixedVendor },
							}}
						>
							<a>
								<div
									key={i}
									className='flex mx-1 mt-5 px-3 py-2 bg-purple-200 text-gray-700 rounded-lg cursor-pointer font-title'
								>
									<DiscountIcon />
									<span className='font-title text-dark-purple ml-5'>
										{vendor.vendor}
									</span>
									<span className='font-title text-dark-purple ml-5'>
										{vendor.sale}% Off!
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
