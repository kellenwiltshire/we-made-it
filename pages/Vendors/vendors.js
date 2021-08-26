import Headers from '../../components/Layout/Headers';
import Head from 'next/head';
import VendorList from '../../components/Vendor/VendorList';
import React, { useEffect, useState } from 'react';
import { vendors } from '../../VendorList/VendorList';
import VendorFilters from '../../components/Layout/VendorFilters';

export default function Vendors({ setNavStyle }) {
	const [filteredVendors, setFilteredVendors] = useState(vendors);
	setNavStyle('vendors');
	const updatePage = (vendors) => {
		setFilteredVendors(vendors);
	};
	//Handles a filter reset
	const resetItems = (e) => {
		e.preventDefault();
		setFilteredVendors(vendors);
	};
	console.log(filteredVendors);
	return (
		<div className='mx-auto min-h-screen flex justify-center flex-row flex-wrap'>
			<Head>
				<title>We Made It || Vendors</title>
			</Head>
			<Headers title='Our Vendors' />
			<VendorFilters
				vendors={vendors}
				resetItems={resetItems}
				updatePage={updatePage}
			/>
			<VendorList vendors={filteredVendors} />
		</div>
	);
}
