//mui
import {Typography,Container,Grid,Avatar,IconButton,List,ListItem,ListItemAvatar,ListItemText} from '@mui/material';
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
 * Renders the Application History page
 *
 *
 * @returns {JSX.Element} - The Application History page
 */
const VolunteerApplicationHistory = () => {
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);

    return (
        <Container maxWidth='sm' sx={{ mt: 2 }}>
            <Typography variant='h6' align='center'>
                List of Campaigns
            </Typography>

            <Grid item>
                <Demo>
                    <List dense={dense}>
                        {generate(
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <ContactPage />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary='Campaign Name' secondary='Organization Name' />
                                <ListItemText sx={{display:'flex', justifyContent:'flex-end'}} primary='Approved / Rejected'/>
                            </ListItem>
                        )}
                    </List>
                </Demo>
            </Grid>
        </Container>
    );
};

export default VolunteerApplicationHistory;
