import { Box, Typography, Button } from '@mui/material';
import styles from '@/styles/aboutus.module.css';

import React from 'react';

/**
 * The hero section for home page
 *
 * @returns {JSX.Element} - The hero section for home page
 */
const Banner = () => {
    return (
        <Box className={styles.imageContainer}>
            <Box sx={{ color: '#fff' }} className={styles.containerInfo}></Box>
        </Box>
    );
};

export default Banner;
