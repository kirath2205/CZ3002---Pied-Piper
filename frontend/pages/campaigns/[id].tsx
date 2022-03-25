//mui
import { Container } from '@mui/material';
//lib
import { useState, useEffect } from 'react';
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
//redux
import { useSelector } from 'react-redux';
import { selectAuthState } from '@/app/slices/authSlice';

export default function IndividualCampaignPage({ campaign }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const authState = useSelector(selectAuthState);
    const [userCampaigns, setUserCampaigns] = useState<number[]>([]);
    /**
     * Get user campaigns
     * In conjunction with useEffect in order to disable button if already applied for the campaign
     */
    const getUserCampaigns = async () => {
        try {
            const response = await axios.get('/api/user_view/get_all_campaigns/');
            const data = ((await response.data) as APIResponse<UserCampaign>[]).map(
                (campaign) => campaign.fields.campaign_id
            );
            setUserCampaigns(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (authState.user === 'USER') {
            getUserCampaigns();
        }
    }, []);

    return (
        <Layout>
            <Container maxWidth='lg'>
                <CampaignCard
                    campaign={campaign}
                    detailed
                    userRegistered={userCampaigns.includes(campaign.pk as number)}
                />
            </Container>
        </Layout>
    );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const { id } = context.query;

    const response = await axios.get(`${API_URL}/generic_view/get_campaign_using_campaign_id/${id}`);

    const campaign = (await response.data) as Campaign;

    return { props: { campaign } };
    // ...
};
