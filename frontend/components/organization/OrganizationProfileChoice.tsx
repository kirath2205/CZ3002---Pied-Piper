//mui
import { Container, Stack, Button, Box, Tab, Tabs } from '@mui/material';
import ManIcon from '@mui/icons-material/Man';
import BusinessIcon from '@mui/icons-material/Business';
import Avatar from '@mui/material/Avatar';
//lib
import React, { useState } from 'react';
//components
import ApproveApplication from '@/components/organization/OrganizationApproveApplication';
import OrganizationProfileInfo from '@/components/organization/OrganizationProfileInfo';
import OrganizationExistingCampaign from '@/components/organization/OrganizationExistingCampaign';
import useLoadProfile from '@/components/shared/hooks/useLoadProfile';
//types
import { OrganizationProfile } from '@/interfaces/Organization';

type ProfileType = 'PROFILE' | 'APPROVE' | 'EDIT';
/**
 * Renders the signup choice component
 *
 * @returns {JSX.Element} - The sign up choice
 */
const ProfileChoice = (): JSX.Element => {
    const [tab, setTab] = React.useState<ProfileType>('PROFILE');
    const { profile, loading } = useLoadProfile('ORG');

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
            {tab === 'PROFILE' && !loading && profile && (
                <OrganizationProfileInfo profile={profile as OrganizationProfile} />
            )}
            {tab === 'APPROVE' && <ApproveApplication />}
            {tab === 'EDIT' && <OrganizationExistingCampaign />}
        </Container>
    );
};

export default ProfileChoice;
