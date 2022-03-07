import { Stack } from '@mui/material';
import React from 'react';
import Hero from '@/components/home/Hero';
import Accolades from '@/components/home/Accolades';

/**
 * The home component
 *
 * @returns {JSX.Element} - The home component
 */
const Home = (): JSX.Element => {
    return (
        <Stack marginBottom={2}>
            <Hero />
            <Accolades />
        </Stack>
    );
};

export default Home;
