import { Stack } from '@mui/material';
import React from 'react';
import Content from '@/components/aboutus/Content';
import Banner from '@/components/aboutus/Banner';

/**
 * The home component
 *
 * @returns {JSX.Element} - The home component
 */
const Aboutus = (): JSX.Element => {
    return (
        <Stack marginBottom={2}>
            <Banner />
            <Content />
        </Stack>
    );
};

export default Aboutus;
