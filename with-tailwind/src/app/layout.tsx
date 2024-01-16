// Component: RootLayout
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
import type { Metadata } from 'next';
import localFont from 'next/font/local';

// Scripts (local)
import { classNames } from '@/lib/utils';

// Fonts
import { Inter } from 'next/font/google';

// Styles
import '@/styles/globals.scss';

/*---------- Static Data ----------*/

// Fonts
const inter = Inter({ subsets: ['latin'] });
const sky = localFont({
	src: [
		{
			path: '../../public/fonts/sky_bold-webfont.woff2',
			weight: 'bold',
			style: 'normal',
		},
		{
			path: '../../public/fonts/sky_italic-webfont.woff2',
			weight: 'normal',
			style: 'italic',
		},
		{
			path: '../../public/fonts/sky_med-webfont.woff2',
			weight: '600',
			style: 'normal',
		},
		{
			path: '../../public/fonts/sky_reg_1-webfont.woff2',
			weight: 'normal',
			style: 'normal',
		},
		{
			path: '../../public/fonts/skytext_lt-webfont.woff2',
			weight: '200',
			style: 'normal',
		},
	],
});

// Metadata
export const metadata: Metadata = {
	title: 'Interactive Team Selector',
	description: 'Created by Richard Cross',
};

/*---------- Template ----------*/

// Types
export type RootLayoutProps = {
	children: React.ReactNode;
};

// Default component
export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en">
			<body
				className={classNames(
					`layout font-light text-[16px] leading-[24px] text-center`,
					sky.className
				)}
			>
				{children}
			</body>
		</html>
	);
}
