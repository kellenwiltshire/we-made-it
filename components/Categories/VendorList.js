import React from 'react';
import Cards from './Cards';

function VendorList({ venData }) {
	return (
		<div className='w-full flex justify-center'>
			<div className='container m-1 sm:m-5 flex flex-row flex-wrap justify-center w-full font-body'>
				{venData.map((list, i) => {
					return <Cards title='Vendor' image={venData[i].url} key={i} />;
				})}
			</div>
		</div>
	);
}

export default VendorList;
