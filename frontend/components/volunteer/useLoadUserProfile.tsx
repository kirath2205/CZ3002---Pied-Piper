//libs
import { useState, useEffect } from 'react';
import axios from 'axios';
//types
import { UserProfile } from '@/interfaces/User';

const useLoadUserProfile = (tab: 'PROFILE' | 'PENDING' | 'HISTORY') => {
    const [loading, setLoading] = useState<boolean>(true);
    const [profile, setProfile] = useState<UserProfile>();
    const [notifications, setNotifications] = useState();
    const [campaigns, setCampaigns] = useState();

    const getProfile = async () => {
        const response = await axios.get('/api/user_view/get_user_details');
        const orgProfile = await response.data.fields;
        setProfile(orgProfile);
        setLoading(false);
    };
    useEffect(() => {
        if (tab === 'PROFILE') {
            getProfile();
        }

        if (tab === 'PENDING') {
            //TODO
            //view pending applications
        }

        if (tab === 'HISTORY') {
            //TODO
            //get past campaigns/campaigns history
        }
    }, [tab]);
    return { loading, profile, notifications, campaigns };
};

export default useLoadUserProfile;
