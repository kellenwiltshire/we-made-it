import React, { useState, useEffect } from 'react';
import Headers from '../../components/Layout/Headers';
import Head from 'next/head';
import ProductCards from '../../components/Product/ProductCards';
import { vendors } from '../../VendorList/VendorList';
import { checkProductDiscounts } from '../../utils/sales';
import JSONBig from 'json-bigint';
import { Client, Environment } from 'square';

export default function VendorSearchItems({
	setNavStyle,
	cart,
	searchresults,
	vendorSales,
	search,
}) {
	setNavStyle('vendorsearch');
	if (searchresults) {
		if (searchresults.length) {
			let results = searchresults;
			checkProductDiscounts(results, vendorSales);
			return (
				<div className='mx-auto min-h-screen flex justify-center flex-row flex-wrap'>
					<Head>
						<title>{search} || We Made It</title>
					</Head>
					<div className='flex flex-row flex-wrap justify-center h-full'>
						<Headers title={search} />

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
						<title>We Made It</title>
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
					<title>We Made It</title>
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

export async function getStaticPaths() {
	const vendorList = vendors;
	const fixedVendors = vendorList.map((ven) => {
		const fixedVen = ven.vendor.replace(/ /g, '%20');
		return fixedVen;
	});

	// Get the paths we want to pre-render based on vendors
	const paths = fixedVendors.map((ven) => ({
		params: { vendorsearch: ven },
	}));

	// We'll pre-render only these paths at build time.
	// { fallback: false } means other routes should 404.
	return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
	console.log(params);
	const client = new Client({
		environment: Environment.Production,
		accessToken: process.env.SQUARE_ACCESS_TOKEN,
	});
	const search = params.vendorsearch.replace(/%20/g, ' ');
	console.log('Vendor: ', search);

	let filteredItems = [];

	const newImageRequest = async (items) => {
		const catalog = client.catalogApi;

		let newItemsWithPictures = [];

		for (let i = 0; i < items.length; i++) {
			const response = await catalog.retrieveCatalogObject(items[i].imageId);
			items[i].imageLink = response.result.object.imageData.url;
			newItemsWithPictures.push(items[i]);
		}
		return newItemsWithPictures;
	};
	try {
		const response = await client.catalogApi.searchCatalogItems({
			textFilter: search,
		});

		const data = JSONBig.parse(JSONBig.stringify(response.result.items));

		for (let i = 0; i < data.length; i++) {
			if (data[i].imageId) {
				filteredItems.push(data[i]);
			}
		}
	} catch (error) {
		console.log('Search Error: ', error);
		return {
			props: {},
		};
	}

	const searchresults = await newImageRequest(filteredItems);

	return {
		props: { searchresults, search },
		revalidate: 3600,
	};
}
