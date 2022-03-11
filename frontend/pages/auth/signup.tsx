import SignUpChoice from '@/components/auth/SignUpChoice';
import Layout from '@/components/shared/Layout';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/app/hooks';
import { selectLoggedIn } from '@/app/slices/authSlice';
import Head from 'next/head';

export default function SignUp() {
    const loggedIn = useAppSelector(selectLoggedIn);
    const router = useRouter();

    if (typeof window !== undefined && loggedIn) {
        router.push('/');
    }
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
