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
			previousClassName='mx-2 py-1 px-2 border-dark-purple border w-50 text-center rounded-l font-title cursor-pointer'
			breakClassName={breakClass}
			nextClassName='mx-2 py-1 px-2 border-dark-purple border w-50 text-center rounded-r font-title cursor-pointer'
			containerClassName='flex flex-row flex-wrap m-5 align-middle'
			pageClassName={pageClass}
			activeClassName='bg-dark-purple text-gray-200'
			forcePage={currPage}
		/>
	);
}

export default Pagination;
