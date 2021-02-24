import React from 'react';
import Cards from './Cards';

function Categories({ catData }) {
	return (
		<div className='w-full flex justify-center'>
			<div className='container m-1 sm:m-5 flex flex-row flex-wrap justify-center w-full font-body'>
				{catData.map((list, i) => {
					return (
						<Cards
							title='Shop Category'
							image={catData[i].url}
							key={i}
							category='testCategory'
						/>
					);
				})}
			</div>
		</div>
	);
}

export default Categories;
