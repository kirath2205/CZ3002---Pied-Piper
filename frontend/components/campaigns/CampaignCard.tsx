//mui
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Stack, Box, Modal } from '@mui/material';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
//libs
import React, { useState } from 'react';
//types
import { Campaign } from '@/interfaces/Campaign';
//components
import UnstyledLink from '@/components/shared/UnstyledLink';
import handleOpen from '@/pages/campaigns/[id]'
interface CampaignCardProps {
    campaign: Campaign;
    detailed?: boolean;
}

/**
 * Renders a card showing info of an individual campaign
 *
 * @param {CampaignCardProps} props - The campaign
 * @returns {JSX.Element} - The Campaign Card component
 */
const CampaignCard = ({ campaign, detailed }: CampaignCardProps): JSX.Element => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
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
                {detailed && (
                    <>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                        <Typography variant='body1'>Skills required:</Typography>
                            {campaign.skills}
                        </Box>
                        <Box pt={2}>
                            <Typography variant='body1'>About the activity</Typography>
                            <Typography variant='body2'>{campaign.description}</Typography>
                        </Box>
                    </>
                )}
            </CardContent>
            <CardActions sx={{ pl: 2, mt: -1.2, mb: 0.4 }}>
                {detailed ? (
                    <Button
                        size='small'
                        variant='contained'
                        sx={{ backgroundColor: '#12CDD4' }}
                        aria-label={`learn-more-${campaign.title}`}
                    >
                        Volunteer Now
                    </Button>
                ) : (
                    <div>
                        <Button
                            onClick={handleOpen}
                            size='small'
                            variant='contained'
                            sx={{ backgroundColor: '#12CDD4' }}
                            aria-label={`learn-more-${campaign.title}`}
                        >
                            Learn More
                        </Button>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            >
                            <Box px={4} pt={2}>
                                <CampaignCard campaign={campaign} detailed />

                            </Box>
                        </Modal>
                    </div>
                )}
            </CardActions>
        </Card>
    );
};

export default CampaignCard;
