import React from 'react';

function LeftButton() {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			className='icon icon-tabler icon-tabler-arrow-left'
			width='32'
			height='32'
			viewBox='0 0 24 24'
			strokeWidth='1.5'
			stroke='#ffffff'
			fill='none'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path stroke='none' d='M0 0h24v24H0z' fill='none' />
			<line x1='5' y1='12' x2='19' y2='12' />
			<line x1='5' y1='12' x2='11' y2='18' />
			<line x1='5' y1='12' x2='11' y2='6' />
		</svg>
	);
}

export default LeftButton;
