import React from 'react';
import Cards from './Cards';

function Categories() {
	const categories = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	return (
		<div className='w-full flex justify-center'>
			<div className='container m-1 sm:m-5 flex flex-row flex-wrap justify-center w-full font-body'>
				{categories.map((list, i) => {
					return <Cards />;
				})}
			</div>
		</div>
	);
}

export default Categories;
