import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Headers from '../../components/Layout/Headers';
import Layout from '../../components/Layout/Layout';
import ProductCards from '../../components/Product/ProductCards';
import CategorySelect from '../../components/Categories/CategorySelect';
import Pagination from '../../components/Layout/Pagination';

export default function ShopCategories({ data, cart }) {
	if (data) {
		const [items, setItems] = useState([]);
		const [currItems, setCurrItems] = useState([]);
		const [currPage, setCurrPage] = useState(1);
		const [numPages, setNumPages] = useState(1);
		const dataItems = data.items;
		let itemsWithPictures = [];
		for (let i = 0; i < dataItems.length; i++) {
			if (dataItems[i].imageId) {
				itemsWithPictures.push(dataItems[i]);
			}
		}
		const getCurrItems = (page) => {
			const start = page * 50 - 50;
			const currentItems = items.slice(start, start + 50);
			return currentItems;
		};
		const handlePageChange = (e) => {
			e.preventDefault();
			const page = e.selected + 1;
			setCurrPage(page);
			const start = e.selected * 50 - 50;
			const currentItems = items.slice(start, start + 50);
			setCurrItems(currentItems);
		};

		useEffect(() => {
			setItems(itemsWithPictures);
			setCurrItems(getCurrItems(currPage));
			setNumPages(itemsWithPictures.length / 50);
		}, [currPage]);
		console.log('Current Items: ', currItems);
		console.log('All Items: ', items);
		console.log(numPages);
		return (
			<Layout cart={cart} title={`Shop || We Made It`}>
				<Headers title='Shop' />
				{/* <CategorySelect /> */}
				{/* <Pagination currentCursor={currentCursor} name={name} cat={cat} /> */}
				<div className='w-full flex justify-center'>
					<ReactPaginate
						pageCount={numPages}
						onPageChange={handlePageChange}
						pageRangeDisplayed={5}
						marginPagesDisplayed={2}
					/>
				</div>
				<div className='container m-1 lg:m-5 flex flex-row flex-wrap justify-center w-full font-body'>
					{currItems.map((list, i) => {
						let price = (
							items[i].itemData.variations[0].itemVariationData.priceMoney
								.amount / 100
						).toFixed(2);

						return (
							<ProductCards
								item={items[i]}
								title={items[i].itemData.name}
								itemID={items[i].id}
								price={price}
								defaultImage='/pictureComingSoon.png'
							/>
						);
					})}
				</div>
				{/* <Pagination currentCursor={currentCursor} name={name} cat={cat} /> */}
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
	try {
		const res = await fetch('https://we-made-it-api.herokuapp.com/newcatalog', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
		});
		const data = await res.json();
		return {
			props: { data },
			revalidate: 3600,
		};
	} catch (error) {
		return {
			props: {},
		};
	}
}
