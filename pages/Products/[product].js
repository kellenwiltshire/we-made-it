import React from 'react';
import Layout from '../../components/Layout/Layout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ShopProduct({ data, setCart, cart }) {
	console.log('New Data Received: ', data);
	const itemName = data.itemName;
	const [price, setPrice] = useState(
		(data.itemVarData[0].itemVariationData.priceMoney.amount / 100).toFixed(2),
	);
	const [itemID, setItemID] = useState(
		data.itemVarData[0].itemVariationData.itemId,
	);
	const description = data.description;
	const router = useRouter();

	let quantity;
	let selectedItem;

	const onInputChange = (e) => {
		e.preventDefault();
		quantity = e.target.value;
	};

	const onSelectChange = (e) => {
		selectedItem = e.target.value;
		setPrice(
			(
				data.itemVarData[selectedItem].itemVariationData.priceMoney.amount / 100
			).toFixed(2),
		);
		console.log(e.target.value);
	};

	const handleCart = (e) => {
		e.preventDefault();
		setCart([...cart, { item: data.items, quantity: quantity }]);
		showSubmitSuccess();
	};

	const showSubmitSuccess = () => {
		document.getElementById('success').style.visibility = 'visible';
	};

	const getItemVarData = () => {
		if (data.itemVarData) {
			return (
				<div className='flex py-4 space-x-4'>
					<div className='relative'>
						<div className='text-center left-0 pt-2 right-0 absolute block text-xs uppercase text-gray-400 tracking-wide font-semibold'>
							Variation
						</div>
						<select
							onChange={onSelectChange}
							className='cursor-pointer appearance-none rounded-xl border border-purple-200 pl-4 pr-8 h-14 flex items-end pb-1'
						>
							{data.itemVarData.map((item, i) => {
								return (
									<option value={i}>
										{data.itemVarData[i].itemVariationData.name}
									</option>
								);
							})}
						</select>
					</div>
				</div>
			);
		} else {
			return <div></div>;
		}
	};

	return (
		<Layout cart={cart}>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 font-body'>
				<div className='mb-10'>
					<div
						onClick={() => router.back()}
						className='flex items-center font-bold'
					>
						<span className='mx-1 px-3 py-2 bg-purple-200 text-gray-700 hover:bg-purple-700 hover:text-gray-200 rounded-lg cursor-pointer'>
							Back
						</span>
					</div>
				</div>
				<div className='flex flex-col md:flex-row -mx-4'>
					<div className='md:flex-1 px-4 order-2 sm:order-1'>
						<img
							src='/pictureComingSoon.png'
							alt=''
							height='500px'
							width='500px'
						/>
					</div>
					<div className='md:flex-1 px-4 order-1 sm:order-2'>
						<h2 className='mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl'>
							{itemName}
						</h2>

						<div className='flex items-center space-x-4 my-4'>
							<div>
								<div className='rounded-lg bg-gray-100 flex py-2 px-3'>
									<span className='text-indigo-400 mr-1 mt-1'>$</span>
									<span className='font-bold text-indigo-600 text-3xl'>
										{price}
									</span>
								</div>
							</div>
						</div>

						<div className='text-gray-500'>
							<span className='text-xl font-bold'>Description: </span>
							<p className='leading-relaxed'>{description}</p>
						</div>

						<div className='flex py-4'>
							<form onSubmit={handleCart}>
								<input
									type='number'
									id='quantity'
									name='quantity'
									min='1'
									max='5'
									placeholder='Quantity'
									onChange={onInputChange}
								/>
								{getItemVarData()}

								<button
									type='submit'
									className='mx-1 px-3 py-2 bg-purple-200 text-gray-700 hover:bg-purple-700 hover:text-gray-200 rounded-lg cursor-pointer'
								>
									Add to Cart
								</button>
							</form>
						</div>

						<div
							id='success'
							style={{ visibility: 'hidden' }}
							className='text-center justify-center align-middle'
						>
							<h1>Added to Cart!</h1>
						</div>

						<div>
							<p className='text-xs leading-none text-gray-500'>
								Due to the nature of our store, all items are final sale. We are
								unable to provide exchanges or refunds as vendors are paid out
								with their sales.
							</p>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}

export async function getServerSideProps({ query }) {
	const item = query.product;
	console.log(item);
	try {
		const res = await fetch('http://localhost:4000/itemInfo', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				item: item,
			}),
		});
		const data = await res.json();
		return {
			props: { data },
		};
	} catch (error) {
		const data = error;
		return {
			props: { data },
		};
	}
}
