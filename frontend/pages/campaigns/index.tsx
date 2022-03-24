import CampaignGrid from '@/components/campaigns/CampaignGrid';
import Layout from '@/components/shared/Layout';
import { Campaign } from '@/interfaces/Campaign';
import FilterButton from '@/components/campaigns/FilterButton';
import styles from '@/styles/campaigns.module.css';
import Data from './data';
import { useState } from 'react';



export default function Campaigns() {
    const [campaigns, setCampaign] = useState(Data);


    return (
        <Layout title='VolunteerGoWhere - Campaigns'>
            <div className={styles.container}>
                <FilterButton 
                    campaigns={campaigns}
                    setCampaign={setCampaign} id={0}/>
                <CampaignGrid campaigns={campaigns} />
            </div>
        </Layout>)
};