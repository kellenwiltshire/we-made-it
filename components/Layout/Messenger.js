import React from 'react';
import MessengerMessageUs from 'react-messenger-message-us';

function Messenger() {
	return (
		<div className='sticky bottom-5 flex justify-end w-full pr-2'>
			<MessengerMessageUs
				pageId={process.env.MESSENGER_PAGE_ID}
				appId={process.env.MESSENGER_APP_ID}
			/>
		</div>
	);
}

export default Messenger;
