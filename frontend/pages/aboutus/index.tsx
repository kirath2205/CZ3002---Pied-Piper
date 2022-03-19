import Layout from '@/components/shared/Layout';
import StyleLink from '@/components/shared/StyledLink';
import styles from '@/styles/aboutus.module.css';

import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import { Typography, Grid, Box, Stack, Button } from '@mui/material';
import Head from 'next/head';
import { blue, grey } from '@mui/material/colors';
import UnstyledLink from '@/components/shared/UnstyledLink';



const h3Styles = {
    fontWeight: 500

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



const GoWithUs = {
    background: blue[300],
    textAlign: 'center',
    color: 'white',
    paddingTop: 10,
    paddingBottom: 10,

}



export default function aboutus() {
    return (
        <>
            <Head>
                <title>About us</title>
            </Head>

            <Layout>

                <Stack gap={10}>


                    <Box className={styles.imageContainer}>
                        <Box sx={{ color: '#fff' }} className={styles.containerInfo}>
                        </Box>
                    </Box>

                </Stack>

                <Stack marginTop={'2%'} paddingX={'5%'} sx={{ textAlign: 'center' }} gap={10}>

                    <Box sx={{ width: '100%' }}>

                        <Typography variant='body1'>

                        </Typography>
                        <Typography variant='h2' style={{ fontWeight: 500 }}>VolunteerGoWhere</Typography>
                        <Typography variant='h4' style={h3Styles} marginTop={3}>

                            Volunteering is  made easy, meaningful and safe with just a click of a button.
                            <br></br>

                        </Typography>

                        <Typography variant='h4' style={h4Styles} marginTop={3}>


                            Together, let's rise by rising others!

                        </Typography>



                        <Typography variant='body1' style={category2Styles} marginTop={6}>

                            VolunteerGoWhere is an All In One Web Application for Volunteers and Volunteer Organisation to register their interests and activities.
                            <br></br>
                            Allowing both parties to interact with one another and helping one another to fulfill their solicitation.

                            <br></br>
                            <br></br>
                            The aim of VGW is to raise awareness about voluntary work and have a special focus on local voluntary work by having their volunteering campaigns registered on our platform.

                        </Typography>

                    </Box>







                </Stack>

                <Stack marginTop={'2%'}>
                    <Box>
                        <Box className={styles.containerInfo} sx={GoWithUs}>
                            <Typography variant='h2' >Why Go with us
                            </Typography>

                            <Typography variant='body1' style={categoryStyles} marginTop={5}>
                                1) Safe and Secure
                            </Typography>

                            <Typography variant='h5' marginTop={1}>
                                We take your online security seriously, so that you have a peace of mind.
                                <br></br>
                                Your information is kept safe and secure by using a top-of-the-line ISO27001 security certified data centre, and we are always reviewing our safety measurements
                            </Typography>

                            <Typography variant='body1' style={categoryStyles} marginTop={5}>
                                2) Trusted by many
                            </Typography>

                            <Typography variant='h5' marginTop={1}>
                                VolunteerGoWhere is backed the Government and many Organisations such as  Ministry of Culture, Community & Youth and Make-A-Wish Foundation
                                <br></br>
                                You can be sure that the Campaigns are all backed by registered non-profit Organisation
                            </Typography>

                            <Typography variant='body1' style={categoryStyles} marginTop={5}>
                                3) 100% committed to doing good, no hidden fees or charges
                            </Typography>

                            <Typography variant='h5' marginTop={1}>
                                We provide VolunteerGoWhere as our service to the community, and don't charge a single service fee. No hidden fees as well
                                <br></br>
                                That means, it is 100% free of charge!
                            </Typography>





                        </Box>




                    </Box>




                </Stack>

                <Stack marginTop={'5%'} paddingX={'5%'} sx={{ textAlign: 'center' }} gap={10}>
                    <Typography variant='h3' style={{ fontWeight: 500 }} >How it works</Typography>


                    <Grid container spacing={1}>
                        <Grid item xs={4}>
                            <PermIdentityIcon style={{ fontSize: 100 }}></PermIdentityIcon>
                            <Typography variant='h4' style={{ fontWeight: 500 }} >Volunteers</Typography>
                            <Typography variant='h5' marginTop={1}>
                                We make it safe, easy, and fun for
                                <br></br>anyone to register a volunteering campaign!
                                <br></br>
                                We’re your go-to <StyleLink href="/campaigns">place!</StyleLink>
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <CorporateFareIcon style={{ fontSize: 100 }}> </CorporateFareIcon>

                            <Typography variant='h4' style={{ fontWeight: 500 }} >Organisations</Typography>

                            <Typography variant='h5' marginTop={1}>
                                Are you a registered Organisation?
                                <br></br>
                                With us, you can manage and engage all your volunteers
                                <br></br>
                                and campaigns in the same place!
                                <br></br>

                            </Typography>



                        </Grid>
                        <Grid item xs={4}>
                            <GroupsOutlinedIcon style={{ fontSize: 100 }}></GroupsOutlinedIcon>
                            <Typography variant='h4' style={{ fontWeight: 500 }} >Groups</Typography>
                            <Typography variant='h5' marginTop={1}>
                                Volunteering is more fun when it’s multiplied,
                                <br></br>
                                so this is your chance to get your network involved!
                                <br></br>
                                If you’re a little shy, we got your back!
                                <br></br>
                                Your profile and participating activities are private!

                            </Typography>
                        </Grid>

                    </Grid>



                    

                </Stack>


                <Stack marginTop={'8%'} paddingX={'5%'} sx={{ textAlign: 'center' }} gap={10}>
                    <Typography variant='h3' style={{ fontWeight: 500 }} >Before you move on!</Typography>

                    <Typography variant='h4' marginTop={1}>
                    Remember, you choose who to support, how to support them,<br></br> and when inspiration strikes, we’re the platform to kick off your giving dreams and projects!

                    <br></br>
                    <UnstyledLink href='/auth/signup'>
                    <Button
                        sx={{ marginY: 10, width: '10%', backgroundColor: '#12CDD4', padding:2, fontSize:24}}
                        color='primary'
                        variant='contained'
                    >
                        Sign up now!
                    </Button>
                </UnstyledLink>
                    </Typography>

                </Stack>
             
                






            </Layout>
        </>
    );
}



