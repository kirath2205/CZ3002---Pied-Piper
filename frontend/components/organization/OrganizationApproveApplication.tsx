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
import * as React from 'react';
import { OrganizationNotification } from '@/interfaces/Organization';

//types

interface OrganizationNotificationProps {
    notificationList: OrganizationNotification[];
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
                        {notificationList &&
                            notificationList.map((notification) => {
                                return (
                                    <ListItem key={notification.pk}>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <FaceIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        {/**TODO: Change the OrganizationNotification interface to include these fields once the API is implemented */}
                                        <ListItemText
                                            primary={notification.user_name ?? 'Wei Hong'}
                                            secondary={notification.campaign_name ?? 'NTU Volunteer Campaign'}
                                        />
                                        <IconButton edge='end' aria-label='delete'>
                                            <CancelIcon />
                                        </IconButton>
                                        <IconButton edge='end' aria-label='edit' sx={{ mr: 2 }}>
                                            <CheckCircleIcon />
                                        </IconButton>
                                    </ListItem>
                                );
                            })}
                    </List>
                </Demo>
            </Grid>
        </Container>
    );
};

export default ApproveApplication;
