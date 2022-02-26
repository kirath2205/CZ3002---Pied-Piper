import CampaignCard from '@/components/campaigns/CampaignCard';
import { screen, render } from '@testing-library/react';

describe('campaigns/CampaignCard', () => {
	const campaign = {
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
		title: 'Campaign 1',
		organization: 'The Volunteer Org',
	};
	it('should render the campaign info and the learn more button', () => {
		render(<CampaignCard campaign={campaign} />);

		expect(screen.getByText(campaign.title)).toBeInTheDocument();
		expect(screen.getByText(`by ${campaign.organization}`)).toBeInTheDocument();
		expect(screen.getByText(campaign.date)).toBeInTheDocument();
		expect(screen.getByText(campaign.time)).toBeInTheDocument();
		expect(screen.getByText(campaign.location)).toBeInTheDocument();
		expect(screen.getByText('Learn More')).toBeInTheDocument();
	});
});
