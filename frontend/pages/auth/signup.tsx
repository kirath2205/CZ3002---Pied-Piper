import SignUpChoice from '@/components/auth/SignUpChoice';
import Layout from '@/components/shared/Layout';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/app/hooks';
import { selectLoggedIn } from '@/app/slices/authSlice';

export default function SignUp() {
    const loggedIn = useAppSelector(selectLoggedIn);
    const router = useRouter();

    if (typeof window !== undefined && loggedIn) {
        router.push('/');
    }
    return (
        <Layout title='VolunteerGoWhere - Sign Up'>
            <SignUpChoice />
        </Layout>
    );
}
