import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Headers from '../../components/Layout/Headers';
import Layout from '../../components/Layout/Layout';
import ProductCards from '../../components/Product/ProductCards';
import CategorySelect from '../../components/Categories/CategorySelect';

export default function ShopCategories({ itemsWithPictures, cart }) {
	if (itemsWithPictures) {
		const [perPage, setPerPage] = useState(50);
		const [offset, setOffset] = useState(0);
		const [items, setItems] = useState(itemsWithPictures);
		const [currItems, setCurrItems] = useState(
			items.slice(offset, offset + perPage),
		);
		const [numPages, setNumPages] = useState(itemsWithPictures.length / 50);
		const [sort, setSort] = useState('');

		useEffect(() => {
			setCurrItems(items.slice(offset, offset + perPage));
		}, [offset]);

		useEffect(() => {
			setCurrItems(items.slice(offset, offset + perPage));
		}, [sort]);

		const sortChange = (e) => {
			if (e.target.value === 'Name Ascending (A-Z)') {
				let sortedItems = items.sort((a, b) => {
					return a.itemData.name.localeCompare(b.itemData.name);
				});
				setItems(sortedItems);
				setOffset(0);
				setSort(e.target.value);
			} else if (e.target.value === 'Name Descending (Z-A)') {
				let sortedItems = items.sort((a, b) => {
					return a.itemData.name.localeCompare(b.itemData.name);
				});
				sortedItems.reverse();
				setItems(sortedItems);
				setOffset(0);
				setSort(e.target.value);
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
				setItems(sortedItems);
				setOffset(0);
				setSort(e.target.value);
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
				setItems(sortedItems);
				setOffset(0);
				setSort(e.target.value);
			} else {
				setItems(itemsWithPictures);
				setOffset(0);
				setSort(e.target.value);
			}
		};

		const handlePageChange = (e) => {
			const selectedPage = e.selected;
			const newOffset = selectedPage * perPage;
			setOffset(newOffset);
		};

		return (
			<Layout cart={cart} title={`Shop || We Made It`}>
				<Headers title='Shop' />
				{/* <CategorySelect /> */}
				<div className='w-full flex flex-row flex-wrap justify-center'>
					<ReactPaginate
						pageCount={numPages}
						onPageChange={handlePageChange}
						pageRangeDisplayed={5}
						marginPagesDisplayed={2}
						containerClassName={'pagination'}
						subContainerClassName={'pages pagination'}
						activeClassName={'active'}
					/>
					<div className='w-full justify-center flex align-middle'>
						<label htmlFor='plan'>Sort</label>
						<select
							type='name'
							name='sort'
							id='sort'
							className='w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-purple-500 focus:outline-none'
							onChange={sortChange}
							defaultValue='---'
						>
							<option>---</option>
							<option>Name Ascending (A-Z)</option>
							<option>Name Descending (Z-A)</option>
							<option>Price (High to Low)</option>
							<option>Price (Low to High)</option>
						</select>
					</div>
				</div>
				<div className='container m-1 lg:m-5 flex flex-row flex-wrap justify-center w-full font-body'>
					{currItems.map((list, i) => {
						let price;
						if (currItems[i].itemData.variations) {
							price = (
								currItems[i].itemData.variations[0].itemVariationData.priceMoney
									.amount / 100
							).toFixed(2);
						} else {
							price = '??.??';
						}

						return (
							<ProductCards
								item={currItems[i]}
								title={currItems[i].itemData.name}
								itemID={currItems[i].id}
								price={price}
								defaultImage='/pictureComingSoon.png'
								key={Math.random()}
							/>
						);
					})}
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
