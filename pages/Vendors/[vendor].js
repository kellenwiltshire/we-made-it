import React from 'react';
import Search from '../../components/Forms/Search';
import Headers from '../../components/Layout/Headers';
import Layout from '../../components/Layout/Layout';
import ProductCards from '../../components/Product/ProductCards';

export default function ShopVendor({ data, vendor }) {
	const products = [
		data[10],
		data[11],
		data[12],
		data[13],
		data[14],
		data[10],
		data[11],
		data[12],
		data[13],
		data[14],
		data[10],
		data[11],
		data[12],
		data[13],
		data[14],
		data[10],
		data[11],
		data[12],
		data[13],
		data[14],
		data[10],
		data[11],
		data[12],
		data[13],
		data[14],
		data[10],
		data[11],
		data[12],
		data[13],
		data[14],
		data[10],
		data[11],
		data[12],
		data[13],
		data[14],
		data[10],
		data[11],
		data[12],
		data[13],
		data[14],
	];
	return (
		<Layout>
			<Headers title='Test Vendor Page' />
			<Search />
			<div className='container m-1 sm:m-5 flex flex-row flex-wrap justify-center w-full font-body'>
				{products.map((list, i) => {
					return (
						<ProductCards
							title='Product'
							image={products[i].url}
							key={i}
							itemID={123456}
						/>
					);
				})}
			</div>
		</Layout>
	);
}

export async function getServerSideProps({ query }) {
	const vendor = query.vendor;
	const res = await fetch('https://jsonplaceholder.typicode.com/photos');
	const data = await res.json();
	return {
		props: { data, vendor },
	};
}
