import React from 'react';
import Link from 'next/link';

function VendorCards({ vendor, image, owner }) {
	return (
		<div className='flex flex-wrap bg-white w-28 sm:w-40 md:w-80 shadow-lg rounded transform hover:scale-105 duration-300 ease-in-out m-1 md:m-5'>
			<div className='flex flex-wrap bg-white w-28 sm:w-40 md:w-80 shadow rounded m-5'>
				<div>
					<img src={image} alt='' width='600px' height='auto' />
				</div>
			</div>
			<div className='flex flex-wrap bg-white w-28 sm:w-40 md:w-80'>
				<h2 className='text-xs sm:text-base md:text-xl uppercase text-center w-full'>
					{vendor}
				</h2>
				<h2 className='text-xs sm:text-base md:text-xl text-center w-full'>
					{owner}
				</h2>
			</div>
		</div>
	);
}

export default VendorCards;
