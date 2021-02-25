import React from 'react';
import Layout from '../../components/Layout/Layout';
import Link from 'next/link';

export default function ShopProduct({ data }) {
	return (
		<Layout>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 font-body'>
				<div className='mb-10'>
					<Link
						href={{
							pathname: '/',
						}}
					>
						<a>Home</a>
					</Link>
				</div>
				<div className='flex flex-col md:flex-row -mx-4'>
					<div className='md:flex-1 px-4 order-2 sm:order-1'>
						<img src={data[0].url} alt='' height='500px' width='500px' />
					</div>
					<div className='md:flex-1 px-4 order-1 sm:order-2'>
						<h2 className='mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl'>
							Test Product
						</h2>

						<div className='flex items-center space-x-4 my-4'>
							<div>
								<div className='rounded-lg bg-gray-100 flex py-2 px-3'>
									<span className='text-indigo-400 mr-1 mt-1'>$</span>
									<span className='font-bold text-indigo-600 text-3xl'>
										100
									</span>
								</div>
							</div>
						</div>

						<div className='text-gray-500'>
							<span className='text-xl font-bold'>Description: </span>
							<p className='leading-relaxed'>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
								fermentum lacus nec dolor elementum cursus. Nam mattis tempus
								lorem, et finibus quam mattis et. Nulla id varius urna, sit amet
								varius sapien. Phasellus id posuere purus. Nam mollis, tortor
								vitae pharetra faucibus, arcu elit porta tortor, et elementum
								neque nisi ut sem. Fusce rutrum auctor augue, vel aliquam
								ligula. Nam volutpat ultricies nisi eget ornare. Aliquam erat
								volutpat. Donec volutpat velit a diam venenatis, quis euismod
								lacus pellentesque. Sed quis tellus quis magna viverra cursus
								sit amet in erat.{' '}
							</p>
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

						<div class='flex py-4 space-x-4'>
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
						</div>

						<div className='flex py-4 space-x-4'>
							<a
								href='#'
								target='_blank'
								className=' bg-dark-purple hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-purple-500 transition ease-in-out duration-300'
							>
								Add to Cart
							</a>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}

export async function getServerSideProps({ query }) {
	const res = await fetch('https://jsonplaceholder.typicode.com/photos');
	const data = await res.json();
	return {
		props: { data },
	};
}
