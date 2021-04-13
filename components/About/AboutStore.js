import React from 'react';
import Link from 'next/link';

function AboutStore() {
	return (
		<div className='w-full flex justify-center'>
			<div className='container flex flex-row flex-wrap justify-center'>
				<div className='w-full flex justify-center'>
					<div className='flex items-center'>
						<a href='https://www.facebook.com/wemadeit.newcastle'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='icon icon-tabler icon-tabler-brand-facebook mx-5 mb-2 hover:bg-purple-200 rounded-lg'
								width='50'
								height='50'
								viewBox='0 0 24 24'
								strokeWidth='1'
								stroke='#604195'
								fill='none'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<path stroke='none' d='M0 0h24v24H0z' fill='none' />
								<path d='M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3' />
							</svg>
						</a>
						<a href='https://www.instagram.com/wemadeit.newcastle/'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='icon icon-tabler icon-tabler-brand-instagram mx-5 mb-2 hover:bg-purple-200 rounded-lg'
								width='50'
								height='50'
								viewBox='0 0 24 24'
								strokeWidth='1'
								stroke='#604195'
								fill='none'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<path stroke='none' d='M0 0h24v24H0z' fill='none' />
								<rect x='4' y='4' width='16' height='16' rx='4' />
								<circle cx='12' cy='12' r='3' />
								<line x1='16.5' y1='7.5' x2='16.5' y2='7.501' />
							</svg>
						</a>
					</div>
				</div>
				<div className='w-full mx-3 md:w-2/3 text-xs md:text-base text-center leading-loose md:space-y-2 font-body'>
					<p>
						Hello! My name is Amanda VanGoor and I am the owner behind We Made
						It.
					</p>
					<p>
						I decided in December 2020 that I wanted to open my own handmade
						boutique so that I could not only sell my own items, but also offer
						a more affordable option to other local makers to sell their
						products.
					</p>
					<p>
						I have my own handmade business called Sew Sweet Handmade, created
						in 2018 and run by myself and my partner, Eileen.
					</p>
					<p>
						We Made It was named not only for the handmade aspect of our
						products, but also because we opened a business during a world-wide
						pandemic. We Made It through a lot of struggles and issues as came
						out with a beautiful shop with over 60 local vendors.
					</p>
					<p>
						We offer items from baby products to plants, jewelry, woodworking,
						signs, decor and more. This is truly a one-stop-shop that Newcastle
						desperately needed!
					</p>
					<p>Thank you for shopping locally for handmade items</p>
				</div>
				<div className='w-full flex justify-center'>
					<Link href='/Vendors/becomevendor'>
						<a>
							<p className='mx-1 mt-5 px-3 py-2 bg-purple-200 text-gray-700 hover:bg-purple-700 hover:text-gray-200 rounded-lg cursor-pointer font-title'>
								BECOME A VENDOR
							</p>
						</a>
					</Link>
					<Link
						href={{
							pathname: `/Shop/shop`,
						}}
					>
						<a>
							<p className='mx-1 mt-5 px-3 py-2 bg-purple-200 text-gray-700 hover:bg-purple-700 hover:text-gray-200 rounded-lg cursor-pointer font-title'>
								SHOP NOW
							</p>
						</a>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default AboutStore;
