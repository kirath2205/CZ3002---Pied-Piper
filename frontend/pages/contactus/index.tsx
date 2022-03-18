import Layout from '@/components/shared/Layout';
import StyleLink from '@/components/shared/StyledLink';
import { FontDownload, Home } from '@mui/icons-material';
import { Container, Typography, Button, Grid, Box, Stack } from '@mui/material';
import Head from 'next/head';
import { color, fontSize } from '@mui/system';
import { blue, red } from '@mui/material/colors';
import { CSSProperties } from 'react';

const ulStyles ={
    fontSize:24
}

const h2Styles={
    fontSize:24,

}

const categoryStyles={
    fontSize:24,
    fontWeight:500,
    textDecoration:'underline'
}

const category2Styles={
    fontSize:24,
    fontWeight:500,

}


const questionStyle={
    fontSize:24,
    Color:blue[100],
    fontWeight:300
}



export default function contactus() {
    return (
        <>
            <Layout>

            <Stack marginTop={5} marginX={10}  style={{paddingBottom:'30%'}}>
            <Box style={{height:'100%'}}>
                <Typography variant='h3' style={{fontWeight:500}}>Hello.</Typography>
                <Typography variant='body1' style={h2Styles} marginTop={3}>
                
                 Got a cool idea or feedback on how we can improve or maybe just to say hi to us? 
                    <br></br>
                We'd love to hear from you!
                <br></br>
                Please drop us an email at <StyleLink href='mailto:yolo@gmail.com'>VolunteerGoWhere@hotmail.sg</StyleLink>
                <br></br>
                <br></br>
                "No act of kindness, no matter how small is ever wasted"
                <br></br>
                -AESOP
                    </Typography>

                
            </Box>

        </Stack>                
            </Layout>
        </>
    );
}

