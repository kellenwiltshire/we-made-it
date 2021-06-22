import Headers from '../../components/Layout/Headers';
import Head from 'next/head';
import VendorList from '../../components/Vendor/VendorList';
import React from 'react';
import { vendors } from '../../VendorList/VendorList';

export default function Vendors({ setNavStyle }) {
	setNavStyle('vendors');
	return (
		<div className='mx-auto min-h-screen flex justify-center flex-row flex-wrap'>
			<Head>
				<title>We Made It || Vendors</title>
			</Head>
			<Headers title='Our Vendors' />
			<VendorList vendors={vendors} />
		</div>
	);
}
