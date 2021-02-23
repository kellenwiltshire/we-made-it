import React from 'react';
import Image from 'next/image';

function Headers({ title }) {
	return (
		<div className='w-full text-center header-background'>
			{/* <div>
				<Image
					src='/big-purple-splash.png'
					alt='purple splash'
					height={200}
					width={400}
				/>
			</div> */}
			<div className='absolute z-10 text-center w-full header-background'>
				{title}
			</div>
		</div>
	);
}

export default Headers;
