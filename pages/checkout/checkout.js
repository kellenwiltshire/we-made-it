import React, { useState } from 'react';
import CartTable from '../../components/Checkout/CartTables';
import { useCartContext } from '../../context/Store';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';

function CartPage({ setNavStyle, vendorSales }) {
	const cart = useCartContext();
	const [isDiscount, setIsDiscount] = useState(false);
	const [lineItems, setLineItems] = useState();
	const [discountInformation, setDiscountInformation] = useState([]);
	const [location, setLocation] = useState('Newcastle');
	const router = useRouter();
	setNavStyle('products');

	const handleCheckout = () => {
		const orderID = uuidv4();
		let locationId = 'L0SCPZY3N0MGA';
		if (location === 'Newcastle') {
			locationId = 'L0SCPZY3N0MGA';
		} else if (location === 'Cobourg') {
			locationId = 'LQQF7JXRMNY9M';
		}
		if (isDiscount) {
			fetch('https://we-made-it.ca/api/discountcheckout', {
				method: 'post',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					lineItems: lineItems,
					discounts: discountInformation,
					orderID: orderID,
					locationId: locationId,
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
					locationId: locationId,
				}),
			})
				.then((response) => response.json())
				.then((data) => {
					router.push(data.checkout.checkoutPageUrl);
				})
				.catch((err) => console.log(err));
		}
	};

	return (
		<div className='container mx-auto mb-20 min-h-screen'>
			{/* <SEO title={pageTitle} />
			<PageTitle text='Your Cart' /> */}
			<CartTable
				cart={cart}
				vendorSales={vendorSales}
				setIsDiscount={setIsDiscount}
				setLineItems={setLineItems}
				setDiscountInformation={setDiscountInformation}
				setLocation={setLocation}
			/>
			<div className='max-w-sm mx-auto space-y-4 px-2 flex justify-center'>
				<button
					onClick={handleCheckout}
					className='mx-1 px-5 py-5 m-5 bg-purple-200 text-gray-700 hover:bg-purple-700 hover:text-gray-200 rounded-lg cursor-pointer h-auto font-title'
				>
					Continue to Checkout
				</button>
			</div>
		</div>
	);
}

export default CartPage;
