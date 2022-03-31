//mui
import { Box, Typography, Avatar, Tooltip, Grid } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
//lib
import React from 'react';
//components
import BackButton from '@/components/shared/BackButton';
//types
import { ApprovedUser } from '@/interfaces/Campaign';

interface ApprovedUsersListProps {
    approvedUsers: ApprovedUser[];
}

const ApprovedUsersList = ({ approvedUsers }: ApprovedUsersListProps): JSX.Element => {
    return (
        <Box mt={1}>
            <Typography variant='h6'>Approved Users</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {approvedUsers.map((user) => (
                    <Tooltip title={`${user.user_name} ${user.phone_number}`} key={user.pk}>
                        <Avatar>
                            <AccountCircleOutlinedIcon />
                        </Avatar>
                    </Tooltip>
                ))}
            </Box>
        </Box>
    );
};

export default ApprovedUsersList;
