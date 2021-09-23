import React from 'react';
import Headers from '../components/Layout/Headers';
import Head from 'next/head';
import ProductCards from '../components/Product/ProductCards';
import { searchFilter } from '../utils/sort';
import SEO from '../components/SEO/SEO';
import { getAllProducts } from '../lib/shopify';

export default function SearchItems({ search, products }) {
	const fixedSearch = search.replace(/%20/g, ' ');
	console.log('Search: ', fixedSearch);
	if (products) {
		const results = searchFilter(fixedSearch, products);
		return (
			<div className='mx-auto min-h-screen flex justify-center flex-row flex-wrap'>
				<SEO title='Search || We Made It' />
				<div className='flex flex-row flex-wrap justify-center h-full'>
					<Headers title={`Search Results for ${fixedSearch}`} />

					<div className='container m-1 sm:m-5 flex flex-row flex-wrap justify-center w-full'>
						{results.length ? (
							results.map((item) => {
								return (
									<ProductCards
										title={item.node.title}
										handle={item.node.handle}
										price={item.node.variants.edges[0].node.price}
										image={item.node.images.edges[0].node.originalSrc}
										key={item.node.id}
									/>
								);
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
	const products = await getAllProducts();

	return {
		props: {
			products,
		},
		revalidate: 360,
	};
}
