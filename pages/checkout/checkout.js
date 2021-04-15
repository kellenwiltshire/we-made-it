import React, { useState, useEffect } from 'react';
import Headers from '../../components/Layout/Headers';
import Layout from '../../components/Layout/Layout';
import CheckoutCard from '../../components/Checkout/CheckoutCard';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import { vendors } from '../../VendorList/VendorList';

export default function Checkout({ cart, setCart }) {
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

	let isDiscount = false;

	//This function gathers all the Vendor's that currently have a sale running
	const [sales, setSales] = useState([]);
	const checkForSales = () => {
		const currentSales = vendors.filter((sale) => {
			if (sale.sale) {
				return sale;
			} else {
				return;
			}
		});
		return currentSales;
	};
	useEffect(() => {
		setSales(checkForSales());
	}, []);
	console.log('Vendor with Sales: ', sales);
	console.log('Cart: ', cart);

	let lineItems = [];

	//Check Cart Items for Discounts
	const checkCartDiscounts = () => {
		cart.filter((item) => {
			if (item.description) {
				for (let i = 0; i < sales.length; i++) {
					const lowerCaseVendor = sales[i].vendor.toLowerCase();
					const lowerCaseItem = item.description.toLowerCase();
					if (lowerCaseItem.includes(lowerCaseVendor)) {
						item.discount = sales[i].discount;
						item.sale = sales[i].sale;
						isDiscount = true;
						// return newItem;
					}
				}
			}
		});
	};
	checkCartDiscounts();

	const handleCheckout = () => {
		// if (isDiscount) {
		// 	console.log('DISCOUNT DETECTED');
		// 	console.log(lineItems);
		// } else {
		fetch('https://we-made-it-api.herokuapp.com/checkout', {
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
		// }
	};

	if (cart) {
		return (
			<Layout cart={cart} title='Checkout || We Made It'>
				<Headers title='Checkout' />
				<div className='container flex h-full'>
					<div className='h-auto w-full'>
						<button
							onClick={handleCheckout}
							className='mx-1 px-5 py-5 m-5 bg-purple-200 text-gray-700 hover:bg-purple-700 hover:text-gray-200 rounded-lg cursor-pointer h-auto font-title'
						>
							Continue to Checkout
						</button>
						<div className='flex flex-row flex-wrap'>
							{cart.map((list, i) => {
								if (cart[i].discount) {
									lineItems.push({
										quantity: cart[i].quantity.toString(),
										catalogObjectId: cart[i].item,
										appliedDiscounts: [{ discountUid: cart[i].discount }],
									});
								} else {
									lineItems.push({
										quantity: cart[i].quantity.toString(),
										catalogObjectId: cart[i].item,
									});
								}

								return (
									<CheckoutCard
										key={cart[i].item}
										quantity={cart[i].quantity}
										index={i}
										deleteItem={deleteItem}
										name={cart[i].name}
										price={cart[i].price}
										description={cart[i].description}
										image={cart[i].imageID}
										discount={cart[i].sale}
									/>
								);
							})}
						</div>
					</div>
				</div>
			</Layout>
		);
	} else {
		return (
			<Layout cart={cart} title={`We Made It`}>
				<Headers title='OOPS! Something Went Wrong!' />
				<p className='font-body'>
					This is Embarassing! We might be having trouble connecting with
					Square. Please try again later!
				</p>
			</Layout>
		);
	}
}
