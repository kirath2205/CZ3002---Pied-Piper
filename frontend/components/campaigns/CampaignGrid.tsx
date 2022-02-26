//mui
import { Grid } from '@mui/material';
//libs
import React from 'react';
//components
import CampaignCard from '@/components/campaigns/CampaignCard';
import { Campaign } from '@/interfaces/Campaign';

interface CampaignGridProps {
	campaigns: Campaign[];
}

/**
 *
 * Renders the list of campaigns in a grid
 *
 * @param {CampaignGridProps} props - The campaigns
 * @returns {JSX.Element} - The grid showing the list of campaigns
 */
const CampaignGrid = ({ campaigns }: CampaignGridProps): JSX.Element => {
	return (
		<Grid container spacing={3} marginTop={1} paddingX={2}>
			{campaigns.map((campaign) => (
				<Grid key={campaign.id} item xs={12} sm={6} md={4}>
					<CampaignCard campaign={campaign} />
				</Grid>
			))}
		</Grid>
	);
};

export default CampaignGrid;
