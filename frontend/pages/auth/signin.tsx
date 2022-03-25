import SignInForm from '@/components/auth/SignInForm';
import Layout from '@/components/shared/Layout';
import Fade from 'react-reveal/Fade';
import { redirectToHome } from '@/utils/redirect';
import { GetServerSidePropsContext } from 'next';

export default function SignIn() {
    return (
        <Layout title='VolunteerGoWhere - Sign In'>
            <Fade bottom duration={600}>
                <SignInForm />
            </Fade>
        </Layout>
    );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    return redirectToHome(ctx);
}
