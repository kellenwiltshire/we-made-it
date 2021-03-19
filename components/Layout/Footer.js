import React from 'react';

function Footer() {
	return (
		<footer className='bg-dark-purple w-full py-6 px-4 '>
			<div className='w-full flex flex-col my-4'>
				<div className='w-full flex justify-center'>
					<div className='flex items-center'>
						<a href='https://www.facebook.com/wemadeit.newcastle'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='icon icon-tabler icon-tabler-brand-facebook mx-5'
								width='30'
								height='30'
								viewBox='0 0 24 24'
								strokeWidth='1'
								stroke='#ffffff'
								fill='none'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<path stroke='none' d='M0 0h24v24H0z' fill='none' />
								<path d='M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3' />
							</svg>
						</a>
						<a href='mailto: wemade-it@outlook.com'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='icon icon-tabler icon-tabler-mail mx-5'
								width='30'
								height='30'
								viewBox='0 0 24 24'
								strokeWidth='1'
								stroke='#ffffff'
								fill='none'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<path stroke='none' d='M0 0h24v24H0z' fill='none' />
								<rect x='3' y='5' width='18' height='14' rx='2' />
								<polyline points='3 7 12 13 21 7' />
							</svg>
						</a>
						<a href='https://www.instagram.com/wemadeit.newcastle/'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='icon icon-tabler icon-tabler-brand-instagram mx-5'
								width='30'
								height='30'
								viewBox='0 0 24 24'
								strokeWidth='1'
								stroke='#ffffff'
								fill='none'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<path stroke='none' d='M0 0h24v24H0z' fill='none' />
								<rect x='4' y='4' width='16' height='16' rx='4' />
								<circle cx='12' cy='12' r='3' />
								<line x1='16.5' y1='7.5' x2='16.5' y2='7.501' />
							</svg>
						</a>
					</div>
				</div>
				<div className='w-full flex justify-center flex-row flex-wrap'>
					<p className='text-white w-full text-center'>All rights reserved</p>

					<a
						href='https://kellenwiltshire.com/'
						className=' text-gray-400 px-2 pt-6 w-full text-center'
					>
						Web Development by Kellen Wiltshire
					</a>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
