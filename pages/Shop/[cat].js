import React from 'react';
import Categories from '../../components/Categories/Categories';
import Headers from '../../components/Layout/Headers';
import Layout from '../../components/Layout/Layout';

export default function ShopCategories({ data, cat }) {
	return (
		<Layout>
			<Headers title='cat' />
		</Layout>
	);
}

export async function getServerSideProps({ query }) {
	const cat = query.cat;
	const res = await fetch('https://jsonplaceholder.typicode.com/photos');
	const data = await res.json();
	return {
		props: { data, cat },
	};
}
