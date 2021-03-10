import React from 'react';
import Headers from '../../components/Layout/Headers';
import Layout from '../../components/Layout/Layout';
import CheckoutCard from '../../components/Checkout/CheckoutCard';

export default function ShopCategories({ cart }) {
	console.log(cart);
	if (cart) {
		return (
			<Layout cart={cart}>
				<Headers title='Checkout' />
				<div className='container flex flex-wrap'>
					{cart.map((list, i) => {
						return <CheckoutCard item={cart[i]} />;
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
