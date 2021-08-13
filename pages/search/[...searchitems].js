import React, { useState, useEffect } from 'react';
import Headers from '../../components/Layout/Headers';
import Head from 'next/head';
import ProductCards from '../../components/Product/ProductCards';
import CategorySelect from '../../components/Categories/CategorySelect';
import { checkProductDiscounts } from '../../utils/sales';
const JSONBig = require('json-bigint');
const { Client, Environment } = require('square');

export default function SearchItems({
	setNavStyle,
	cart,
	searchresults,
	vendorSales,
}) {
	setNavStyle('search');
	if (searchresults) {
		if (searchresults.length) {
			let results = searchresults;
			checkProductDiscounts(results, vendorSales);
			return (
				<div className='mx-auto min-h-screen flex justify-center flex-row flex-wrap'>
					<Head>
						<title>Search || We Made It</title>
					</Head>
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
				</div>
			);
		} else {
			return (
				<div className='mx-auto min-h-screen flex justify-center flex-row flex-wrap'>
					<Head>
						<title>Search || We Made It</title>
					</Head>
					<Headers title='OOPS! Nothing Was Found!' />
					<div className='flex flex-col text-center font-body'>
						<p>
							Unfortunately nothing was found with that search. Please try
							searching for something else!
						</p>
					</div>
				</div>
			);
		}
	} else {
		return (
			<div className='mx-auto min-h-screen flex justify-center flex-row flex-wrap'>
				<Head>
					<title>Search || We Made It</title>
				</Head>
				<Headers title='OOPS! Nothing Was Found!' />
				<div className='flex flex-col text-center font-body'>
					<p>
						Unfortunately nothing was found with that search. Please try
						searching for something else!
					</p>
				</div>
			</div>
		);
	}
}

export async function getServerSideProps({ query }) {
	const client = new Client({
		environment: Environment.Production,
		accessToken: process.env.SQUARE_ACCESS_TOKEN,
	});
	const search = query.search;
	console.log('Search: ', query.search);

	let filteredItems = [];

	const newImageRequest = async (items) => {
		const catalog = client.catalogApi;

		let newItemsWithPictures = [];

		if (items.length > 50) {
			const upperLimit = items.length - 50;
			const offset = Math.floor(Math.random() * upperLimit);
			for (let i = offset; i < offset + 50; i++) {
				const response = await catalog.retrieveCatalogObject(items[i].imageId);
				items[i].imageLink = response.result.object.imageData.url;
				newItemsWithPictures.push(items[i]);
			}
		} else {
			for (let i = 0; i < items.length; i++) {
				const response = await catalog.retrieveCatalogObject(items[i].imageId);
				items[i].imageLink = response.result.object.imageData.url;
				newItemsWithPictures.push(items[i]);
			}
		}

		return newItemsWithPictures;
	};
	try {
		const response = await client.catalogApi.searchCatalogItems({
			textFilter: search,
		});

		if (response.result.items) {
			const data = JSONBig.parse(JSONBig.stringify(response.result.items));

			for (let i = 0; i < data.length; i++) {
				if (data[i].imageId) {
					filteredItems.push(data[i]);
				}
			}
		} else {
			console.log('Search Error: ', response);
			return {
				props: {},
			};
		}
	} catch (error) {
		console.log('Search Error: ', error);
		return {
			props: {},
		};
	}

	const searchresults = await newImageRequest(filteredItems);

	return {
		props: { searchresults },
	};
}
