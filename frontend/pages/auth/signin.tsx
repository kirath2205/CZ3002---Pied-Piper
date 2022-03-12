import SignInForm from '@/components/auth/SignInForm';
import Layout from '@/components/shared/Layout';
import { redirectToHome } from '@/utils/redirect';
import { GetServerSidePropsContext } from 'next';

export default function SignIn() {
    return (
        <Layout title='VolunteerGoWhere - Sign In'>
            <SignInForm />
        </Layout>
    );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    return redirectToHome(ctx);
}
