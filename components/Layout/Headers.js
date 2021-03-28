import React from 'react';

function Headers({ title, subtitle }) {
	return (
		<div className='w-full text-center m-5'>
			<div className='text-center w-full text-dark-purple text-6xl font-title'>
				{title}
			</div>
			<div className='text-center w-full text-dark-purple text-3xl font-title'>
				{subtitle}
			</div>
		</div>
	);
}

export default Headers;
