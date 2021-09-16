import { useEffect, useState } from 'react';
import '../styles/globals.css';
import * as gtag from '../lib/gtag';
import { useRouter } from 'next/router';
import { checkForVendorSales } from '../utils/sales';
import Layout from '../components/Layout/Layout';
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }) {
	const [vendorSales, setVendorSales] = useState([]);
	const [navStyle, setNavStyle] = useState('home');
	const [search, setSearch] = useState('');

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
		<Layout navStyle={navStyle} search={search} setSearch={setSearch}>
			<Component
				{...pageProps}
				vendorSales={vendorSales}
				setNavStyle={setNavStyle}
				search={search}
			/>
		</Layout>
	);
}

export default MyApp;
