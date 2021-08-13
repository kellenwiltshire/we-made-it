import { useEffect, useState } from 'react';
import '../styles/globals.css';
import * as gtag from '../lib/gtag';
import { useRouter } from 'next/router';
import { checkForVendorSales } from '../utils/sales';
import Layout from '../components/Layout/Layout';
import { Provider } from 'react-redux';
import { useStore } from '../store';

function MyApp({ Component, pageProps }) {
	const [cart, setCart] = useState([]);
	const [vendorSales, setVendorSales] = useState([]);
	const [navStyle, setNavStyle] = useState('home');
	const store = useStore(pageProps.initialReduxState);

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
		<Provider store={store}>
			<Layout cart={cart} navStyle={navStyle}>
				<Component
					{...pageProps}
					cart={cart}
					setCart={setCart}
					vendorSales={vendorSales}
					setNavStyle={setNavStyle}
				/>
			</Layout>
		</Provider>
	);
}

export default MyApp;
