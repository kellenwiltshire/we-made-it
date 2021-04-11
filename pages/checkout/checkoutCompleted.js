import React, { useEffect } from 'react';
import Headers from '../../components/Layout/Headers';
import Layout from '../../components/Layout/Layout';
import Location from '../../components/About/Location';

export default function ShopCategories({ cart, setCart }) {
	const resetCart = () => {
		setCart([]);
	};

	useEffect(() => {
		resetCart();
	}, []);

	return (
		<Layout cart={cart} title='Checkout Completed || We Made It'>
			<div className='w-full h-full'>
				<Headers title='Checkout Completed!' />
				<div className='w-full flex flex-col justify-center'>
					<div className='container px-5 py-24 mx-auto'>
						<div className='xl:w-1/2 lg:w-3/4 w-full mx-auto text-center'>
							<p className='leading-relaxed text-lg'>
								Thank you so much for your Order and for supporting Local!
							</p>
							<p>
								Please allow up to 1 day for order completion. We will email you
								once your order is ready for pickup! All order can be picked up
								at the address below.
							</p>
							<p>
								If this is a rush order, please email us at
								wemadeit.newcastle@gmail.com
							</p>

							<span className='inline-block h-1 w-10 rounded bg-indigo-500 mt-8 mb-6'></span>
							<h2 className='text-gray-900 font-medium title-font tracking-wider text-sm'>
								Amanda Van Goor
							</h2>
							<p className='text-gray-500'>Owner</p>
						</div>
					</div>
					<div className='w-full flex justify-center'>
						<Location />
					</div>
				</div>
			</div>
		</Layout>
	);
}
