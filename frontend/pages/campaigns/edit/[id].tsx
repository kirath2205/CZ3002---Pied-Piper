//lib
import axios from 'axios';
import { API_URL } from '@/utils/constants/config';
//components
import OrganizationUpdateCampaign from '@/components/organization/OrganizationUpdateCampaign';
import Layout from '@/components/shared/Layout';
//type
import { Campaign } from '@/interfaces/Campaign';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

export default function IndividualCampaignPage({ campaign }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Layout>
            <OrganizationUpdateCampaign campaign={campaign} />
        </Layout>
    );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const { id } = context.query;

    const response = await axios.get(`${API_URL}/generic_view/get_campaign_using_campaign_id/${id}`);

    const campaign = (await response.data) as Campaign;

    return { props: { campaign } };
};
