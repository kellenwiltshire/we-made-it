import React, { useState, useEffect } from 'react';
import Headers from '../../components/Layout/Headers';
import Head from 'next/head';
import Pagination from '../../components/Layout/Pagination';
import ProductCards from '../../components/Product/ProductCards';
import { useRouter } from 'next/router';
import ShopFilters from '../../components/Layout/ShopFilters';
import SEO from '../../components/SEO/SEO';
import { getAllProducts } from '../../lib/shopify';

export default function Shop({ products }) {
	if (products) {
		const initialItems = products;
		const [perPage, setPerPage] = useState(50); //Number of Items per page - May allow changing in the future
		const [currPage, setCurrPage] = useState(0);
		const [offset, setOffset] = useState(currPage * perPage); // Offset for Pagination
		const [items, setItems] = useState(initialItems); //Items, obviously
		const [currItems, setCurrItems] = useState(
			//Keeps track of the current items that are being displayed on the page
			initialItems.slice(offset, offset + perPage),
		);
		const [numPages, setNumPages] = useState(initialItems.length / 50); //Determine number of pages
		const [sort, setSort] = useState(''); //Initial Sort State
		const [filterOpen, setFilterOpen] = useState(false);
		const router = useRouter();

		// checkProductDiscounts(currItems, vendorSales);

		//This looks at the URL to see if the user's url has already been looking through product pages and updates the current items accordingly
		useEffect(() => {
			const urlString = document.location.href;
			if (urlString.includes('page')) {
				const urlSplitString = urlString.split('=');
				const urlNumber = Number(urlSplitString[1]);
				const newPageNumber = urlNumber - 1;
				if (newPageNumber < 1) {
					setCurrPage(0);
					router.push(`?page=${currPage + 1}`, undefined, { shallow: true });
				} else {
					setCurrPage(newPageNumber);
					router.push(`?page=${newPageNumber + 1}`, undefined, {
						shallow: true,
					});
					setOffset(newPageNumber * perPage);
				}
			} else {
				router.push(`?page=${currPage + 1}`, undefined, { shallow: true });
			}
		}, []);

		//This effect updates the items on the page when a new page is selected
		//This also sets the URL so that if the user navigates back from looking at a product they don't lose their place.
		useEffect(() => {
			setCurrItems(items.slice(offset, offset + perPage));
			router.push(`?page=${currPage + 1}`, undefined, { shallow: true });
		}, [offset]);

		//This effect updates the current items on the page whenever the sort method changes
		useEffect(() => {
			if (items.length > 50) {
				setCurrItems(items.slice(offset, offset + perPage));
			} else setCurrItems(items);
		}, [sort, items]);

		//This function makes sure everything is reset and correct whenever sort or filters have been applied
		const updatePage = (newItems, sort) => {
			setItems(newItems);
			setOffset(0);
			setCurrPage(0);
			setSort(sort);
			setNumPages(newItems.length / 50);
		};

		const handlePageChange = (e) => {
			const selectedPage = e.selected;
			const newOffset = selectedPage * perPage;
			setOffset(newOffset);
			setCurrPage(e.selected);
			window.scrollTo(0, 0);
		};

		//Handles a filter reset
		const resetItems = (e) => {
			e.preventDefault();
			setItems(initialItems);
			setCurrPage(0);
			setOffset(0);
			setNumPages(initialItems.length / 50);
		};

		return (
			<div className='mx-auto min-h-screen flex justify-center flex-row flex-wrap'>
				<SEO title='Shop || We Made It' />
				<div className='flex flex-row flex-wrap justify-center h-full'>
					<Headers title='Shop' />
					<div className='w-full flex flex-row flex-wrap justify-center'>
						<ShopFilters
							setFilterOpen={setFilterOpen}
							filterOpen={filterOpen}
							updatePage={updatePage}
							resetItems={resetItems}
							items={items}
							initialItems={initialItems}
						/>
						<div className='hidden sm:block'>
							<Pagination
								numPages={numPages}
								handlePageChange={handlePageChange}
								rangeDisplayed={2}
								marginDisplayed={1}
								pageClass='py-1 px-2 font-body border-dark-purple border font-body cursor-pointer'
								breakClass='border border-dark-purple text-gray-200'
								currPage={currPage}
							/>
						</div>
						<div className='block sm:hidden'>
							<Pagination
								numPages={numPages}
								handlePageChange={handlePageChange}
								rangeDisplayed={2}
								marginDisplayed={1}
								pageClass='hidden'
								breakClass='hidden'
								currPage={currPage}
							/>
						</div>
					</div>
					<div className='container m-1 lg:m-5 flex flex-row flex-wrap justify-center w-full font-body'>
						{currItems.map((item) => {
							return (
								<ProductCards
									title={item.node.title}
									handle={item.node.handle}
									price={item.node.variants.edges[0].node.price}
									image={item.node.images.edges[0].node.originalSrc}
									key={item.node.id}
								/>
							);
						})}
					</div>
					<div className='w-full flex flex-row flex-wrap justify-center'>
						<div className='hidden sm:block'>
							<Pagination
								numPages={numPages}
								handlePageChange={handlePageChange}
								rangeDisplayed={2}
								marginDisplayed={1}
								pageClass='py-1 px-2 border-dark-purple border font-body cursor-pointer'
								breakClass='border border-dark-purple text-gray-200'
								currPage={currPage}
							/>
						</div>
						<div className='block sm:hidden'>
							<Pagination
								numPages={numPages}
								handlePageChange={handlePageChange}
								rangeDisplayed={2}
								marginDisplayed={1}
								pageClass='hidden'
								breakClass='hidden'
								currPage={currPage}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className='mx-auto min-h-screen flex justify-center flex-row flex-wrap'>
				<Head>
					<title>Shop || We Made It</title>
				</Head>
				<Headers title='OOPS! Something Went Wrong!' />
				<p className='font-body'>
					This is Embarassing! We might be having trouble connecting with
					Shopify. Please try again later!
				</p>
			</div>
		);
	}
}

export async function getStaticProps() {
	console.log('Shop Revalidate');
	const products = await getAllProducts();

	return {
		props: {
			products,
		},
		revalidate: 360,
	};
}
