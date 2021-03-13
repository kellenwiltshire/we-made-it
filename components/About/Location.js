import React from 'react';

function Location() {
	return (
		<div className='w-1/3 flex justify-center my-5'>
			<div class='bg-white shadow overflow-hidden sm:rounded-lg container'>
				<div class='px-4 py-5 sm:px-6'>
					<h3 class='text-2xl leading-6 font-medium text-dark-purple text-center'>
						Store Information
					</h3>
				</div>
				<div class='border-t border-purple-200'>
					<dl>
						<div class='bg-purple-200 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
							<dt class='text-lg font-medium text-black'>Location</dt>
							<dd class='mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2'>
								<p>101 King Ave E</p>
								<p>Newcastle, On</p>
								<p>L1B 1E3</p>
							</dd>
						</div>
						<div class='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
							<dt class='text-lg font-medium text-black'>Hours</dt>
							<ul class='mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2'>
								<li>Monday Closed</li>
								<li>Tuesday 10:00 a.m. - 5:00 p.m.</li>
								<li>Wednesday 10:00 a.m. - 5:00 p.m.</li>
								<li> Thursday 10:00 a.m. - 7:00 p.m.</li>
								<li>Friday 10:00 a.m. - 7:00 p.m.</li>
								<li> Saturday 10:00 a.m. - 7:00 p.m.</li>
								<li>Sunday 10:00 a.m. - 5:00 p.m.</li>
							</ul>
						</div>
						<div class='bg-purple-200 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
							<dt class='text-lg font-medium text-black'>Contact</dt>
							<dd class='mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2'>
								<div>
									<a href='tel: 1 905 987 7266'>1 (905) 987 7266</a>
								</div>
								<div>
									<a href='mailto: wemade-it@outlook.com'>
										wemade-it@outlook.com
									</a>
								</div>
							</dd>
						</div>
					</dl>
				</div>
			</div>
		</div>
	);
}

export default Location;
