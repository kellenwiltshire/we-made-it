module.exports = {
	purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				'dark-purple': '#604195',
			},
			backgroundImage: {
				banner: "url('/Banner.png')",
			},
			height: (theme) => ({
				120: '30rem',
			}),
		},
		fontFamily: {
			title: 'Raleway',
			body: 'Open Sans',
		},
	},
	variants: {
		extend: {},
	},
	plugins: [require('@tailwindcss/forms')],
};
