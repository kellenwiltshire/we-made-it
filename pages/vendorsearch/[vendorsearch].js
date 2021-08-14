import React from 'react';
import Headers from '../../components/Layout/Headers';
import Head from 'next/head';
import ProductCards from '../../components/Product/ProductCards';
import { vendors } from '../../VendorList/VendorList';
import { checkProductDiscounts } from '../../utils/sales';
import { useSelector } from 'react-redux';
import { filterChange } from '../../utils/sort';

const getItems = () => {
	return useSelector((state) => ({ itemsWithPictures: state.items }));
};

export default function VendorSearchItems({
	setNavStyle,
	vendorSales,
	search,
}) {
	const { itemsWithPictures } = getItems();
	console.log(search);
	setNavStyle('vendorsearch');
	if (itemsWithPictures) {
		if (itemsWithPictures.length) {
			const results = filterChange(search, itemsWithPictures);
			checkProductDiscounts(results, vendorSales);
			return (
				<div className='mx-auto min-h-screen flex justify-center flex-row flex-wrap'>
					<Head>
						<title>{search} || We Made It</title>
					</Head>
					<div className='flex flex-row flex-wrap justify-center h-full'>
						<Headers title={search} />

						<div className='container m-1 sm:m-5 flex flex-row flex-wrap justify-center w-full'>
							{results.map((item) => {
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

// export async function getStaticPaths() {
// 	const vendorList = vendors;
// 	const fixedVendors = vendorList.map((ven) => {
// 		const fixedVen = ven.vendor.replace(/ /g, '%20');
// 		return fixedVen;
// 	});

// 	// Get the paths we want to pre-render based on vendors
// 	const paths = fixedVendors.map((ven) => ({
// 		params: { vendorsearch: ven },
// 	}));

// 	// We'll pre-render only these paths at build time.
// 	// { fallback: false } means other routes should 404.
// 	return { paths, fallback: false };
// }

// export async function getStaticProps({ params }) {
// 	const search = params.vendorsearch.replace(/%20/g, ' ');
// 	console.log('Vendor: ', search);

// 	return {
// 		props: { search },
// 		revalidate: 60,
// 	};
// }

export async function getServerSideProps({ query }) {
	const search = query.vendorsearch.replace(/%20/g, ' ');
	console.log('Vendor: ', search);

	return {
		props: { search },
	};
}
