//mui
import { Box, Grid, Avatar, Container, Typography, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import ContactPage from '@mui/icons-material/ContactPage';
import { styled } from '@mui/material/styles';
//lib
import * as React from 'react';
import Fade from 'react-reveal/Fade';
//components
import StyledLink from '@/components/shared/StyledLink';
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
                        {!history.length && (
                            <Box>
                                <Typography align='center'>You have not registered for any campaigns.</Typography>
                                <Typography align='center'>
                                    View current campaigns <StyledLink href='/campaigns'>here</StyledLink>
                                </Typography>
                            </Box>
                        )}
                        {history &&
                            history.map((campaign) => (
                                <Fade bottom duration={600} key={campaign.pk}>
                                    <ListItem>
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
                                </Fade>
                            ))}
                    </List>
                </Demo>
            </Grid>
        </Container>
    );
};

export default VolunteerApplicationHistory;
