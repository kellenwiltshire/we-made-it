import React from 'react';
import Headers from '../../components/Layout/Headers';
import Layout from '../../components/Layout/Layout';
import CheckoutCard from '../../components/Checkout/CheckoutCard';
import { useRouter } from 'next/router';

export default function ShopCategories({ cart, setCart }) {
	const router = useRouter();
	const deleteItem = (index) => {
		cart.splice(index, 1);
		setCart(cart);
		router.push('/checkout/checkout');
	};
	return (
		<Layout cart={cart}>
			<Headers title='Checkout Completed!' />
			<div>
				<p>Thank You So Much for Your Purchase!</p>
			</div>
		</Layout>
	);
}
