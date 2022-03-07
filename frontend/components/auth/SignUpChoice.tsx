//mui
import { Container, Stack, Button, Box, Tab, Tabs } from '@mui/material';
import ManIcon from '@mui/icons-material/Man';
import BusinessIcon from '@mui/icons-material/Business';
//lib
import React from 'react';
import Router from 'next/router';
import Image from 'next/image';
//components
import VolunteerSignUpForm from '@/components/auth/VolunteerSignUpForm';
import OrganizationSignUpForm from '@/components/auth/OrganizationSignUpForm';

type AccountType = 'VOLUNTEER' | 'ORGANIZATION';
/**
 * Renders the signup choice component
 *
 * @returns {JSX.Element} - The sign up choice
 */
const SignUpChoice = (): JSX.Element => {
    const [value, setValue] = React.useState<AccountType>('VOLUNTEER');

    const handleChange = (event: React.SyntheticEvent, newValue: AccountType) => {
        setValue(newValue);
    };
    return (
        <Container>
            <Box sx={{ width: '100%', bgcolor: 'background.paper', mt: 2 }}>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab icon={<ManIcon />} label='Volunteer' value='VOLUNTEER' />
                    <Tab icon={<BusinessIcon />} label='Organization' value='ORGANIZATION' />
                </Tabs>
            </Box>
            {value === 'VOLUNTEER' && <VolunteerSignUpForm />}
            {value === 'ORGANIZATION' && <OrganizationSignUpForm />}
        </Container>
    );
};

export default SignUpChoice;
