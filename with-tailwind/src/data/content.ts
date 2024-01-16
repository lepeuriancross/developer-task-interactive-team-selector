// Data: Static Content
/*----------------------------------------------------------------------------------------------------
* Use this content when CMS is inactive / not used
----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Components (local)
import { BlockTeamSelector } from '@/components/sections/SectionTeamSelector';

/*---------- Data ----------*/

// Types
export type StaticContent = {
	sections: BlockTeamSelector[];
};

// Static Content
export const staticContent: StaticContent = {
	sections: [
		{
			_type: `blockTeamSelector`,
			title: `Sub-teams`,
			body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
			cards: [
				{
					id: `software-engineering`,
					jobs: 15,
					name: `Software Engineering`,
					title: `Software Engineering`,
					body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
					link: {
						name: `Find jobs`,
						href: `#`,
						target: `_blank`,
					},
					image: '/img/image_placeholder.jpg',
					video: {
						src: '/video/video_software-engineering.mp4',
						name: 'Watch the film',
					},
				},
				{
					id: `data`,
					jobs: 19,
					name: `Data`,
					title: `Data`,
					body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor.`,
					link: {
						name: `Find jobs`,
						href: `#`,
						target: `_blank`,
					},
					image: '/img/image_placeholder.jpg',
				},
				{
					id: `cyber-security`,
					jobs: 8,
					name: `Cyber Security`,
					title: `Cyber Security`,
					body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
					link: {
						name: `Find jobs`,
						href: `#`,
						target: `_blank`,
					},
					image: '/img/image_placeholder.jpg',
				},
				{
					id: `product-management`,
					jobs: 30,
					name: `Product Management`,
					title: `Product Management`,
					body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
					link: {
						name: `Find jobs`,
						href: `#`,
						target: `_blank`,
					},
					image: '/img/image_placeholder.jpg',
				},
				{
					id: `program-and-product-managementy`,
					jobs: 19,
					name: `Program & Product Management`,
					title: `Program & Product Management`,
					body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor.`,
					link: {
						name: `Find jobs`,
						href: `#`,
						target: `_blank`,
					},
					image: '/img/image_placeholder.jpg',
				},
				{
					id: `architecture-and-technical-analysis`,
					jobs: 21,
					name: `Architecture & Technical Analysis`,
					title: `Architecture & Technical Analysis`,
					body: `Fixing tricky problems. Finding smart solutions. Creating the structure behind the innovations our customers love. Our expert architects and technical analysts help us get the most out of our technology, driving collaboration, convergence, simplification and re-use. Make an impact across six different countries on teams ranging from Sales to Sky Sports.`,
					link: {
						name: `Find jobs`,
						href: `#`,
						target: `_blank`,
					},
					image: '/img/image_placeholder.jpg',
				},
				{
					id: `solution-testing`,
					jobs: 10,
					name: `Solution Testing`,
					title: `Solution Testing`,
					body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
					link: {
						name: `Find jobs`,
						href: `#`,
						target: `_blank`,
					},
					image: '/img/image_placeholder.jpg',
				},
			],
		},
	],
};
