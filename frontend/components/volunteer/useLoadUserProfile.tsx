//libs
import React, { useState, useEffect } from 'react';
import axios from 'axios';
//types
import { UserProfile } from '@/interfaces/User';
import { Campaign } from '@/interfaces/Campaign';

const useLoadUserProfile = (tab: 'PROFILE' | 'PENDING' | 'HISTORY') => {
    const [loading, setLoading] = useState<boolean>(true);
    const [profile, setProfile] = useState<UserProfile>();
    const [pendingApps, setPendingApps] = useState([]);
    const [campaignsHistory, setCampaignsHistory] = useState();

    const getProfile = async () => {
        const response = await axios.get('/api/user_view/get_user_details');
        const volunteerProfile = await response.data.fields;
        setProfile(volunteerProfile);
        setLoading(false);
    };

    //to test
    
    const getPendingApps = async () => {
        const response = await axios.get('/api/user_view/get_all_pending_application_for_user')
        const pendingList = (await response.data).map((application) => application.fields);
        setPendingApps(pendingList);
    }

    const getCampaignsHistory = async () => {
        const response = await axios.get('/api/user_view/get_all_past_campaigns_for_user')
        const historyList = (await response.data).map((history) => history.fields);
        setCampaignsHistory(historyList);
    }
    useEffect(() => {
        if (tab === 'PROFILE') {
            getProfile();
        }

        if (tab === 'PENDING') {
            //TODO
            //view pending applications
            getPendingApps();
        }

        if (tab === 'HISTORY') {
            //TODO
            //get past campaigns/campaigns history
            getCampaignsHistory();
        }
    }, [tab]);
    return { loading, profile, pendingApps, campaignsHistory };
};

export default useLoadUserProfile;
