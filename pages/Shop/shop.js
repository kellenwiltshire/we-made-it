import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Headers from '../../components/Layout/Headers';
import Layout from '../../components/Layout/Layout';
import ProductCards from '../../components/Product/ProductCards';
import { vendors } from '../../VendorList/VendorList';

export default function ShopCategories({ itemsWithPictures, cart }) {
	if (itemsWithPictures) {
		const [perPage, setPerPage] = useState(50); //Number of Items per page - May allow changing in the future
		const [offset, setOffset] = useState(0); // Offset for Pagination
		const [items, setItems] = useState(itemsWithPictures); //Items, obviously
		const [currItems, setCurrItems] = useState(
			//Keeps track of the current items that are being displayed on the page
			items.slice(offset, offset + perPage),
		);
		const [numPages, setNumPages] = useState(itemsWithPictures.length / 50); //Determine number of pages
		const [sort, setSort] = useState(''); //Initial Sort State
		const [filterOpen, setFilterOpen] = useState(false);

		//This effect updates the items on the page when a new page is selected
		useEffect(() => {
			setCurrItems(items.slice(offset, offset + perPage));
		}, [offset]);

		//This effect updates the current items on the page whenever the sort method changes
		useEffect(() => {
			setCurrItems(items.slice(offset, offset + perPage));
			const sortSelection = document.querySelector('#sort');
			const filterSelection = document.querySelector('#filter');

			sortSelection.selectedIndex = 0;
			filterSelection.selectedIndex = 0;
		}, [sort]);

		//This function makes sure everything is reset and correct whenever sort or filters have been applied
		const updatePage = (newItems, pageNum) => {
			setItems(newItems);
			setOffset(0);
			setSort(pageNum);
			setNumPages(newItems.length / 50);
		};

		const filterChange = (e) => {
			const filteredItems = itemsWithPictures.filter((item) => {
				if (item.itemData.description) {
					let fixedDescription = item.itemData.description.toLowerCase();
					let fixedFilterName = e.target.value.toLowerCase();
					return fixedDescription.includes(fixedFilterName);
				} else {
					return;
				}
			});
			updatePage(filteredItems, e.target.value);
		};

		const sortChange = (e) => {
			if (e.target.value === 'Name Ascending (A-Z)') {
				let sortedItems = items.sort((a, b) => {
					return a.itemData.name.localeCompare(b.itemData.name);
				});
				updatePage(sortedItems, e.target.value);
			} else if (e.target.value === 'Name Descending (Z-A)') {
				let sortedItems = items.sort((a, b) => {
					return a.itemData.name.localeCompare(b.itemData.name);
				});
				sortedItems.reverse();
				updatePage(sortedItems, e.target.value);
			} else if (e.target.value === 'Price (Low to High)') {
				let sortedItems = items;
				sortedItems.sort((a, b) => {
					if (a.itemData.variations && b.itemData.variations) {
						if (
							a.itemData.variations[0].itemVariationData.priceMoney.amount >
							b.itemData.variations[0].itemVariationData.priceMoney.amount
						) {
							return 1;
						} else if (
							a.itemData.variations[0].itemVariationData.priceMoney.amount <
							b.itemData.variations[0].itemVariationData.priceMoney.amount
						) {
							return -1;
						} else {
							return 0;
						}
					} else {
						return 0;
					}
				});
				updatePage(sortedItems, e.target.value);
			} else if (e.target.value === 'Price (High to Low)') {
				let sortedItems = items;
				sortedItems.sort((a, b) => {
					if (a.itemData.variations && b.itemData.variations) {
						if (
							a.itemData.variations[0].itemVariationData.priceMoney.amount >
							b.itemData.variations[0].itemVariationData.priceMoney.amount
						) {
							return 1;
						} else if (
							a.itemData.variations[0].itemVariationData.priceMoney.amount <
							b.itemData.variations[0].itemVariationData.priceMoney.amount
						) {
							return -1;
						} else {
							return 0;
						}
					} else {
						return 0;
					}
				});
				sortedItems.reverse();
				updatePage(sortedItems, e.target.value);
			} else {
				updatePage(itemsWithPictures, e.target.value);
			}
		};

		const handlePageChange = (e) => {
			const selectedPage = e.selected;
			const newOffset = selectedPage * perPage;
			setOffset(newOffset);
		};

		//Handles a filter reset
		const resetItems = (e) => {
			e.preventDefault();
			setItems(itemsWithPictures);
			setOffset(0);
			setSort('');
			setNumPages(itemsWithPictures.length / 50);
		};

		return (
			<Layout cart={cart} title={`Shop || We Made It`}>
				<div className='flex flex-row flex-wrap justify-center h-full'>
					<Headers title='Shop' />
					<div className='w-full flex flex-row flex-wrap justify-center'>
						<button
							className='text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent flex justify-center lg:hidden outline-none focus:outline-none w-full'
							type='button'
							onClick={() => setFilterOpen(!filterOpen)}
							aria-label='Filter Button'
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								class='icon icon-tabler icon-tabler-filter'
								width='24'
								height='24'
								viewBox='0 0 24 24'
								stroke-width='1.5'
								stroke='#604195'
								fill='none'
								stroke-linecap='round'
								stroke-linejoin='round'
							>
								<path stroke='none' d='M0 0h24v24H0z' fill='none' />
								<path d='M5.5 5h13a1 1 0 0 1 .5 1.5l-5 5.5l0 7l-4 -3l0 -4l-5 -5.5a1 1 0 0 1 .5 -1.5' />
							</svg>
						</button>
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
									className='text-sm md:text-base w-auto mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400  text-gray-800 font-semibold focus:border-dark-purple focus:outline-none m-2'
									onChange={sortChange}
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
									className='text-sm md:text-base w-auto mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400  text-gray-800 font-semibold focus:border-dark-purple focus:outline-none m-2'
									onChange={filterChange}
									defaultValue='Filter Items'
								>
									<option>Filter Items</option>
									{vendors.map((ven, i) => {
										return <option key={i}>{vendors[i].vendor}</option>;
									})}
								</select>
								<button
									onClick={resetItems}
									type='submit'
									className='text-sm md:text-base w-auto mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 text-gray-800 font-semibold focus:border-dark-purple focus:outline-none m-2 hover:bg-dark-purple hover:text-white'
								>
									Reset Filters
								</button>
							</div>
						</div>
						<div className='hidden sm:block'>
							<ReactPaginate
								pageCount={numPages}
								onPageChange={handlePageChange}
								pageRangeDisplayed={2}
								marginPagesDisplayed={1}
								previousClassName='py-1 px-2 border-dark-purple border w-50 text-center'
								breakClassName='p-2 border-dark-purple border'
								nextClassName='py-1 px-2 border-dark-purple border w-50 text-center'
								containerClassName='flex flex-row flex-wrap m-5 align-middle'
								pageClassName='p-2 border-dark-purple border'
								activeClassName='bg-dark-purple text-white'
							/>
						</div>
						<div className='block sm:hidden'>
							<ReactPaginate
								pageCount={numPages}
								onPageChange={handlePageChange}
								pageRangeDisplayed={2}
								marginPagesDisplayed={1}
								previousClassName='m-2 py-1 px-2 border-dark-purple border w-50 text-center'
								breakClassName='hidden'
								nextClassName='m-2 py-1 px-2 border-dark-purple border w-50 text-center'
								containerClassName='flex flex-row flex-wrap m-5 align-middle'
								pageClassName='hidden'
								activeClassName='bg-dark-purple text-white'
							/>
						</div>
					</div>
					<div className='container m-1 lg:m-5 flex flex-row flex-wrap justify-center w-full font-body'>
						{currItems.map((list, i) => {
							let price;
							if (currItems[i].itemData.variations) {
								price = (
									currItems[i].itemData.variations[0].itemVariationData
										.priceMoney.amount / 100
								).toFixed(2);
								return (
									<ProductCards
										item={currItems[i]}
										title={currItems[i].itemData.name}
										itemID={currItems[i].id}
										price={price}
										defaultImage='/sparklelogoblack.png'
										key={Math.random()}
									/>
								);
							} else {
								return;
							}
						})}
					</div>
					<div className='w-full flex flex-row flex-wrap justify-center'>
						<div className='hidden sm:block'>
							<ReactPaginate
								pageCount={numPages}
								onPageChange={handlePageChange}
								pageRangeDisplayed={2}
								marginPagesDisplayed={1}
								previousClassName='py-1 px-2 border-dark-purple border w-50 text-center'
								breakClassName='p-2 border-dark-purple border'
								nextClassName='py-1 px-2 border-dark-purple border w-50 text-center'
								containerClassName='flex flex-row flex-wrap m-5 align-middle'
								pageClassName='p-2 border-dark-purple border'
								activeClassName='bg-dark-purple text-white'
							/>
						</div>
						<div className='block sm:hidden'>
							<ReactPaginate
								pageCount={numPages}
								onPageChange={handlePageChange}
								pageRangeDisplayed={2}
								marginPagesDisplayed={1}
								previousClassName='m-2 py-1 px-2 border-dark-purple border w-50 text-center'
								breakClassName='hidden'
								nextClassName='m-2 py-1 px-2 border-dark-purple border w-50 text-center'
								containerClassName='flex flex-row flex-wrap m-5 align-middle'
								pageClassName='hidden'
								activeClassName='bg-dark-purple text-white'
							/>
						</div>
					</div>
				</div>
			</Layout>
		);
	} else {
		return (
			<Layout cart={cart} title={`Shop || We Made It`}>
				<Headers title='OOPS! Something Went Wrong!' />
				<p className='font-body'>
					This is Embarassing! We might be having trouble connecting with
					Square. Please try again later!
				</p>
			</Layout>
		);
	}
}

export async function getStaticProps() {
	let itemsWithPictures = [];
	try {
		const res = await fetch('https://we-made-it-api.herokuapp.com/newcatalog', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
		});
		const data = await res.json();
		const dataItems = data.items;
		for (let i = 0; i < dataItems.length; i++) {
			if (dataItems[i].imageId) {
				itemsWithPictures.push(dataItems[i]);
			}
		}
		return {
			props: { itemsWithPictures },
			revalidate: 3600,
		};
	} catch (error) {
		return {
			props: {},
		};
	}
}
