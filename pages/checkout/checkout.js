import React from 'react';
import Headers from '../../components/Layout/Headers';
import Layout from '../../components/Layout/Layout';
import CheckoutCard from '../../components/Checkout/CheckoutCard';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

export default function Checkout({ cart, setCart }) {
	const orderID = uuidv4();
	const router = useRouter();
	const deleteItem = (index) => {
		cart.splice(index, 1);
		setCart(cart);
		router.push('/checkout/checkout');
	};

	let lineItems = [];
	console.log(lineItems);
	const initCheckout = () => {
		handleCheckout(lineItems);
	};

	const handleCheckout = (lineItems) => {
		fetch('/LOCALHOST:4000/checkout', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				lineItems: lineItems,
				orderID: orderID,
			}),
		});
	};

	if (cart) {
		return (
			<Layout cart={cart}>
				<Headers title='Checkout' />
				<div className='container flex flex-wrap'>
					{cart.map((list, i) => {
						lineItems.push({
							quantity: cart[i].quantity,
							catalogObjectId: cart[i].item.object.itemData.variations[0].id,
						});
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
