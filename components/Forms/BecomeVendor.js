import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import VendorAgreement from './VendorAgreement';
import FileUpload from '../Icons/FileUpload';
import FileAttached from '../Icons/FileAttached';

function BecomeVendor() {
	const [location, setLocation] = useState('Newcastle');
	const [state, handleSubmit] = useForm('moqpgoog');
	const [submitStatus, setSubmitStatus] = useState('Submit');
	const [isAttached, setIsAttached] = useState(false);
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

	const fileUploaded = (e) => {
		e.preventDefault();
		setIsAttached(true);
	};

	const handleDownload = () => {
		fetch('https://test-wmi-q2psn.ondigitalocean.app/Vendorapplication.docx', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/pdf',
			},
		})
			.then((response) => response.blob())
			.then((blob) => {
				const url = window.URL.createObjectURL(new Blob([blob]));

				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', 'Vendorapplication.docx');

				document.body.appendChild(link);

				link.click();

				link.parentNode.removeChild(link);
			});
	};

	return (
		<div className='container flex h-full'>
			<div className='h-auto w-full'>
				<div className='relative flex items-top justify-center bg-white dark:bg-gray-900 sm:items-center my-5'>
					<div className='max-w-6xl mx-auto sm:px-6 lg:px-8'>
						<div className='mt-8 overflow-hidden'>
							<div className='grid grid-cols-1'>
								<VendorAgreement />

								<div>
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
													<option>
														$50/month ~ Shelf space - Monthly Plan
													</option>
													<option>
														$45/month ~ Shelf space - 3 Month Plan
													</option>
													<option>
														$40/month ~ Shelf space - 6 Month Plan
													</option>
													<option>
														$150/month ~ Full Wall Space 2 Ft wide - Monthly
														Plan
													</option>
													<option>
														$135/month ~ Full Wall Space 2 Ft wide - 3 Month
														Plan
													</option>
													<option>
														$120/month ~ Full Wall Space 2 Ft wide - 6 Month
														Plan
													</option>
													<option>
														$200/month ~ Full Wall Space 3 Ft wide - Monthly
														Plan
													</option>
													<option>
														$180/month ~ Full Wall Space 3 Ft wide - 3 Month
														Plan (save $60/year)
													</option>
													<option>
														$260/month ~ Full Wall Space 3 Ft wide - 6 Month
														Plan (save $120/year)
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
													<option>
														$75/month ~ Shelf space - 3 Month Plan
													</option>
													<option>
														$70/month ~ Shelf space - 6 Month Plan
													</option>
													<option>
														$200/month ~ Full Wall Space 2 Ft wide - Monthly
														Plan
													</option>
													<option>
														$195/month ~ Full Wall Space 2 Ft wide - 3 Month
														Plan (save $60/year)
													</option>
													<option>
														$190/month ~ Full Wall Space 2 Ft wide - 6 Month
														Plan (save $120/year)
													</option>
													<option>
														$275/month ~ Full Wall Space 3 Ft wide - Monthly
														Plan
													</option>
													<option>
														$270/month ~ Full Wall Space 3 Ft wide - 3 Month
														Plan (save $60/year)
													</option>
													<option>
														$265/month ~ Full Wall Space 3 Ft wide - 6 Month
														Plan (save $120/year)
													</option>
													<option>
														$160 per month ~ Half-wall Space 2 Ft wide x 4ft
														high - Monthly Plan
													</option>
													<option>
														$155 per month ~ Half-wall Space 2 Ft wide x 4ft
														high – 3 Month Plan (save $60/year)
													</option>
													<option>
														$150 per month ~ Half-wall Space 2 Ft wide x 4ft
														high – 6 Month Plan (save $120/year)
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
												placeholder='Please list ALL items you wish to sell. Only items listed will be considered for approval'
												className='w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-purple-500 focus:outline-none'
											/>
										</div>
										<div className='flex flex-col mt-2'>
											<label htmlFor='attachments'>
												Please include a rough sketch and photos from past
												stores/markets or Pinterest ideas for your display. This
												is a mandatory requirement for approval * We ask Vendors
												to send us a sketch or photo of their space or
												inspiration prior to moving in, so we can see that
												thought has been given to your display, and changes can
												be made if needed.
											</label>
											<label className='w-full flex flex-col items-center px-4 py-6 bg-white text-purple-400 rounded-lg tracking-wide uppercase border border-purple-400 cursor-pointer hover:bg-purple-400 hover:text-white'>
												{isAttached ? <FileAttached /> : <FileUpload />}

												{isAttached ? (
													<span className='mt-2 text-base leading-normal'>
														Attached!
													</span>
												) : (
													<span className='mt-2 text-base leading-normal'>
														Select a file
													</span>
												)}

												<input
													type='file'
													className='hidden'
													name='upload'
													onChange={fileUploaded}
												/>
											</label>
										</div>
										<div className='flex items-center mt-2'>
											<input
												id='agree'
												name='agree'
												type='checkbox'
												className='h-4 w-4 bg-gray-100 focus:ring-purple-400 border-purple-300 rounded'
												required
											/>
											<label
												htmlFor='agree'
												className='ml-2 block text-sm text-gray-900'
											>
												By electronically submitting this form, I agree to abide
												by ALL rules and regulations as described in this
												document. By electronically submitting this form I agree
												to all that has been stated in the form thus far. I
												agree that if at any time the rules or regulations are
												not followed, or we no longer feel you are a good fit
												for our store, We Made It reserves the right to refuse
												or cancel this contract at any time.
											</label>
										</div>
										<div className='w-full flex justify-center'>
											<button
												disabled={state.submitting}
												type='submit'
												className='md:w-64 bg-purple-200 hover:bg-purple-700 text-gray-700 hover:text-gray-200 font-bold py-3 px-6 rounded-lg mt-3 transition ease-in-out duration-300'
											>
												{submitStatus}
											</button>
										</div>
									</form>
									<div className='px-6 flex flex-col justify-center font-body'>
										<button
											className='bg-purple-200 hover:bg-purple-700 text-gray-700 hover:text-gray-200 font-bold py-3 px-6 rounded-lg mt-3 transition ease-in-out duration-300 text-center'
											onClick={handleDownload}
										>
											Download Copy of Agreement
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default BecomeVendor;
