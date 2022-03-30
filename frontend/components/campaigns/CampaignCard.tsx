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
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
//types
import { Campaign } from '@/interfaces/Campaign';
//components
import UnstyledLink from '@/components/shared/UnstyledLink';
import Toast from '@/components/shared/Toast';
//redux
import { useAppSelector } from '@/app/hooks';
import { selectLoggedIn, selectUserType } from '@/app/slices/authSlice';
//utils
import { convertDate, getDuration } from '@/utils/datetime';

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
    const [appliedStatus, setAppliedStatus] = useState(userRegistered);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const registerForCampaign = async () => {
        try {
            const response = await axios.post(`/api/user_view/register_for_campaign`, {
                campaign_id: campaign.pk,
                org_email: campaign.org_email,
            });
            setAppliedStatus(true);
            setSuccess(true);
        } catch (err: any) {
            console.log(err);
            setError(err);
        }
    };
    return (
        <Stack gap={1}>
            {detailed && (
                <Box>
                    <IconButton onClick={() => router.back()}>
                        <ArrowBackRoundedIcon />
                    </IconButton>
                </Box>
            )}
            {success && <Toast severity='success' initialize={success} message='Registered for campaign!' />}
            {error && (
                <Toast severity='error' initialize={Boolean(error)} message='Something went wrong, try again later.' />
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
                        by {campaign.org_name ?? 'Organization Name'}
                    </Typography>
                    <Stack marginTop={1} spacing={0.5}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                            <EventOutlinedIcon fontSize='small' sx={{ opacity: 0.8 }} />
                            {convertDate(new Date(campaign.date_time))}
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                            <AccessTimeOutlinedIcon fontSize='small' sx={{ opacity: 0.8 }} />
                            {getDuration(new Date(campaign.date_time), new Date(campaign.end_time))}
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
                            disabled={!loggedIn || userType === 'ORG' || appliedStatus}
                            onClick={() => registerForCampaign()}
                        >
                            {appliedStatus ? 'Already applied' : 'Volunteer Now'}
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
