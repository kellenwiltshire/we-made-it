import AboutStore from '../components/About/AboutStore';
import Location from '../components/About/Location';
import Categories from '../components/Categories/Categories';
import Headers from '../components/Layout/Headers';
import Layout from '../components/Layout/Layout';
import React from 'react';

export default function Home({ data, cart }) {
	if (data.length) {
		const catData = [
			{ image: data[0].url, name: 'Shop All' },
			// { image: data[1].url, name: 'Gift Cards' },
			// { image: data[2].url, name: 'Category 1' },
			// { image: data[3].url, name: 'Category 2' },
			// { image: data[4].url, name: 'Category 3' },
		];
		return (
			<Layout cart={cart}>
				<Headers title='Shop Now' />
				<Categories catData={catData} />
				<Headers title='Our Story' />
				<AboutStore />
				<Location />
			</Layout>
		);
	} else {
		return (
			<Layout>
				<Headers title='Our Story' />
				<AboutStore />
				<Location />
			</Layout>
		);
	}
}

export async function getServerSideProps(context) {
	try {
		const res = await fetch('https://jsonplaceholder.typicode.com/photos');
		const data = await res.json();
		return {
			props: { data },
		};
	} catch (error) {
		const data = error;
		return {
			props: { data },
		};
	}
}
