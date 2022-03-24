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
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ContactPage from '@mui/icons-material/ContactPage';
import { styled } from '@mui/material/styles';
//lib
import axios from 'axios';
import * as React from 'react';

function generate(element: React.ReactElement) {
    return [0, 1, 2].map((value) =>
        React.cloneElement(element, {
            key: value,
        })
    );
}

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

/**
 * Renders the Organization Existing Campaign page
 *
 *
 * @returns {JSX.Element} - The Organization Existing Campaign page
 */
const OrganizationExistingCampaign = () => {
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);

    return (
        <Container maxWidth='sm' sx={{ mt: 2 }}>
            <Typography variant='h6' align='center'>
                List of Campaign
            </Typography>

            <Grid item>
                <Demo>
                    <List dense={dense}>
                        {generate(
                            <ListItem
                                secondaryAction={
                                    <IconButton edge='end' aria-label='delete'>
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar>
                                        <ContactPage />
                                    </Avatar>
                                </ListItemAvatar>
                                <IconButton edge='end' aria-label='edit' sx={{ mr: 2 }}>
                                    <EditIcon />
                                </IconButton>
                                <ListItemText primary='Campaign Name' secondary='Name' />
                            </ListItem>
                        )}
                    </List>
                </Demo>
            </Grid>
        </Container>
    );
};

export default OrganizationExistingCampaign;
