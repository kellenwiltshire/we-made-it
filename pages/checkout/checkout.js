import React, { useState } from 'react';
import CartTable from '../../components/Checkout/CartTables';
import { useCartContext } from '../../context/Store';
import SEO from '../../components/SEO/SEO';
import Link from 'next/link';

function CartPage() {
	const pageTitle = `Cart | ${process.env.siteTitle}`;
	const [cart, checkoutUrl] = useCartContext();

	return (
		<div className='container mx-auto mb-20 min-h-screen'>
			<SEO title={pageTitle} />
			<CartTable cart={cart} />
			{cart.length > 0 ? (
				<div className='max-w-sm mx-auto space-y-4 px-2 flex justify-center'>
					<a
						href={checkoutUrl}
						className='mx-1 px-5 py-5 m-5 bg-purple-200 text-gray-700 hover:bg-purple-700 hover:text-gray-200 rounded-lg cursor-pointer h-auto font-title'
					>
						Continue to Checkout
					</a>
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
