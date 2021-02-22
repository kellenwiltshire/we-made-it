import React from 'react';
import Head from 'next/head';
import Navigation from './Navigation';

function Layout({ title, children }) {
	return (
		<div>
			<Head>
				<title>{title}</title>
				<link rel='icon' href='/favicon.ico' />
				<meta name='We-Made-It We Made It Newcastle Ontario' />
				<meta lang='en' />
			</Head>
			<Navigation />
			<main className='mx-auto pt-16 min-h-screen flex justify-center flex-row flex-wrap'>
				{children}
			</main>
		</div>
	);
}

export default Layout;
