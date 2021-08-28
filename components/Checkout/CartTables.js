import { useState, useEffect } from 'react';
import { useUpdateCartQuantityContext } from '../../context/Store';
import Link from 'next/link';
import Price from './Price';
import { getCartSubTotal } from '../../utils/checkout';

function CartTable({ cart }) {
	const updateCartQuantity = useUpdateCartQuantityContext();
	const [cartItems, setCartItems] = useState([]);
	const [subtotal, setSubtotal] = useState(0);
	console.log('This Cart: ', cart);

	useEffect(() => {
		setCartItems(cart);
		setSubtotal(getCartSubTotal(cart));
	}, [cart]);

	const updateItem = (id, quantity) => {
		updateCartQuantity(id, quantity);
	};

	console.log('Checkout Cart: ', cartItems);

	return (
		<div className='min-h-80 max-w-2xl my-4 sm:my-8 mx-auto w-full'>
			<table className='mx-auto'>
				<thead>
					<tr className='uppercase text-xs sm:text-sm text-palette-primary border-b border-palette-light'>
						<th className='font-primary font-normal px-6 py-4'>Product</th>
						<th className='font-primary font-normal px-6 py-4'>Quantity</th>
						<th className='font-primary font-normal px-6 py-4 hidden sm:table-cell'>
							Price
						</th>
						<th className='font-primary font-normal px-6 py-4'>Remove</th>
					</tr>
				</thead>
				<tbody className='divide-y divide-palette-lighter'>
					{cartItems.length
						? cartItems.map((item) => {
								console.log('Mapped Items: ', item);
								return (
									<tr
										key={item.variantId}
										className='text-sm sm:text-base text-gray-600 text-center'
									>
										<td className='font-primary font-medium px-4 sm:px-6 py-4 flex items-center'>
											<img
												src={item.productImage}
												height={64}
												width={64}
												className={`hidden sm:inline-flex`}
											/>
											<Link passHref href={`/products/${item.variantId}`}>
												<a className='pt-1 hover:text-palette-dark'>
													{item.productTitle}
												</a>
											</Link>
										</td>
										<td className='font-primary font-medium px-4 sm:px-6 py-4'>
											<input
												type='number'
												inputMode='numeric'
												id='variant-quantity'
												name='variant-quantity'
												min='1'
												step='1'
												value={item.variantQuantity}
												onChange={(e) =>
													updateItem(item.variantId, e.target.value)
												}
												className='text-gray-900 form-input border border-gray-300 w-16 rounded-sm focus:border-palette-light focus:ring-palette-light'
											/>
										</td>
										<td className='font-primary text-base font-light px-4 sm:px-6 py-4 hidden sm:table-cell'>
											<Price num={item.variantPrice} numSize='text-lg' />
										</td>
										<td className='font-primary font-medium px-4 sm:px-6 py-4'>
											<button
												aria-label='delete-item'
												className=''
												onClick={() => updateItem(item.variantId, 0)}
											>
												D
											</button>
										</td>
									</tr>
								);
						  })
						: null}
					{cartItems.length ? (
						subtotal === 0 ? null : (
							<tr className='text-center'>
								<td></td>
								<td className='font-primary text-base text-gray-600 font-semibold uppercase px-4 sm:px-6 py-4'>
									Subtotal
								</td>
								<td className='font-primary text-lg text-palette-primary font-medium px-4 sm:px-6 py-4'>
									<Price currency='$' num={subtotal} numSize='text-xl' />
								</td>
								<td></td>
							</tr>
						)
					) : null}
				</tbody>
			</table>
		</div>
	);
}

export default CartTable;
