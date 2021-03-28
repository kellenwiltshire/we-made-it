import React from 'react';
import BecomeVendor from '../../components/Forms/BecomeVendor';
import Layout from '../../components/Layout/Layout';

function becomevendor({ cart }) {
	return (
		<Layout cart={cart} title='Become A Vendor || We Made It'>
			<div className='flex flex-row flex-wrap justify-center'>
				<h1 className='text-center text-xl mt-5 font-body'>
					We are not currently accepting new Vendor's at this time. Any
					applications received will be added to a waitlist!
				</h1>
				<BecomeVendor />
			</div>
		</Layout>
	);
}

export default becomevendor;
