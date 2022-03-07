import SignUpForm from '@/components/auth/SignUpForm';
import Layout from '@/components/shared/Layout';
import Head from 'next/head';

export default function SignIn() {
    return (
        <>
            <Head>
                <title>VolunteerGoWhere</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <Layout>
                <SignUpForm />
            </Layout>
        </>
    );
}
