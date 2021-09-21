import React from 'react';
import Headers from '../../components/Layout/Headers';
import Head from 'next/head';
import ProductCards from '../../components/Product/ProductCards';
import { vendors } from '../../VendorList/VendorList';
import { checkProductDiscounts } from '../../utils/sales';
import JSONBig from 'json-bigint';
import { Client, Environment } from 'square';
import SEO from '../../components/SEO/SEO';
import { searchVendors } from '../../lib/shopify';

export default function VendorSearchItems({
	searchresults,
	vendorSales,
	vendorSearch,
	products,
}) {
	console.log(products);
	console.log('Vendor Search: ', vendorSearch);
	if (searchresults) {
		if (searchresults.length) {
			let results = searchresults;
			checkProductDiscounts(results, vendorSales);
			return (
				<div className='mx-auto min-h-screen flex justify-center flex-row flex-wrap'>
					<SEO title={`${vendorSearch} || We Made It`} />
					<div className='flex flex-row flex-wrap justify-center h-full'>
						<Headers title={vendorSearch} />

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

	const vendorSearch = params.vendorsearch.replace(/%20/g, ' ');
	console.log('Vendor: ', vendorSearch);

	const products = await searchVendors(vendorSearch);

	return {
		props: {
			products,
		},
		revalidate: 3600,
	};
}
