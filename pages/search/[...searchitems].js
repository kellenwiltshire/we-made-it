import React, { useState, useEffect } from 'react';
import Headers from '../../components/Layout/Headers';
import Layout from '../../components/Layout/Layout';
import ProductCards from '../../components/Product/ProductCards';
import CategorySelect from '../../components/Categories/CategorySelect';

export default function SearchItems({ cart, searchresults, vendorSales }) {
	if (searchresults) {
		console.log(searchresults.items);
		if (searchresults.items) {
			let results = searchresults.items;

			const checkCartDiscounts = () => {
				results.filter((item) => {
					if (item.itemData.description) {
						for (let i = 0; i < vendorSales.length; i++) {
							const lowerCaseVendor = vendorSales[i].vendor.toLowerCase();
							const lowerCaseItem = item.itemData.description.toLowerCase();
							if (lowerCaseItem.includes(lowerCaseVendor)) {
								item.sale = vendorSales[i].sale;
							}
						}
					}
				});
			};
			checkCartDiscounts();
			return (
				<Layout cart={cart} title='We Made It'>
					<div className='flex flex-row flex-wrap justify-center h-full'>
						<Headers title='Search Results' />
						<CategorySelect />

						<div className='container m-1 sm:m-5 flex flex-row flex-wrap justify-center w-full'>
							{results.map((result, i) => {
								let price;
								if (result.itemData.variations) {
									if (
										result.itemData.variations[0].itemVariationData
											.pricingType === 'VARIABLE_PRICING'
									) {
										price = 'Variable Pricing - Contact Store for Details';
										return (
											<ProductCards
												item={result}
												title={result.itemData.name}
												itemID={result.id}
												price={price}
												defaultImage='/sparklelogoblack.png'
												key={Math.random()}
											/>
										);
									} else if (result.sale) {
										let currPrice =
											result.itemData.variations[0].itemVariationData.priceMoney
												.amount / 100;
										price = currPrice - currPrice * (result.sale / 100);
										price = price.toFixed(2);
										return (
											<ProductCards
												item={result}
												title={result.itemData.name}
												itemID={result.id}
												salePrice={price}
												image={result.imageLink}
												key={Math.random()}
											/>
										);
									} else {
										price = (
											result.itemData.variations[0].itemVariationData.priceMoney
												.amount / 100
										).toFixed(2);
										return (
											<ProductCards
												item={result}
												title={result.itemData.name}
												itemID={result.id}
												price={price}
												image={result.imageLink}
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
				</div>
			</Layout>
		);
	}
}

export async function getServerSideProps({ query }) {
	const search = query.search;
	try {
		const res = await fetch('http://localhost:4000/searchitems', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				search: search,
			}),
		});
		const searchresults = await res.json();
		return {
			props: { searchresults },
		};
	} catch (error) {
		const results = error;
		return {
			props: {},
		};
	}
}
