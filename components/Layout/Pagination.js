import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

function Pagination({ currentCursor, name, cat }) {
	const router = useRouter();
	return (
		<div className='w-full flex justify-center md:m-10'>
			<ul className='flex'>
				<li className='mx-1 px-3 py-2 bg-purple-200 text-gray-700 hover:bg-purple-700 hover:text-gray-200 rounded-lg cursor-pointer'>
					<div
						onClick={() => router.back()}
						className='flex items-center font-bold'
					>
						<span className='mx-1 font-title'>Previous</span>
					</div>
				</li>

				<li className='mx-1 px-3 py-2 bg-purple-200 text-gray-700 hover:bg-purple-700 hover:text-gray-200 rounded-lg cursor-pointer'>
					<Link
						href={{
							pathname: `/Shop/${cat[0]}`,
							query: { cat: cat[0], name: name, cursor: currentCursor },
						}}
					>
						<div className='flex items-center font-bold'>
							<span className='mx-1 font-title'>Next</span>
						</div>
					</Link>
				</li>
			</ul>
		</div>
	);
}

export default Pagination;
