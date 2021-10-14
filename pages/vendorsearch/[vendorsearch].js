import React from 'react';
import Headers from '../../components/Layout/Headers';
import Head from 'next/head';
import ProductCards from '../../components/Product/ProductCards';
import { vendors } from '../../VendorList/VendorList';
import SEO from '../../components/SEO/SEO';
import { searchVendors } from '../../lib/shopify';

export default function VendorSearchItems({ vendorSearch, products }) {
	console.log('Vendor Search: ', vendorSearch);
	if (products) {
		if (products.length) {
			let results = products;
			return (
				<div className='mx-auto min-h-screen flex justify-center flex-row flex-wrap'>
					<SEO title={`${vendorSearch} || We Made It`} />
					<div className='flex flex-row flex-wrap justify-center h-full'>
						<Headers title={vendorSearch} />

						<div className='container m-1 sm:m-5 flex flex-row flex-wrap justify-center w-full'>
							{results.map((item) => {
								return (
									<ProductCards
										title={item.node.title}
										handle={item.node.handle}
										price={item.node.variants.edges[0].node.price}
										image={item.node.images.edges[0].node.originalSrc}
										key={item.node.id}
									/>
								);
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
			vendorSearch,
		},
		revalidate: 360,
	};
}
