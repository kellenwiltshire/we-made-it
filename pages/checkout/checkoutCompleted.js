import React from 'react';
import Headers from '../../components/Layout/Headers';
import Layout from '../../components/Layout/Layout';

export default function ShopCategories({ cart, setCart }) {
	const resetCart = () => {
		setCart([]);
	};

	resetCart();

	return (
		<Layout cart={cart} title='Checkout Completed || We Made It'>
			<Headers title='Checkout Completed!' />
			<div>
				<p className='font-body'>Thank You So Much for Your Purchase!</p>
			</div>
		</Layout>
	);
}
