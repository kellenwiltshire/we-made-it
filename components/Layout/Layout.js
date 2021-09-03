import React from 'react';
import Head from 'next/head';
import Navigation from './Navigation';
import Footer from './Footer';
import HomeNav from './HomeNav';
import Messenger from './Messenger';
import MessengerMessageUs from 'react-messenger-message-us';
import { CartProvider } from '../../context/Store';

function Layout({ children, cart, navStyle, search, setSearch }) {
	return (
		<CartProvider>
			<div>
				<Head>
					<link rel='preconnect' href='https://fonts.gstatic.com' />
					<link
						href='https://fonts.googleapis.com/css2?family=Open+Sans&family=Raleway&display=swap'
						rel='stylesheet'
					/>
				</Head>
				{navStyle === 'home' ? (
					<HomeNav cart={cart} search={search} setSearch={setSearch} />
				) : (
					<Navigation cart={cart} search={search} setSearch={setSearch} />
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
		</CartProvider>
	);
}

export default Layout;
