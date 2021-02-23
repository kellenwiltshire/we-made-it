import Headers from '../../components/Layout/Headers';
import Layout from '../../components/Layout/Layout';
import VendorList from '../../components/Categories/VendorList';
import BecomeVendor from '../../components/Forms/BecomeVendor';

export default function Vendors() {
	return (
		<Layout>
			<Headers title='Our Vendors' />
			<VendorList />
			<BecomeVendor />
		</Layout>
	);
}
