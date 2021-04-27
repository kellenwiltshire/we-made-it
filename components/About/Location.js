import React from 'react';

function Location() {
	return (
		<div className='w-full lg:w-1/3 flex justify-center my-5'>
			<div className='bg-white shadow overflow-hidden sm:rounded-lg container'>
				<div className='px-4 py-5 sm:px-6'>
					<h3 className='text-2xl leading-6 font-medium text-dark-purple text-center font-title'>
						Store Information
					</h3>
				</div>
				<div className='border-t border-purple-200'>
					<dl>
						<div className='bg-purple-200 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
							<dt className='text-lg font-medium text-black font-title'>
								Location
							</dt>
							<dd className='mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2 font-body'>
								<p>101 King Ave W</p>
								<p>Newcastle, On</p>
								<p>L1B 1E3</p>
							</dd>
						</div>
						<div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
							<div className='text-lg font-medium text-black font-title'>
								Hours
							</div>
							<ul className='mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2 font-body'>
								<li>*COVID Lockdown Hours*</li>
								<li>Monday Closed</li>
								<li>Tuesday 11:00 a.m. - 3:00 p.m.</li>
								<li>Wednesday 10:30 a.m. - 4:00 p.m.</li>
								<li>Thursday 10:30 a.m. - 4:00 p.m.</li>
								<li>Friday 10:30 a.m. - 7:00 p.m.</li>
								<li>Saturday 10:30 a.m. - 4:00 p.m.</li>
								<li>Sunday 11:00 a.m. - 3:00 p.m.</li>
							</ul>
						</div>
						<div className='bg-purple-200 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
							<div className='text-lg font-medium text-black font-title'>
								Contact
							</div>
							<div className='mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2 font-body'>
								<div>
									<a href='tel: 1 905 987 7266'>1 (905) 987 7266</a>
								</div>
								<div>
									<a href='mailto: wemade-it@outlook.com'>
										wemade-it@outlook.com
									</a>
								</div>
							</div>
						</div>
					</dl>
				</div>
			</div>
		</div>
	);
}

export default Location;
