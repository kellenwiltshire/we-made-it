import React from 'react';
import Layout from '../components/Layout/Layout';
import NewNav1 from '../components/Layout/Navigation/NewNav1';
import NewNav2 from '../components/Layout/Navigation/NewNav2';

function navchanges({ cart }) {
	return (
		<Layout cart={cart}>
			<div className='flex flex-col'>
				<div className='w-screen my-4'>
					<NewNav1 cart={cart} />
				</div>
				<div className='w-screen my-4'>
					<NewNav2 cart={cart} />
				</div>
			</div>
		</Layout>
	);
}

export default navchanges;
