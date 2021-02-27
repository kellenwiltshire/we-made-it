import React from 'react';
import Headers from '../../components/Layout/Headers';
import Layout from '../../components/Layout/Layout';
import ProductCards from '../../components/Product/ProductCards';
import CategorySelect from '../../components/Categories/CategorySelect';

export default function ShopCategories({ data, cat }) {
	if (data.length) {
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
				<Headers title={cat} />
				<CategorySelect />
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
	} else {
		return (
			<Layout>
				<Headers title='OOPS! Something Went Wrong!' />
			</Layout>
		);
	}
}

export async function getServerSideProps({ query }) {
	try {
		const cat = query.cat;
		const res = await fetch('https://jsonplaceholder.typicode.com/photos');
		const data = await res.json();
		return {
			props: { data, cat },
		};
	} catch (error) {
		const data = error;
		return {
			props: { data },
		};
	}
}
