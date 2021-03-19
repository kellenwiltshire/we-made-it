import React from 'react';
import Link from 'next/link';

function CategorySelect() {
	return (
		<div className='container my-5'>
			<div className='w-full flex flex-row justify-between'>
				<Link
					href={{
						pathname: `/Shop/[...cat]`,
						query: { cat: 'ShopAll', name: 'Shop All', cursor: null },
					}}
				>
					<a className='border-2 border-purple-500 rounded-lg font-bold text-purple-500 px-4 py-3 transition duration-300 ease-in-out hover:bg-purple-500 hover:text-white mr-6'>
						Shop All
					</a>
				</Link>
				{/* <a
					href=''
					className='border-2 border-purple-500 rounded-lg font-bold text-purple-500 px-4 py-3 transition duration-300 ease-in-out hover:bg-purple-500 hover:text-white mr-6'
				>
					Gift Cards
				</a>
				<a
					href=''
					className='border-2 border-purple-500 rounded-lg font-bold text-purple-500 px-4 py-3 transition duration-300 ease-in-out hover:bg-purple-500 hover:text-white mr-6'
				>
					Category 1
				</a>
				<a
					href=''
					className='border-2 border-purple-500 rounded-lg font-bold text-purple-500 px-4 py-3 transition duration-300 ease-in-out hover:bg-purple-500 hover:text-white mr-6'
				>
					Category 2
				</a>
				<a
					href=''
					className='border-2 border-purple-500 rounded-lg font-bold text-purple-500 px-4 py-3 transition duration-300 ease-in-out hover:bg-purple-500 hover:text-white mr-6'
				>
					Category 3
				</a> */}
			</div>
		</div>
	);
}

export default CategorySelect;
