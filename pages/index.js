import AboutStore from '../components/About/AboutStore';
import Location from '../components/About/Location';
import Headers from '../components/Layout/Headers';
import Layout from '../components/Layout/Layout';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import VendorSale from '../components/About/VendorSale';

export default function Home({ cart, vendorSale }) {
	return (
		<Layout cart={cart} title='We Made It || Home' navStyle={'home'}>
			<Link
				href={{
					pathname: `/Shop/shop`,
				}}
			>
				<a className='shadow-lg cursor-pointer rounded transform hover:scale-105 duration-300 ease-in-out m-5'>
					<Image
						src='/homepagephoto.png'
						height={720}
						width={1280}
						alt='Home Page Picture - Click to Shop Now'
					/>
				</a>
			</Link>
			<Headers title='Our Story' />
			<AboutStore />
			{/* <VendorSale vendorSale={vendorSale} /> */}
			<Location />
		</Layout>
	);
}
