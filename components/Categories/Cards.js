import React from 'react';
import Link from 'next/link';

function Cards({ title, image, category, id }) {
	let cat = category.replace(' ', '');
	let name = category;
	return (
		<Link
			href={{
				pathname: `/Shop/[...cat]`,
				query: { cat: cat, name: name, cursor: null },
			}}
		>
			<a>
				<div className='flex bg-white w-28 sm:w-40 md:w-80 shadow-lg cursor-pointer rounded transform hover:scale-105 duration-300 ease-in-out m-5'>
					<div>
						<img src={image} alt='' width='600px' height='auto' />
					</div>
					<div className='absolute z-10 bottom-4 w-full'>
						<h2 className='text-xs sm:text-base md:text-2xl uppercase text-center text-white bg-dark-purple bg-opacity-50 font-title'>
							{title}
						</h2>
					</div>
				</div>
			</a>
		</Link>
	);
}

export default Cards;
