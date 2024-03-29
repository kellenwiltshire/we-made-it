import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MenuIcon from '../Icons/MenuIcon';
import CartIcon from '../Icons/CartIcon';
import NewSearch from '../Forms/NewSearch';
import SearchIconBig from '../Icons/SearchIconBig';
import { useCartContext } from '../../context/Store';

function Navigation({ search, setSearch }) {
	const cart = useCartContext()[0];
	const [cartItems, setCartItems] = useState(0);
	const [navbarOpen, setNavbarOpen] = useState(false);
	const [searchOpen, setSearchOpen] = useState(false);

	useEffect(() => {
		let numItems = 0;
		cart.forEach((item) => {
			numItems += item.variantQuantity;
		});
		setCartItems(numItems);
	}, [cart]);

	console.log(cartItems);
	return (
		<div className='mx-auto flex p-3 flex-row flex-wrap items-center justify-center bg-banner'>
			<div className='container flex flex-row flex-wrap items-center justify-center'>
				<Link href='/'>
					<a className='text-sm font-bold leading-relaxed inline-block mr-4 pt-1 whitespace-no-wrap uppercase text-white bg-purple-200 rounded-lg p-1 bg-opacity-75'>
						<Image
							src='/Plain-Logo-Black.png'
							alt='Plain Logo'
							height={53}
							width={150}
						/>
					</a>
				</Link>
				<div className='hidden lg:flex flex-grow items-center'>
					<ul className='flex flex-col lg:flex-row list-none'>
						<li>
							<Link href='/Vendors/vendors'>
								<a className='px-3 py-2 flex hover:text-gray-500 bg-purple-200 rounded-lg bg-opacity-75 mx-1'>
									<span>Our Vendors</span>
								</a>
							</Link>
						</li>
						<li>
							<Link href='/Vendors/becomevendor'>
								<a className='px-3 py-2 flex hover:text-gray-500 bg-purple-200 rounded-lg bg-opacity-75 mx-1'>
									<span>Become a Vendor</span>
								</a>
							</Link>
						</li>
						<li>
							<Link
								href={{
									pathname: `/Shop/shop`,
								}}
							>
								<a className='px-3 py-2 flex hover:text-gray-500 bg-purple-200 rounded-lg bg-opacity-75 mx-1'>
									<span>Shop Now</span>
								</a>
							</Link>
						</li>
					</ul>
				</div>
				<button
					className='text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none bg-purple-200 p-1 bg-opacity-75'
					type='button'
					onClick={() => setNavbarOpen(!navbarOpen)}
					aria-label='Menu Button'
				>
					<MenuIcon />
				</button>

				<button
					className={
						'cursor-pointer leading-none border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none bg-purple-200 p-1 bg-opacity-75 mx-2'
					}
					type='button'
					onClick={() => setSearchOpen(!searchOpen)}
					aria-label='Menu Button'
				>
					<SearchIconBig />
				</button>
				<div
					className={
						'hidden lg:flex flex-grow items-center w-full lg:w-auto ml-auto lg:justify-end bg-purple-200 p-1 bg-opacity-75 rounded-lg my-2 lg:bg-opacity-0' +
						(searchOpen ? ' flex' : ' hidden')
					}
				>
					<NewSearch search={search} setSearch={setSearch} />
				</div>

				<Link href={'/checkout/checkout'}>
					<a
						aria-label='cart'
						className='m-1 px-1 py-2 flex items-center leading-snug hover:opacity-75 bg-purple-200 rounded-lg p-1 bg-opacity-75 relative'
					>
						<span className='ml-1 flex flex-row'>
							<CartIcon />

							{cartItems === 0 ? null : (
								<div className='absolute top-0 right-0 text-xs bg-white text-gray-900 font-semibold rounded-full py-1 px-2 transform translate-x-2 -translate-y-2'>
									{cartItems}
								</div>
							)}
						</span>
					</a>
				</Link>

				<div
					className={
						'lg:hidden flex-grow items-center w-full lg:w-auto ml-auto lg:justify-end bg-purple-200 p-1 bg-opacity-75 rounded-lg my-2 lg:bg-opacity-0' +
						(searchOpen ? ' flex' : ' hidden')
					}
				>
					<NewSearch search={search} setSearch={setSearch} />
				</div>
				<div
					className={
						'lg:hidden flex-grow items-center w-full bg-purple-200 p-1 bg-opacity-75 rounded-lg my-2' +
						(navbarOpen ? ' flex' : ' hidden')
					}
				>
					<ul className='flex flex-col lg:flex-row list-none'>
						<li>
							<Link href='/Vendors/vendors'>
								<a className='px-3 py-2 flex items-center leading-snug  hover:opacity-75'>
									<span className='ml-2'>Our Vendors</span>
								</a>
							</Link>
						</li>
						<li>
							<Link href='/Vendors/becomevendor'>
								<a className='px-3 py-2 flex items-center leading-snug  hover:opacity-75'>
									<span className='ml-2'>Become a Vendor</span>
								</a>
							</Link>
						</li>
						<li>
							<Link
								href={{
									pathname: `/Shop/shop`,
								}}
							>
								<a className='px-3 py-2 flex items-center leading-snug  hover:opacity-75'>
									<span className='ml-2'>Shop Now</span>
								</a>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default Navigation;
