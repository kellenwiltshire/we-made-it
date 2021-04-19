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
	const [discountInformation, setDiscountInformation] = useState([]);
	const [salePrices, setSalePrices] = useState([]);
	//checks vendors for discount information for API
	const checkForDiscounts = () => {
		const currentSales = [];
		vendors.filter((sale) => {
			if (sale.sale) {
				let discounts = {
					uid: sale.vendor.split(' ').join(''),
					catalogObjectId: sale.discount,
					scope: 'LINE_ITEM',
				};
				currentSales.push(discounts);
			} else {
				return;
			}
		});
		return currentSales;
	};

	//checks Vendors for Sale  Prices
	const checkForSalePrices = () => {
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
		setDiscountInformation(checkForDiscounts());
		setSalePrices(checkForSalePrices());
	}, []);
	let lineItems = [];

	//Check Cart Items for Discounts
	const checkCartDiscounts = () => {
		cart.filter((item) => {
			if (item.description) {
				for (let i = 0; i < salePrices.length; i++) {
					const lowerCaseVendor = salePrices[i].vendor.toLowerCase();
					const lowerCaseItem = item.description.toLowerCase();
					if (lowerCaseItem.includes(lowerCaseVendor)) {
						item.discountUid = salePrices[i].vendor.split(' ').join('');
						item.sale = salePrices[i].sale;
						isDiscount = true;
					}
				}
			}
		});
	};
	checkCartDiscounts();

	const handleCheckout = () => {
		if (isDiscount) {
			fetch('https://we-made-it-api.herokuapp.com/discountCheckout', {
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
		}
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
