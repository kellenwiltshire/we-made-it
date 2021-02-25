import React from 'react';
import VendorCards from '../Vendor/VendorCards';

function VendorList({ venData }) {
	return (
		<div className='w-full flex justify-center'>
			<div className='container m-1 sm:m-5 flex flex-row flex-wrap justify-center w-full font-body'>
				{venData.map((list, i) => {
					return (
						<VendorCards
							title='Vendor'
							image={venData[i].url}
							key={i}
							vendorID='9876'
						/>
					);
				})}
			</div>
		</div>
	);
}

export default VendorList;
