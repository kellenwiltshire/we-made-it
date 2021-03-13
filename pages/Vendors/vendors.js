import Headers from '../../components/Layout/Headers';
import Layout from '../../components/Layout/Layout';
import VendorList from '../../components/Vendor/VendorList';
import React from 'react';
import { vendors } from '../../VendorList/VendorList';

export default function Vendors({ cart }) {
	return (
		<Layout cart={cart} title='Our Vendors || We Made It'>
			<Headers title='Our Vendors' />
			<VendorList vendors={vendors} />
		</Layout>
	);
}
