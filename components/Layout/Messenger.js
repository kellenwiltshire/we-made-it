import React from 'react';

function Messenger() {
	return (
		<div>
			<div id='fb-root'></div>
			<div
				className='fb-customerchat'
				attribution='setup_tool'
				page_id='109237417715566'
			></div>
            <script>
                window.fbAsyncInit = function() {
                    FB.init({
                        xfbml:true,
                        version:'v11.0'
                    })
                };

        (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
        fjs.parentNode.insertBefore(js, fjs)
      }(document, 'script', 'facebook-jssdk'));</script>
		</div>
	);
}

export default Messenger;
