import React from 'react';
import Headers from '../components/Layout/Headers';
import Head from 'next/head';
import ProductCards from '../components/Product/ProductCards';
import { checkProductDiscounts } from '../utils/sales';
import { filterChange } from '../utils/sort';
import JSONBig from 'json-bigint';
import { Client, Environment } from 'square';
import { catalog } from '../utils/recusiveCatalog';
import { devCatalog } from '../utils/devCatalog';

export default function SearchItems({
	setNavStyle,
	search,
	vendorSales,
	items,
}) {
	console.log(search);
	setNavStyle('search');
	if (items) {
		const results = filterChange(search, items);
		checkProductDiscounts(results, vendorSales);
		return (
			<div className='mx-auto min-h-screen flex justify-center flex-row flex-wrap'>
				<Head>
					<title>Search || We Made It</title>
				</Head>
				<div className='flex flex-row flex-wrap justify-center h-full'>
					<Headers title='Search Results' />

					<div className='container m-1 sm:m-5 flex flex-row flex-wrap justify-center w-full'>
						{results.length ? (
							results.map((item) => {
								let price;
								if (item.itemData.variations) {
									if (
										item.itemData.variations[0].itemVariationData
											.pricingType === 'VARIABLE_PRICING'
									) {
										price = 'Variable Pricing - Contact Store for Details';
										return (
											<ProductCards
												title={item.itemData.name}
												itemID={item.id}
												price={price}
												image={item.imageLink}
												key={item.id}
												location={item.presentAtLocationIds}
											/>
										);
									} else if (item.sale) {
										let currPrice =
											item.itemData.variations[0].itemVariationData.priceMoney
												.amount / 100;
										price = currPrice - currPrice * (item.sale / 100);
										price = price.toFixed(2);
										return (
											<ProductCards
												title={item.itemData.name}
												itemID={item.id}
												salePrice={price}
												image={item.imageLink}
												key={item.id}
												location={item.presentAtLocationIds}
											/>
										);
									} else {
										price = (
											item.itemData.variations[0].itemVariationData.priceMoney
												.amount / 100
										).toFixed(2);
										return (
											<ProductCards
												title={item.itemData.name}
												itemID={item.id}
												price={price}
												image={item.imageLink}
												key={item.id}
												location={item.presentAtLocationIds}
											/>
										);
									}
								} else {
									return;
								}
							})
						) : (
							<div className='container m-1 sm:m-5 flex flex-row flex-wrap justify-center w-full'>
								<Headers title='OOPS! Nothing Was Found!' />
								<div className='flex flex-col text-center font-body'>
									<p>
										Unfortunately nothing was found with that search. Please try
										searching for something else!
									</p>
								</div>
							</div>
						)}
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
}

export async function getStaticProps() {
	console.log('Search Page Revalidate');
	const itemsWithPictures = await catalog();

	//!Dev Purposes
	// const itemsWithPictures = await devCatalog();

	return {
		props: {
			itemsWithPictures: itemsWithPictures,
		},
		revalidate: 3600,
	};
}
