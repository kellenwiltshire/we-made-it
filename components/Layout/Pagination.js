import React from 'react';
import Link from 'next/link';

function Pagination({ currentCursor, name, cat }) {
	return (
		<div className='w-full flex justify-center m-10'>
			<ul className='flex'>
				<li className='mx-1 px-3 py-2 bg-gray-200 text-gray-500 rounded-lg'>
					<Link
						href={{
							pathname: `Shop/${cat}`,
							query: { cat: cat, name: name, cursor: currentCursor },
						}}
					>
						<div className='flex items-center font-bold'>
							<span className='mx-1'>previous</span>
						</div>
					</Link>
				</li>

				<li className='mx-1 px-3 py-2 bg-gray-200 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg'>
					<Link
						href={{
							pathname: `Shop/${cat}`,
							query: { cat: cat, name: name, cursor: currentCursor },
						}}
					>
						<div className='flex items-center font-bold'>
							<span className='mx-1'>Next</span>
						</div>
					</Link>
				</li>
			</ul>
		</div>
	);
}

export default Pagination;
