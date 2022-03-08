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
                <Typography variant='h4'>Be a volunteer Today</Typography>
                <Typography variant='subtitle1'>We rise by lifting others</Typography>
                <UnstyledLink>
                    <Button sx={{ marginTop: 2, width: '100%', backgroundColor: '#12CDD4' }} color='primary' variant='contained' fullWidth>
                        About us
                    </Button>
                </UnstyledLink>
                <UnstyledLink href={loggedIn ? '/campaigns' : '/auth/signup'}>
                    <Button sx={{ marginTop: 2, width: '100%', backgroundColor: '#12CDD4' }} color='primary' variant='contained' fullWidth>
                        {loggedIn ? 'Browse Campaigns' : 'Sign Up'}
                    </Button>
                </UnstyledLink>
            </Box>
        </Box>
    );
};

export default Hero;
