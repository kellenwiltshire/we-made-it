import React, { useState } from 'react';
import { useRouter } from 'next/router';
import SearchIcon from '../Icons/SearchIcon';
import LoadingIcon from '../Icons/LoadingIcon';

function NewSearch() {
	const router = useRouter();
	let input = '';
	let Shortenedinput = '';
	const [isSearching, setIsSearching] = useState(false);

	const onInputChange = (e) => {
		input = e.target.value;
		Shortenedinput = e.target.value.split(' ').join('');
	};

	const handleSearch = (e) => {
		e.preventDefault();
		setIsSearching(true);
		router.push({
			pathname: '/search/[...searchitems]',
			query: { searchitems: Shortenedinput, search: input },
		});
		setIsSearching(false);
	};
	return (
		<div className='flex w-auto font-body mb-2'>
			<form
				onSubmit={handleSearch}
				className='pt-2 relative mx-auto text-gray-600 font-body'
			>
				<input
					className='border-2 border-purple-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none'
					type='search'
					name='search'
					placeholder='Search'
					onChange={onInputChange}
				/>
				{isSearching ? (
					<div className='absolute right-0 top-0 mt-4 mr-4'>
						<LoadingIcon />
					</div>
				) : (
					<button
						type='submit'
						className='absolute right-0 top-0 mt-5 mr-4'
						aria-label='Search Button'
					>
						<SearchIcon />
					</button>
				)}
			</form>
		</div>
	);
}

export default NewSearch;
