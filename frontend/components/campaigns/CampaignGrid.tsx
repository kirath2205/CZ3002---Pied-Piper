//mui
import { Grid, Typography } from '@mui/material';
//libs
import { useState, useEffect } from 'react';
//components
import CampaignCard from '@/components/campaigns/CampaignCard';
import { Campaign } from '@/interfaces/Campaign';

interface CampaignGridProps {
    campaigns: Campaign[];
    filter: string[];
}

/**
 *
 * Renders the list of campaigns in a grid
 *
 * @param {CampaignGridProps} props - The campaigns
 * @returns {JSX.Element} - The grid showing the list of campaigns
 */
const CampaignGrid = ({ campaigns, filter }: CampaignGridProps): JSX.Element => {
    const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>(campaigns);

    useEffect(() => {
        if (filter[0]) {
            setFilteredCampaigns(
                campaigns.filter((campaign) => filter.some((skill) => campaign.skills.includes(skill)))
            );
        } else {
            setFilteredCampaigns(campaigns);
        }
    }, [filter]);
    return (
        <Grid container spacing={3} marginTop={1} paddingX={2}>
            {!filteredCampaigns.length && <Typography>There were no campaigns for that category :(</Typography>}
            {filteredCampaigns.map((campaign) => (
                <Grid key={campaign.pk} item xs={12} sm={6} md={4}>
                    <CampaignCard campaign={campaign} />
                </Grid>
            ))}
        </Grid>
    );
};

export default CampaignGrid;
