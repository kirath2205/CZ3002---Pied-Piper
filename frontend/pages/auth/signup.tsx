import SignUpChoice from '@/components/auth/SignUpChoice';
import Layout from '@/components/shared/Layout';
import { redirectToHome } from '@/utils/redirect';
import { GetServerSidePropsContext } from 'next';

export default function SignUp() {
    return (
        <Layout title='VolunteerGoWhere - Sign Up'>
            <SignUpChoice />
        </Layout>
    );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    return redirectToHome(ctx);
}
