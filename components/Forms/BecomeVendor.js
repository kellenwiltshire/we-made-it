import React from 'react';

function BecomeVendor() {
	return (
		<div className='relative flex items-top justify-center bg-white dark:bg-gray-900 sm:items-center my-5'>
			<div className='max-w-6xl mx-auto sm:px-6 lg:px-8'>
				<div className='mt-8 overflow-hidden'>
					<div className='grid grid-cols-1 md:grid-cols-2'>
						<div className='p-6 mr-2 bg-gray-100 dark:bg-gray-800 sm:rounded-lg'>
							<h1 className='text-4xl sm:text-5xl text-gray-800 dark:text-white font-extrabold tracking-tight'>
								Become a Vendor!
							</h1>

							<div className='flex items-center mt-8 text-gray-600 dark:text-gray-400'>
								<div className='ml-4 text-md tracking-wide font-semibold w-full'>
									Please fill out the form for Vendor Application. Please allow
									1 week for response. Only accepted vendors will be contacted
									at this time. Thank you!
								</div>
							</div>

							<div className='flex items-center mt-2 text-gray-600 dark:text-gray-400'>
								<div className='ml-4 text-md tracking-wide w-full'>
									<ul className='list-disc'>
										<li>As a vendor, you keep 100% of your sales</li>
										<li>
											We allow restock-storage in the back if you are from
											further away, free!
										</li>

										<li>Items will be added to the website as we grow!</li>

										<li>
											We offer free in-store pickup for any orders placed
											outside the store (please ensure items are paid for
											previous to bringing to store)
										</li>
										<li>
											We are here to help you add inventory (at home or in
											store!)
										</li>
										<li>Bagging is provided in store</li>
										<li>Frequent Social Media recognition for ALL vendors</li>
										<li>
											Bring your own shelving/display unit, or rent one provided
											by us (limited availability)
										</li>
									</ul>
								</div>
							</div>
						</div>

						<form className='p-6 flex flex-col justify-center'>
							<div className='flex flex-col'>
								<label for='name' className='hidden'>
									Full Name
								</label>
								<input
									type='name'
									name='name'
									id='name'
									placeholder='Full Name'
									className='w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none'
								/>
							</div>

							<div className='flex flex-col mt-2'>
								<label for='email' className='hidden'>
									Email
								</label>
								<input
									type='email'
									name='email'
									id='email'
									placeholder='Email'
									className='w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none'
								/>
							</div>

							<div className='flex flex-col mt-2'>
								<label for='tel' className='hidden'>
									Number
								</label>
								<input
									type='tel'
									name='tel'
									id='tel'
									placeholder='Telephone Number'
									className='w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none'
								/>
							</div>

							<div className='flex flex-col mt-2'>
								<label for='businessName' className='hidden'>
									Business Name
								</label>
								<input
									type='name'
									name='businessName'
									id='businessName'
									placeholder='Business Name'
									className='w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none'
								/>
							</div>

							<div className='flex flex-col mt-2'>
								<label for='address' className='hidden'>
									Address
								</label>
								<input
									type='name'
									name='address'
									id='address'
									placeholder='Address'
									className='w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none'
								/>
							</div>

							<div className='flex flex-col mt-2'>
								<label for='instagram' className='hidden'>
									Instagram Tag
								</label>
								<input
									type='name'
									name='instagram'
									id='instagram'
									placeholder='Instagram Tag'
									className='w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none'
								/>
							</div>

							<div className='flex flex-col mt-2'>
								<label for='facebook' className='hidden'>
									Facebook Page
								</label>
								<input
									type='name'
									name='facebook'
									id='facebook'
									placeholder='Facebook Page'
									className='w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none'
								/>
							</div>

							<div className='flex flex-col mt-2'>
								<label for='plan'>Size and Plan Preference</label>
								<select
									type='name'
									name='planPreference'
									id='planPreference'
									className='w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none'
								>
									<option>
										3ft wide x 2ft deep $200 +tax monthly (2 month commitment
										upfront, then monthly)
									</option>
									<option>
										4ft wide x 2ft deep $265 +tax (2 month commitment upfront,
										then monthly)
									</option>
									<option>
										5ft wide x 2ft deep $330 +tax (2 month commitment upfront,
										then monthly)
									</option>
									<option>
										Business Community Display (business cards and/or pamphlet
										on a shelf) $10 +tax monthly
									</option>
									<option>
										3ft wide x 2ft deep THREE MONTH UPFRONT & SAVE! $190 monthly
										(3 months upfront) =$570 +tax
									</option>
									<option>
										4ft wide x 2ft deep THREE MONTH UPFRONT & SAVE! $251.75
										monthly (3 months upfront) =$755.25 +tax
									</option>
									<option>2ft x 1ft Shelf $50 +tax (2 months upfront)</option>
								</select>
							</div>

							<div className='flex flex-col mt-2'>
								<label for='description' className='hidden'>
									Description
								</label>
								<textarea
									id='description'
									name='description'
									rows='3'
									placeholder='Description and Comments'
									className='w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none'
								/>
							</div>

							<button
								type='submit'
								className='md:w-32 bg-indigo-600 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-indigo-500 transition ease-in-out duration-300'
							>
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default BecomeVendor;
