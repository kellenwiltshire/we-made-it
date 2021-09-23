import { useState, useEffect } from 'react';
import { useAddToCartContext } from '../../context/Store';
import AddToCartButton from '../Buttons/AddToCartButton';

function ProductForm({ title, handle, variants, setVariantPrice, mainImg }) {
	const [quantity, setQuantity] = useState(1);
	const [variantId, setVariantId] = useState(variants[0].node.id);
	const [variant, setVariant] = useState(variants[0]);
	const addToCart = useAddToCartContext();
	const [cartStatus, setCartStatus] = useState('Add To Cart');

	const [inventory, setInventory] = useState(
		variants[0].node.quantityAvailable,
	);

	function handleSizeChange(e) {
		setVariantId(e);
		// send back size change
		const selectedVariant = variants.filter((v) => v.node.id === e).pop();
		setVariantPrice(selectedVariant.node.price);

		// update variant
		setVariant(selectedVariant);

		//update the inventory
		setInventory(variant.node.quantityAvailable);
	}

	async function handleAddToCart() {
		const varId = variant.node.id;
		// update store context
		if (quantity !== '') {
			addToCart({
				productTitle: title,
				productHandle: handle,
				productImage: mainImg,
				variantId: varId,
				variantPrice: variant.node.price,
				variantTitle: variant.node.title,
				variantQuantity: quantity,
				maxInventory: inventory,
			});
		}
		setCartStatus('Added to Cart!');
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
					Inventory: {inventory}
				</div>

				<div className='flex flex-col items-start space-y-1 flex-grow'>
					<label className='text-gray-500 text-base'>Variations</label>
					<select
						id='variation-selector'
						name='variation-selector'
						onChange={(event) => handleSizeChange(event.target.value)}
						value={variantId}
						className='form-select border border-gray-300 rounded-sm w-full text-gray-900 focus:border-palette-light focus:ring-palette-light'
					>
						{variants.map((item) => (
							<option id={item.node.id} key={item.node.id} value={item.node.id}>
								{item.node.title}
							</option>
						))}
					</select>
				</div>
			</div>
			{inventory > 0 ? (
				<AddToCartButton
					handleAddToCart={handleAddToCart}
					cartStatus={cartStatus}
				/>
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
