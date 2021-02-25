import React from 'react';
import Categories from '../../components/Categories/Categories';
import Headers from '../../components/Layout/Headers';
import Layout from '../../components/Layout/Layout';

export default function Shop({ data }) {
	if (data.length) {
		const catData = [
			data[0],
			data[1],
			data[2],
			data[3],
			data[4],
			data[0],
			data[1],
			data[2],
			data[3],
			data[4],
		];
		return (
			<Layout>
				<Headers title='Shop Our Handmade Items' />
				<Categories catData={catData} />
			</Layout>
		);
	} else {
		return (
			<Layout>
				<Headers title='OOPS! Something went wrong!' />
				{/* <Categories catData={catData} /> */}
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
