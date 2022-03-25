//mui
import { Stack, Box, Typography, Button } from '@mui/material';
//libs
import React from 'react';
import Image from 'next/image';
import Fade from 'react-reveal/Fade';
//components
import UnstyledLink from '@/components/shared/UnstyledLink';

/**
 * The accolades section for home page
 *
 * @returns {JSX.Element} - The accolades section for home page
 */

const h3Styles = {
    fontWeight: 200,
    fontSize: '4vmin',
};

const Accolades = (): JSX.Element => {
    return (
        <Stack marginTop={'2%'} marginX={'5%'} sx={{ textAlign: 'center' }} gap={4}>
            <Fade bottom>
                <Box>
                    <Typography variant='h2' style={{ fontWeight: 300, fontSize: '6vmin' }}>
                        All in One Application
                    </Typography>
                    <Typography variant='h4' style={h3Styles} marginTop={3}>
                        We want to make volunteering to be simple,fun and meaningful to you
                        <br></br>
                    </Typography>

                    <Typography variant='h4' style={h3Styles} marginTop={5}>
                        <Image src='/handshake-icon.jpg' width={300} height={200} alt='' />
                    </Typography>

                    <Typography variant='h4' style={h3Styles} marginTop={3}>
                        Find a volunteer activity that you&apos;re interested in, and use the skills you have right here
                        in Singapore.
                    </Typography>
                    <UnstyledLink href='/auth/signup'>
                        <Button
                            sx={{
                                marginY: 10,
                                width: '75%',
                                backgroundColor: '#12CDD4',
                                padding: 2,
                                fontSize: '2.5vmin',
                            }}
                            color='primary'
                            variant='contained'
                        >
                            Be a volunteer
                        </Button>
                    </UnstyledLink>
                </Box>
            </Fade>
            <Fade bottom>
                <Box>
                    <Image src='/home-heart.png' width={250} height={250} alt='' />
                    <Typography variant='h4' style={h3Styles} marginTop={4}>
                        <p style={{ fontWeight: 500, fontSize: 40 }}>27</p>
                        Registered Volunteering Organisations Supported
                    </Typography>
                </Box>
            </Fade>
            <Fade bottom>
                <Box marginTop={10}>
                    <Image src='/hands-raised.png' width={250} height={250} alt='' />
                    <Typography variant='h4' style={h3Styles} marginTop={4}>
                        <p style={{ fontWeight: 500, fontSize: 40 }}>130k</p>
                        Successfully run campaigns
                    </Typography>
                </Box>
            </Fade>

            <Fade bottom>
                <Box marginTop={10}>
                    <Image src='/hands-heart.png' width={250} height={250} alt='' />
                    <Typography variant='h4' style={h3Styles} marginTop={4}>
                        <p style={{ fontWeight: 500, fontSize: 40 }}>100k</p>
                        Volunteer signups
                    </Typography>
                </Box>
            </Fade>
        </Stack>
    );
};

export default Accolades;
