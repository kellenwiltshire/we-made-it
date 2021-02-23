import AboutStore from '../components/About/AboutStore';
import Location from '../components/About/Location';
import Categories from '../components/Categories/Categories';
import Headers from '../components/Layout/Headers';
import Layout from '../components/Layout/Layout';

export default function Home() {
	return (
		<Layout>
			<Headers title='Shop Now' />
			<Categories />
			<Headers title='Our Story' />
			<AboutStore />
			<Headers title='Location' />
			<Location />
		</Layout>
	);
}
