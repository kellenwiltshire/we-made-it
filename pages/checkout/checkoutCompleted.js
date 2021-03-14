import React from 'react';
import Headers from '../../components/Layout/Headers';
import Layout from '../../components/Layout/Layout';
import CheckoutCard from '../../components/Checkout/CheckoutCard';
import { useRouter } from 'next/router';

export default function ShopCategories({ cart, setCart }) {
	setCart([]);
	return (
		<Layout cart={cart} title='Checkout Completed || We Made It'>
			<Headers title='Checkout Completed!' />
			<div>
				<p>Thank You So Much for Your Purchase!</p>
			</div>
		</Layout>
	);
}
