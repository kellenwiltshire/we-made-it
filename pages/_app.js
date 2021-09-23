import { useEffect, useState } from 'react';
import '../styles/globals.css';
import * as gtag from '../lib/gtag';
import { useRouter } from 'next/router';
import Layout from '../components/Layout/Layout';

function MyApp({ Component, pageProps }) {
	const [search, setSearch] = useState('');

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
		<Layout search={search} setSearch={setSearch}>
			<Component {...pageProps} search={search} />
		</Layout>
	);
}

export default MyApp;
