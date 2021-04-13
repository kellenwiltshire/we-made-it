import React from 'react';
import Headers from '../../components/Layout/Headers';
import Layout from '../../components/Layout/Layout';
import ProductCards from '../../components/Product/ProductCards';
import CategorySelect from '../../components/Categories/CategorySelect';

export default function SearchItems({ cart, data }) {
	if (data) {
		if (data.items.items) {
			let items = data.items.items;

			return (
				<Layout cart={cart} title='We Made It'>
					<div className='flex flex-row flex-wrap justify-center h-full'>
						<Headers title='Search Results' />
						<CategorySelect />

						<div className='container m-1 sm:m-5 flex flex-row flex-wrap justify-center w-full'>
							{items.map((list, i) => {
								let price;
								if (items[i].itemData.variations) {
									if (
										items[i].itemData.variations[0].itemVariationData.priceMoney
									) {
										price = (
											items[i].itemData.variations[0].itemVariationData
												.priceMoney.amount / 100
										).toFixed(2);
										return (
											<ProductCards
												item={items[i]}
												title={items[i].itemData.name}
												itemID={items[i].id}
												price={price}
												defaultImage='/sparklelogoblack.png'
												key={Math.random()}
											/>
										);
									}
								} else {
									return;
								}
							})}
						</div>
					</div>
				</Layout>
			);
		} else {
			return (
				<Layout cart={cart} title={`We Made It`}>
					<Headers title='OOPS! Nothing Found!' />
					<div className='flex flex-col text-center font-body'>
						<p>Try a different search!</p>
					</div>
				</Layout>
			);
		}
	} else {
		return (
			<Layout cart={cart} title={`We Made It`}>
				<Headers title='OOPS! Something Went Wrong!' />
				<div className='flex flex-col text-center font-body'>
					<p>
						This is Embarassing! We might be having trouble connecting with
						Square. Please try again later!
					</p>
					<p>
						We may also not be able to find what you are looking for. Try a
						different search!
					</p>
				</div>
			</Layout>
		);
	}
}

export async function getServerSideProps({ query }) {
	const search = query.search;
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
