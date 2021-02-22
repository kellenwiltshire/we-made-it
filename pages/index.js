import AboutStore from '../components/About/AboutStore';
import Location from '../components/About/Location';
import Categories from '../components/Categories/Categories';
import Layout from '../components/Layout/Layout';

export default function Home() {
	return (
		<Layout>
			<Categories />
			<AboutStore />
			<Location />
		</Layout>
	);
}
