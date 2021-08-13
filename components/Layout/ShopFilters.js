import React from 'react';
import { filterChange, sortChange, locationChange } from '../../utils/sort';
import { categories, locations } from '../../utils/options';
import { vendors } from '../../VendorList/VendorList';

export default function ShopFilters({
	setFilterOpen,
	filterOpen,
	updatePage,
	resetItems,
	items,
	initialItems,
}) {
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
						name='sort'
						id='sort'
						className='text-sm md:text-base w-auto mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400  text-gray-800 font-semibold focus:border-dark-purple focus:outline-none m-2 font-body'
						onChange={(e) =>
							updatePage(sortChange(e, items, initialItems), e.target.value)
						}
						defaultValue='Sort Items'
					>
						<option>Sort Items</option>
						<option>Name Ascending (A-Z)</option>
						<option>Name Descending (Z-A)</option>
						<option>Price (High to Low)</option>
						<option>Price (Low to High)</option>
					</select>
					<select
						type='name'
						name='filter'
						id='filter'
						className='text-sm md:text-base w-auto mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400  text-gray-800 font-semibold focus:border-dark-purple focus:outline-none m-2 font-body'
						onChange={(e) => updatePage(filterChange(e, initialItems), 0)}
						defaultValue='Vendors'
					>
						<option>Vendors</option>
						{vendors.map((vendor, i) => {
							return <option key={i}>{vendor.vendor}</option>;
						})}
					</select>
					<select
						type='name'
						name='location'
						id='location'
						className='text-sm md:text-base w-auto mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400  text-gray-800 font-semibold focus:border-dark-purple focus:outline-none m-2 font-body'
						onChange={(e) =>
							updatePage(locationChange(e, items), e.target.value)
						}
						defaultValue='Location'
					>
						<option>Location</option>
						{locations.map((loc) => {
							return <option key={loc}>{loc}</option>;
						})}
					</select>
					<select
						type='name'
						name='category'
						id='category'
						className='text-sm md:text-base w-auto mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400  text-gray-800 font-semibold focus:border-dark-purple focus:outline-none m-2 font-body'
						// onChange={(e) =>
						// 	updatePage(locationChange(e, items), e.target.value)
						// }
						defaultValue='Category'
					>
						<option>Category</option>
						{categories.map((cat) => {
							return <option key={cat}>{cat}</option>;
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
