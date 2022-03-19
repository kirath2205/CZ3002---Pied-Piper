import VolunteerProfileChoice from '@/components/volunteer/VolunteerProfileChoice';
import Layout from '@/components/shared/Layout';
import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import { API_URL } from '@/utils/constants/config';
import axios from 'axios';
import { redirectToHome } from '@/utils/redirect';
import { GetServerSidePropsContext } from 'next';

export default function UserProfile() {
    return (
        <Layout title='VolunteerGoWhere - Profile'>
            <VolunteerProfileChoice />
        </Layout>
    );
}
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    return redirectToHome(ctx);
}
