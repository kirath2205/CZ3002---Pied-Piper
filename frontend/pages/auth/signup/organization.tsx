import SignUpForm from '@/components/auth/OrganizationSignUpForm';
import Layout from '@/components/shared/Layout';
import Head from 'next/head';

export default function OrganizationSignUp() {
    return (
        <>
            <Head>
                <title>VolunteerGoWhere - Organization Sign Up</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <Layout>
                <SignUpForm />
            </Layout>
        </>
    );
}
