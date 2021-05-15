import React from 'react';
import Link from 'next/link';

function VendorCards({ vendor, image }) {
	const fixedVendor = vendor.replace(/\s+/g, '%20');
	return (
		<Link
			href={{
				pathname: '/vendorsearch/[vendorsearch]',
				query: { vendorsearch: fixedVendor },
			}}
		>
			<a>
				<div
					className='flex flex-wrap bg-white w-28 sm:w-40 md:w-80 rounded
					transform hover:shadow-xl duration-300 ease-in-out m-1 md:m-5'
				>
					<div className='flex flex-wrap bg-white w-28 sm:w-40 md:w-80 shadow rounded m-5'>
						<div>
							{image ? (
								<img src={image} alt='' width='600px' height='auto' />
							) : (
								<img
									src='/sparklelogoblack.png'
									alt=''
									width='600px'
									height='auto'
								/>
							)}
						</div>
					</div>
					<div className='flex flex-wrap bg-white w-28 sm:w-40 md:w-80'>
						<h2 className='text-xs sm:text-base md:text-xl uppercase text-center w-full font-title'>
							{vendor}
						</h2>
					</div>
				</div>
			</a>
		</Link>
	);
}

export default VendorCards;
