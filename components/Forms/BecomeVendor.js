import React, { useEffect, useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';

function BecomeVendor() {
	const [location, setLocation] = useState('Newcastle');
	const [state, handleSubmit] = useForm('moqpgoog');
	const [submitStatus, setSubmitStatus] = useState('Submit');
	if (state.succeeded) {
		return (
			<div className='text-gray-600 body-font'>
				<div className='container mx-auto flex px-5 items-center justify-center flex-col'>
					<img
						className='lg:w-2/6 md:w-3/6 w-5/6 object-cover object-center rounded'
						alt='hero'
						src='/sparklelogoblack.png'
					/>
					<div className='text-center lg:w-2/3 w-full'>
						<h1 class='title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900'>
							Thank you so much for your Vendor Application!
						</h1>
						<p className='mb-8 leading-relaxed'>
							Please allow up to 1 week for Application processing.
						</p>
						<p className='mb-8 leading-relaxed'>
							If you have any further questions, please email us at
							info@we-made-it.ca
						</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='container flex h-full'>
			<div className='h-auto w-full'>
				<div className='relative flex items-top justify-center bg-white dark:bg-gray-900 sm:items-center my-5'>
					<div className='max-w-6xl mx-auto sm:px-6 lg:px-8'>
						<div className='mt-8 overflow-hidden'>
							<div className='grid grid-cols-1 md:grid-cols-2'>
								<div className='p-6 mr-2 bg-purple-200 dark:bg-gray-800 sm:rounded-lg'>
									<h1 className='text-4xl sm:text-5xl text-black dark:text-white font-extrabold tracking-tight font-title'>
										Become a Vendor!
									</h1>

									<div className='flex items-center mt-8 text-black dark:text-gray-400'>
										<div className='text-md tracking-wide font-semibold w-full font-body'>
											Please fill out the form for Vendor Application.
											{/* Please
											note that we are currently not accepting new Vendor's at
											this time. Any application received will be added to a
											waitlist and you will be contacted once a spot opens.
											Thank you for your interest! */}
										</div>
									</div>

									<div className='flex items-center mt-2 text-black dark:text-gray-400'>
										<div className='ml-4 text-md tracking-wide w-full'>
											<ul className='list-disc font-body'>
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
												<li>
													Frequent Social Media recognition for ALL vendors
												</li>
												<li>
													Bring your own shelving/display unit, or rent one
													provided by us (limited availability)
												</li>
											</ul>
										</div>
									</div>
								</div>

								<form
									className='p-6 flex flex-col justify-center font-body'
									onSubmit={handleSubmit}
								>
									<div className='flex flex-col'>
										<label htmlFor='name' className='hidden'>
											Full Name
										</label>
										<input
											required
											type='name'
											name='name'
											id='name'
											placeholder='Full Name'
											className='w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-purple-500 focus:outline-none'
										/>
									</div>

									<div className='flex flex-col mt-2'>
										<label htmlFor='email' className='hidden'>
											Email
										</label>
										<input
											required
											type='email'
											name='email'
											id='email'
											placeholder='Email'
											className='w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-purple-500 focus:outline-none'
										/>
									</div>

									<div className='flex flex-col mt-2'>
										<label htmlFor='tel' className='hidden'>
											Number
										</label>
										<input
											required
											type='tel'
											name='tel'
											id='tel'
											placeholder='Telephone Number'
											className='w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-purple-500 focus:outline-none'
										/>
									</div>

									<div className='flex flex-col mt-2'>
										<label htmlFor='businessName' className='hidden'>
											Business Name
										</label>
										<input
											required
											type='name'
											name='businessName'
											id='businessName'
											placeholder='Business Name'
											className='w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-purple-500 focus:outline-none'
										/>
									</div>

									<div className='flex flex-col mt-2'>
										<label htmlFor='address' className='hidden'>
											Address
										</label>
										<input
											required
											type='name'
											name='address'
											id='address'
											placeholder='Address'
											className='w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-purple-500 focus:outline-none'
										/>
									</div>

									<div className='flex flex-col mt-2'>
										<label htmlFor='instagram' className='hidden'>
											Instagram Tag
										</label>
										<input
											type='name'
											name='instagram'
											id='instagram'
											placeholder='Instagram Tag'
											className='w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-purple-500 focus:outline-none'
										/>
									</div>

									<div className='flex flex-col mt-2'>
										<label htmlFor='facebook' className='hidden'>
											Facebook Page
										</label>
										<input
											type='name'
											name='facebook'
											id='facebook'
											placeholder='Facebook Page'
											className='w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-purple-500 focus:outline-none'
										/>
									</div>

									<div className='flex flex-col mt-2'>
										<label htmlFor='plan'>Location</label>
										<select
											type='name'
											name='location'
											id='location'
											className='w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-purple-500 focus:outline-none'
											onChange={(e) => setLocation(e.target.value)}
										>
											<option>Newcastle</option>
											<option>Cobourg</option>
										</select>
									</div>

									{location === 'Newcastle' ? (
										<div className='flex flex-col mt-2'>
											<label htmlFor='plan'>
												Size and Plan Preference (2 Months upfront required)
											</label>
											<select
												type='name'
												name='planPreference'
												id='planPreference'
												className='w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-purple-500 focus:outline-none'
												defaultValue='-----------'
											>
												<option>-----------</option>
												<option>$50/month ~ Shelf space - Monthly Plan</option>
												<option>$45/month ~ Shelf space - 3 Month Plan</option>
												<option>$40/month ~ Shelf space - 6 Month Plan</option>
												<option>
													$150/month ~ Full Wall Space 2 Ft wide - Monthly Plan
												</option>
												<option>
													$135/month ~ Full Wall Space 2 Ft wide - 3 Month Plan
												</option>
												<option>
													$120/month ~ Full Wall Space 2 Ft wide - 6 Month Plan
												</option>
												<option>
													$200/month ~ Full Wall Space 3 Ft wide - Monthly Plan
												</option>
												<option>
													$180/month ~ Full Wall Space 3 Ft wide - 3 Month Plan
													(save $60/year)
												</option>
												<option>
													$160/month ~ Full Wall Space 3 Ft wide - 6 Month Plan
													(save $120/year)
												</option>
											</select>
										</div>
									) : (
										<div className='flex flex-col mt-2'>
											<label htmlFor='plan'>
												Size and Plan Preference (2 Months upfront required)
											</label>
											<select
												type='name'
												name='planPreference'
												id='planPreference'
												className='w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-purple-500 focus:outline-none'
												defaultValue='-----------'
											>
												<option>-----------</option>
												<option>$75/month ~ Shelf space - 3 Month Plan</option>
												<option>$70/month ~ Shelf space - 6 Month Plan</option>
												<option>
													$200/month ~ Full Wall Space 2 Ft wide - Monthly Plan
												</option>
												<option>
													$195/month ~ Full Wall Space 2 Ft wide - 3 Month Plan
													(save $60/year)
												</option>
												<option>
													$190/month ~ Full Wall Space 2 Ft wide - 6 Month Plan
													(save $120/year)
												</option>
												<option>
													$275/month ~ Full Wall Space 3 Ft wide - Monthly Plan
												</option>
												<option>
													$270/month ~ Full Wall Space 3 Ft wide - 3 Month Plan
													(save $60/year)
												</option>
												<option>
													$265/month ~ Full Wall Space 3 Ft wide - 6 Month Plan
													(save $120/year)
												</option>
												<option>
													$160 per month ~ Half-wall Space 2 Ft wide x 4ft high
													- Monthly Plan
												</option>
												<option>
													$155 per month ~ Half-wall Space 2 Ft wide x 4ft high
													– 3 Month Plan (save $60/year)
												</option>
												<option>
													$150 per month ~ Half-wall Space 2 Ft wide x 4ft high
													– 6 Month Plan (save $120/year)
												</option>
											</select>
										</div>
									)}

									<div className='flex flex-col mt-2'>
										<label htmlFor='description' className='hidden'>
											Description
										</label>
										<textarea
											required
											id='description'
											name='description'
											rows='3'
											placeholder='Description and Comments'
											className='w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-purple-500 focus:outline-none'
										/>
									</div>

									<button
										disabled={state.submitting}
										type='submit'
										className='md:w-32 bg-purple-200 hover:bg-purple-700 text-gray-700 hover:text-gray-200 font-bold py-3 px-6 rounded-lg mt-3 transition ease-in-out duration-300'
									>
										{submitStatus}
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default BecomeVendor;
