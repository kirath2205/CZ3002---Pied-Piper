import CampaignGrid from '@/components/campaigns/CampaignGrid';
import Layout from '@/components/shared/Layout';
import Head from 'next/head';
import { Campaign } from '@/interfaces/Campaign';

const campaigns: Campaign[] = [
	{
		id: '40549fdf-487b-4be1-8c26-8708db9f59f6',
		location: 'Bartelt',
		skills: ['Dog Training'],
		date: '5/31/2021',
		time: '6:30pm to 8:30pm',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		minimumAge: 15,
		duration: 2,
		vacancies: 35,
		title: 'Campaign 2',
		organization: 'The Volunteer Org',
	},
	{
		id: '15312302-5e07-4d92-ba7b-2967044760a5',
		location: 'Myrtle',
		skills: ['International Logistics'],
		date: '2/3/2022',
		time: '6:30pm to 8:30pm',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		minimumAge: 14,
		duration: 1,
		vacancies: 14,
		title: 'Campaign 1',
		organization: 'The Volunteer Org',
	},
	{
		id: 'c1410d7e-b07b-4de6-91b2-884c3720054b',
		location: 'Dennis',
		skills: ['DTD'],
		date: '12/12/2021',
		time: '6:30pm to 8:30pm',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		minimumAge: 15,
		duration: 3,
		vacancies: 0,
		title: 'Campaign 3',
		organization: 'The Volunteer Org',
	},
	{
		id: '42d244a0-f3ff-462f-84c7-f5ff53efd220',
		location: 'North',
		skills: ['EOB'],
		date: '7/5/2021',
		time: '6:30pm to 8:30pm',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		minimumAge: 16,
		duration: 1,
		vacancies: 30,
		title: 'Campaign 4',
		organization: 'The Volunteer Org',
	},
	{
		id: '78b902e9-7354-4bb1-90e9-f891940763a0',
		location: 'Hollow Ridge',
		skills: ['Real Estate Development'],
		date: '1/15/2022',
		time: '6:30pm to 8:30pm',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		minimumAge: 14,
		duration: 1,
		vacancies: 41,
		title: 'Campaign 5',
		organization: 'The Volunteer Org',
	},
];

export default function Campaigns() {
	return (
		<>
			<Head>
				<title>VolunteerGoWhere</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Layout>
				<CampaignGrid campaigns={campaigns} />
			</Layout>
		</>
	);
}
