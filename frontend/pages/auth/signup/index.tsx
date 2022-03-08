import SignUpChoice from '@/components/auth/SignUpChoice';
import Layout from '@/components/shared/Layout';
import useRedirect from '@/utils/hooks/useRedirect';
import Head from 'next/head';

export default function SignUp() {
    useRedirect();
    return (
        <>
            <Head>
                <title>VolunteerGoWhere</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <Layout>
                <SignUpChoice />
            </Layout>
        </>
    );
}
