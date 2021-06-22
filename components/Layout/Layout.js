import React from 'react';
import Head from 'next/head';
import Navigation from './Navigation';
import Footer from './Footer';
import HomeNav from './HomeNav';
import Messenger from './Messenger';
import MessengerMessageUs from 'react-messenger-message-us';

function Layout({ title, children, cart, navStyle }) {
	return (
		<div>
			<Head>
				<link rel='icon' href='/favicon.ico' />
				<meta description='We-Made-It We Made It Newcastle Ontario Homemade Handmade Decor Boutique Local Clarington Canada Bowmanville Durham Oshawa' />
				<meta name='We Made It Local Handmade Boutique' />
				<meta lang='en' />

				<link rel='preconnect' href='https://fonts.gstatic.com' />
				<link
					href='https://fonts.googleapis.com/css2?family=Open+Sans&family=Raleway&display=swap'
					rel='stylesheet'
				/>
			</Head>
			{navStyle === 'home' ? (
				<HomeNav cart={cart} />
			) : (
				<Navigation cart={cart} />
			)}

			<main className='mx-auto min-h-screen flex justify-center flex-row flex-wrap'>
				{children}
			</main>
			<div className='sticky bottom-5 flex justify-end w-full pr-2'>
				<MessengerMessageUs
					pageId={process.env.MESSENGER_PAGE_ID}
					appId={process.env.MESSENGER_APP_ID}
				/>
			</div>
			<Footer />
		</div>
	);
}

export default Layout;
