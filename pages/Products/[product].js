import React from 'react';
import Layout from '../../components/Layout/Layout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Headers from '../../components/Layout/Headers';
import { vendors } from '../../VendorList/VendorList';

export default function ShopProduct({ data, setCart, cart, vendorSales }) {
	const [cartStatus, setCartStatus] = useState('Add to Cart');
	if (data) {
		const [image, setImage] = useState('/sparklelogoblack.png');
		if (data.imageId) {
			fetch('https://we-made-it-v2.herokuapp.com/imageRequest', {
				method: 'post',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					item: data.imageId,
				}),
			})
				.then((response) => response.json())
				.then((data) => {
					setImage(data.image);
				})
				.catch((err) => console.log(err));
		}
		const itemName = data.itemName;
		const [price, setPrice] = useState();
		const [itemID, setItemID] = useState(data.itemVarData[0].id);
		const [isVariablePricing, setIsVariablePricing] = useState(false);
		const description = data.itemDescription;
		const router = useRouter();

		const [inventory, setInventory] = useState(null);

		let quantity = 1;
		let selectedItem;

		const setInitialPrice = () => {
			if (
				data.itemVarData[0].itemVariationData.pricingType === 'VARIABLE_PRICING'
			) {
				let newPrice = 'VARAIBLE PRICING - Contact Store for Details';
				setIsVariablePricing(true);
				return newPrice;
			} else {
				let newPrice = (
					data.itemVarData[0].itemVariationData.priceMoney.amount / 100
				).toFixed(2);
				return newPrice;
			}
		};

		const onInputChange = (e) => {
			e.preventDefault();
			quantity = e.target.value;
			if (quantity > inventory) {
				quantity = inventory;
			}
		};

		const [newPrice, setNewPrice] = useState();

		useEffect(() => {
			setPrice(setInitialPrice());
		}, []);

		useEffect(() => {
			if (description) {
				for (let i = 0; i < vendorSales.length; i++) {
					const lowerCaseVendor = vendorSales[i].vendor.toLowerCase();
					const lowerCaseItem = description.toLowerCase();
					if (lowerCaseItem.includes(lowerCaseVendor)) {
						const sale = vendorSales[i].sale / 100;
						let newCurrPrice = price - price * sale;
						setNewPrice(newCurrPrice);
					}
				}
			}
		}, []);

		const onSelectChange = (e) => {
			selectedItem = e.target.value;
			setPrice(
				(
					data.itemVarData[selectedItem].itemVariationData.priceMoney.amount /
					100
				).toFixed(2),
			);
			setItemID(data.itemVarData[selectedItem].id);
		};

		const updateInventory = () => {
			fetch('https://we-made-it-v2.herokuapp.com/variations', {
				method: 'post',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					item: itemID,
				}),
			})
				.then((response) => response.json())
				.then((response) => {
					setInventory(response.counts[0].quantity);
				})
				.catch((error) => {
					setInventory(0);
				});
		};

		const handleCart = (e) => {
			e.preventDefault();
			setCart([
				...cart,
				{
					item: itemID,
					quantity: quantity,
					name: itemName,
					price: price,
					description: description,
					imageID: image,
				},
			]);
			showSubmitSuccess();
		};

		const showSubmitSuccess = () => {
			setCartStatus('Added to Cart!');
		};

		updateInventory();
		return (
			<Layout cart={cart} title={`${itemName} || We Made It`}>
				<div class='container px-5 mx-auto'>
					<div className='mb-10'>
						<button
							onClick={() => router.back()}
							className='flex items-center font-bold'
						>
							<span className='mx-1 mt-5 px-3 py-2 bg-purple-200 text-gray-700 hover:bg-dark-purple hover:text-gray-200 rounded-lg cursor-pointer font-title'>
								Back
							</span>
						</button>
					</div>
					<div class='lg:w-4/5 mx-auto flex flex-wrap'>
						<img
							alt='ecommerce'
							class='lg:w-1/2 w-full object-cover object-center rounded'
							height='500px'
							width='500px'
							src={image}
						/>
						<form
							class='lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0'
							onSubmit={handleCart}
						>
							<h1 class='text-gray-900 text-3xl title-font font-medium mb-5 font-title'>
								{itemName}
							</h1>
							<p class='leading-relaxed font-body'>{description}</p>
							<div class='flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5'>
								<div class='flex ml-6 items-center'>
									<div>
										<div class='relative'>
											<div className='m-2'>
												<div>
													<span className='mr-3'>Inventory: </span>
													<span className='relative'>{inventory}</span>
												</div>
											</div>
											{data.itemVarData.length > 1 ? (
												<div className='m-2'>
													<span className='mr-3'>Variations</span>
													<select className='rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10'>
														{data.itemVarData.map((item, i) => {
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
										<div className='m-2'>
											<div>
												<span className='mr-3'>Quantity</span>

												<input
													type='number'
													id='quantity'
													name='quantity'
													min='1'
													placeholder='1'
													max={inventory}
													onChange={onInputChange}
													className='rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base'
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class='flex'>
								{newPrice ? (
									<span className='title-font font-medium text-2xl text-gray-900'>
										Sale Price: ${newPrice.toFixed(2)}
									</span>
								) : (
									<span className='title-font font-medium text-2xl text-gray-900'>
										${price}
									</span>
								)}
								{isVariablePricing ? null : (
									<button
										type='submit'
										class='flex ml-auto text-black bg-purple-200 border-0 py-2 px-6 focus:outline-none hover:bg-dark-purple rounded'
									>
										{cartStatus}
									</button>
								)}
							</div>
						</form>
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

export async function getServerSideProps({ query }) {
	const item = query.product;
	try {
		const productInfo = await fetch(
			'https://we-made-it-v2.herokuapp.com/itemInfo',
			{
				method: 'post',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					item: item,
				}),
			},
		);
		const data = await productInfo.json();

		return {
			props: { data },
		};
	} catch (error) {
		return {
			props: {},
		};
	}
}
