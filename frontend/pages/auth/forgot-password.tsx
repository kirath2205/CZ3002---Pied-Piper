import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import Layout from '@/components/shared/Layout';

export default function SignIn() {
    return (
        <Layout title='VolunteerGoWhere - Forgot Password'>
            <ForgotPasswordForm />
        </Layout>
    );
}
