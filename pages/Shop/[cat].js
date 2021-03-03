import React from 'react';
import Headers from '../../components/Layout/Headers';
import Layout from '../../components/Layout/Layout';
import ProductCards from '../../components/Product/ProductCards';
import CategorySelect from '../../components/Categories/CategorySelect';

export default function ShopCategories({ data, cat }) {
	let items = data.items.objects.filter((item) => item.type === 'ITEM');
	console.log(items);
	if (data) {
		return (
			<Layout>
				<Headers title={cat} />
				<CategorySelect />
				<div className='container m-1 sm:m-5 flex flex-row flex-wrap justify-center w-full font-body'>
					{items.map((list, i) => {
						return (
							<ProductCards
								title={items[i].itemData.name}
								image='/small-purple-splash.png'
								key={i}
								itemID={items[i].id}
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
		const res = await fetch('http://localhost:4000/catalog');
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
