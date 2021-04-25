import { useEffect, useState } from 'react';
import '../styles/globals.css';
import * as gtag from '../lib/gtag';
import { useRouter } from 'next/router';
import { vendors } from '../VendorList/VendorList';

function MyApp({ Component, pageProps }) {
	const [cart, setCart] = useState([]);
	const [vendorSales, setVendorSales] = useState([]);

	const checkForVendorSales = () => {
		const vendorList = vendors;
		const currentSales = vendorList.filter((sale) => {
			if (sale.sale) {
				return sale;
			} else {
				return;
			}
		});
		return currentSales;
	};

	useEffect(() => {
		setVendorSales(checkForVendorSales());
	}, []);

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

	return (
		<Component
			{...pageProps}
			cart={cart}
			setCart={setCart}
			vendorSales={vendorSales}
		/>
	);
}

export default MyApp;
