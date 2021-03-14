import React from 'react';

function Headers({ title, subtitle }) {
	return (
		<div className='w-full text-center m-5'>
			<div className='text-center w-full text-dark-purple text-6xl'>
				{title}
			</div>
			<div className='text-center w-full text-dark-purple text-3xl'>
				{subtitle}
			</div>
		</div>
	);
}

export default Headers;
