import React from 'react';
import MessengerMessageUs from 'react-messenger-message-us';

function Messenger() {
	return (
		<div className='sticky bottom-5 flex justify-end w-full pr-2'>
			{/* <div id='fb-root'></div>
			<div
				className='fb-customerchat'
				attribution='setup_tool'
				page_id='109237417715566'
			></div> */}
			<MessengerMessageUs
				pageId={process.env.MESSENGER_PAGE_ID}
				appId={process.env.MESSENGER_APP_ID}
			/>
		</div>
	);
}

export default Messenger;
