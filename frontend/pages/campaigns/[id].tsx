import { Box } from '@mui/material';
import CampaignCard from '@/components/campaigns/CampaignCard';
import Layout from '@/components/shared/Layout';
import Head from 'next/head';
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

    const campaign: Campaign = {
        id: '40549fdf-487b-4be1-8c26-8708db9f59f6',
        location: 'Bartelt',
        skills: ['Dog Training'],
        date: '5/31/2021',
        time: '6:30pm to 8:30pm',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        minimumAge: 15,
        duration: 2,
        vacancies: 35,
        title: 'Campaign 2',
        organization: 'The Volunteer Org',
    };

    return { props: { campaign } };
    // ...
};
