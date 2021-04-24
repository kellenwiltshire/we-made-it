import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MenuIcon from '../Icons/MenuIcon';
import CartIcon from '../Icons/CartIcon';
import NewSearch from '../Forms/NewSearch';

function Navigation({ cart }) {
	const [navbarOpen, setNavbarOpen] = useState(false);
	let category = 'Shop All';
	let cat = category.replace(' ', '');
	let name = category;
	return (
		<div className='mx-auto flex p-5 flex-row flex-wrap items-center bg-banner'>
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
			<button
				className='text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none bg-purple-200 p-1 bg-opacity-75'
				type='button'
				onClick={() => setNavbarOpen(!navbarOpen)}
				aria-label='Menu Button'
			>
				<MenuIcon />
			</button>
			<div
				className={
					'lg:flex flex-grow items-center' + (navbarOpen ? ' flex' : ' hidden')
				}
			>
				<ul className='flex flex-col lg:flex-row list-none bg-purple-200 rounded-lg bg-opacity-75'>
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
					{cart.length > 0 ? (
						<Link href={'/checkout/checkout'}>
							<a className='px-3 py-2 flex items-center leading-snug  hover:opacity-75'>
								<span className='ml-2 flex flex-row'>
									<CartIcon />({cart.length})
								</span>
							</a>
						</Link>
					) : (
						<Link href={'/checkout/checkout'}>
							<a className='px-3 py-2 flex items-center leading-snug  hover:opacity-75'>
								<span className='ml-2 flex flex-row'>
									<CartIcon />({cart.length})
								</span>
							</a>
						</Link>
					)}
				</ul>
			</div>
			<NewSearch />
		</div>
	);
}

export default Navigation;
