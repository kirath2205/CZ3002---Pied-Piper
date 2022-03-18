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



export default function FAQ() {
    return (
        <>
            <Head>
                <title>FAQ</title>

                
            </Head>

            <Layout>

            <Stack marginTop={5} marginX={40}  sx={{ }} gap={10}>
            <Box>
                <Typography variant='h2' style={{fontWeight:500}}>Frequently Asked Questions:</Typography>
                <Typography variant='body1' style={h2Styles} marginTop={6}>
                
                    If you still can't find the answer, feel free to <StyleLink href='/contactus'>contact us</StyleLink>. We'd be more than happy to help! 
                    <br></br>

                    </Typography>

                

                <Typography variant='body1' style={category2Styles} marginTop={6}>
                    About VolunteerGoWhere:
                    <ul style={ulStyles}>
                        <li><StyleLink href="#vgw1">What is VolunteerGoWhere?</StyleLink></li>
                        <li><StyleLink href="#vgw2">Do I need to create an account to register for a campaign?</StyleLink></li>
                        <li><StyleLink href="#vgw3">Are there any hidden fees being charged when using VolunteerGoWhere?</StyleLink></li>
                        <li><StyleLink href="#vgw4">What are the supported browsers for VolunteerGoWhere?</StyleLink></li>
                        <li><StyleLink href="#vgw5">Are my Information on VolunteerGoWhere safe and secure?</StyleLink></li>
                    </ul>
                </Typography>
                
            </Box>

            <Box>
            <Typography variant='body1' style={category2Styles} marginTop={0}>
                    For Volunteers:
                    <ul style={ulStyles}>
                        <li><StyleLink href="#v1">I’m not 13 years old yet! Can I still volunteer?</StyleLink></li>
                        <li><StyleLink href="#v2">Can I withdraw my application to be a volunteer?</StyleLink></li>
                        <li><StyleLink href="#v3">Can I obtain proof of attendance or certification for my volunteer hours?</StyleLink></li>
                        <li><StyleLink href="#v4">My Account got banned. What do I do?</StyleLink></li>
                        <li><StyleLink href="#v5">I forgot my account password. What do I do?</StyleLink></li>
                    </ul>
                </Typography>
            </Box>
            <Box>


            <Box>
            <Typography variant='body1' style={category2Styles} marginTop={0}>
                    For Organisations:
                    <ul style={ulStyles}>
                        <li><StyleLink href="#o1">Who can join as an organisation or group?</StyleLink></li>
                        <li><StyleLink href="#o2">How do I create a campaign</StyleLink></li>
                        <li><StyleLink href="#o3">How do I approve/reject the volunteers</StyleLink></li>
                        <li><StyleLink href="#o4">Am I able to create a campaign after I have registered an account?</StyleLink></li>
                        <li><StyleLink href="#o5">How do I close my campaign early</StyleLink></li>
                    </ul>
                </Typography>
            </Box>
    
                
            <Typography variant='body1' style={category2Styles} marginTop={13}>
                    About VolunteerGoWhere:
                </Typography>
                <Typography variant='body1' style={categoryStyles} marginTop={5}>
                Q: What is VolunteerGoWhere?
                </Typography>

                <Typography variant='body1' style={questionStyle} marginTop={1} id="vgw1">
                    Phasellus ut ante sit amet arcu tempus consequat scelerisque ac sem. Etiam faucibus maximus erat at fringilla. Cras at odio eu neque aliquet posuere ac nec velit. Etiam dictum maximus nisl, condimentum efficitur turpis. Nunc volutpat efficitur risus, et cursus ipsum iaculis eget.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget neque eget velit tristique gravida ut non diam. Cras euismod mi tellus, non tristique nibh tincidunt a.
                </Typography>

                <Typography variant='body1' style={categoryStyles} marginTop={5}>
                Q: Do I need to create an account to register for a campaign?
                </Typography>

                <Typography variant='body1' style={questionStyle} marginTop={1} id="vgw2">
                    Phasellus ut ante sit amet arcu tempus consequat scelerisque ac sem. Etiam faucibus maximus erat at fringilla. Cras at odio eu neque aliquet posuere ac nec velit. Etiam dictum maximus nisl, condimentum efficitur turpis. Nunc volutpat efficitur risus, et cursus ipsum iaculis eget.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget neque eget velit tristique gravida ut non diam. Cras euismod mi tellus, non tristique nibh tincidunt a.
                </Typography>

                <Typography variant='body1' style={categoryStyles} marginTop={5}>
                Q: Are there any hidden fees being charged when using VolunteerGoWhere?
                </Typography>

                <Typography variant='body1' style={questionStyle} marginTop={1} id="vgw3">
                    Phasellus ut ante sit amet arcu tempus consequat scelerisque ac sem. Etiam faucibus maximus erat at fringilla. Cras at odio eu neque aliquet posuere ac nec velit. Etiam dictum maximus nisl, condimentum efficitur turpis. Nunc volutpat efficitur risus, et cursus ipsum iaculis eget.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget neque eget velit tristique gravida ut non diam. Cras euismod mi tellus, non tristique nibh tincidunt a.
                </Typography>

                <Typography variant='body1' style={categoryStyles} marginTop={5}>
                Q: What are the supported browsers for VolunteerGoWhere?
                </Typography>

                <Typography variant='body1' style={questionStyle} marginTop={1} id="vgw4">
                    lla. Cras at odio eu neque aliquet posuere ac nec velit. Etiam dictum maximus nisl, condimentum efficitur turpis. Nunc volutpat efficitur risus, et cursus ipsum iaculis eget.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget neque eget velit tristique gravida ut non diam. Cras euismod mi tellus, non tristique nibh tincidunt a.
                </Typography>


                <Typography variant='body1' style={categoryStyles} marginTop={5}>
                Q: Are my Information on VolunteerGoWhere safe and secure?
                </Typography>

                <Typography variant='body1' style={questionStyle} marginTop={1} id="vgw5">
                    Phasellus ut ante sit amet arcu tempus consequat scelerisque ac sem. Etiam faucibus maximus erat at fringilla. Cras at odio eu neque aliquet posuere ac nec velit. Etiam dictum maximus nisl, condimentum efficitur turpis. Nunc volutpat efficitur risus, et cursus ipsum iaculis eget.
                    Lgravida ut non diam. Cras euis
                </Typography>



            </Box>




            <Box>
                
            <Typography variant='body1' style={category2Styles} marginTop={4}>
                    For Volunteers:
                </Typography>
                <Typography variant='body1' style={categoryStyles} marginTop={5}>
                Q: I’m not 13 years old yet! Can I still volunteer?
                </Typography>

                <Typography variant='body1' style={questionStyle} marginTop={1} id="v1">
                    Phasellus ut ante sit amet arcu tempus consequat scelerisque ac sem. Etiam faucibus maximus erat at fringilla. Cras at odio eu neque aliquet posuere ac nec velit. Etiam dictum maximus nisl, condimentum efficitur turpis. Nunc volutpat efficitur risus, et cursus ipsum iaculis eget.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget neque eget velit tristique gravida ut non diam. Cras euismod mi tellus, non tristique nibh tincidunt a.
                </Typography>

                <Typography variant='body1' style={categoryStyles} marginTop={5}>
                Q: Can I withdraw my application to be a volunteer?
                </Typography>

                <Typography variant='body1' style={questionStyle} marginTop={1} id="v2">
                    Phasellus ut ante sit amet arcu tempus consequat scelerisque ac sem. Etiam faucibus maximus erat at fringilla. Cras at odio eu neque aliquet posuere ac nec velit. Etiam dictum maximus nisl, condimentum efficitur turpis. Nunc volutpat efficitur risus, et cursus ipsum iaculis eget.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget neque eget velit tristique gravida ut non diam. Cras euismod mi tellus, non tristique nibh tincidunt a.
                </Typography>

                <Typography variant='body1' style={categoryStyles} marginTop={5}>
                Q: Can I obtain proof of attendance or certification for my volunteer hours?
                </Typography>

                <Typography variant='body1' style={questionStyle} marginTop={1} id="v3">
                    Phasellus ut ante sit amet arcu tempus consequat scelerisque ac sem. Etiam faucibus maximus erat at fringilla. Cras at odio eu neque aliquet posuere ac nec velit. Etiam dictum maximus nisl, condimentum efficitur turpis. Nunc volutpat efficitur risus, et cursus ipsum iaculis eget.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget neque eget velit tristique gravida ut non diam. Cras euismod mi tellus, non tristique nibh tincidunt a.
                </Typography>

                <Typography variant='body1' style={categoryStyles} marginTop={5}>
                Q: My Account got banned. What do I do?
                </Typography>

                <Typography variant='body1' style={questionStyle} marginTop={1} id="v4">
                    lla. Cras at odio eu neque aliquet posuere ac nec velit. Etiam dictum maximus nisl, condimentum efficitur turpis. Nunc volutpat efficitur risus, et cursus ipsum iaculis eget.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget neque eget velit tristique gravida ut non diam. Cras euismod mi tellus, non tristique nibh tincidunt a.
                </Typography>


                <Typography variant='body1' style={categoryStyles} marginTop={5}>
                Q: I forgot my account password. What do I do?
                </Typography>

                <Typography variant='body1' style={questionStyle} marginTop={1} id="v5">
                    Phasellus ut ante sit amet arcu tempus consequat scelerisque ac sem. Etiam faucibus maximus erat at fringilla. Cras at odio eu neque aliquet posuere ac nec velit. Etiam dictum maximus nisl, condimentum efficitur turpis. Nunc volutpat efficitur risus, et cursus ipsum iaculis eget.
                    Lgravida ut non diam. Cras euis
                </Typography>
            </Box>


            <Box>
                
                <Typography variant='body1' style={category2Styles} marginTop={4}>
                        For Organisations:
                    </Typography>
                    <Typography variant='body1' style={categoryStyles} marginTop={5}>
                    Q: Who can join as an organisation or group?
                    </Typography>
    
                    <Typography variant='body1' style={questionStyle} marginTop={1} id="v1">
                        Phasellus ut ante sit amet arcu tempus consequat scelerisque ac sem. Etiam faucibus maximus erat at fringilla. Cras at odio eu neque aliquet posuere ac nec velit. Etiam dictum maximus nisl, condimentum efficitur turpis. Nunc volutpat efficitur risus, et cursus ipsum iaculis eget.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget neque eget velit tristique gravida ut non diam. Cras euismod mi tellus, non tristique nibh tincidunt a.
                    </Typography>
    
                    <Typography variant='body1' style={categoryStyles} marginTop={5}>
                    Q: How do I create a campaign
                    </Typography>
    
                    <Typography variant='body1' style={questionStyle} marginTop={1} id="v2">
                        Phasellus ut ante sit amet arcu tempus consequat scelerisque ac sem. Etiam faucibus maximus erat at fringilla. Cras at odio eu neque aliquet posuere ac nec velit. Etiam dictum maximus nisl, condimentum efficitur turpis. Nunc volutpat efficitur risus, et cursus ipsum iaculis eget.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget neque eget velit tristique gravida ut non diam. Cras euismod mi tellus, non tristique nibh tincidunt a.
                    </Typography>
    
                    <Typography variant='body1' style={categoryStyles} marginTop={5}>
                    Q: How do I approve/reject the volunteers
                    </Typography>
    
                    <Typography variant='body1' style={questionStyle} marginTop={1} id="v3">
                        Phasellus ut ante sit amet arcu tempus consequat scelerisque ac sem. Etiam faucibus maximus erat at fringilla. Cras at odio eu neque aliquet posuere ac nec velit. Etiam dictum maximus nisl, condimentum efficitur turpis. Nunc volutpat efficitur risus, et cursus ipsum iaculis eget.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget neque eget velit tristique gravida ut non diam. Cras euismod mi tellus, non tristique nibh tincidunt a.
                    </Typography>
    
                    <Typography variant='body1' style={categoryStyles} marginTop={5}>
                    Q: Am I able to create a campaign after I have registered an account?
                    </Typography>
    
                    <Typography variant='body1' style={questionStyle} marginTop={1} id="v4">
                        lla. Cras at odio eu neque aliquet posuere ac nec velit. Etiam dictum maximus nisl, condimentum efficitur turpis. Nunc volutpat efficitur risus, et cursus ipsum iaculis eget.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget neque eget velit tristique gravida ut non diam. Cras euismod mi tellus, non tristique nibh tincidunt a.
                    </Typography>
    
    
                    <Typography variant='body1' style={categoryStyles} marginTop={5}>
                    Q: How do I close my campaign early
                    </Typography>
    
                    <Typography variant='body1' style={questionStyle} marginTop={1} marginBottom={10}id="v5">
                        Phasellus ut ante sit amet arcu tempus consequat scelerisque ac sem. Etiam faucibus maximus erat at fringilla. Cras at odio eu neque aliquet posuere ac nec velit. Etiam dictum maximus nisl, condimentum efficitur turpis. Nunc volutpat efficitur risus, et cursus ipsum iaculis eget.
                        Lgravida ut non diam. Cras euis
                    </Typography>
                </Box>




        </Stack>

            
                    
                
                
            </Layout>
        </>
    );
}

