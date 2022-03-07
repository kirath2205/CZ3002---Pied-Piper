import CampaignGrid from '@/components/campaigns/CampaignGrid';
import CampaignCard from '@/components/campaigns/CampaignCard';
import { screen, render } from '@testing-library/react';

jest.mock('@/components/campaigns/CampaignCard', () => ({ id }) => <div key={id}>CampaignCard</div>);

describe('campaigns/CampaignGrid', () => {
    it('should render the grid of campaign cards', () => {
        const cards = [{ id: 1 }, { id: 2 }, { id: 3 }];
        render(<CampaignGrid campaigns={cards} />);
        expect(screen.getAllByText('CampaignCard')).toHaveLength(3);
    });
});
