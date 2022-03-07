//mui
import { Container, Stack, Button, Box } from '@mui/material';
//lib
import React from 'react';
import Router from 'next/router';
import Image from 'next/image';

/**
 * Renders the signup choice component
 *
 * @returns {JSX.Element} - The sign up choice
 */
const SignUpChoice = (): JSX.Element => {
    return (
        <Container>
            <Stack mt={4} gap={2} alignItems='center'>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.2 }}>
                    <Image src='/hands-raised.png' width={250} height={250} />
                    <Button variant='text' onClick={() => Router.push('/auth/signup/volunteer')}>
                        Register as Volunteer
                    </Button>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.2 }}>
                    <Image src='/home-heart.png' width={250} height={250} />
                    <Button variant='text' onClick={() => Router.push('/auth/signup/organization')}>
                        Register as Organization
                    </Button>
                </Box>
            </Stack>
        </Container>
    );
};

export default SignUpChoice;
