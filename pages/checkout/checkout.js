import React, { useState } from 'react';
import CartTable from '../../components/Checkout/CartTables';
import { useCartContext } from '../../context/Store';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';
import { cobourgLocationId, newcastleLocationId } from '../../utils/options';
import SEO from '../../components/SEO/SEO';
import Link from 'next/link';

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
			locationId = newcastleLocationId;
		} else if (location === 'Cobourg') {
			locationId = cobourgLocationId;
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
			<SEO title='You Cart || We Made It' />
			<CartTable
				cart={cart}
				vendorSales={vendorSales}
				setIsDiscount={setIsDiscount}
				setLineItems={setLineItems}
				setDiscountInformation={setDiscountInformation}
				setLocation={setLocation}
			/>
			{cart.length > 0 ? (
				<div className='max-w-sm mx-auto space-y-4 px-2 flex justify-center'>
					<button
						onClick={handleCheckout}
						className='mx-1 px-5 py-5 m-5 bg-purple-200 text-gray-700 hover:bg-purple-700 hover:text-gray-200 rounded-lg cursor-pointer h-auto font-title'
					>
						Continue to Checkout
					</button>
				</div>
			) : (
				<div className='max-w-sm mx-auto space-y-4 px-2 flex justify-center'>
					<Link
						href={{
							pathname: `/Shop/shop`,
						}}
					>
						<a>
							<p className='mx-1 mt-5 px-3 py-2 bg-purple-200 text-gray-700 hover:bg-dark-purple hover:text-gray-200 rounded-lg cursor-pointer font-title'>
								SHOP NOW
							</p>
						</a>
					</Link>
				</div>
			)}
		</div>
	);
}

export default CartPage;
