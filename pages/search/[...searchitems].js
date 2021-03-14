import React from 'react';
import Headers from '../../components/Layout/Headers';
import Layout from '../../components/Layout/Layout';
import ProductCards from '../../components/Product/ProductCards';
import CategorySelect from '../../components/Categories/CategorySelect';

export default function SearchItems({ cart, data }) {
	if (data) {
		let items = data.items.objects;
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
			<Layout cart={cart} title={`We Made It`}>
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
	const search = query.searchitems;
	try {
		const res = await fetch(
			'https://we-made-it-api.herokuapp.com/searchitems',
			{
				method: 'post',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					search: search,
				}),
			},
		);
		const data = await res.json();
		return {
			props: { data },
		};
	} catch (error) {
		const data = error;
		return {
			props: {},
		};
	}
}
