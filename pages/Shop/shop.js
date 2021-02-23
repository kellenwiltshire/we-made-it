import Categories from '../../components/Categories/Categories';
import Headers from '../../components/Layout/Headers';
import Layout from '../../components/Layout/Layout';

export default function Shop() {
	return (
		<Layout>
			<Headers title='Shop Our Handmade Items' />
			<Categories />
		</Layout>
	);
}
