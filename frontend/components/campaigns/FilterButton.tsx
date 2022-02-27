import { Button, Typography } from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import React from 'react';

const FilterButton = () => {
    return (
        <Button size='small' variant='contained' sx={{ backgroundColor: '#12CDD4', color: '#fff', width: '20%', alignSelf: 'center', marginTop: 2 }}>
            <FilterAltOutlinedIcon />
            <Typography variant='button'>Filter</Typography>
        </Button>
    );
};

export default FilterButton;
