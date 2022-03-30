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
    Tooltip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ContactPage from '@mui/icons-material/ContactPage';
//lib
import * as React from 'react';
import { useRouter } from 'next/router';
import Fade from 'react-reveal/Fade';
//types
import { Campaign } from '@/interfaces/Campaign';

interface OrganizationExistingCampaignProps {
    campaigns: Campaign[];
}

/**
 * Renders the Organization Existing Campaign page
 *
 *
 * @returns {JSX.Element} - The Organization Existing Campaign page
 */
const OrganizationExistingCampaign = ({ campaigns }: OrganizationExistingCampaignProps): JSX.Element => {
    const router = useRouter();

    return (
        <Container maxWidth='sm' sx={{ mt: 2 }}>
            <Typography variant='h6' align='center'>
                List of Campaign
            </Typography>

            <Grid item>
                <List>
                    {campaigns &&
                        campaigns.map((campaign) => (
                            <Fade bottom duration={600} key={campaign.pk}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <ContactPage />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={campaign.title} secondary={campaign.location} />
                                    <Tooltip title='Edit campaign details'>
                                        <IconButton
                                            size='small'
                                            edge='end'
                                            aria-label='edit'
                                            sx={{
                                                mr: {
                                                    xs: 0,
                                                    sm: 1,
                                                    md: 1.5,
                                                },
                                            }}
                                            onClick={() => router.push(`/campaigns/edit/${campaign.pk}`)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title='Delete campaign'>
                                        <IconButton size='small' edge='end' aria-label='delete'>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </ListItem>
                            </Fade>
                        ))}
                </List>
            </Grid>
        </Container>
    );
};

export default OrganizationExistingCampaign;
