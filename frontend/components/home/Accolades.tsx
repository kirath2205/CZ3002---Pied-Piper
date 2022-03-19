import { Stack, Box, Typography, Button } from '@mui/material';
import React from 'react';
import Image from 'next/image';
import UnstyledLink from '@/components/shared/UnstyledLink';
import { grey } from '@mui/material/colors';

/**
 * The accolades section for home page
 *
 * @returns {JSX.Element} - The accolades section for home page
 */


 const h3Styles = {
    fontWeight: 200

}

const h4Styles = {
    fontWeight: 400,


}

const categoryStyles = {
    fontSize: 33,
    fontWeight: 500,
    textDecoration: 'underline'
}

const category2Styles = {
    fontSize: 24,
    color: grey[700]

}

const Accolades = (): JSX.Element => {
    return (


        




        
        <Stack marginTop={'2%'} marginX={'5%'} sx={{ textAlign: 'center' }} gap={4}>
            <Box>

                <Typography variant='h2' style={{ fontWeight: 300 }}>All in One Application</Typography>
                <Typography variant='h4' style={h3Styles} marginTop={3}>

                We want to make volunteering to be simple,fun and meaningful to you
                    <br></br>

                </Typography>

                <Typography variant='h4' style={h3Styles} marginTop={5}>
                <Image src='/handshake-icon.jpg' width={300} height={200} alt='' />
                </Typography>

                <Typography variant='h4' style={h3Styles} marginTop={3}>


                Find a volunteer activity that you&apos;re interested in, and use the skills you have right here in
                    Singapore.


                </Typography>
                <UnstyledLink href='/auth/signup'>
                    <Button
                        sx={{ marginY: 10, width: '30%', backgroundColor: '#12CDD4', padding:2, fontSize:24}}
                        color='primary'
                        variant='contained'
                    >
                        Be a volunteer
                    </Button>
                </UnstyledLink>
                

                <Box>
                <Image src='/home-heart.png' width={250} height={250} alt='' />
                <Typography variant='h4' style={h3Styles} marginTop={4}>
                <p style={{fontWeight:500, fontSize:40}}>27</p>
                
                Registered Volunteering Organisations Supported
                </Typography>
                </Box>


                <Box marginTop={10}>
                <Image src='/hands-raised.png' width={250} height={250} alt='' />
                <Typography variant='h4' style={h3Styles} marginTop={4}>
                <p style={{fontWeight:500, fontSize:40}}>130k</p>
                Successfully run campaigns
                </Typography>

            </Box>



               
            </Box>
            

            <Box marginTop={10}>
                <Image src='/hands-heart.png' width={250} height={250} alt='' />
                <Typography variant='h4' style={h3Styles} marginTop={4}>
                <p style={{fontWeight:500, fontSize:40}}>100k</p>
                Volunteer signups
                </Typography>
             </Box>


            
           
        </Stack>
    );
};

export default Accolades;
