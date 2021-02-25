import Headers from '../../components/Layout/Headers';
import Layout from '../../components/Layout/Layout';
import VendorList from '../../components/Vendor/VendorList';
import BecomeVendor from '../../components/Forms/BecomeVendor';
import React from 'react';

export default function Vendors({ data }) {
	const venData = [
		data[10],
		data[11],
		data[12],
		data[13],
		data[14],
		data[10],
		data[11],
		data[12],
		data[13],
		data[14],
		data[10],
		data[11],
		data[12],
		data[13],
		data[14],
		data[10],
		data[11],
		data[12],
		data[13],
		data[14],
	];
	return (
		<Layout>
			<Headers title='Our Vendors' />
			<VendorList venData={venData} />
			<BecomeVendor />
		</Layout>
	);
}

export async function getServerSideProps(context) {
	const res = await fetch('https://jsonplaceholder.typicode.com/photos');
	const data = await res.json();
	return {
		props: { data },
	};
}
