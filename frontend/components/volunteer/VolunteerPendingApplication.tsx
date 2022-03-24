//mui
import {
    Typography,
    Container,
    Grid,
    Avatar,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from '@mui/material';
import ContactPage from '@mui/icons-material/ContactPage';
import CancelIcon from '@mui/icons-material/Cancel';
import { styled } from '@mui/material/styles';
//lib
import * as React from 'react';
import { UserCampaign } from '@/interfaces/User';
//types

interface VolunteerPendingApplicationProp {
    pendingList: UserCampaign[];
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
const VolunteerPendingApplication = ({ pendingList }: VolunteerPendingApplicationProp): JSX.Element => {
    return (
        <Container maxWidth='sm' sx={{ mt: 2 }}>
            <Typography variant='h6' align='center'>
                List of Pending Applications
            </Typography>

            <Grid item>
                <Demo>
                    <List>
                        {pendingList &&
                            pendingList.map((campaign) => (
                                <ListItem key={campaign.pk}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <ContactPage />
                                        </Avatar>
                                    </ListItemAvatar>
                                    {/**TODO: Add the corresponding fields to interface once API is created */}
                                    <ListItemText
                                        primary={campaign.campaign_name ?? 'Campaign Name'}
                                        secondary={campaign.organization_name ?? 'Organization Name'}
                                    />
                                    <IconButton edge='end' aria-label='delete'>
                                        <CancelIcon />
                                    </IconButton>
                                </ListItem>
                            ))}
                    </List>
                </Demo>
            </Grid>
        </Container>
    );
};

export default VolunteerPendingApplication;
