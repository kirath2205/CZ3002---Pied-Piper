import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import Layout from '@/components/shared/Layout';

import Head from 'next/head';

export default function SignIn() {
    return (
        <Layout title='VolunteerGoWhere - Forgot Password'>
            <ForgotPasswordForm />
        </Layout>
    );
}
