//mui
import { Box } from '@mui/material';
//lib
import axios from 'axios';
import { API_URL } from '@/utils/constants/config';
//components
import CampaignCard from '@/components/campaigns/CampaignCard';
import Layout from '@/components/shared/Layout';
//type
import { Campaign } from '@/interfaces/Campaign';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export default function IndividualCampaignPage({ campaign }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Layout>
            <Box px={4} pt={2}>
                <CampaignCard campaign={campaign} detailed />
            </Box>
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query;

    const response = await axios.get(`${API_URL}/get_campaign_using_campaign_id/${id}`);

    const data = await response.data;

    return { props: { campaign } };
    // ...
};
