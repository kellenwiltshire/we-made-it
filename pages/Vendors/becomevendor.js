import React from 'react';
import BecomeVendor from '../../components/Forms/BecomeVendor';
import Layout from '../../components/Layout/Layout';

function becomevendor({ cart }) {
	return (
		<Layout cart={cart}>
			<BecomeVendor />
		</Layout>
	);
}

export default becomevendor;
