import React from 'react';
import Cards from './Cards';

function Categories({ catData }) {
	return (
		<div className='w-full flex justify-center'>
			<div className='container m-1 sm:m-5 flex flex-row flex-wrap justify-center w-full font-body'>
				{catData.map((list, i) => {
					return (
						<Cards
							title={catData[i].name}
							image={catData[i].image}
							key={i}
							category={catData[i].name}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default Categories;
