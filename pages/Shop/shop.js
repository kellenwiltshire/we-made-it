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
		const [numPages, setNumPages] = useState(1);
		const [offset, setOffset] = useState(0);
		const [perPage, setPerPage] = useState(50);
		const dataItems = data.items;
		let itemsWithPictures = [];
		for (let i = 0; i < dataItems.length; i++) {
			if (dataItems[i].imageId) {
				itemsWithPictures.push(dataItems[i]);
			}
		}

		const handlePageChange = (e) => {
			let newOffSet;
			console.log('Selected Page: ', e.selected);
			if (e.selected === 0) {
				newOffSet = 0;
				setOffset(newOffSet);
				console.log('Offset: ', offset);
			} else {
				newOffSet = e.selected * perPage;
				console.log('MATH: ', e.selected * perPage);
				setOffset(newOffSet);
				console.log('Offset: ', offset);
			}
			const currentItems = items.slice(offset, offset + perPage);
			setCurrItems(currentItems);
			console.log('New Curr Items: ', currItems);
		};

		useEffect(() => {
			console.log('THIS RAN Now');
			setItems(itemsWithPictures);
			console.log('Items set: ', items);
			setCurrItems(items.slice(offset, offset + perPage));
			console.log('Curr Items Set: ', currItems);
			setNumPages(itemsWithPictures.length / 50);
		}, [data]);

		useEffect(() => {
			setCurrItems(items.slice(offset, offset + perPage));
		}, [offset]);
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
						containerClassName={'pagination'}
						subContainerClassName={'pages pagination'}
						activeClassName={'active'}
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
								key={items[i].id}
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
