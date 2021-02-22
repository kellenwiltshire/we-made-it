import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

function Categories() {
	return (
		<div className='m-1 sm:m-5 flex flex-row flex-wrap justify-around w-full font-body'>
			<Link
				href={{
					pathname: '/',
					// query: { cat: wallhanging_id, name: 'Wall Hangings' },
				}}
			>
				<a>
					<div className='bg-white w-28 sm:w-40 md:w-80 shadow-lg cursor-pointer rounded transform hover:scale-105 duration-300 ease-in-out'>
						<div
							style={{
								clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 80%)',
							}}
						>
							<Image
								src='/Plain-Logo-White.png'
								alt=''
								height={800}
								width={600}
							/>
						</div>
						<div className='p-4'>
							<h2 className='text-xs sm:text-base md:text-2xl uppercase text-center'>
								Test Categories
							</h2>
						</div>
					</div>
				</a>
			</Link>

			<Link
				href={{
					pathname: '/',
					// query: { cat: wallhanging_id, name: 'Wall Hangings' },
				}}
			>
				<a>
					<div className='bg-white w-28 sm:w-40 md:w-80 shadow-lg cursor-pointer rounded transform hover:scale-105 duration-300 ease-in-out'>
						<div
							style={{
								clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 80%)',
							}}
						>
							<Image
								src='/Plain-Logo-White.png'
								alt=''
								height={800}
								width={600}
							/>
						</div>
						<div className='p-4'>
							<h2 className='text-xs sm:text-base md:text-2xl uppercase text-center'>
								Test Categories
							</h2>
						</div>
					</div>
				</a>
			</Link>
			<Link
				href={{
					pathname: '/',
					// query: { cat: wallhanging_id, name: 'Wall Hangings' },
				}}
			>
				<a>
					<div className='bg-white w-28 sm:w-40 md:w-80 shadow-lg cursor-pointer rounded transform hover:scale-105 duration-300 ease-in-out'>
						<div
							style={{
								clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 80%)',
							}}
						>
							<Image
								src='/Plain-Logo-White.png'
								alt=''
								height={800}
								width={600}
							/>
						</div>
						<div className='p-4'>
							<h2 className='text-xs sm:text-base md:text-2xl uppercase text-center'>
								Test Categories
							</h2>
						</div>
					</div>
				</a>
			</Link>
		</div>
	);
}

export default Categories;
