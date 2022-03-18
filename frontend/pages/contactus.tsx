import Layout from '@/components/shared/Layout';
import StyledLink from '@/components/shared/StyledLink';
import { Typography, Box, Stack } from '@mui/material';

const h2Styles = {
    fontSize: 24,
};

export default function contactus() {
    return (
        <>
            <Layout>
                <Stack marginTop={5} px={{ xs: 2, sm: 4, md: 6 }} style={{ paddingBottom: '30%' }}>
                    <Box style={{ height: '100%' }}>
                        <Typography variant='h3' style={{ fontWeight: 500 }}>
                            Hello.
                        </Typography>
                        <Typography variant='body1' style={h2Styles} marginTop={3}>
                            Got a cool idea or feedback on how we can improve or maybe just to say hi to us?
                            <br></br>
                            We&apos;d love to hear from you!
                            <br></br>
                            Please drop us an email at{' '}
                            <StyledLink href='mailto:yolo@gmail.com'>VolunteerGoWhere@hotmail.sg</StyledLink>
                            <br></br>
                            <br></br>
                            &quot;No act of kindness, no matter how small is ever wasted&quot;
                            <br></br>
                            -AESOP
                        </Typography>
                    </Box>
                </Stack>
            </Layout>
        </>
    );
}
