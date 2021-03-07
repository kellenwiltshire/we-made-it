import React from 'react';
import Layout from '../../components/Layout/Layout';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function ShopProduct({ data }) {
	const itemName = data.items.object.itemData.name;
	const price =
		data.items.object.itemData.variations[0].itemVariationData.priceMoney
			.amount;
	const roundedPrice = (price / 100).toFixed(2);
	const description = data.items.object.itemData.description;
	const router = useRouter();

	return (
		<Layout>
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
							src='/big-purple-splash.png'
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
										{roundedPrice}
									</span>
								</div>
							</div>
						</div>

						<div className='text-gray-500'>
							<span className='text-xl font-bold'>Description: </span>
							<p className='leading-relaxed'>{description}</p>
						</div>
						<div class='flex py-4 space-x-4'>
							<div class='relative'>
								<div class='text-center left-0 pt-2 right-0 absolute block text-xs uppercase text-gray-400 tracking-wide font-semibold'>
									Qty
								</div>
								<select class='cursor-pointer appearance-none rounded-xl border border-purple-200 pl-4 pr-8 h-14 flex items-end pb-1'>
									<option>1</option>
									<option>2</option>
									<option>3</option>
									<option>4</option>
									<option>5</option>
								</select>
							</div>
						</div>

						{/* <div class='flex py-4 space-x-4'>
							<div class='relative'>
								<div class='text-center left-0 pt-2 right-0 absolute block text-xs uppercase text-gray-400 tracking-wide font-semibold'>
									Colour
								</div>
								<select class='cursor-pointer appearance-none rounded-xl border border-purple-200 pl-4 pr-8 h-14 flex items-end pb-1'>
									<option>Blue</option>
									<option>Purple</option>
									<option>White</option>
									<option>Green</option>
									<option>Red</option>
								</select>
							</div>
						</div> */}

						<div className='flex py-4 space-x-4'>
							<a
								href='#'
								target='_blank'
								className='mx-1 px-3 py-2 bg-purple-200 text-gray-700 hover:bg-purple-700 hover:text-gray-200 rounded-lg cursor-pointer'
							>
								Add to Cart
							</a>
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
