import Layout from '@/components/shared/Layout';
import UnstyledLink from '@/components/shared/UnstyledLink';
import { Container, Typography, Button } from '@mui/material';

export default function Custom404() {
    return (
        <Layout title='VolunteerGoWhere - Error'>
            <Container sx={{ pt: 12, px: 6 }}>
                <Typography variant='h2'>Oops! The page you were looking for could not be found.</Typography>
                <UnstyledLink href='/'>
                    <Button sx={{ marginTop: 2, width: '30%', backgroundColor: '#12CDD4' }} color='primary' variant='contained' fullWidth>
                        Return to Home page
                    </Button>
                </UnstyledLink>
            </Container>
        </Layout>
    );
}
