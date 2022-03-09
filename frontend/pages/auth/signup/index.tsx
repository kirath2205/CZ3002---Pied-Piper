import SignUpChoice from '@/components/auth/SignUpChoice';
import Layout from '@/components/shared/Layout';
import ProgressBar from '@/components/shared/ProgressBar';
import useRedirect from '@/utils/hooks/useRedirect';
import Head from 'next/head';

export default function SignUp() {
    const [loggedIn, redirecting] = useRedirect();
    return (
        <>
            <Head>
                <title>VolunteerGoWhere</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <Layout>
                {redirecting && <ProgressBar />}
                {!redirecting && !loggedIn && <SignUpChoice />}
            </Layout>
        </>
    );
}
