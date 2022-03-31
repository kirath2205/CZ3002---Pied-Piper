//mui
import { Container } from '@mui/material';
//lib
import axios from 'axios';
import { API_URL } from '@/utils/constants/config';
//components
import Layout from '@/components/shared/Layout';
import ApprovedUsersList from '@/components/campaigns/ApprovedUsersList';

//type
import { ApprovedUser, Campaign } from '@/interfaces/Campaign';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { APIResponse } from '@/interfaces/Response';
import CampaignCard from '@/components/campaigns/CampaignCard';

export default function ApprovedUsersPage({
    campaign,
    approvedUsers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Layout>
            <Container maxWidth='sm'>
                <CampaignCard campaign={campaign} detailed />
                <ApprovedUsersList approvedUsers={approvedUsers} />
            </Container>
        </Layout>
    );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const { id } = context.query;

    //Getting the campaign
    let response = await axios.get(`${API_URL}/generic_view/get_campaign_using_campaign_id/${id}`);
    const campaign = (await response.data) as Campaign;
    //Getting the approved users
    response = await axios.get(`${API_URL}/generic_view/get_approved_users_by_campaign_id/${id}`);
    const approvedUsers = (JSON.parse(await response.data) as APIResponse<ApprovedUser>[]).map((user) => ({
        ...user.fields,
        pk: user.pk,
    })) as ApprovedUser[];

    return { props: { campaign, approvedUsers } };
};
