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
import FaceIcon from '@mui/icons-material/Face';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { styled } from '@mui/material/styles';

//lib
import axios from 'axios';
import * as React from 'react';

//types
import { OrganizationWithPW } from '@/interfaces/Organization';
import { OrganizationNotification } from '@/interfaces/Organization';

interface OrganizationNotificationProps {
    notificationList: string[];
}

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
 * Renders the Approve Application page
 *
 *
 * @returns {JSX.Element} - The Approve Application page
 */
const ApproveApplication = ({ notificationList }: OrganizationNotificationProps) => {
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);

    return (
        <Container maxWidth='sm' sx={{ mt: 2 }}>
            <Typography variant='h6' align='center'>
                List of Volunteers Application
            </Typography>

            <Grid item>
                <Demo>
                    <List dense={dense}>
                        {notificationList && notificationList.map((c:any)=>{
                            return(
                            <ListItem key={c.pk}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <FaceIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={c.user_name??"Wei Hong"} secondary={c.campaign_name??"NTU Volunteer Campaign"} />
                                <IconButton edge='end' aria-label='delete'>
                                    <CancelIcon />
                                </IconButton>
                                <IconButton edge='end' aria-label='edit' sx={{ mr: 2 }}>
                                    <CheckCircleIcon />
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

export default ApproveApplication;
