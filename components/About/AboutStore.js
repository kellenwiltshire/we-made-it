import React from 'react';
import Link from 'next/link';

function AboutStore() {
	return (
		<div className='w-full flex justify-center'>
			<div className='container flex flex-row flex-wrap justify-center'>
				<div className='w-full text-center leading-loose space-y-2'>
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
				<Link href='/Vendors/vendors'>
					<a>
						<p className='mx-1 mt-5 px-3 py-2 bg-purple-200 text-gray-700 hover:bg-purple-700 hover:text-gray-200 rounded-lg cursor-pointer'>
							BECOME A VENDOR
						</p>
					</a>
				</Link>
			</div>
		</div>
	);
}

export default AboutStore;
