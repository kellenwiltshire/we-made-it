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
	if (cart) {
		return (
			<Layout cart={cart}>
				<Headers title='Checkout' />
				<div className='container flex flex-wrap'>
					{cart.map((list, i) => {
						return (
							<CheckoutCard item={cart[i]} index={i} deleteItem={deleteItem} />
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
