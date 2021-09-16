import React, { useState } from 'react';
import { vendorLocationChange } from '../../utils/sort';
import { locations } from '../../utils/options';

export default function VendorFilters({ updatePage, resetItems, vendors }) {
	const [filterOpen, setFilterOpen] = useState(false);
	return (
		<>
			<div className='w-full flex justify-center'>
				<button
					className=' block lg:hidden mx-1 mt-5 px-3 py-2 bg-purple-200 text-gray-700 hover:bg-dark-purple hover:text-gray-200 rounded-lg cursor-pointer font-title'
					type='button'
					onClick={() => setFilterOpen(!filterOpen)}
					aria-label='Filter Button'
				>
					Filters
				</button>
			</div>
			<div
				className={
					'lg:flex flex-grow items-center w-full' +
					(filterOpen ? ' flex' : ' hidden')
				}
			>
				<div className='w-full justify-center flex flex-row flex-wrap align-middle'>
					<select
						type='name'
						name='location'
						id='location'
						className='text-sm md:text-base w-auto mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400  text-gray-800 font-semibold focus:border-dark-purple focus:outline-none m-2 font-body'
						onChange={(e) =>
							updatePage(vendorLocationChange(e.target.value, vendors))
						}
						defaultValue='Location'
					>
						<option>Location</option>
						{locations.map((loc) => {
							return <option key={loc}>{loc}</option>;
						})}
					</select>
					<button
						onClick={resetItems}
						type='submit'
						className='m-2 mt-2 px-3 py-2 bg-purple-200 text-gray-700 hover:bg-dark-purple hover:text-gray-200 rounded-lg cursor-pointer font-title'
					>
						Reset Filters
					</button>
				</div>
			</div>
		</>
	);
}
