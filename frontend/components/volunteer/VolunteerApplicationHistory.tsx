//mui
import { Grid, Avatar, Container, Typography, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import ContactPage from '@mui/icons-material/ContactPage';
import { styled } from '@mui/material/styles';
//lib
import * as React from 'react';
//types
import { UserCampaign } from '@/interfaces/User';

interface VolunteerApplicationHistoryProp {
    history: UserCampaign[];
}

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

/**
 * Renders the Application History page
 *
 *
 * @returns {JSX.Element} - The Application History page
 */
const VolunteerApplicationHistory = ({ history }: VolunteerApplicationHistoryProp) => {
    return (
        <Container maxWidth='sm' sx={{ mt: 2 }}>
            <Typography variant='h6' align='center'>
                List of Campaigns
            </Typography>

            <Grid item>
                <Demo>
                    <List>
                        {history &&
                            history.map((campaign) => (
                                <ListItem key={campaign.pk}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <ContactPage />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={campaign.campaign_name ?? 'Campaign Name'}
                                        secondary={campaign.organization_name ?? 'Organization Name'}
                                    />
                                    <ListItemText
                                        sx={{ display: 'flex', justifyContent: 'flex-end' }}
                                        primary={campaign.status}
                                    />
                                </ListItem>
                            ))}
                    </List>
                </Demo>
            </Grid>
        </Container>
    );
};

export default VolunteerApplicationHistory;
