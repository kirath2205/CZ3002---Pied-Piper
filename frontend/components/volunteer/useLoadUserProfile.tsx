//libs
import { useState, useEffect } from 'react';
import axios from 'axios';
//types
import { UserCampaign, UserProfile } from '@/interfaces/User';
import { APIResponse } from '@/interfaces/Response';

const useLoadUserProfile = (tab: 'PROFILE' | 'PENDING' | 'HISTORY') => {
    const [loading, setLoading] = useState<boolean>(true);
    const [profile, setProfile] = useState<UserProfile>();
    const [pendingApps, setPendingApps] = useState<UserCampaign[]>([]);
    const [campaignsHistory, setCampaignsHistory] = useState<UserCampaign[]>([]);

    /**
     * Gets the user profile from the API
     */
    const getProfile = async () => {
        const response = await axios.get('/api/user_view/get_user_details');
        const volunteerProfile = ((await response.data) as APIResponse<UserProfile>).fields;
        setProfile(volunteerProfile);
        setLoading(false);
    };

    /**
     * Gets the users pending applications from the API
     */
    const getPendingApps = async () => {
        const response = await axios.get('/api/user_view/get_all_pending_application_for_user');
        const pendingList = ((await response.data) as APIResponse<UserCampaign>[]).map((application) => ({
            ...application.fields,
            pk: application.pk,
        }));
        setPendingApps(pendingList);
    };

    /**
     * Gets the users campaign history from the API
     */
    const getCampaignsHistory = async () => {
        const response = await axios.get('/api/user_view/get_all_past_campaigns_for_user');
        const historyList = ((await response.data) as APIResponse<UserCampaign>[]).map((campaign) => ({
            ...campaign.fields,
            pk: campaign.pk,
        }));
        setCampaignsHistory(historyList);
    };
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
