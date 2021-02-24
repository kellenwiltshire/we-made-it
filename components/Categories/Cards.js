import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

function VendorCards() {
	return (
		<Link
			href={{
				pathname: '/',
				// query: { cat: wallhanging_id, name: 'Wall Hangings' },
			}}
		>
			<a>
				<div className='flex bg-white w-28 sm:w-40 md:w-80 shadow-lg cursor-pointer rounded transform hover:scale-105 duration-300 ease-in-out m-5'>
					<div>
						<Image
							src='/small-purple-splash.png'
							alt=''
							height={600}
							width={600}
						/>
					</div>
					<div className='absolute z-10 bottom-4 w-full'>
						<h2 className='text-xs sm:text-base md:text-2xl uppercase text-center text-white bg-dark-purple bg-opacity-50'>
							Test Categories
						</h2>
					</div>
				</div>
			</a>
		</Link>
	);
}

export default VendorCards;
