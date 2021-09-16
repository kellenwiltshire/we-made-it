import Head from 'next/head';

function SEO({ title }) {
	// customize meta properties
	// you can pass them as an argument like title in case you want to change for each page
	const description = 'Handmade Boutique Items and Home Decor';
	const keywords =
		'We-Made-It We Made It Newcastle Ontario Homemade Handmade Decor Boutique Local Clarington Canada Bowmanville Durham Oshawa Cobourg';
	const siteURL = 'https://www.we-made-it.ca';
	const imagePreview = `https://we-made-it.ca/_next/image?url=%2Fhomepagephoto.png&w=1920&q=75`;

	return (
		<Head>
			<meta charSet='utf-8' />
			<meta httpEquiv='X-UA-Compatible' content='IE=edge' />
			<meta name='description' content={description} />
			<meta name='keywords' content={keywords} />

			{/* Open Graph */}
			<meta property='og:url' content={siteURL} key='ogurl' />
			<meta property='og:image' content={imagePreview} key='ogimage' />
			<meta property='og:site_name' content={siteURL} key='ogsitename' />
			<meta property='og:title' content={title} key='ogtitle' />
			<meta property='og:description' content={description} key='ogdesc' />
			<title>{title}</title>

			<link rel='manifest' href='/manifest.json' />
			<link rel='icon' href='/favicon.ico' />
			<meta lang='en' />

			<link rel='apple-touch-icon' href='/apple-icon.png'></link>
			<meta name='theme-color' content='#ddd6fe' />
		</Head>
	);
}

export default SEO;
