import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Headers from '../../components/Layout/Headers';
import Layout from '../../components/Layout/Layout';
import ProductCards from '../../components/Product/ProductCards';
import CategorySelect from '../../components/Categories/CategorySelect';

export default function ShopCategories({ data, cart }) {
	if (data) {
		const [items, setItems] = useState([]);
		const [currItems, setCurrItems] = useState([]);
		const [numPages, setNumPages] = useState(1);
		const [offset, setOffset] = useState(0);
		const [perPage, setPerPage] = useState(50);
		let isLoaded = false;
		const dataItems = data.items;
		let itemsWithPictures = [];

		for (let i = 0; i < dataItems.length; i++) {
			if (dataItems[i].imageId) {
				itemsWithPictures.push(dataItems[i]);
			}
		}

		const handlePageChange = (e) => {
			const selectedPage = e.selected;
			const newOffset = selectedPage * perPage;
			setOffset(newOffset);
		};

		useEffect(() => {
			setItems(itemsWithPictures);
			console.log('Items set: ', items);
			setCurrItems(items.slice(offset, offset + perPage));
			console.log('Curr Items Set: ', currItems);
			setNumPages(itemsWithPictures.length / 50);
		}, []);

		useEffect(() => {
			setCurrItems(items.slice(offset, offset + perPage));
			console.log(currItems);
		}, [offset]);
		return (
			<Layout cart={cart} title={`Shop || We Made It`}>
				<Headers title='Shop' />
				{/* <CategorySelect /> */}
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
						let price;
						if (currItems[i].itemData.variations) {
							price = (
								currItems[i].itemData.variations[0].itemVariationData.priceMoney
									.amount / 100
							).toFixed(2);
						} else {
							price = '$??.??';
						}

						return (
							<ProductCards
								item={currItems[i]}
								title={currItems[i].itemData.name}
								itemID={currItems[i].id}
								key={currItems[i].id}
								price={price}
								defaultImage='/pictureComingSoon.png'
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
