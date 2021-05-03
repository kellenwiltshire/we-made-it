import React from 'react';
import FacebookWhite from '../Icons/FacebookWhite';
import InstagramWhite from '../Icons/InstagramWhite';
import EmailIcon from '../Icons/EmailIcon';

function Footer() {
	return (
		<footer className='bg-dark-purple w-full px-4 pb-2'>
			<div className='w-full flex flex-col my-4'>
				<div className='w-full flex justify-center pt-6'>
					<div className='flex items-center'>
						<a href='https://www.facebook.com/wemadeit.newcastle'>
							<FacebookWhite />
						</a>
						<a href='mailto: info@we-made-it.ca'>
							<EmailIcon />
						</a>
						<a href='https://www.instagram.com/wemadeit.newcastle/'>
							<InstagramWhite />
						</a>
					</div>
				</div>
				<div className='w-full flex justify-center flex-row flex-wrap pt-6'>
					<p className='text-white w-full text-center font-body'>
						All rights reserved
					</p>

					<a
						href='https://kellenwiltshire.com/'
						className=' text-gray-400 w-full text-center font-body'
					>
						Web Development by Kellen Wiltshire
					</a>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
