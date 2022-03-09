import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import Layout from '@/components/shared/Layout';
import useRedirect from '@/utils/hooks/useRedirect';
import Head from 'next/head';

export default function SignIn() {
    useRedirect();
    return (
        <>
            <Head>
                <title>VolunteerGoWhere - Forgot Password</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <Layout>
                <ForgotPasswordForm />
            </Layout>
        </>
    );
}
