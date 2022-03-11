import SignInForm from '@/components/auth/SignInForm';
import Layout from '@/components/shared/Layout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/app/hooks';
import { selectLoggedIn } from '@/app/slices/authSlice';

export default function SignIn() {
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
                <SignInForm />
            </Layout>
        </>
    );
}
