//libs
import { useState, useEffect } from 'react';
import axios from 'axios';
//types
import { UserCampaign, UserProfile } from '@/interfaces/User';
import { APIResponse } from '@/interfaces/Response';
//redux
import { useAppDispatch } from '@/app/hooks';
import { setLoading, unsetLoading } from '@/app/slices/authSlice';

const useLoadUserProfile = (tab: 'PROFILE' | 'PENDING' | 'HISTORY') => {
    const [profile, setProfile] = useState<UserProfile>();
    const [pendingApps, setPendingApps] = useState<UserCampaign[]>([]);
    const [campaignsHistory, setCampaignsHistory] = useState<UserCampaign[]>([]);
    const dispatch = useAppDispatch();

    /**
     * Gets the user profile from the API
     */
    const getProfile = async () => {
        const response = await axios.get('/api/user_view/get_user_details');
        const volunteerProfile = ((await response.data) as APIResponse<UserProfile>).fields;
        setProfile(volunteerProfile);
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

    const unregisterForCampaign = async (campaign_id: number) => {
        dispatch(setLoading());
        try {
            const response = await axios.post('/api/user_view/unregister_for_campaign', { campaign_id });
            setPendingApps(pendingApps.filter((campaign) => campaign.campaign_id !== campaign_id));
        } catch (err) {
            console.log(err);
        }
        dispatch(unsetLoading());
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
    return { profile, pendingApps, campaignsHistory, unregisterForCampaign };
};

export default useLoadUserProfile;
