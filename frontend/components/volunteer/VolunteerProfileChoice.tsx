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

type ProfileType = 'PROFILE' | 'PENDING' | 'HISTORY';
/**
 * Renders the profile choice component
 *
 * @returns {JSX.Element} - The profile choice
 */
const UserProfileChoice = (): JSX.Element => {

    const [value, setValue] = React.useState<ProfileType>('PROFILE');

    const handleChange = (event: React.SyntheticEvent, newValue: ProfileType) => {
        setValue(newValue);
    };
    
    return (
        <Container>
            <Avatar sx={{ mx: 'auto', width: 150, height: 150, mt: 2 }} alt='Remy Sharp' />
            <Box sx={{ textAlign: 'center', mt: 2 }}>NAME</Box>
            <Box display='flex' justifyContent='center' sx={{ width: '100%', backgroundColor: 'background.paper', mt: 1 }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant='scrollable'
                    centered={true}
                    allowScrollButtonsMobile
                >
                    <Tab label='Profile Info' value='PROFILE' />
                    <Tab label='Pending Application' value='PENDING' />
                    <Tab label='Campaign History' value='HISTORY' />
                </Tabs>
            </Box>
            {value === 'PROFILE' && <VolunteerProfileInfo />}
            {value === 'PENDING' && <VolunteerPendingApplication />}
            {value === 'HISTORY' && <VolunteerApplicationHistory />}
        </Container>
    );
};

export default UserProfileChoice;
