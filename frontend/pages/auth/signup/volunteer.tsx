import SignUpForm from '@/components/auth/VolunteerSignUpForm';
import Layout from '@/components/shared/Layout';
import Head from 'next/head';

export default function VolunteerSignUp() {
    return (
        <>
            <Head>
                <title>VolunteerGoWhere - Volunteer Sign Up</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <Layout>
                <SignUpForm />
            </Layout>
        </>
    );
}
