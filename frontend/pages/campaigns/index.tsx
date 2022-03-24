//components
import CampaignGrid from '@/components/campaigns/CampaignGrid';
import Layout from '@/components/shared/Layout';
import FilterButton from '@/components/campaigns/FilterButton';
//misc
import styles from '@/styles/campaigns.module.css';
//lib
import { useEffect, useState } from 'react';
import { API_URL } from '@/utils/constants/config';
import axios from 'axios';
//types
import { APIResponse } from '@/interfaces/Response';
import { Campaign } from '@/interfaces/Campaign';
import { InferGetServerSidePropsType } from 'next';

export default function Campaigns({ data, skills }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [filter, setFilter] = useState<string>('');

    return (
        <Layout title='VolunteerGoWhere - Campaigns'>
            <div className={styles.container}>
                <FilterButton setFilter={setFilter} skills={skills} />
                <CampaignGrid campaigns={data} filter={filter} />
            </div>
        </Layout>
    );
}

export async function getServerSideProps() {
    const response = await axios.get(`${API_URL}/generic_view/get_current_campaigns`);
    //Getting the campaigns
    const data = (JSON.parse(await response.data) as APIResponse<Campaign>[]).map((campaign) => ({
        ...campaign.fields,
        pk: campaign.pk,
    }));
    //Get the skills available in the fetched campaigns
    const skills = [...Array.from(new Set(data.map((campaign) => campaign.skills.flat()).flat()))];

    return {
        props: { data, skills },
    };
}
