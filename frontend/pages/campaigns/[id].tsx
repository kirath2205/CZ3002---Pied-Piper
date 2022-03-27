//mui
import { Container } from '@mui/material';
//lib
import axios from 'axios';
import { API_URL } from '@/utils/constants/config';
//components
import CampaignCard from '@/components/campaigns/CampaignCard';
import Layout from '@/components/shared/Layout';
//type
import { Campaign } from '@/interfaces/Campaign';
import { UserCampaign } from '@/interfaces/User';
import { APIResponse } from '@/interfaces/Response';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

export default function IndividualCampaignPage({
    campaign,
    userRegistered,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Layout>
            <Container maxWidth='lg'>
                <CampaignCard campaign={campaign} detailed userRegistered={userRegistered} />
            </Container>
        </Layout>
    );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const { id } = context.query;

    const response = await axios.get(`${API_URL}/generic_view/get_campaign_using_campaign_id/${id}`);

    const campaign = (await response.data) as Campaign;

    //Check if already registered for user
    try {
        const access = context.req.cookies['access'] ?? false;
        const res = await axios.get(`${API_URL}/user_view/get_all_campaigns/`, { headers: { Authorization: access } });
        const userCampaigns = (JSON.parse(await res.data) as APIResponse<UserCampaign>[]).map(
            (campaign) => campaign.fields.campaign_id
        );
        const userRegistered = userCampaigns.includes(campaign.pk as number);
        return { props: { campaign, userRegistered } };
    } catch {
        return { props: { campaign } };
    }

    // ...
};
