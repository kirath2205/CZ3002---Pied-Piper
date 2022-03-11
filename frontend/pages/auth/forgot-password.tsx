import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import Layout from '@/components/shared/Layout';

import Head from 'next/head';

export default function SignIn() {
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
