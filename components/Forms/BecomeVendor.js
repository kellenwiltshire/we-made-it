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
										<div className='text-lg tracking-wide font-semibold w-full font-body'>
											Who Can Apply?
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
												<p className='font-bold'>
													We pride ourselves in having the finest quality
													products in our stores. Applications are carefully
													reviewed by our team to assess the following:
												</p>
												<li>Unique, quality work</li>
												<li>Social Media presence (or website)</li>
												<li>
													All products in store follow our 3 guidelines
													(handmade, handcrafted and/or Canadian).
												</li>
											</ul>
										</div>
									</div>

									<div className='flex items-center mt-8 text-black dark:text-gray-400'>
										<div className='text-lg tracking-wide font-semibold w-full font-body'>
											How Does It Work?
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
												<li>
													We Made It rents out retail space to over 70+ makers.
													Vendors make back 100% of their sales.
												</li>
												<li>
													Our team members ring all products through a till
													using a barcode scanner. All items are individually
													labeled with a barcode sticker by the maker, which
													includes an item name, price and barcode. Vendors are
													to provide a properly completed inventory sheet to the
													store 24 hours before bringing in product, allowing
													our team to have your labels ready for you to label
													your items when you arrive. *Product will not be sold
													without a label
													<p>
														**During Christmas hours, we will make exceptions to
														this rule, allowing makers to add their own labels
														to products (using the same SKU). Vendors are still
														required to send the properly filled inventory sheet
														PRIOR to arriving, so we have time to import the
														items into the system.
													</p>
												</li>
												<li>
													<p>
														We charge the customer – not the vendor – a 13%
														admin fee on every transaction. This is not tax (tax
														is charged on your rental space). This helps pay for
														Point-of-Sale fees, housekeeping and supplies. This
														also allows us to keep rent as low as possible for
														Vendors.
													</p>

													<p>
														If your business is required to charge tax, you are
														responsible for including that in your cost. We
														cannot charge tax on your items for you.
													</p>
												</li>

												<li>
													Vendors are responsible for tracking their own
													inventory and keeping the store stocked at all times.
												</li>
											</ul>
										</div>
									</div>

									<div className='flex items-center mt-8 text-black dark:text-gray-400'>
										<div className='text-lg tracking-wide font-semibold w-full font-body'>
											What does a monthly vendor membership include?
										</div>
									</div>

									<div className='flex items-center mt-2 text-black dark:text-gray-400'>
										<div className='ml-4 text-md tracking-wide w-full'>
											<ul className='list-disc font-body'>
												<li>
													Daily/hourly tidying of each space and re-stocking as
													needed.
												</li>
												<li>
													A private, vendor-only Facebook group – this is great
													for connecting with other vendors to share resources
													and for new vendors to reach out to our veterans to
													learn about their ideas and tips, help with inventory
													spreadsheets and *Shelfie* requests
												</li>
												<li>
													Vendors are permitted to schedule Pop-Up Shop,
													allowing them to offer customization, meet the maker
													and display items not sold in store. * Sales from
													Pop-Up Shops are rung through the till with all other
													transactions, and paid out in the standard bi-weekly
													payout.
												</li>

												<li>
													Bi-weekly payouts are made by cheque. Vendors living
													far away are permitted to supply us with pre-addressed
													and stamped envelopes, or pay a monthly fee ($5.00)
													for mailing.
												</li>

												<li>
													Items listed on our website (ONLY if inventory sheets
													are filled properly, and photos provided).
												</li>

												<li>
													Regular Social Media recognition, and re-sharing all
													of stories we are tagged in
												</li>

												<li>
													Open a minimum of six days a week, some holidays
													included. Hours will be extended leading up to major
													holidays!
												</li>
											</ul>
										</div>
									</div>

									<div className='flex items-center mt-8 text-black dark:text-gray-400'>
										<div className='text-lg tracking-wide font-semibold w-full font-body'>
											How do you choose Vendors?
										</div>
									</div>

									<div className='flex items-center mt-2 text-black dark:text-gray-400'>
										<div className='ml-4 text-md tracking-wide w-full'>
											<ul className='list-disc font-body'>
												<li>
													We do our best to offer our customers as much variety
													as possible, with excellent quality and unique items.
													We review each application carefully and will reach
													out to those accepted by email, within 7 days.
													Unfortunately, due to high volume of applications,
													only those who are accepted will be contacted. Please
													do not contact us regarding the status of your
													application. All items must be handmade, handcrafted
													and Canadian.
												</li>
												<li>
													Please be sure to include a complete list of all
													products you wish to stock. Items not listed will not
													be permitted. All new items must be approved prior to
													you bringing them in
												</li>
											</ul>
										</div>
									</div>

									<div className='flex items-center mt-8 text-black dark:text-gray-400'>
										<div className='text-lg tracking-wide font-semibold w-full font-body'>
											What if I don't get accepted?
										</div>
									</div>

									<div className='flex items-center mt-2 text-black dark:text-gray-400'>
										<div className='ml-4 text-md tracking-wide w-full'>
											<ul className='list-disc font-body'>
												<li>
													Unfortunately, only successful applicants will be
													given notice by email. We receive many applications on
													a daily basis, so time only allows us to contact the
													ones we will be accepting.
												</li>
												<li>
													Those who are not successful will be put on a wait
													list and will be contacted if a space becomes
													available.
												</li>
											</ul>
										</div>
									</div>

									<div className='flex items-center mt-8 text-black dark:text-gray-400'>
										<div className='text-lg tracking-wide font-semibold w-full font-body'>
											What happens after I am accepted as a Vendor?
										</div>
									</div>

									<div className='flex items-center mt-2 text-black dark:text-gray-400'>
										<div className='ml-4 text-md tracking-wide w-full'>
											<ul className='list-disc font-body'>
												<li>
													Once accepted, Vendors have 3 days to accept the offer
													and pay the invoice. If payment has not been made
													within those 3 days, we will move to the next person
													in line.
												</li>
											</ul>
										</div>
									</div>

									<div className='flex items-center mt-8 text-black dark:text-gray-400'>
										<div className='text-lg tracking-wide font-semibold w-full font-body'>
											How can Vendors set up their space?
										</div>
									</div>

									<div className='flex items-center mt-2 text-black dark:text-gray-400'>
										<div className='ml-4 text-md tracking-wide w-full'>
											<ul className='list-disc font-body'>
												<li>
													Vendors are permitted to hang items on their wall
													space or attach fixtures, with approval. We Made It
													holds full authority over the look and feel of the
													store, so displays must be approved by a Team Member
													prior to leaving.
												</li>

												<li>
													We ask Vendors to send us a sketch or photo of their
													space or inspiration prior to moving in, so we can see
													that thought has been given to your display, and
													changes can be made if needed.
												</li>

												<li>
													Vendors are permitted to bring a shelving unit or
													display that works for their items, but we ask that
													all displays be clean and in good repair, and follow
													the flow of the store. *Please make sure if you have
													items that need to hang (clothing) you provide a
													display that shows your items properly.{' '}
												</li>

												<li>
													We Made It holds the right to alter your display or
													move your display as needed, to allow for better
													sales.{' '}
												</li>

												<li>
													We will choose where each Vendor will go, and can
													offer several options if they are available. We want
													to make sure we have a good variety of items, and will
													not bulk like-items together.
												</li>

												<li>
													We encourage all makers to browse Pinterest, and other
													locations/retail stores for inspiration of their
													display. Risers, racks, hooks and stands are great
													items to use to add a variety of height to your
													display.{' '}
												</li>

												<li>
													Business cards are required for each Space. You are
													permitted to have a logo or sign, but it must
													tastefully fit within your space and not overpower the
													rest.
												</li>
											</ul>
										</div>
									</div>

									<div className='flex items-center mt-8 text-black dark:text-gray-400'>
										<div className='text-lg tracking-wide font-semibold w-full font-body'>
											By electronically submitting this form, you agree to abide
											by ALL rules and regulations as described in this
											document. By electronically submitting this form you agree
											to all that has been stated in the form thus far. You
											agree that if at any time the rules or regulations are not
											followed, or we no longer feel you are a good fit for our
											store, We Made It reserves the right to refuse or cancel
											this contract at any time. *** Please note: ALL rental
											payments are strictly NON-REFUNDABLE. *** Please note:
											this document ONLY becomes legally binding if you are
											accepted as a Vendor and make a payment. 
										</div>
									</div>
								</div>

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
												placeholder='Description and Comments'
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
												<svg
													className='w-8 h-8'
													fill='currentColor'
													xmlns='http://www.w3.org/2000/svg'
													viewBox='0 0 20 20'
												>
													<path d='M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z' />
												</svg>
												<span className='mt-2 text-base leading-normal'>
													Select a file
												</span>
												<input type='file' class='hidden' />
											</label>
										</div>
										<div className='flex items-center mt-2'>
											<input
												id='agree'
												name='agree'
												type='checkbox'
												className='h-4 w-4 bg-gray-100 focus:ring-purple-400 border-gray-300 rounded'
												required
											/>
											<label
												for='agree'
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
		</div>
	);
}

export default BecomeVendor;
