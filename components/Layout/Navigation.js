import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Search from '../Forms/Search';

function Navigation({ cart }) {
	const [navbarOpen, setNavbarOpen] = useState(false);
	let category = 'Shop All';
	let cat = category.replace(' ', '');
	let name = category;
	return (
		<nav className='relative flex flex-wrap items-center justify-between px-2 py-3 bg-dark-purple mb-3 min-w-screen font-body'>
			<div className='container px-4 mx-auto flex flex-wrap items-center justify-between w-full'>
				<div className='w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start'>
					<Link href='/'>
						<a className='text-sm font-bold leading-relaxed inline-block mr-4 pt-5 whitespace-no-wrap uppercase text-white'>
							<Image
								src='/Plain-Logo-White.png'
								alt='Plain Logo'
								height={106}
								width={300}
							/>
						</a>
					</Link>

					<button
						className='text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none'
						type='button'
						onClick={() => setNavbarOpen(!navbarOpen)}
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='icon icon-tabler icon-tabler-menu-2'
							width='24'
							height='24'
							viewBox='0 0 24 24'
							strokeWidth='1.5'
							stroke='#ffffff'
							fill='none'
							strokeLinecap='round'
							strokeLinejoin='round'
						>
							<path stroke='none' d='M0 0h24v24H0z' fill='none' />
							<line x1='4' y1='6' x2='20' y2='6' />
							<line x1='4' y1='12' x2='20' y2='12' />
							<line x1='4' y1='18' x2='20' y2='18' />
						</svg>
					</button>
				</div>

				<div
					className={
						'lg:flex flex-grow items-center' +
						(navbarOpen ? ' flex' : ' hidden')
					}
					id='example-navbar-danger'
				>
					<ul className='flex flex-col lg:flex-row list-none lg:ml-auto'>
						<li>
							<Link href='/Vendors/vendors'>
								<a className='px-3 py-2 flex items-center text-lg leading-snug text-white hover:opacity-75'>
									<span className='ml-2'>Our Vendors</span>
								</a>
							</Link>
						</li>
						<li>
							<Link href='/Vendors/becomevendor'>
								<a className='px-3 py-2 flex items-center text-lg leading-snug text-white hover:opacity-75'>
									<span className='ml-2'>Become a Vendor</span>
								</a>
							</Link>
						</li>
						<li>
							<Link
								href={{
									pathname: `/Shop/${cat}`,
									query: { cat: cat, name: name, cursor: null },
								}}
							>
								<a className='px-3 py-2 flex items-center text-lg leading-snug text-white hover:opacity-75'>
									<span className='ml-2'>Shop Now</span>
								</a>
							</Link>
						</li>
						{cart.length > 1 ? (
							<li>
								<Link href={'/checkout/checkout'}>
									<a className='px-3 py-2 flex flex-row items-center text-lg leading-snug text-white hover:opacity-75'>
										<span className='ml-2 flex flex-row'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												className='icon icon-tabler icon-tabler-shopping-cart'
												width='24'
												height='24'
												viewBox='0 0 24 24'
												strokeWidth='1.5'
												stroke='#ffffff'
												fill='none'
												strokeLinecap='round'
												strokeLinejoin='round'
											>
												<path stroke='none' d='M0 0h24v24H0z' fill='none' />
												<circle cx='6' cy='19' r='2' />
												<circle cx='17' cy='19' r='2' />
												<path d='M17 17h-11v-14h-2' />
												<path d='M6 5l14 1l-1 7h-13' />
											</svg>
											({cart.length})
										</span>
									</a>
								</Link>
							</li>
						) : (
							<li>
								<Link href={'/'}>
									<a className='px-3 py-2 flex flex-row items-center text-lg leading-snug text-white hover:opacity-75'>
										<span className='ml-2 flex flex-row'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												className='icon icon-tabler icon-tabler-shopping-cart'
												width='24'
												height='24'
												viewBox='0 0 24 24'
												strokeWidth='1.5'
												stroke='#ffffff'
												fill='none'
												strokeLinecap='round'
												strokeLinejoin='round'
											>
												<path stroke='none' d='M0 0h24v24H0z' fill='none' />
												<circle cx='6' cy='19' r='2' />
												<circle cx='17' cy='19' r='2' />
												<path d='M17 17h-11v-14h-2' />
												<path d='M6 5l14 1l-1 7h-13' />
											</svg>
											({cart.length})
										</span>
									</a>
								</Link>
							</li>
						)}
					</ul>
				</div>
				<div className='w-full flex justify-center md:justify-end'>
					<div>
						<Search />
					</div>
				</div>
			</div>
		</nav>
	);
}

export default Navigation;
