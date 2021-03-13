import React from 'react';
import Headers from '../../components/Layout/Headers';
import Layout from '../../components/Layout/Layout';
import CheckoutCard from '../../components/Checkout/CheckoutCard';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

export default function Checkout({ cart, setCart }) {
	const orderID = uuidv4();
	console.log('Checkout Cart: ', cart);
	const router = useRouter();
	const deleteItem = (index) => {
		cart.splice(index, 1);
		setCart(cart);
		router.push('/checkout/checkout');
	};

	let lineItems = [];
	console.log(lineItems);

	const handleCheckout = () => {
		fetch('http://LOCALHOST:4000/checkout', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				lineItems: lineItems,
				orderID: orderID,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				router.push(data.checkout.checkoutPageUrl);
			})
			.catch((err) => console.log(err));
	};

	if (cart) {
		return (
			<Layout cart={cart}>
				<Headers title='Checkout' />
				<div className='container flex h-full'>
					<div className='h-auto w-full'>
						<button
							onClick={handleCheckout}
							className='mx-1 px-5 py-5 m-5 bg-purple-200 text-gray-700 hover:bg-purple-700 hover:text-gray-200 rounded-lg cursor-pointer h-auto'
						>
							Continue to Checkout
						</button>
						{cart.map((list, i) => {
							lineItems.push({
								quantity: cart[i].quantity,
								catalogObjectId: cart[i].item,
							});
							return (
								<CheckoutCard
									quantity={cart[i].quantity}
									index={i}
									deleteItem={deleteItem}
									name={cart[i].name}
									price={cart[i].price}
									description={cart[i].description}
								/>
							);
						})}
					</div>
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
