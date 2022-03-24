//mui
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    Stack,
    Box,
    IconButton,
    Chip,
} from '@mui/material';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
//libs
import React from 'react';
import { useRouter } from 'next/router';
//types
import { Campaign } from '@/interfaces/Campaign';
//components
import UnstyledLink from '@/components/shared/UnstyledLink';
//redux
import { useAppSelector } from '@/app/hooks';
import { selectLoggedIn, selectUserType } from '@/app/slices/authSlice';

interface CampaignCardProps {
    campaign: Campaign;
    userRegistered?: boolean;
    detailed?: boolean;
}

/**
 * Renders a card showing info of an individual campaign
 *
 * @param {CampaignCardProps} props - The campaign
 * @returns {JSX.Element} - The Campaign Card component
 */
const CampaignCard = ({ campaign, detailed, userRegistered }: CampaignCardProps): JSX.Element => {
    const loggedIn = useAppSelector(selectLoggedIn);
    const userType = useAppSelector(selectUserType);
    const router = useRouter();

    return (
        <Stack gap={1}>
            {detailed && (
                <Box>
                    <IconButton onClick={() => router.back()}>
                        <ArrowBackRoundedIcon />
                    </IconButton>
                </Box>
            )}
            <Card raised>
                <CardMedia
                    component='img'
                    height={200}
                    image='https://picsum.photos/400/300'
                    alt={campaign.title}
                    sx={{ paddingX: 1, paddingY: 1 }}
                />
                <CardContent>
                    <Typography variant='h6' component='p'>
                        {campaign.title}
                    </Typography>
                    <Typography variant='caption' component='p' gutterBottom>
                        by {campaign.organization ?? 'Organization Name'}
                    </Typography>
                    <Stack marginTop={1} spacing={0.5}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                            <EventOutlinedIcon fontSize='small' sx={{ opacity: 0.8 }} />
                            {campaign.date_time}
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                            <AccessTimeOutlinedIcon fontSize='small' sx={{ opacity: 0.8 }} />
                            {campaign.end_time}
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                            <LocationOnOutlinedIcon fontSize='small' sx={{ opacity: 0.8 }} />
                            {campaign.location}
                        </Box>
                    </Stack>
                    <Box pt={0.5} sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.4 }}>
                        {campaign.skills.map((skill) => (
                            <Chip key={skill} label={skill} size='small' color='primary' variant='outlined' />
                        ))}
                    </Box>
                    {detailed && (
                        <Box pt={2}>
                            <Typography variant='body1'>About the activity</Typography>
                            <Typography variant='body2'>{campaign.description}</Typography>
                        </Box>
                    )}
                </CardContent>

                <CardActions sx={{ pl: 2, mt: -1.2, mb: 0.4 }}>
                    {detailed ? (
                        <Button
                            size='small'
                            variant='contained'
                            sx={{ backgroundColor: '#12CDD4' }}
                            aria-label={`learn-more-${campaign.title}`}
                            disabled={!loggedIn || userType === 'ORG' || userRegistered}
                        >
                            {userRegistered ? 'Already applied' : 'Volunteer Now'}
                        </Button>
                    ) : (
                        <UnstyledLink href={`/campaigns/${campaign.pk}`}>
                            <Button
                                size='small'
                                variant='contained'
                                sx={{ backgroundColor: '#12CDD4' }}
                                aria-label={`learn-more-${campaign.title}`}
                            >
                                Learn More
                            </Button>
                        </UnstyledLink>
                    )}
                </CardActions>
            </Card>
        </Stack>
    );
};

export default CampaignCard;
