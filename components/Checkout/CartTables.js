import { useState, useEffect } from 'react';
import { useUpdateCartQuantityContext } from '../../context/Store';
import Link from 'next/link';
import Price from './Price';
import { getCartSubTotal } from '../../utils/checkout';
import { checkForDiscounts, checkCartDiscounts } from '../../utils/sales';

function CartTable({
	cart,
	vendorSales,
	setIsDiscount,
	setLineItems,
	setDiscountInformation,
}) {
	const updateCartQuantity = useUpdateCartQuantityContext();
	const [cartItems, setCartItems] = useState([]);
	const [subtotal, setSubtotal] = useState(0);

	const getLineItems = () => {
		const line_items = cart.map((item) => {
			if (item.discountUid) {
				return {
					quantity: item.variantQuantity.toString(),
					catalogObjectId: item.variantId,
					appliedDiscounts: [{ discountUid: item.discountUid }],
				};
			} else {
				return {
					quantity: item.variantQuantity.toString(),
					catalogObjectId: item.variantId,
				};
			}
		});
		return line_items;
	};

	useEffect(() => {
		checkCartDiscounts(cart, vendorSales, setIsDiscount);
		setCartItems(cart);
		setDiscountInformation(checkForDiscounts());
		setSubtotal(getCartSubTotal(cart));
		setLineItems(getLineItems);
	}, [cart]);

	const updateItem = (id, quantity) => {
		updateCartQuantity(id, quantity);
	};

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
								let price = item.variantPrice;
								if (item.sale) {
									price = (
										item.variantPrice -
										item.variantPrice * (item.sale / 100)
									).toFixed(2);
								}
								console.log('Mapped Items: ', item);
								return (
									<tr
										key={item.variantId}
										className='text-sm sm:text-base text-gray-600 text-center'
									>
										<td className='font-body font-medium px-4 sm:px-6 py-4 flex items-center'>
											<img
												src={item.productImage}
												height={64}
												width={64}
												className={`hidden sm:inline-flex`}
											/>
											<Link passHref href={`/products/${item.variantId}`}>
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
												value={item.variantQuantity}
												onChange={(e) =>
													updateItem(item.variantId, e.target.value)
												}
												className='text-gray-900 form-input border border-gray-300 w-16 rounded-sm focus:border-purple-400 focus:ring-purple-400'
											/>
										</td>
										<td className='font-body text-base font-light px-4 sm:px-6 py-4 hidden sm:table-cell'>
											{price < item.variantPrice ? (
												<Price
													num={price}
													sale={true}
													numSize='text-lg text-red-400'
												/>
											) : (
												<Price num={price} numSize='text-lg' />
											)}
										</td>
										<td className='font-body font-medium px-4 sm:px-6 py-4'>
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
				</tbody>
			</table>
		</div>
	);
}

export default CartTable;