import { Box, Typography, Button } from '@mui/material';
import styles from '@/styles/home.module.css';

import React from 'react';
import UnstyledLink from '@/components/shared/UnstyledLink';

/**
 * The hero section for home page
 *
 * @returns {JSX.Element} - The hero section for home page
 */
const Hero = () => {
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
                <UnstyledLink href='/auth/signup'>
                    <Button sx={{ marginTop: 2, width: '100%', backgroundColor: '#12CDD4' }} color='primary' variant='contained' fullWidth>
                        Sign up
                    </Button>
                </UnstyledLink>
            </Box>
        </Box>
    );
};

export default Hero;
