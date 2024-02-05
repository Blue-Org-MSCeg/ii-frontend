/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		colors: {
			green: '#6dab4a',
		},
		extend: {},
	},
	plugins: [require('tailwindcss'), require('autoprefixer')],
};
