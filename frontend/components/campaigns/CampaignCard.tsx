//mui
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Stack, Box } from '@mui/material';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
//libs
import React from 'react';
//types
import { Campaign } from '@/interfaces/Campaign';

interface CampaignCardProps {
	campaign: Campaign;
}

/**
 * Renders a card showing info of an individual campaign
 *
 * @param {CampaignCardProps} props - The campaign
 * @returns {JSX.Element} - The Campaign Card component
 */
const CampaignCard = ({ campaign }: CampaignCardProps): JSX.Element => {
	return (
		<Card>
			<CardMedia component='img' height='140' image='https://picsum.photos/400/300' alt={campaign.title} />
			<CardContent>
				<Typography variant='h6' component='p'>
					{campaign.title}
				</Typography>
				<Typography variant='caption' component='p' gutterBottom>
					by {campaign.organization}
				</Typography>
				<Stack marginTop={1} spacing={0.5}>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
						<EventOutlinedIcon fontSize='small' sx={{ opacity: 0.8 }} />
						{campaign.date}
					</Box>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
						<AccessTimeOutlinedIcon fontSize='small' sx={{ opacity: 0.8 }} />
						{campaign.time}
					</Box>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
						<LocationOnOutlinedIcon fontSize='small' sx={{ opacity: 0.8 }} />
						{campaign.location}
					</Box>
				</Stack>
			</CardContent>
			<CardActions sx={{ pl: 2, mt: -1.2, mb: 0.4 }}>
				<Button size='small' variant='contained' sx={{ backgroundColor: '#12CDD4' }} aria-label={`learn-more-${campaign.title}`}>
					Learn More
				</Button>
			</CardActions>
		</Card>
	);
};

export default CampaignCard;
