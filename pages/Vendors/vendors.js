import Headers from '../../components/Layout/Headers';
import VendorList from '../../components/Vendor/VendorList';
import React, { useState } from 'react';
import { vendors } from '../../VendorList/VendorList';
import VendorFilters from '../../components/Layout/VendorFilters';
import SEO from '../../components/SEO/SEO';

export default function Vendors() {
	const [filteredVendors, setFilteredVendors] = useState(vendors);
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
			<SEO title='Vendors || We Made It' />
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
