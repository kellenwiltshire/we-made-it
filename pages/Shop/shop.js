import React, { useState, useEffect } from 'react';
import Headers from '../../components/Layout/Headers';
import Head from 'next/head';
import Pagination from '../../components/Layout/Pagination';
import ProductCards from '../../components/Product/ProductCards';
import { vendors } from '../../VendorList/VendorList';
import JSONBig from 'json-bigint';
import { Client, Environment } from 'square';
import { useRouter } from 'next/router';
import { checkProductDiscounts } from '../../utils/sales';
import { filterChange, sortChange, locationChange } from '../../utils/sort';
import { useSelector } from 'react-redux';

const getItems = () => {
	return useSelector((state) => ({ itemsWithPictures: state.items }));
};

export default function ShopCategories({ vendorSales, setNavStyle }) {
	const { itemsWithPictures } = getItems();
	console.log(itemsWithPictures);

	const newcastleStore = 'L0SCPZY3N0MGA';
	setNavStyle('shop');
	if (itemsWithPictures) {
		const initialItems = itemsWithPictures;
		const [perPage, setPerPage] = useState(50); //Number of Items per page - May allow changing in the future
		const [currPage, setCurrPage] = useState(0);
		const [offset, setOffset] = useState(currPage * perPage); // Offset for Pagination
		const [items, setItems] = useState(initialItems); //Items, obviously
		const [currItems, setCurrItems] = useState(
			//Keeps track of the current items that are being displayed on the page
			initialItems.slice(offset, offset + perPage),
		);
		const [numPages, setNumPages] = useState(initialItems.length / 50); //Determine number of pages
		const [sort, setSort] = useState(''); //Initial Sort State
		const [filterOpen, setFilterOpen] = useState(false);
		const router = useRouter();

		checkProductDiscounts(currItems, vendorSales);

		//This looks at the URL to see if the user's url has already been looking through product pages and updates the current items accordingly
		useEffect(() => {
			const urlString = document.location.href;
			if (urlString.includes('page')) {
				const urlSplitString = urlString.split('=');
				const urlNumber = Number(urlSplitString[1]);
				const newPageNumber = urlNumber - 1;
				if (newPageNumber < 1) {
					setCurrPage(0);
					router.push(`?page=${currPage + 1}`, undefined, { shallow: true });
				} else {
					setCurrPage(newPageNumber);
					router.push(`?page=${newPageNumber + 1}`, undefined, {
						shallow: true,
					});
					setOffset(newPageNumber * perPage);
				}
			} else {
				router.push(`?page=${currPage + 1}`, undefined, { shallow: true });
			}
		}, []);

		//This effect updates the items on the page when a new page is selected
		//This also sets the URL so that if the user navigates back from looking at a product they don't lose their place.
		useEffect(() => {
			setCurrItems(items.slice(offset, offset + perPage));
			router.push(`?page=${currPage + 1}`, undefined, { shallow: true });
		}, [offset]);

		//This effect updates the current items on the page whenever the sort method changes
		useEffect(() => {
			if (items.length > 50) {
				setCurrItems(items.slice(offset, offset + perPage));
			} else setCurrItems(items);
			const sortSelection = document.querySelector('#sort');
			const filterSelection = document.querySelector('#filter');

			sortSelection.selectedIndex = 0;
			filterSelection.selectedIndex = 0;
		}, [sort, items]);

		//This function makes sure everything is reset and correct whenever sort or filters have been applied
		const updatePage = (newItems, sort) => {
			setItems(newItems);
			setOffset(0);
			setCurrPage(0);
			setSort(sort);
			setNumPages(newItems.length / 50);
		};

		const handlePageChange = (e) => {
			const selectedPage = e.selected;
			const newOffset = selectedPage * perPage;
			setOffset(newOffset);
			setCurrPage(e.selected);
			window.scrollTo(0, 0);
		};

		//Handles a filter reset
		const resetItems = (e) => {
			e.preventDefault();
			setItems(initialItems);
			setCurrPage(0);
			setOffset(0);
			setNumPages(initialItems.length / 50);
		};

		return (
			<div className='mx-auto min-h-screen flex justify-center flex-row flex-wrap'>
				<Head>
					<title>Shop || We Made It</title>
				</Head>
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
									onChange={(e) =>
										updatePage(
											sortChange(e, items, initialItems),
											e.target.value,
										)
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
									name='location'
									id='location'
									className='text-sm md:text-base w-auto mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400  text-gray-800 font-semibold focus:border-dark-purple focus:outline-none m-2 font-body'
									onChange={(e) =>
										updatePage(locationChange(e, items), e.target.value)
									}
									defaultValue='Location'
								>
									<option>Location</option>
									<option>Newcastle</option>
									<option>Cobourg</option>
								</select>
								<select
									type='name'
									name='filter'
									id='filter'
									className='text-sm md:text-base w-auto mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400  text-gray-800 font-semibold focus:border-dark-purple focus:outline-none m-2 font-body'
									onChange={(e) => updatePage(filterChange(e, initialItems), 0)}
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
							<Pagination
								numPages={numPages}
								handlePageChange={handlePageChange}
								rangeDisplayed={2}
								marginDisplayed={1}
								pageClass='py-1 px-2 font-body border-dark-purple border font-body cursor-pointer'
								breakClass='border border-dark-purple text-gray-200'
								currPage={currPage}
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
								currPage={currPage}
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
											location={item.presentAtLocationIds}
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
											location={item.presentAtLocationIds}
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
											location={item.presentAtLocationIds}
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
							<Pagination
								numPages={numPages}
								handlePageChange={handlePageChange}
								rangeDisplayed={2}
								marginDisplayed={1}
								pageClass='py-1 px-2 border-dark-purple border font-body cursor-pointer'
								breakClass='border border-dark-purple text-gray-200'
								currPage={currPage}
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
								currPage={currPage}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className='mx-auto min-h-screen flex justify-center flex-row flex-wrap'>
				<Head>
					<title>Shop || We Made It</title>
				</Head>
				<Headers title='OOPS! Something Went Wrong!' />
				<p className='font-body'>
					This is Embarassing! We might be having trouble connecting with
					Square. Please try again later!
				</p>
			</div>
		);
	}
}

export async function getStaticProps() {
	const client = new Client({
		environment: Environment.Production,
		accessToken: process.env.SQUARE_ACCESS_TOKEN,
	});
	console.log('Shop Page Revalidate');

	const recursiveCatalog = async (cursor = '', initialRequest = true) => {
		let opts = 'ITEM';
		const catalog = client.catalogApi;

		const response = await catalog.listCatalog(cursor, opts);
		const data = JSONBig.parse(JSONBig.stringify(response.result.objects));
		const newCursor = response.result.cursor;

		if (initialRequest && cursor === '') {
			return data.concat(await recursiveCatalog(newCursor, false));
		} else if (!initialRequest && !cursor) {
			return data;
		} else {
			return data.concat(await recursiveCatalog(newCursor, false));
		}
	};

	const newImageRequest = async (items) => {
		const catalog = client.catalogApi;

		let newItemsWithPictures = [];

		for (let i = 0; i < items.length; i++) {
			const response = await catalog.retrieveCatalogObject(items[i].imageId);
			items[i].imageLink = response.result.object.imageData.url;
			newItemsWithPictures.push(items[i]);
		}
		return newItemsWithPictures;
	};

	let items = [];
	let filteredItems = [];

	//This grabs the entire catalog at once through recursion
	//! items = await recursiveCatalog();

	//!DEV
	const catalog = client.catalogApi;
	const response = await catalog.listCatalog('', 'ITEM');
	items = JSONBig.parse(JSONBig.stringify(response.result.objects));

	//Then the items are filtered so that only ones that have photo's are returned
	if (items) {
		const dataItems = items;
		for (let i = 0; i < dataItems.length; i++) {
			if (dataItems[i].imageId) {
				filteredItems.push(dataItems[i]);
			}
		}

		//Finally, before returning the list of Items it grabs the URL for the photo's for each item -- This takes a while!
		const itemsWithPictures = await newImageRequest(filteredItems);

		return {
			props: {
				initialReduxState: {
					items: itemsWithPictures,
				},
			},
		};

		// return {
		// 	props: { itemsWithPictures },
		// 	revalidate: 60,
		// };
	}
}
