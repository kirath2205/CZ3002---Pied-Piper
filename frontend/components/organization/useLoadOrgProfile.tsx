//libs
import { useState, useEffect } from 'react';
import axios from 'axios';
//types
import { UserType } from '@/app/slices/authSlice';
import { OrganizationProfile } from '@/interfaces/Organization';
import { UserProfile } from '@/interfaces/User';

const useLoadOrgProfile = (tab: 'PROFILE' | 'APPROVE' | 'EDIT') => {
    const [loading, setLoading] = useState<boolean>(true);
    const [profile, setProfile] = useState<OrganizationProfile>();
    const [notifications, setNotifications] = useState();
    const [campaigns, setCampaigns] = useState();

    const getProfile = async () => {
        const response = await axios.get('/api/org_view/get_org_details');
        const orgProfile = await response.data.fields;
        setProfile(orgProfile);
        setLoading(false);
    };
    useEffect(() => {
        if (tab === 'PROFILE') {
            getProfile();
        }

        if (tab === 'APPROVE') {
            //TODO
            //view org notifs
        }

        if (tab === 'EDIT') {
            //TODO
            //get all campaign details/ get upcoming for org
        }
    }, [tab]);
    return { loading, profile, notifications, campaigns };
};

export default useLoadOrgProfile;
