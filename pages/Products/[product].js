import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Headers from '../../components/Layout/Headers';
import JSONBig from 'json-bigint';
import { Client, Environment } from 'square';
import { checkSales } from '../../utils/sales';
import { useAddToCartContext } from '../../context/Store';

export default function ShopProduct({ setNavStyle, data, vendorSales }) {
	const addToCart = useAddToCartContext();
	const [cartStatus, setCartStatus] = useState('Add to Cart');
	const router = useRouter();
	setNavStyle('products');
	if (data) {
		const image = useState(data.image);
		const itemLocations = data.itemVarData[0].presentAtLocationIds;
		const itemName = data.itemName;
		const urlID = data.itemID;
		const description = data.itemDescription;

		const [itemID, setItemID] = useState(data.itemVarData[0].id);
		const [inventory, setInventory] = useState(1);
		const [quantity, setQuantity] = useState(1);
		const [isSale, setIsSale] = useState(false);
		const [price, setPrice] = useState();

		const [buttonStatus, setButtonStatus] = useState(true);

		let fixedItemLocation = [];
		itemLocations.map((loc) => {
			if (loc === 'L0SCPZY3N0MGA') {
				fixedItemLocation.push('Newcastle');
			} else if (loc === 'LQQF7JXRMNY9M') {
				fixedItemLocation.push('Cobourg');
			}
		});

		const setInitialPrice = () => {
			const checkSale = checkSales(description, vendorSales);

			if (checkSale) {
				setIsSale(true);
				if (
					data.itemVarData[0].itemVariationData.pricingType ===
					'VARIABLE_PRICING'
				) {
					const newPrice = 'VARAIBLE PRICING - Contact Store for Details';
					//Set Button to False to stop purchases online
					setButtonStatus(false);
					return newPrice;
				} else {
					console.log('HERE NOW');
					let vendor = vendorSales.filter((vendor) => {
						if (
							description.toLowerCase().includes(vendor.vendor.toLowerCase())
						) {
							return vendor;
						} else {
							return;
						}
					});
					const currentPrice = (
						data.itemVarData[0].itemVariationData.priceMoney.amount / 100
					).toFixed(2);
					const newPrice = (
						currentPrice -
						currentPrice * (vendor[0].sale / 100)
					).toFixed(2);
					return newPrice;
				}
			} else {
				if (
					data.itemVarData[0].itemVariationData.pricingType ===
					'VARIABLE_PRICING'
				) {
					const newPrice = 'VARAIBLE PRICING - Contact Store for Details';
					//Set Button to False to stop purchases online
					setButtonStatus(false);
					return newPrice;
				} else {
					const newPrice = (
						data.itemVarData[0].itemVariationData.priceMoney.amount / 100
					).toFixed(2);
					return newPrice;
				}
			}
		};

		const onInputChange = (e) => {
			e.preventDefault();
			setQuantity(e.target.value);
			if (quantity > inventory) {
				setQuantity(inventory);
			}
		};

		useEffect(() => {
			setPrice(setInitialPrice());
		}, [vendorSales]);

		const onSelectChange = (e) => {
			const selectedItem = e.target.value;
			setPrice(
				(
					data.itemVarData[selectedItem].itemVariationData.priceMoney.amount /
					100
				).toFixed(2),
			);

			setItemID(data.itemVarData[selectedItem].id);
		};

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
					productTitle: itemName,
					productImage: image,
					variantId: itemID,
					variantPrice: price,
					variantQuantity: quantity,
					description: description,
					urlID: urlID,
				});
			}
			showSubmitSuccess();
		}

		const showSubmitSuccess = () => {
			setCartStatus('Added to Cart!');
		};

		return (
			<div className='mx-auto min-h-screen flex justify-center flex-row flex-wrap'>
				<Head>
					<title>{itemName} || We Made It</title>
				</Head>
				<div className='container px-5 mx-auto'>
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
					<div className='lg:w-4/5 mx-auto flex flex-wrap'>
						<img
							alt='ecommerce'
							className='lg:w-1/2 w-full rounded'
							height='500px'
							width='500px'
							src={image}
						/>
						<form
							className='lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0'
							onSubmit={handleAddToCart}
						>
							<h1 className='text-gray-900 text-3xl title-font font-medium mb-5 font-title'>
								{itemName}
							</h1>
							<p className='leading-relaxed font-body'>{description}</p>
							<div className='flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5'>
								<div className='flex md:ml-6 items-center'>
									<div>
										<div className='relative'>
											<div className='m-2'>
												<div>
													<span className='mr-3'>Inventory: </span>
													<span className='relative'>{inventory}</span>
												</div>
											</div>
										</div>
										{data.itemVarData.length > 1 ? (
											<div className='m-2 w-full'>
												<span className='mr-3'>Variations</span>
												<select
													onChange={onSelectChange}
													className='rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10'
												>
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
										<div className='m-2'>
											<div>
												<span className='mr-3'>Available At: </span>
												{fixedItemLocation.map((loc) => {
													return <p key={loc}>{loc}</p>;
												})}
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className='flex'>
								{isSale ? (
									<span className='title-font font-medium text-2xl text-gray-900'>
										Sale Price: ${price}
									</span>
								) : (
									<span className='title-font font-medium text-2xl text-gray-900'>
										${price}
									</span>
								)}
								{buttonStatus ? (
									<button
										type='submit'
										className='flex ml-auto text-black bg-purple-200 border-0 py-2 px-6 focus:outline-none hover:bg-dark-purple rounded'
									>
										{cartStatus}
									</button>
								) : (
									<div className='flex ml-auto text-black bg-purple-200 border-0 py-2 px-6  rounded'>
										Sold Out
									</div>
								)}
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className='mx-auto min-h-screen flex justify-center flex-row flex-wrap'>
				<Head>
					<title>We Made It</title>
				</Head>
				<Headers title='OOPS! Something Went Wrong!' />
				<p className='font-body'>
					This is Embarassing! We might be having trouble connecting with
					Square. Please try again later!
				</p>
			</div>
		);
	}
}

export async function getServerSideProps({ query }) {
	const item = query.product;

	const client = new Client({
		environment: Environment.Production,
		accessToken: process.env.SQUARE_ACCESS_TOKEN,
	});

	const catalog = client.catalogApi;

	const getProduct = async () => {
		const response = await catalog.retrieveCatalogObject(item);
		return response;
	};

	const product = await getProduct();

	if (product.result.object.imageId) {
		const picture = await catalog.retrieveCatalogObject(
			product.result.object.imageId,
		);
		const data = {
			itemID: JSONBig.parse(JSONBig.stringify(product.result.object.id)),
			itemName: product.result.object.itemData.name,
			itemDescription: product.result.object.itemData.description,
			itemVarData: JSONBig.parse(
				JSONBig.stringify(product.result.object.itemData.variations),
			),
			image: picture.result.object.imageData.url,
		};
		return {
			props: {
				data: data,
			},
		};
	} else {
		const data = {
			itemID: JSONBig.parse(JSONBig.stringify(product.result.object.id)),
			itemName: product.result.object.itemData.name,
			itemDescription: product.result.object.itemData.description,
			itemVarData: JSONBig.parse(
				JSONBig.stringify(product.result.object.itemData.variations),
			),
			image: '/pictureComingSoon.png',
		};
		return {
			props: {
				data: data,
			},
		};
	}
}
