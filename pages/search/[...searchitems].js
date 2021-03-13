import React from 'react';
import Headers from '../../components/Layout/Headers';
import Layout from '../../components/Layout/Layout';
import ProductCards from '../../components/Product/ProductCards';
import CategorySelect from '../../components/Categories/CategorySelect';

export default function SearchItems({ cart, data }) {
	console.log(data);
	let items = data.items.objects;
	if (data) {
		return (
			<Layout cart={cart} title='We Made It'>
				<Headers title='Search Results' />
				<CategorySelect />

				<div className='container m-1 sm:m-5 flex flex-row flex-wrap justify-center w-full font-body'>
					{items.map((list, i) => {
						return (
							<ProductCards
								item={items[i]}
								title={items[i].itemData.name}
								image='/pictureComingSoon.png'
								key={i}
								itemID={items[i].id}
							/>
						);
					})}
				</div>
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
	const search = query.searchitems;
	try {
		const res = await fetch('http://localhost:4000/searchitems', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				search: search,
			}),
		});
		const data = await res.json();
		return {
			props: { data },
		};
	} catch (error) {
		const data = error;
		return {
			props: { data },
		};
	}
}
