import React from 'react';

function Location() {
	return (
		<div class='bg-white shadow overflow-hidden sm:rounded-lg'>
			<div class='px-4 py-5 sm:px-6'>
				<h3 class='text-lg leading-6 font-medium text-gray-900'>
					Store Information
				</h3>
				<p class='mt-1 max-w-2xl text-sm text-gray-500'>Location and Hours</p>
			</div>
			<div class='border-t border-gray-200'>
				<dl>
					<div class='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
						<dt class='text-sm font-medium text-gray-500'>Location</dt>
						<dd class='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
							101 King Ave E Newcastle, On L1B 1E3
						</dd>
					</div>
					<div class='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
						<dt class='text-sm font-medium text-gray-500'>Hours</dt>
						<dd class='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
							Monday Closed Tuesday 10:00 a.m. - 5:00 p.m. Wednesday 10:00 a.m.
							- 5:00 p.m. Thursday 10:00 a.m. - 7:00 p.m. Friday 10:00 a.m. -
							7:00 p.m. Saturday 10:00 a.m. - 7:00 p.m. Sunday 10:00 a.m. - 5:00
							p.m.
						</dd>
					</div>
				</dl>
			</div>
		</div>
	);
}

export default Location;
