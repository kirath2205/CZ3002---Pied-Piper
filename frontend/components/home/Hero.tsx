import { Box, Typography, Button } from '@mui/material';
import styles from '@/styles/home.module.css';

import React from 'react';
import UnstyledLink from '@/components/shared/UnstyledLink';

import { useAppSelector } from '@/app/hooks';
import { selectLoggedIn } from '@/app/slices/authSlice';

/**
 * The hero section for home page
 *
 * @returns {JSX.Element} - The hero section for home page
 */
const Hero = () => {
    const loggedIn = useAppSelector(selectLoggedIn);
    return (
        <Box className={styles.imageContainer}>
            <Box sx={{ color: '#fff' }} className={styles.containerInfo}>
                <Typography variant='h2' style={{ fontSize: '6vmin' }}>
                    Be a volunteer today!
                </Typography>
                <Typography variant='h4' style={{ fontSize: '3vmin' }}>
                    We rise by lifting others
                </Typography>
                <UnstyledLink href='/aboutus'>
                    <Button
                        sx={{ marginY: 3, width: '55%', backgroundColor: '#12CDD4', padding: 2, fontSize: '2.5vmin' }}
                        color='primary'
                        variant='contained'
                        fullWidth
                    >
                        About us
                    </Button>
                </UnstyledLink>
                <UnstyledLink href={loggedIn ? '/campaigns' : '/auth/signup'}>
                    <Button
                        sx={{ marginY: 0, width: '55%', backgroundColor: '#12CDD4', padding: 2, fontSize: '2.5vmin' }}
                        color='primary'
                        variant='contained'
                        fullWidth
                    >
                        {loggedIn ? 'Browse Campaigns' : 'Sign Up'}
                    </Button>
                </UnstyledLink>
            </Box>
        </Box>
    );
};

export default Hero;
