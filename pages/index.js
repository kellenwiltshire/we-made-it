import AboutStore from '../components/About/AboutStore';
import Location from '../components/About/Location';
import Categories from '../components/Categories/Categories';
import Headers from '../components/Layout/Headers';
import Layout from '../components/Layout/Layout';
import React from 'react';

export default function Home({ data }) {
	if (data.length) {
		const catData = [data[0], data[1], data[2], data[3], data[4], data[0]];
		return (
			<Layout>
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
				{/* <Headers title='Shop Now' /> */}
				{/* <Categories catData={catData} /> */}
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
