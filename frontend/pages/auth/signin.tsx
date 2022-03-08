import SignInForm from '@/components/auth/SignInForm';
import Layout from '@/components/shared/Layout';
import useRedirect from '@/utils/hooks/useRedirect';
import Head from 'next/head';

export default function SignIn() {
    useRedirect();
    return (
        <>
            <Head>
                <title>VolunteerGoWhere</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <Layout>
                <SignInForm />
            </Layout>
        </>
    );
}
