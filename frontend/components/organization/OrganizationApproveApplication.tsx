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
    approveApplication: (pk: number, user_id: number, campaign_id: number, status: string) => Promise<void>;
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
const ApproveApplication = ({ notificationList, approveApplication }: OrganizationNotificationProps) => {
    return (
        <Container maxWidth='sm' sx={{ mt: 2 }}>
            <Typography variant='h6' align='center'>
                List of Volunteers Application
            </Typography>

            <Grid item>
                <Demo>
                    <List>
                        {notificationList &&
                            notificationList.map((notification) => (
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
                                    <IconButton
                                        size='small'
                                        edge='end'
                                        aria-label='edit'
                                        sx={{ mr: 2 }}
                                        onClick={() =>
                                            approveApplication(
                                                notification.pk as number,
                                                notification.user_id,
                                                notification.campaign_id,
                                                'A'
                                            )
                                        }
                                    >
                                        <CheckCircleIcon
                                            sx={{
                                                '&:hover': {
                                                    fill: '#50856a',
                                                },
                                            }}
                                        />
                                    </IconButton>
                                    <IconButton
                                        size='small'
                                        edge='end'
                                        aria-label='delete'
                                        onClick={() =>
                                            approveApplication(
                                                notification.pk as number,
                                                notification.user_id,
                                                notification.campaign_id,
                                                'R'
                                            )
                                        }
                                    >
                                        <CancelIcon
                                            sx={{
                                                '&:hover': {
                                                    fill: '#691c33',
                                                },
                                            }}
                                        />
                                    </IconButton>
                                </ListItem>
                            ))}
                    </List>
                </Demo>
            </Grid>
        </Container>
    );
};

export default ApproveApplication;
