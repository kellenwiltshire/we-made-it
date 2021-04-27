import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MenuIcon from '../Icons/MenuIcon';
import CartIcon from '../Icons/CartIcon';
import NewSearch from '../Forms/NewSearch';
import SearchIconBig from '../Icons/SearchIconBig';

function HomeNav({ cart }) {
	const [navbarOpen, setNavbarOpen] = useState(false);
	const [searchOpen, setSearchOpen] = useState(false);
	let category = 'Shop All';
	let cat = category.replace(' ', '');
	let name = category;
	return (
		<div className='mx-auto flex p-3 flex-row flex-wrap items-center justify-center bg-purple-200'>
			<div className='container flex flex-row flex-wrap items-center'>
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
				<div className='hidden lg:flex flex-grow items-center bg-purple-200 rounded-lg p-1 bg-opacity-75'>
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
					<NewSearch />
				</div>
				{cart.length > 0 ? (
					<Link href={'/checkout/checkout'}>
						<a className='m-1 px-1 py-2 flex items-center leading-snug hover:opacity-75 bg-purple-200 rounded-lg p-1 bg-opacity-75'>
							<span className='ml-1 flex flex-row'>
								<CartIcon />({cart.length})
							</span>
						</a>
					</Link>
				) : (
					<Link href={'/'}>
						<a className='m-1 px-1 py-2 flex items-center leading-snug hover:opacity-75 bg-purple-200 rounded-lg p-1 bg-opacity-75'>
							<span className='ml-1 flex flex-row'>
								<CartIcon />({cart.length})
							</span>
						</a>
					</Link>
				)}
				<div
					className={
						'lg:hidden flex-grow items-center w-full lg:w-auto ml-auto lg:justify-end bg-purple-200 p-1 bg-opacity-75 rounded-lg my-2 lg:bg-opacity-0' +
						(searchOpen ? ' flex' : ' hidden')
					}
				>
					<NewSearch />
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

export default HomeNav;
