import AboutStore from '../components/About/AboutStore';
import Location from '../components/About/Location';
import Headers from '../components/Layout/Headers';
import React from 'react';
import Link from 'next/link';
import VendorSale from '../components/About/VendorSale';
import SEO from '../components/SEO/SEO';

export default function Home({ vendorSales }) {
	return (
		<div className='mx-auto min-h-screen flex justify-center flex-row flex-wrap'>
			<SEO title='We Made It' />
			<Link
				href={{
					pathname: `/Shop/shop`,
				}}
			>
				<a className='shadow-lg cursor-pointer transform hover:scale-105 duration-300 ease-in-out m-5'>
					<img
						src='/newhomepagephoto.png'
						height={648}
						width={1280}
						alt='Home Page Picture - Click to Shop Now'
					/>
				</a>
			</Link>
			<Headers title='Our Story' />
			<AboutStore />

			{/* <VendorSale vendorSales={vendorSales} /> */}
			<Location />
		</div>
	);
}
