import React from 'react';
import { Box, LinearProgress } from '@mui/material';

const ProgressBar = () => {
    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgress color='primary' />
        </Box>
    );
};

export default ProgressBar;
