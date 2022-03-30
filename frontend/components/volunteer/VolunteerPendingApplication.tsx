//mui
import {
    Box,
    Typography,
    Container,
    Grid,
    Avatar,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Tooltip,
} from '@mui/material';
import ContactPage from '@mui/icons-material/ContactPage';
import CancelIcon from '@mui/icons-material/Cancel';
import { styled } from '@mui/material/styles';
//lib
import * as React from 'react';
import Fade from 'react-reveal/Fade';
//components
import StyledLink from '@/components/shared/StyledLink';

//types
import { UserCampaign } from '@/interfaces/User';

interface VolunteerPendingApplicationProp {
    pendingList: UserCampaign[];
    unregisterForCampaign: (campaign_id: number) => Promise<void>;
}

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

/**
 * Renders the Pending Application page
 *
 *
 * @returns {JSX.Element} - The Pending Application page
 */
const VolunteerPendingApplication = ({
    pendingList,
    unregisterForCampaign,
}: VolunteerPendingApplicationProp): JSX.Element => {
    return (
        <Container maxWidth='sm' sx={{ mt: 2 }}>
            <Typography variant='h6' align='center'>
                List of Pending Applications
            </Typography>

            <Grid item>
                <Demo>
                    <List>
                        {!pendingList.length && (
                            <Box>
                                <Typography align='center'>There are no pending applications currently.</Typography>
                                <Typography align='center'>
                                    View current campaigns <StyledLink href='/campaigns'>here</StyledLink>
                                </Typography>
                            </Box>
                        )}
                        {pendingList &&
                            pendingList.map((campaign) => (
                                <Fade bottom duration={600} key={campaign.pk}>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <ContactPage />
                                            </Avatar>
                                        </ListItemAvatar>
                                        {/**TODO: Add the corresponding fields to interface once API is created */}
                                        <ListItemText
                                            primary={campaign.campaign_name ?? 'Campaign Name'}
                                            secondary={campaign.organisation_name ?? 'Organisation Name'}
                                        />
                                        {/*TODO: Button for deregistering campaign on click*/}
                                        <Tooltip title='Deregister from campaign'>
                                            <IconButton
                                                edge='end'
                                                aria-label='delete'
                                                size='small'
                                                onClick={() => unregisterForCampaign(campaign.campaign_id)}
                                            >
                                                <CancelIcon
                                                    sx={{
                                                        '&:hover': {
                                                            fill: '#691c33',
                                                        },
                                                    }}
                                                />
                                            </IconButton>
                                        </Tooltip>
                                    </ListItem>
                                </Fade>
                            ))}
                    </List>
                </Demo>
            </Grid>
        </Container>
    );
};

export default VolunteerPendingApplication;
