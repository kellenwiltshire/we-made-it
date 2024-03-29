import React from 'react';
import Link from 'next/link';
import SEO from '../components/SEO/SEO';

export default function Custon500() {
	return (
		<div className='h-screen w-screen bg-gray-100 flex items-center justify-center'>
			<SEO title='500 Error || We Made It' />
			<div className='container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700'>
				<div className='max-w-md font-title'>
					<div className='text-5xl font-dark font-bold'>500 - Server Error</div>
					<p className='text-2xl md:text-3xl font-light leading-normal'>
						Sorry we couldn't load this page...
					</p>
					<p className='mb-8'>
						But dont worry, you can find plenty of other things on our homepage.
					</p>
					<Link href='/'>
						<a className='px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700'>
							back to homepage
						</a>
					</Link>
				</div>
				<div className='max-w-lg'>
					<img src='/508.png' alt='500 Server Error' />
				</div>
			</div>
		</div>
	);
}
