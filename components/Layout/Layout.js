import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Navigation from './Navigation';
import Footer from './Footer';
import HomeNav from './HomeNav';
import MessengerMessageUs from 'react-messenger-message-us';
import { CartProvider } from '../../context/Store';

function Layout({ children, cart, search, setSearch }) {
	const [nav, setNav] = useState(false);
	useEffect(() => {
		const urlString = document.location.href;
		console.log(urlString);
		if (
			urlString === 'http://localhost:3000/' ||
			urlString === 'https://we-made-it.ca/' ||
			urlString === 'https://test-wmi-q2psn.ondigitalocean.app/'
		) {
			setNav(false);
		} else {
			setNav(true);
		}
	});
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
				{nav ? (
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
