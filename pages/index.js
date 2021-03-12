import AboutStore from '../components/About/AboutStore';
import Location from '../components/About/Location';
import Categories from '../components/Categories/Categories';
import Headers from '../components/Layout/Headers';
import Layout from '../components/Layout/Layout';
import React from 'react';
import Image from 'next/image';

export default function Home({ data, cart }) {
	if (data.length) {
		const catData = [{ image: data[0].url, name: 'Shop All' }];
		return (
			<Layout cart={cart}>
				<Headers title='Shop Now' />
				<Image src='/homepagephoto.png' height={720} width={1280} />
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
