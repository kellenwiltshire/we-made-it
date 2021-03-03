import React from 'react';
import Headers from '../../components/Layout/Headers';
import Layout from '../../components/Layout/Layout';
import ProductCards from '../../components/Product/ProductCards';
import CategorySelect from '../../components/Categories/CategorySelect';
import Pagination from '../../components/Layout/Pagination';

export default function ShopCategories({ data, cat, name, cursor }) {
	let items = data.items.objects.filter((item) => item.type === 'ITEM');
	let currentCursor = data.cursor;
	let previousCursor = cursor;
	console.log(previousCursor);
	if (data) {
		return (
			<Layout>
				<Headers title={name} />
				<CategorySelect />
				<div className='container m-1 sm:m-5 flex flex-row flex-wrap justify-center w-full font-body'>
					{items.map((list, i) => {
						return (
							<ProductCards
								title={items[i].itemData.name}
								image='/small-purple-splash.png'
								key={i}
								itemID={items[i].id}
							/>
						);
					})}
				</div>
				<Pagination />
			</Layout>
		);
	} else {
		return (
			<Layout>
				<Headers title='OOPS! Something Went Wrong!' />
			</Layout>
		);
	}
}

export async function getServerSideProps({ query }) {
	try {
		const cat = query.cat;
		const name = query.name;

		if (query.cursor) {
			const cursor = query.cursor;
			const res = await fetch('http://localhost:4000/catalog', {
				method: 'get',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					input: cursor,
				}),
			});
			const data = await res.json();
			return {
				props: { data, cat, name, cursor },
			};
		} else {
			const res = await fetch('http://localhost:4000/catalog');
			const data = await res.json();
			return {
				props: { data, cat, name },
			};
		}
	} catch (error) {
		const data = error;
		return {
			props: { data },
		};
	}
}
