import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Headers from '../../components/Layout/Headers';
import Layout from '../../components/Layout/Layout';
import Pagination from '../../components/Layout/Pagination';
import ProductCards from '../../components/Product/ProductCards';
import { vendors } from '../../VendorList/VendorList';

export default function ShopCategories({ itemsWithPictures, cart }) {
	if (itemsWithPictures) {
		console.log(itemsWithPictures[0]);

		const initialItems = itemsWithPictures;
		const [perPage, setPerPage] = useState(50); //Number of Items per page - May allow changing in the future
		const [offset, setOffset] = useState(0); // Offset for Pagination
		const [items, setItems] = useState(initialItems); //Items, obviously
		const [currItems, setCurrItems] = useState(
			//Keeps track of the current items that are being displayed on the page
			items.slice(offset, offset + perPage),
		);
		const [numPages, setNumPages] = useState(initialItems.length / 50); //Determine number of pages
		const [sort, setSort] = useState(''); //Initial Sort State
		const [filterOpen, setFilterOpen] = useState(false);

		const [salePrices, setSalePrices] = useState([]);
		const checkForSalePrices = () => {
			const vendorList = vendors;
			const currentSales = vendorList.filter((sale) => {
				if (sale.sale) {
					return sale;
				} else {
					return;
				}
			});
			return currentSales;
		};

		useEffect(() => {
			setSalePrices(checkForSalePrices());
		}, []);

		const checkDiscounts = () => {
			currItems.filter((item) => {
				if (item.itemData.description) {
					for (let i = 0; i < salePrices.length; i++) {
						const lowerCaseVendor = salePrices[i].vendor.toLowerCase();
						const lowerCaseItem = item.itemData.description.toLowerCase();
						if (lowerCaseItem.includes(lowerCaseVendor)) {
							item.sale = salePrices[i].sale;
						}
					}
				}
			});
		};
		checkDiscounts();

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
			const filteredItems = initialItems.filter((item) => {
				if (item.itemData.description) {
					let fixedDescription = item.itemData.description.toLowerCase();
					let fixedFilterName = e.target.value.toLowerCase();
					return fixedDescription.includes(fixedFilterName);
				} else {
					return;
				}
			});
			updatePage(filteredItems, 0);
		};

		const sortChange = (e) => {
			if (e.target.value === 'Name Ascending (A-Z)') {
				let sortedItems = items.sort((a, b) => {
					return a.itemData.name.localeCompare(b.itemData.name);
				});
				updatePage(sortedItems, 0);
			} else if (e.target.value === 'Name Descending (Z-A)') {
				let sortedItems = items.sort((a, b) => {
					return a.itemData.name.localeCompare(b.itemData.name);
				});
				sortedItems.reverse();
				updatePage(sortedItems, 0);
			} else if (e.target.value === 'Price (Low to High)') {
				let sortedItems = items.sort((a, b) => {
					if (a.itemData.variations && b.itemData.variations) {
						if (
							a.itemData.variations[0].itemVariationData.pricingType ===
								'VARIABLE_PRICING' ||
							b.itemData.variations[0].itemVariationData.pricingType ===
								'VARIABLE_PRICING'
						) {
							return 0;
						} else if (
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
				updatePage(sortedItems, 0);
			} else if (e.target.value === 'Price (High to Low)') {
				let sortedItems = items.sort((a, b) => {
					if (a.itemData.variations && b.itemData.variations) {
						if (
							a.itemData.variations[0].itemVariationData.pricingType ===
								'VARIABLE_PRICING' ||
							b.itemData.variations[0].itemVariationData.pricingType ===
								'VARIABLE_PRICING'
						) {
							return 0;
						} else if (
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
			setItems(initialItems);
			setOffset(0);
			setSort('');
			setNumPages(initialItems.length / 50);
		};

		return (
			<Layout cart={cart} title={`Shop || We Made It`}>
				<div className='flex flex-row flex-wrap justify-center h-full'>
					<Headers title='Shop' />
					<div className='w-full flex flex-row flex-wrap justify-center'>
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
									className='text-sm md:text-base w-auto mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400  text-gray-800 font-semibold focus:border-dark-purple focus:outline-none m-2 font-body'
									onChange={filterChange}
									defaultValue='Filter Items'
								>
									<option>Filter Items</option>
									{vendors.map((vendor, i) => {
										return <option key={i}>{vendor.vendor}</option>;
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
						<div className='hidden sm:block'>
							<ReactPaginate
								pageCount={numPages}
								onPageChange={handlePageChange}
								pageRangeDisplayed={2}
								marginPagesDisplayed={1}
								previousClassName='py-1 px-2 border-dark-purple border w-50 text-center rounded-l font-title'
								breakClassName='py-1 px-2 border-dark-purple border'
								nextClassName='py-1 px-2 border-dark-purple border w-50 text-center rounded-r font-title'
								containerClassName='flex flex-row flex-wrap m-5 align-middle'
								pageClassName='py-1 px-2 border-dark-purple border font-body'
								activeClassName='bg-dark-purple text-gray-200'
							/>
						</div>
						<div className='block sm:hidden'>
							<Pagination
								numPages={numPages}
								handlePageChange={handlePageChange}
								rangeDisplayed={2}
								marginDisplayed={1}
								pageClass='hidden'
								breakClass='hidden'
							/>
						</div>
					</div>
					<div className='container m-1 lg:m-5 flex flex-row flex-wrap justify-center w-full font-body'>
						{currItems.map((item, i) => {
							let price;
							if (item.itemData.variations) {
								if (
									item.itemData.variations[0].itemVariationData.pricingType ===
									'VARIABLE_PRICING'
								) {
									price = 'Variable Pricing - Contact Store for Details';
									return (
										<ProductCards
											item={item}
											title={item.itemData.name}
											itemID={item.id}
											price={price}
											image={item.imageLink}
											key={Math.random()}
										/>
									);
								} else if (item.sale) {
									let currPrice =
										item.itemData.variations[0].itemVariationData.priceMoney
											.amount / 100;
									price = currPrice - currPrice * (item.sale / 100);
									price = price.toFixed(2);
									return (
										<ProductCards
											item={item}
											title={item.itemData.name}
											itemID={item.id}
											salePrice={price}
											image={item.imageLink}
											key={Math.random()}
										/>
									);
								} else {
									price = (
										item.itemData.variations[0].itemVariationData.priceMoney
											.amount / 100
									).toFixed(2);
									return (
										<ProductCards
											item={item}
											title={item.itemData.name}
											itemID={item.id}
											price={price}
											image={item.imageLink}
											key={Math.random()}
										/>
									);
								}
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
								previousClassName='py-1 px-2 border-dark-purple border w-50 text-center rounded-l font-title'
								breakClassName='py-1 px-2 border-dark-purple border'
								nextClassName='py-1 px-2 border-dark-purple border w-50 text-center rounded-r font-title'
								containerClassName='flex flex-row flex-wrap m-5 align-middle'
								pageClassName='py-1 px-2 border-dark-purple border font-body'
								activeClassName='bg-dark-purple text-gray-200'
							/>
						</div>
						<div className='block sm:hidden'>
							<ReactPaginate
								pageCount={numPages}
								onPageChange={handlePageChange}
								pageRangeDisplayed={2}
								marginPagesDisplayed={1}
								previousClassName='m-2 py-1 px-2 border-dark-purple border w-50 text-center rounded-l font-title'
								breakClassName='hidden'
								nextClassName='m-2 py-1 px-2 border-dark-purple border w-50 text-center rounded-r font-title'
								containerClassName='flex flex-row flex-wrap m-5 align-middle'
								pageClassName='hidden'
								activeClassName='bg-dark-purple text-gray-200'
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
	const res = await fetch('http://localhost:4000/newcatalog', {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
	});
	const data = await res.json();
	const itemsWithPictures = data.items;
	return {
		props: { itemsWithPictures },
		revalidate: 3600,
	};
}
