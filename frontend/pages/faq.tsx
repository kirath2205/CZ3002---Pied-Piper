import Layout from '@/components/shared/Layout';
import StyledLink from '@/components/shared/StyledLink';
import { Container, Typography, Box, Stack } from '@mui/material';

import { blue } from '@mui/material/colors';

const ulStyles = {
    fontSize: 24,
};

const h2Styles = {
    fontSize: 24,
};

const categoryStyles = {
    fontSize: 24,
    fontWeight: 500,
    textDecoration: 'underline',
};

const category2Styles = {
    fontSize: 24,
    fontWeight: 500,
};

const questionStyle = {
    fontSize: 24,
    Color: blue[100],
    fontWeight: 300,
};

export default function FAQ() {
    return (
        <Layout title='VolunteerGoWhere - FAQ'>
            <Container>
                <Stack gap={3}>
                    <Box>
                        <Typography variant='h4' style={{ fontWeight: 500 }} mt={2}>
                            Frequently Asked Questions:
                        </Typography>
                        <Typography variant='body1' style={h2Styles} mt={2}>
                            If you still can&apos;t find the answer, feel free to{' '}
                            <StyledLink href='/contactus'>contact us</StyledLink>. We&apos;d be more than happy to help!
                            <br></br>
                        </Typography>

                        <Box style={category2Styles} marginTop={4}>
                            About VolunteerGoWhere:
                            <ul style={ulStyles}>
                                <li>
                                    <StyledLink href='#vgw1'>What is VolunteerGoWhere?</StyledLink>
                                </li>
                                <li>
                                    <StyledLink href='#vgw2'>
                                        Do I need to create an account to register for a campaign?
                                    </StyledLink>
                                </li>
                                <li>
                                    <StyledLink href='#vgw3'>
                                        Are there any hidden fees being charged when using VolunteerGoWhere?
                                    </StyledLink>
                                </li>
                                <li>
                                    <StyledLink href='#vgw4'>
                                        What are the supported browsers for VolunteerGoWhere?
                                    </StyledLink>
                                </li>
                                <li>
                                    <StyledLink href='#vgw5'>
                                        Are my Information on VolunteerGoWhere safe and secure?
                                    </StyledLink>
                                </li>
                            </ul>
                        </Box>
                    </Box>

                    <Box>
                        <Box style={category2Styles}>
                            For Volunteers:
                            <ul style={ulStyles}>
                                <li>
                                    <StyledLink href='#v1'>
                                        I&apos;m not 13 years old yet! Can I still volunteer?
                                    </StyledLink>
                                </li>
                                <li>
                                    <StyledLink href='#v2'>Can I withdraw my application to be a volunteer?</StyledLink>
                                </li>
                                <li>
                                    <StyledLink href='#v3'>
                                        Can I obtain proof of attendance or certification for my volunteer hours?
                                    </StyledLink>
                                </li>
                                <li>
                                    <StyledLink href='#v4'>My Account got banned. What do I do?</StyledLink>
                                </li>
                                <li>
                                    <StyledLink href='#v5'>I forgot my account password. What do I do?</StyledLink>
                                </li>
                            </ul>
                        </Box>
                    </Box>
                    <Box>
                        <Box>
                            <Box style={category2Styles}>
                                For Organisations:
                                <ul style={ulStyles}>
                                    <li>
                                        <StyledLink href='#o1'>Who can join as an organisation or group?</StyledLink>
                                    </li>
                                    <li>
                                        <StyledLink href='#o2'>How do I create a campaign</StyledLink>
                                    </li>
                                    <li>
                                        <StyledLink href='#o3'>How do I approve/reject the volunteers</StyledLink>
                                    </li>
                                    <li>
                                        <StyledLink href='#o4'>
                                            Am I able to create a campaign after I have registered an account?
                                        </StyledLink>
                                    </li>
                                    <li>
                                        <StyledLink href='#o5'>How do I close my campaign early</StyledLink>
                                    </li>
                                </ul>
                            </Box>
                        </Box>
                        <hr></hr>
                        <Typography variant='body1' style={category2Styles} marginTop={8}>
                            About VolunteerGoWhere:
                        </Typography>
                        <Typography variant='body1' style={categoryStyles} marginTop={5}>
                            Q: What is VolunteerGoWhere?
                        </Typography>

                        <Typography variant='body1' style={questionStyle} marginTop={1} id='vgw1'>
                            Phasellus ut ante sit amet arcu tempus consequat scelerisque ac sem. Etiam faucibus maximus
                            erat at fringilla. Cras at odio eu neque aliquet posuere ac nec velit. Etiam dictum maximus
                            nisl, condimentum efficitur turpis. Nunc volutpat efficitur risus, et cursus ipsum iaculis
                            eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget neque eget velit
                            tristique gravida ut non diam. Cras euismod mi tellus, non tristique nibh tincidunt a.
                        </Typography>

                        <Typography variant='body1' style={categoryStyles} marginTop={5}>
                            Q: Do I need to create an account to register for a campaign?
                        </Typography>

                        <Typography variant='body1' style={questionStyle} marginTop={1} id='vgw2'>
                            Phasellus ut ante sit amet arcu tempus consequat scelerisque ac sem. Etiam faucibus maximus
                            erat at fringilla. Cras at odio eu neque aliquet posuere ac nec velit. Etiam dictum maximus
                            nisl, condimentum efficitur turpis. Nunc volutpat efficitur risus, et cursus ipsum iaculis
                            eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget neque eget velit
                            tristique gravida ut non diam. Cras euismod mi tellus, non tristique nibh tincidunt a.
                        </Typography>

                        <Typography variant='body1' style={categoryStyles} marginTop={5}>
                            Q: Are there any hidden fees being charged when using VolunteerGoWhere?
                        </Typography>

                        <Typography variant='body1' style={questionStyle} marginTop={1} id='vgw3'>
                            Phasellus ut ante sit amet arcu tempus consequat scelerisque ac sem. Etiam faucibus maximus
                            erat at fringilla. Cras at odio eu neque aliquet posuere ac nec velit. Etiam dictum maximus
                            nisl, condimentum efficitur turpis. Nunc volutpat efficitur risus, et cursus ipsum iaculis
                            eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget neque eget velit
                            tristique gravida ut non diam. Cras euismod mi tellus, non tristique nibh tincidunt a.
                        </Typography>

                        <Typography variant='body1' style={categoryStyles} marginTop={5}>
                            Q: What are the supported browsers for VolunteerGoWhere?
                        </Typography>

                        <Typography variant='body1' style={questionStyle} marginTop={1} id='vgw4'>
                            lla. Cras at odio eu neque aliquet posuere ac nec velit. Etiam dictum maximus nisl,
                            condimentum efficitur turpis. Nunc volutpat efficitur risus, et cursus ipsum iaculis eget.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget neque eget velit
                            tristique gravida ut non diam. Cras euismod mi tellus, non tristique nibh tincidunt a.
                        </Typography>

                        <Typography variant='body1' style={categoryStyles} marginTop={5}>
                            Q: Are my Information on VolunteerGoWhere safe and secure?
                        </Typography>

                        <Typography variant='body1' style={questionStyle} marginTop={1} id='vgw5'>
                            Phasellus ut ante sit amet arcu tempus consequat scelerisque ac sem. Etiam faucibus maximus
                            erat at fringilla. Cras at odio eu neque aliquet posuere ac nec velit. Etiam dictum maximus
                            nisl, condimentum efficitur turpis. Nunc volutpat efficitur risus, et cursus ipsum iaculis
                            eget. Lgravida ut non diam. Cras euis
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant='body1' style={category2Styles} marginTop={4}>
                            For Volunteers:
                        </Typography>
                        <Typography variant='body1' style={categoryStyles} marginTop={5}>
                            Q: I’m not 13 years old yet! Can I still volunteer?
                        </Typography>

                        <Typography variant='body1' style={questionStyle} marginTop={1} id='v1'>
                            Phasellus ut ante sit amet arcu tempus consequat scelerisque ac sem. Etiam faucibus maximus
                            erat at fringilla. Cras at odio eu neque aliquet posuere ac nec velit. Etiam dictum maximus
                            nisl, condimentum efficitur turpis. Nunc volutpat efficitur risus, et cursus ipsum iaculis
                            eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget neque eget velit
                            tristique gravida ut non diam. Cras euismod mi tellus, non tristique nibh tincidunt a.
                        </Typography>

                        <Typography variant='body1' style={categoryStyles} marginTop={5}>
                            Q: Can I withdraw my application to be a volunteer?
                        </Typography>

                        <Typography variant='body1' style={questionStyle} marginTop={1} id='v2'>
                            Phasellus ut ante sit amet arcu tempus consequat scelerisque ac sem. Etiam faucibus maximus
                            erat at fringilla. Cras at odio eu neque aliquet posuere ac nec velit. Etiam dictum maximus
                            nisl, condimentum efficitur turpis. Nunc volutpat efficitur risus, et cursus ipsum iaculis
                            eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget neque eget velit
                            tristique gravida ut non diam. Cras euismod mi tellus, non tristique nibh tincidunt a.
                        </Typography>

                        <Typography variant='body1' style={categoryStyles} marginTop={5}>
                            Q: Can I obtain proof of attendance or certification for my volunteer hours?
                        </Typography>

                        <Typography variant='body1' style={questionStyle} marginTop={1} id='v3'>
                            Phasellus ut ante sit amet arcu tempus consequat scelerisque ac sem. Etiam faucibus maximus
                            erat at fringilla. Cras at odio eu neque aliquet posuere ac nec velit. Etiam dictum maximus
                            nisl, condimentum efficitur turpis. Nunc volutpat efficitur risus, et cursus ipsum iaculis
                            eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget neque eget velit
                            tristique gravida ut non diam. Cras euismod mi tellus, non tristique nibh tincidunt a.
                        </Typography>

                        <Typography variant='body1' style={categoryStyles} marginTop={5}>
                            Q: My Account got banned. What do I do?
                        </Typography>

                        <Typography variant='body1' style={questionStyle} marginTop={1} id='v4'>
                            lla. Cras at odio eu neque aliquet posuere ac nec velit. Etiam dictum maximus nisl,
                            condimentum efficitur turpis. Nunc volutpat efficitur risus, et cursus ipsum iaculis eget.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget neque eget velit
                            tristique gravida ut non diam. Cras euismod mi tellus, non tristique nibh tincidunt a.
                        </Typography>

                        <Typography variant='body1' style={categoryStyles} marginTop={5}>
                            Q: I forgot my account password. What do I do?
                        </Typography>

                        <Typography variant='body1' style={questionStyle} marginTop={1} id='v5'>
                            Phasellus ut ante sit amet arcu tempus consequat scelerisque ac sem. Etiam faucibus maximus
                            erat at fringilla. Cras at odio eu neque aliquet posuere ac nec velit. Etiam dictum maximus
                            nisl, condimentum efficitur turpis. Nunc volutpat efficitur risus, et cursus ipsum iaculis
                            eget. Lgravida ut non diam. Cras euis
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant='body1' style={category2Styles} marginTop={4}>
                            For Organisations:
                        </Typography>
                        <Typography variant='body1' style={categoryStyles} marginTop={5}>
                            Q: Who can join as an organisation or group?
                        </Typography>

                        <Typography variant='body1' style={questionStyle} marginTop={1} id='v1'>
                            Phasellus ut ante sit amet arcu tempus consequat scelerisque ac sem. Etiam faucibus maximus
                            erat at fringilla. Cras at odio eu neque aliquet posuere ac nec velit. Etiam dictum maximus
                            nisl, condimentum efficitur turpis. Nunc volutpat efficitur risus, et cursus ipsum iaculis
                            eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget neque eget velit
                            tristique gravida ut non diam. Cras euismod mi tellus, non tristique nibh tincidunt a.
                        </Typography>

                        <Typography variant='body1' style={categoryStyles} marginTop={5}>
                            Q: How do I create a campaign
                        </Typography>

                        <Typography variant='body1' style={questionStyle} marginTop={1} id='v2'>
                            Phasellus ut ante sit amet arcu tempus consequat scelerisque ac sem. Etiam faucibus maximus
                            erat at fringilla. Cras at odio eu neque aliquet posuere ac nec velit. Etiam dictum maximus
                            nisl, condimentum efficitur turpis. Nunc volutpat efficitur risus, et cursus ipsum iaculis
                            eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget neque eget velit
                            tristique gravida ut non diam. Cras euismod mi tellus, non tristique nibh tincidunt a.
                        </Typography>

                        <Typography variant='body1' style={categoryStyles} marginTop={5}>
                            Q: How do I approve/reject the volunteers
                        </Typography>

                        <Typography variant='body1' style={questionStyle} marginTop={1} id='v3'>
                            Phasellus ut ante sit amet arcu tempus consequat scelerisque ac sem. Etiam faucibus maximus
                            erat at fringilla. Cras at odio eu neque aliquet posuere ac nec velit. Etiam dictum maximus
                            nisl, condimentum efficitur turpis. Nunc volutpat efficitur risus, et cursus ipsum iaculis
                            eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget neque eget velit
                            tristique gravida ut non diam. Cras euismod mi tellus, non tristique nibh tincidunt a.
                        </Typography>

                        <Typography variant='body1' style={categoryStyles} marginTop={5}>
                            Q: Am I able to create a campaign after I have registered an account?
                        </Typography>

                        <Typography variant='body1' style={questionStyle} marginTop={1} id='v4'>
                            lla. Cras at odio eu neque aliquet posuere ac nec velit. Etiam dictum maximus nisl,
                            condimentum efficitur turpis. Nunc volutpat efficitur risus, et cursus ipsum iaculis eget.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget neque eget velit
                            tristique gravida ut non diam. Cras euismod mi tellus, non tristique nibh tincidunt a.
                        </Typography>

                        <Typography variant='body1' style={categoryStyles} marginTop={5}>
                            Q: How do I close my campaign early
                        </Typography>

                        <Typography variant='body1' style={questionStyle} marginTop={1} marginBottom={10} id='v5'>
                            Phasellus ut ante sit amet arcu tempus consequat scelerisque ac sem. Etiam faucibus maximus
                            erat at fringilla. Cras at odio eu neque aliquet posuere ac nec velit. Etiam dictum maximus
                            nisl, condimentum efficitur turpis. Nunc volutpat efficitur risus, et cursus ipsum iaculis
                            eget. Lgravida ut non diam. Cras euis
                        </Typography>
                    </Box>
                </Stack>
            </Container>
        </Layout>
    );
}
