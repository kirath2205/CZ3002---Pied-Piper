//mui
import {Typography,Container,Grid,Avatar,IconButton,List,ListItem,ListItemAvatar,ListItemText} from '@mui/material';
import FaceIcon from '@mui/icons-material/Face';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ContactPage from '@mui/icons-material/ContactPage';
import CancelIcon from '@mui/icons-material/Cancel';
import { styled } from '@mui/material/styles';
//lib
import axios from 'axios';
import * as React from 'react';
//types
import { Gender, User, UserProfile, UserWithPW } from '@/interfaces/User';
import { Campaign } from '@/interfaces/Campaign';

interface VolunteerPendingApplicationProp {
    pendingList: string[];
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
const VolunteerPendingApplication = ({pendingList}:VolunteerPendingApplicationProp): JSX.Element => {
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);

    return (
        <Container maxWidth='sm' sx={{ mt: 2 }}>
            <Typography variant='h6' align='center'>
                List of Pending Applications
            </Typography>

            <Grid item>
                <Demo>
                    <List dense={dense}>
                        {pendingList && pendingList.map((c:any)=>{
                            return(
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <ContactPage/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={c.campaign_id} secondary={c.organization} />
                                    <IconButton edge='end' aria-label='delete'>
                                        <CancelIcon />
                                    </IconButton>
                                </ListItem>
                            )
                        })
                        }
                    </List>
                </Demo>
            </Grid>
        </Container>
    );
};

export default VolunteerPendingApplication;
