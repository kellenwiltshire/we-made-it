import { useState, useEffect } from 'react';
import { useAddToCartContext } from '../../context/Store';
import AddToCartButton from '../Buttons/AddToCartButton';

function ProductForm({ productData, setPrice, setItemID, itemID }) {
	const [quantity, setQuantity] = useState(1);
	const addToCart = useAddToCartContext();

	const [buttonStatus, setButtonStatus] = useState(true);
	const [checkoutPrice, setCheckoutPrice] = useState(
		(
			productData.itemVarData[0].itemVariationData.priceMoney.amount / 100
		).toFixed(2),
	);

	const [inventory, setInventory] = useState(1);

	useEffect(async () => {
		setInventory(await inventoryUpdate());
	}, [itemID]);
	const inventoryUpdate = async () => {
		const response = await fetch('https://we-made-it.ca/api/inventory', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				item: itemID,
			}),
		});
		const data = await response.json();
		if (data.counts[0].quantity < 1) {
			setButtonStatus(false);
		} else {
			setButtonStatus(true);
		}
		return data.counts[0].quantity;
	};

	async function handleAddToCart(e) {
		e.preventDefault();
		// update store context
		if (quantity > 0) {
			addToCart({
				productTitle: productData.itemName,
				productImage: productData.image,
				variantId: itemID,
				variantPrice: checkoutPrice,
				variantQuantity: quantity,
				description: productData.itemDescription,
				urlID: productData.itemID,
			});
		}
	}

	function updateQuantity(e) {
		if (e === '') {
			setQuantity('');
		} else {
			setQuantity(Math.floor(e));
			if (quantity > inventory) {
				setQuantity(inventory);
			}
		}
	}

	const onSelectChange = (e) => {
		const selectedItem = e.target.value;
		setCheckoutPrice(
			(
				productData.itemVarData[selectedItem].itemVariationData.priceMoney
					.amount / 100
			).toFixed(2),
		);

		setItemID(productData.itemVarData[selectedItem].id);
	};

	return (
		<div className='w-full'>
			<div className='flex justify-start space-x-2 w-full mb-2'>
				<div className='flex flex-col items-start space-y-1 flex-grow-0'>
					<label className='text-gray-500 text-base'>Qty.</label>
					<input
						type='number'
						inputMode='numeric'
						id='quantity'
						name='quantity'
						min='1'
						step='1'
						max={inventory}
						value={quantity}
						onChange={(e) => updateQuantity(e.target.value)}
						className='text-gray-900 form-input border border-gray-300 w-16 rounded-sm focus:border-purple-400 focus:ring-purple-400'
					/>
				</div>
				{productData.itemVarData.length > 1 ? (
					<div className='flex flex-col items-start space-y-1 flex-grow'>
						<label className='text-gray-500 text-base'>Variation</label>
						<select
							id='variation'
							name='variation'
							onChange={onSelectChange}
							className='form-select border border-gray-300 rounded-sm w-full text-gray-900 focus:border-purple-400 focus:ring-purple-400'
						>
							{productData.itemVarData.map((item, i) => {
								return (
									<option key={i} value={i}>
										{item.itemVariationData.name}
									</option>
								);
							})}
						</select>
					</div>
				) : null}
			</div>
			{buttonStatus ? (
				<AddToCartButton handleAddToCart={handleAddToCart} />
			) : (
				<div
					className='border border-purple-400 bg-purple-400 text-white text-lg font-title font-semibold pt-2 pb-1 leading-relaxed flex 
      justify-center items-center  focus:outline-none w-full  rounded-sm hover:bg-white hover:text-purple-400'
				>
					Sold Out
				</div>
			)}
		</div>
	);
}

export default ProductForm;
