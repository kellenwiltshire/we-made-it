import React, { useState, useEffect } from 'react';
import Headers from '../../components/Layout/Headers';
import Head from 'next/head';
import CheckoutCard from '../../components/Checkout/CheckoutCard';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import { vendors } from '../../VendorList/VendorList';
import LoadingIcon from '../../components/Icons/LoadingIcon';
import {
	checkCartDiscounts,
	checkForDiscounts,
	checkItemDiscount,
} from '../../components/utils';

export default function Checkout({ setNavStyle, cart, setCart, vendorSales }) {
	setNavStyle('checkout');
	const [isCheckout, setIsCheckout] = useState(false);
	const [isDiscount, setIsDiscount] = useState(false);
	const orderID = uuidv4();
	const router = useRouter();
	const deleteItem = (index) => {
		cart.splice(index, 1);
		setCart(cart);
		if (cart.length < 1) {
			router.push('/');
		} else {
			router.push('/checkout/checkout');
		}
	};

	const [discountInformation, setDiscountInformation] = useState([]);
	useEffect(() => {
		setDiscountInformation(checkForDiscounts());
		checkCartDiscounts(cart, vendorSales, setIsDiscount);
	}, []);
	let lineItems = [];

	const handleCheckout = () => {
		setIsCheckout(true);
		if (isDiscount) {
			fetch('https://we-made-it.ca/api/discountcheckout', {
				method: 'post',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					lineItems: lineItems,
					discounts: discountInformation,
					orderID: orderID,
				}),
			})
				.then((response) => response.json())
				.then((data) => {
					router.push(data.checkout.checkoutPageUrl);
				})
				.catch((err) => console.log(err));
		} else {
			fetch('https://we-made-it.ca/api/checkout', {
				method: 'post',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					lineItems: lineItems,
					orderID: orderID,
				}),
			})
				.then((response) => response.json())
				.then((data) => {
					router.push(data.checkout.checkoutPageUrl);
				})
				.catch((err) => console.log(err));
		}
	};

	if (cart) {
		return (
			<div className='mx-auto min-h-screen flex justify-center flex-row flex-wrap'>
				<Head>
					<title>Checkout || We Made It</title>
				</Head>
				<Headers title='Checkout' />
				<div className='container flex h-full'>
					<div className='h-auto w-full'>
						<button
							onClick={handleCheckout}
							className='mx-1 px-5 py-5 m-5 bg-purple-200 text-gray-700 hover:bg-purple-700 hover:text-gray-200 rounded-lg cursor-pointer h-auto font-title'
						>
							Continue to Checkout
							{isCheckout ? <LoadingIcon /> : null}
						</button>
						<div className='flex flex-row flex-wrap'>
							{cart.map((item, i) => {
								if (item.discountUid) {
									lineItems.push({
										quantity: item.quantity.toString(),
										catalogObjectId: item.item,
										appliedDiscounts: [{ discountUid: item.discountUid }],
									});
								} else {
									lineItems.push({
										quantity: item.quantity.toString(),
										catalogObjectId: item.item,
									});
								}

								return (
									<CheckoutCard
										key={item.item}
										quantity={item.quantity}
										index={i}
										deleteItem={deleteItem}
										name={item.name}
										price={item.price}
										description={item.description}
										image={item.imageID}
										discount={item.sale}
									/>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className='mx-auto min-h-screen flex justify-center flex-row flex-wrap'>
				<Head>
					<title>Checkout || We Made It</title>
				</Head>
				<Headers title='OOPS! Something Went Wrong!' />
				<p className='font-body'>
					This is Embarassing! We might be having trouble connecting with
					Square. Please try again later!
				</p>
			</div>
		);
	}
}
