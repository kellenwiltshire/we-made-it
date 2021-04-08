import React, { useState, useEffect } from 'react';
import Headers from '../../components/Layout/Headers';
import Layout from '../../components/Layout/Layout';
import ProductCards from '../../components/Product/ProductCards';
import CategorySelect from '../../components/Categories/CategorySelect';
import Pagination from '../../components/Layout/Pagination';

export default function ShopCategories({ data, cart }) {
	if (data) {
		const [items, setItems] = useState([]);
		const dataItems = data.items;
		let itemsWithPictures = [];
		for (let i = 0; i < dataItems.length; i++) {
			if (dataItems[i].imageId) {
				itemsWithPictures.push(dataItems[i]);
			}
		}
		useEffect(() => {
			setItems(itemsWithPictures);
		}, [data]);
		let currentCursor = data.items.cursor;
		return (
			<Layout cart={cart} title={`Shop || We Made It`}>
				<Headers title='Shop' />
				{/* <CategorySelect /> */}
				{/* <Pagination currentCursor={currentCursor} name={name} cat={cat} /> */}
				<div className='container m-1 lg:m-5 flex flex-row flex-wrap justify-center w-full font-body'>
					{items.map((list, i) => {
						let price = (
							items[i].itemData.variations[0].itemVariationData.priceMoney
								.amount / 100
						).toFixed(2);

						return (
							<ProductCards
								item={items[i]}
								title={items[i].itemData.name}
								key={items[i].id}
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

	// if (cursor) {
	// 	try {
	// 		const res = await fetch('https://we-made-it-api.herokuapp.com/catalog', {
	// 			method: 'post',
	// 			headers: { 'Content-Type': 'application/json' },
	// 			body: JSON.stringify({
	// 				cursor: cursor,
	// 			}),
	// 		});
	// 		const data = await res.json();

	// 		return {
	// 			props: { data, cat, name },
	// 		};
	// 	} catch (error) {
	// 		const data = error;
	// 		return {
	// 			props: { cat, name },
	// 		};
	// 	}
	// } else {
	// 	try {
	// 		const res = await fetch('https://we-made-it-api.herokuapp.com/catalog', {
	// 			method: 'post',
	// 			headers: { 'Content-Type': 'application/json' },
	// 			body: JSON.stringify({
	// 				cursor: null,
	// 			}),
	// 		});
	// 		const data = await res.json();
	// 		return {
	// 			props: { data, cat, name },
	// 		};
	// 	} catch (error) {
	// 		const data = error;
	// 		return {
	// 			props: { cat, name },
	// 		};
	// 	}
	// }
}
