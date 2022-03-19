import * as React from 'react';
import { Box, Typography, Container, Link } from '@mui/material';

function Copyright() {
    return (
        <>
            <Typography
                variant='body2'
                color='text.secondary'
                sx={{ fontWeight: 500, fontSize: '2.5vmin', color: '#fff', textAlign: 'center' }}
            >
                Copyright ©
                <Link color='#fff' href='https://mui.com/'>
                    VolunteerGoWhere.sg
                </Link>{' '}
                {new Date().getFullYear()}
            </Typography>

            <Typography
                variant='body2'
                color='text.secondary'
                sx={{ fontWeight: 500, fontSize: '2.5vmin', color: '#fff', textAlign: 'center' }}
            >
                <Link color='#fff' href='https://mui.com/'>
                    Terms and Conditions
                </Link>
                <Link color='#fff' href='https://mui.com/'>
                    Privacy Policy
                </Link>
            </Typography>
        </>
    );
}

export default function Footer() {
    return (
        <Box
            component='footer'
            sx={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                height: '8vmin',
                backgroundColor: '#78b9c4',
                color: '#fff',
            }}
        >
            <Container maxWidth='sm'>
                <Copyright />
            </Container>
        </Box>
    );
}
