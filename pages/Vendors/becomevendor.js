import React from 'react';
import BecomeVendor from '../../components/Forms/BecomeVendor';
import Head from 'next/head';

function becomevendor({ setNavStyle }) {
	setNavStyle('vendors');
	return (
		<div className='mx-auto min-h-screen flex justify-center flex-row flex-wrap'>
			<Head>
				<title>Become A Vendor || We Made It</title>
			</Head>
			<div className='flex flex-row flex-wrap justify-center'>
				{/* <h1 className='text-center text-xl mt-5 font-body'>
					We are not currently accepting new Vendor's at this time. Any
					applications received will be added to a waitlist!
				</h1> */}
				<BecomeVendor />
			</div>
		</div>
	);
}

export default becomevendor;
