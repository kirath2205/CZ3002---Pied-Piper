//mui
import { Container, Stack, Button, Box, Tab, Tabs, Skeleton } from '@mui/material';
import ManIcon from '@mui/icons-material/Man';
import BusinessIcon from '@mui/icons-material/Business';
import Avatar from '@mui/material/Avatar';
//lib
import React, { useState } from 'react';
//components
import ApproveApplication from '@/components/organization/OrganizationApproveApplication';
import OrganizationProfileInfo from '@/components/organization/OrganizationProfileInfo';
import OrganizationExistingCampaign from '@/components/organization/OrganizationExistingCampaign';
import useLoadOrgProfile from '@/components/organization/useLoadOrgProfile';

//types
import { OrganizationNotification, OrganizationProfile } from '@/interfaces/Organization';
import { Campaign } from '@/interfaces/Campaign';
type ProfileType = 'PROFILE' | 'APPROVE' | 'EDIT';

/**
 * Renders the Organization profile choice
 *
 * @returns {JSX.Element} - The Organization profile choice
 */
const ProfileChoice = (): JSX.Element => {
    const [tab, setTab] = React.useState<ProfileType>('PROFILE');
    const { profile, notifications, campaigns, loading, approveApplication } = useLoadOrgProfile(tab);

    const changeTab = (event: React.SyntheticEvent, newTab: ProfileType) => {
        setTab(newTab);
    };
    return (
        <Container>
            <Avatar sx={{ mx: 'auto', width: 150, height: 150, mt: 2 }} alt='Remy Sharp' />
            <Box sx={{ textAlign: 'center', mt: 2 }}>NTU</Box>
            <Box display='flex' justifyContent='center' sx={{ width: '100%', bgcolor: 'background.paper', mt: 1 }}>
                <Tabs value={tab} onChange={changeTab} variant='scrollable' allowScrollButtonsMobile>
                    <Tab label='Profile Info' value='PROFILE' />
                    <Tab label='Approve Application' value='APPROVE' />
                    <Tab label='Edit/Delete Existing Campaign' value='EDIT' />
                </Tabs>
            </Box>
            {tab === 'PROFILE' && profile && <OrganizationProfileInfo profile={profile as OrganizationProfile} />}
            {tab === 'APPROVE' && (
                <ApproveApplication
                    notificationList={notifications as OrganizationNotification[]}
                    approveApplication={approveApplication}
                />
            )}
            {tab === 'EDIT' && <OrganizationExistingCampaign campaigns={campaigns as Campaign[]} />}
        </Container>
    );
};

export default ProfileChoice;
