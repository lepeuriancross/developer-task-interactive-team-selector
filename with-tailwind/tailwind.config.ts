import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				gray: {
					DEFAULT: '#4a4a4a',
					light: '#f7f5f9',
				},
				orange: {
					DEFAULT: '#ff7800',
				},
				red: {
					DEFAULT: '#f80032',
				},
				pink: {
					DEFAULT: '#ff00a0',
				},
				purple: {
					DEFAULT: '#8c28ff',
				},
				blue: {
					DEFAULT: '#000FF5',
					light: '#1798ff',
				},
			},
			fontFamily: {
				title: ['var(--font-sky)'],
				subtitle: ['var(--font-sky)'],
				body: ['var(--font-sky)'],
				button: ['var(--font-sky)'],
			},
		},
	},
	plugins: [],
};
export default config;
