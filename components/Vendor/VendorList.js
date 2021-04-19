import React from 'react';
import VendorCards from '../Vendor/VendorCards';

function VendorList({ vendors }) {
	return (
		<div className='w-full flex justify-center'>
			<div className='container md:m-5 flex flex-row flex-wrap justify-center w-full font-body'>
				{vendors.map((vendor, i) => {
					return (
						<VendorCards vendor={vendor.vendor} image={vendor.image} key={i} />
					);
				})}
			</div>
		</div>
	);
}

export default VendorList;
