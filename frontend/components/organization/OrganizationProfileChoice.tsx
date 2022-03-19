//mui
import { Container, Stack, Button, Box, Tab, Tabs } from '@mui/material';
import ManIcon from '@mui/icons-material/Man';
import BusinessIcon from '@mui/icons-material/Business';
import Avatar from '@mui/material/Avatar';
//lib
import React from 'react';
//components
import ApproveApplication from '@/components/organization/OrganizationApproveApplication';
import OrganizationProfileInfo from '@/components/organization/OrganizationProfileInfo';
import OrganizationExistingCampaign from '@/components/organization/OrganizationExistingCampaign';

type ProfileType = 'PROFILE' | 'APPROVE' | 'EDIT';
/**
 * Renders the signup choice component
 *
 * @returns {JSX.Element} - The sign up choice
 */
const ProfileChoice = (): JSX.Element => {
    const [value, setValue] = React.useState<ProfileType>('PROFILE');

    const handleChange = (event: React.SyntheticEvent, newValue: ProfileType) => {
        setValue(newValue);
    };
    return (
        <Container>
            <Avatar sx={{ mx: 'auto', width: 150, height: 150, mt: 2 }} alt='Remy Sharp' />
            <Box sx={{ textAlign: 'center', mt: 2 }}>NTU</Box>
            <Box display='flex' justifyContent='center' sx={{ width: '100%', bgcolor: 'background.paper', mt: 1 }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant='scrollable'
                    centered={true}
                    allowScrollButtonsMobile
                >
                    <Tab label='Profile Info' value='PROFILE' />
                    <Tab label='Approve Application' value='APPROVE' />
                    <Tab label='Edit/Delete Existing Campaign' value='EDIT' />
                </Tabs>
            </Box>
            {value === 'PROFILE' && <OrganizationProfileInfo />}
            {value === 'APPROVE' && <ApproveApplication />}
            {value === 'EDIT' && <OrganizationExistingCampaign />}
        </Container>
    );
};

export default ProfileChoice;
