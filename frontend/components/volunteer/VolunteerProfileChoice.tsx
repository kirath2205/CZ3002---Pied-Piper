//mui
import { Container, Stack, Button, Box, Tab, Tabs } from '@mui/material';
import ManIcon from '@mui/icons-material/Man';
import BusinessIcon from '@mui/icons-material/Business';
import Avatar from '@mui/material/Avatar';
//lib
import React from 'react';
//components
import VolunteerProfileInfo from '@/components/volunteer/VolunteerProfileInfo';
import VolunteerPendingApplication from '@/components/volunteer/VolunteerPendingApplication';
import VolunteerApplicationHistory from '@/components/volunteer/VolunteerApplicationHistory';
import useLoadUserProfile from '@/components/volunteer/useLoadUserProfile';
//type
import { UserProfile } from '@/interfaces/User';
type ProfileType = 'PROFILE' | 'PENDING' | 'HISTORY';

/**
 * Renders the profile choice component
 *
 * @returns {JSX.Element} - The profile choice
 */
const UserProfileChoice = (): JSX.Element => {
    const [tab, setTab] = React.useState<ProfileType>('PROFILE');
    const { profile, pendingApps, campaignsHistory, unregisterForCampaign, loading } = useLoadUserProfile(tab);
    const changeTab = (event: React.SyntheticEvent, newTab: ProfileType) => {
        setTab(newTab);
    };

    return (
        <Container>
            <Avatar sx={{ mx: 'auto', width: 150, height: 150, mt: 2 }} alt='Remy Sharp' />
            <Box
                display='flex'
                justifyContent='center'
                sx={{ width: '100%', backgroundColor: 'background.paper', mt: 1 }}
            >
                <Tabs value={tab} onChange={changeTab} variant='scrollable' allowScrollButtonsMobile>
                    <Tab label='Profile Info' value='PROFILE' />
                    <Tab label='Pending Application' value='PENDING' />
                    <Tab label='Campaign History' value='HISTORY' />
                </Tabs>
            </Box>
            {tab === 'PROFILE' && !loading && profile && <VolunteerProfileInfo profile={profile as UserProfile} />}
            {tab === 'PENDING' && pendingApps && (
                <VolunteerPendingApplication pendingList={pendingApps} unregisterForCampaign={unregisterForCampaign} />
            )}
            {tab === 'HISTORY' && campaignsHistory && <VolunteerApplicationHistory history={campaignsHistory} />}
        </Container>
    );
};

export default UserProfileChoice;
