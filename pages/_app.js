import { useEffect, useState } from 'react';
import '../styles/globals.css';
import * as gtag from '../lib/gtag';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
	const [cart, setCart] = useState([]);

	const router = useRouter();
	useEffect(() => {
		const handleRouteChange = (url) => {
			gtag.pageview(url);
		};
		router.events.on('routeChangeComplete', handleRouteChange);
		return () => {
			router.events.off('routeChangeComplete', handleRouteChange);
		};
	}, [router.events]);

	return <Component {...pageProps} cart={cart} setCart={setCart} />;
}

export default MyApp;
