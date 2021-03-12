import React from 'react';
import VendorCards from '../Vendor/VendorCards';

function VendorList({ vendors }) {
	return (
		<div className='w-full flex justify-center'>
			<div className='container m-1 sm:m-5 flex flex-row flex-wrap justify-center w-full font-body'>
				{vendors.map((list, i) => {
					return (
						<VendorCards
							vendor={vendors[i].vendor}
							image='/small-purple-splash.png'
							owner={vendors[i].owner}
							key={i}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default VendorList;
