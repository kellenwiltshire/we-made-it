import AboutStore from '../components/About/AboutStore';
import Location from '../components/About/Location';
import Headers from '../components/Layout/Headers';
import Head from 'next/head';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import VendorSale from '../components/About/VendorSale';
import JSONBig from 'json-bigint';
import { Client, Environment } from 'square';

export default function Home({ setNavStyle, vendorSales }) {
	setNavStyle('home');
	return (
		<div className='mx-auto min-h-screen flex justify-center flex-row flex-wrap'>
			<Head>
				<title>We Made It || Home</title>
			</Head>
			<Link
				href={{
					pathname: `/Shop/shop`,
				}}
			>
				<a className='shadow-lg cursor-pointer rounded transform hover:scale-105 duration-300 ease-in-out m-5'>
					<Image
						src='/homepagephoto.png'
						height={720}
						width={1280}
						alt='Home Page Picture - Click to Shop Now'
					/>
				</a>
			</Link>
			<Headers title='Our Story' />
			<AboutStore />

			<VendorSale vendorSales={vendorSales} />
			<Location />
		</div>
	);
}

export async function getStaticProps() {
	const client = new Client({
		environment: Environment.Production,
		accessToken: process.env.SQUARE_ACCESS_TOKEN,
	});
	console.log('Shop Page Revalidate');

	const recursiveCatalog = async (cursor = '', initialRequest = true) => {
		let opts = 'ITEM';
		const catalog = client.catalogApi;

		const response = await catalog.listCatalog(cursor, opts);
		const data = JSONBig.parse(JSONBig.stringify(response.result.objects));
		const newCursor = response.result.cursor;

		if (initialRequest && cursor === '') {
			return data.concat(await recursiveCatalog(newCursor, false));
		} else if (!initialRequest && !cursor) {
			return data;
		} else {
			return data.concat(await recursiveCatalog(newCursor, false));
		}
	};

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

	let items = [];
	let filteredItems = [];

	//This grabs the entire catalog at once through recursion
	items = await recursiveCatalog();

	//!DEV
	// const catalog = client.catalogApi;
	// const response = await catalog.listCatalog('', 'ITEM');
	// items = JSONBig.parse(JSONBig.stringify(response.result.objects));

	//Then the items are filtered so that only ones that have photo's are returned
	if (items) {
		const dataItems = items;
		for (let i = 0; i < dataItems.length; i++) {
			if (dataItems[i].imageId) {
				filteredItems.push(dataItems[i]);
			}
		}

		//Finally, before returning the list of Items it grabs the URL for the photo's for each item -- This takes a while!
		const itemsWithPictures = await newImageRequest(filteredItems);

		return {
			props: {
				initialReduxState: {
					items: itemsWithPictures,
				},
			},
			revalidate: 3600,
		};
	}
}
