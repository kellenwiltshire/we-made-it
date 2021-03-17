import React from 'react';
import Headers from '../../components/Layout/Headers';
import Layout from '../../components/Layout/Layout';
import ProductCards from '../../components/Product/ProductCards';
import CategorySelect from '../../components/Categories/CategorySelect';
import Pagination from '../../components/Layout/Pagination';

export default function ShopCategories({ data, cat, name, cart }) {
	if (data) {
		let items = data.items.objects;
		let currentCursor = data.items.cursor;
		return (
			<Layout cart={cart} title={`${name} || We Made It`}>
				<Headers title={name} />
				{/* <CategorySelect /> */}
				<Pagination currentCursor={currentCursor} name={name} cat={cat} />
				<div className='container m-1 sm:m-5 flex flex-row flex-wrap justify-center w-full font-body'>
					{items.map((list, i) => {
						return (
							<ProductCards
								item={items[i]}
								title={items[i].itemData.name}
								key={i}
								itemID={items[i].id}
							/>
						);
					})}
				</div>
				<Pagination currentCursor={currentCursor} name={name} cat={cat} />
			</Layout>
		);
	} else {
		return (
			<Layout cart={cart} title={`${name} || We Made It`}>
				<Headers title='OOPS! Something Went Wrong!' />
				<p>
					This is Embarassing! We might be having trouble connecting with
					Square. Please try again later!
				</p>
			</Layout>
		);
	}
}

export async function getServerSideProps({ query }) {
	const cat = query.cat;
	const name = query.name;
	const cursor = query.cursor;

	if (cursor) {
		try {
			const res = await fetch('http://LOCALHOST:4000/catalog', {
				method: 'post',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					cursor: cursor,
				}),
			});
			const data = await res.json();
			return {
				props: { data, cat, name },
			};
		} catch (error) {
			const data = error;
			return {
				props: { cat, name },
			};
		}
	} else {
		try {
			const res = await fetch('http://LOCALHOST:4000/catalog', {
				method: 'post',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					cursor: null,
				}),
			});
			const data = await res.json();
			return {
				props: { data, cat, name },
			};
		} catch (error) {
			const data = error;
			return {
				props: { cat, name },
			};
		}
	}
}
