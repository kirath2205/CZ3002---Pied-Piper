import SignUpChoice from '@/components/auth/SignUpChoice';
import Layout from '@/components/shared/Layout';
import { redirectToHome } from '@/utils/redirect';
import { GetServerSidePropsContext } from 'next';
import Fade from 'react-reveal/Fade';

export default function SignUp() {
    return (
        <Layout title='VolunteerGoWhere - Sign Up'>
            <Fade bottom>
                <SignUpChoice />
            </Fade>
        </Layout>
    );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    return redirectToHome(ctx);
}
