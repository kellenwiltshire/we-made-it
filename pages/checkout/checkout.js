import React from 'react';
import Headers from '../../components/Layout/Headers';
import Layout from '../../components/Layout/Layout';
import CheckoutCard from '../../components/Checkout/CheckoutCard';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

export default function Checkout({ cart, setCart }) {
	const orderID = uuidv4();
	console.log(orderID);
	const router = useRouter();
	const deleteItem = (index) => {
		cart.splice(index, 1);
		setCart(cart);
		router.push('/checkout/checkout');
	};

	let lineItems = [];
	console.log(lineItems);

	const handleCheckout = () => {
		fetch('LOCALHOST:4000/checkout', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				lineItems: lineItems,
				orderID: orderID,
			}),
		}).catch((err) => console.log(err));
	};

	if (cart) {
		return (
			<Layout cart={cart}>
				<Headers title='Checkout' />
				<div className='container flex flex-wrap'>
					<button
						onClick={handleCheckout}
						className='mx-1 px-3 py-2 bg-purple-200 text-gray-700 hover:bg-purple-700 hover:text-gray-200 rounded-lg cursor-pointer'
					>
						Continue to Checkout
					</button>
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
