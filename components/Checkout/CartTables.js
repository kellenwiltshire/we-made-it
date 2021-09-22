import { useState, useEffect } from 'react';
import { useUpdateCartQuantityContext } from '../../context/Store';
import Link from 'next/link';
import Price from './Price';
import { getCartSubTotal } from '../../utils/checkout';
import { checkForDiscounts, checkCartDiscounts } from '../../utils/sales';
import Delete from '../Icons/Delete';

function CartTable({ cart }) {
	const updateCartQuantity = useUpdateCartQuantityContext();
	const [cartItems, setCartItems] = useState([]);
	const [subtotal, setSubtotal] = useState(0);

	useEffect(() => {
		setCartItems(cart);
		setSubtotal(getCartSubTotal(cart).toFixed(2));
	}, [cart]);

	function updateItem(id, quantity) {
		updateCartQuantity(id, quantity);
	}

	return (
		<div className='min-h-80 max-w-2xl my-4 sm:my-8 mx-auto w-full'>
			<table className='mx-auto'>
				<thead>
					<tr className='uppercase text-xs sm:text-sm text-black border-b border-purple-200 font-title'>
						<th className='font-normal px-6 py-4'>Product</th>
						<th className='font-normal px-6 py-4'>Quantity</th>
						<th className='font-normal px-6 py-4 hidden sm:table-cell'>
							Price
						</th>
						<th className='font-normal px-6 py-4'>Remove</th>
					</tr>
				</thead>
				<tbody className='divide-y divide-purple-200'>
					{cartItems.length
						? cartItems.map((item) => {
								return (
									<tr
										key={item.variantId}
										className='text-sm sm:text-base text-gray-600 text-center'
									>
										<td className='font-body font-medium px-4 sm:px-6 py-4 flex items-center'>
											<img
												src={item.productImage.originalSrc}
												alt={item.productImage.altText}
												height={64}
												width={64}
												className={`hidden sm:inline-flex`}
											/>
											<Link passHref href={`/Products/${item.productHandle}`}>
												<a className='pt-1 m-1'>{item.productTitle}</a>
											</Link>
										</td>
										<td className='font-body font-medium px-4 sm:px-6 py-4'>
											<input
												type='number'
												inputMode='numeric'
												id='variant-quantity'
												name='variant-quantity'
												min='1'
												step='1'
												max={item.maxInventory}
												value={item.variantQuantity}
												onChange={(e) =>
													updateItem(item.variantId, e.target.value)
												}
												className='text-gray-900 form-input border border-gray-400 w-16 rounded-lg focus:border-purple-400 focus:ring-purple-400'
											/>
										</td>
										<td className='font-body text-base px-4 sm:px-6 py-4 hidden sm:table-cell'>
											<Price num={item.variantPrice} numSize='text-lg' />
										</td>
										<td className='font-body font-medium px-4 sm:px-6 py-4'>
											<button
												aria-label='delete-item'
												className=''
												onClick={() => updateItem(item.variantId, 0)}
											>
												<Delete />
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
								<td className='font-body text-base text-gray-600 font-semibold uppercase px-4 sm:px-6 py-4'>
									Subtotal
								</td>
								<td className='font-body text-lg font-medium px-4 sm:px-6 py-4'>
									<Price currency='$' num={subtotal} numSize='text-xl' />
								</td>
								<td></td>
							</tr>
						)
					) : null}
					{/* {cartItems.length ? (
						<tr className='text-center'>
							<td className='font-body text-base text-gray-600 font-semibold uppercase px-4 sm:px-6 py-4'>
								Pickup Location
							</td>
							<select
								type='name'
								name='sort'
								id='sort'
								className='text-sm md:text-base w-auto p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400  text-gray-800 font-semibold focus:border-dark-purple focus:outline-none m-2 font-body'
								onChange={(e) => setLocation(e.target.value)}
								defaultValue='Sort Items'
							>
								<option className='m-2'>Newcastle</option>
								<option className='m-2'>Cobourg</option>
							</select>
						</tr>
					) : null} */}
				</tbody>
			</table>
		</div>
	);
}

export default CartTable;
