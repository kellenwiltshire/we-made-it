import React from 'react';
import Head from 'next/head';
import Navigation from './Navigation';
import Footer from './Footer';

function Layout({ title, children, cart }) {
	return (
		<div>
			<Head>
				<title>{title}</title>
				<link rel='icon' href='/favicon.ico' />
				<meta description='We-Made-It We Made It Newcastle Ontario Homemade Handmade Decor Boutique Local Clarington Canada Bowmanville Durham Oshawa' />
				<meta name='We Made It Local Handmade Boutique' />
				<meta lang='en' />
			</Head>
			<Navigation cart={cart} />
			<main className='mx-auto min-h-screen flex justify-center flex-row flex-wrap'>
				{children}
			</main>
			<Footer />
		</div>
	);
}

export default Layout;
