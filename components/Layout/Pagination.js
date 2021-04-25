import React from 'react';
import ReactPaginate from 'react-paginate';

function Pagination({
	numPages,
	handlePageChange,
	rangeDisplayed,
	marginDisplayed,
	pageClass,
	breakClass,
}) {
	return (
		<ReactPaginate
			pageCount={numPages}
			onPageChange={handlePageChange}
			pageRangeDisplayed={rangeDisplayed}
			marginPagesDisplayed={marginDisplayed}
			previousClassName='m-2 py-1 px-2 border-dark-purple border w-50 text-center rounded-l font-title'
			breakClassName={breakClass}
			nextClassName='m-2 py-1 px-2 border-dark-purple border w-50 text-center rounded-r font-title'
			containerClassName='flex flex-row flex-wrap m-5 align-middle'
			pageClassName={pageClass}
			activeClassName='bg-dark-purple text-gray-200'
		/>
	);
}

export default Pagination;
