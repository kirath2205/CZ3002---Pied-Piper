//libs
import { useState, useEffect } from 'react';
import axios from 'axios';
//types
import { OrganizationProfile } from '@/interfaces/Organization';
import { OrganizationNotification } from '@/interfaces/Organization';
import { Campaign } from '@/interfaces/Campaign';
import { APIResponse } from '@/interfaces/Response';
//redux
import { useAppDispatch } from '@/app/hooks';
import { setLoading, unsetLoading } from '@/app/slices/authSlice';

const useLoadOrgProfile = (tab: 'PROFILE' | 'APPROVE' | 'EDIT') => {
    const [profile, setProfile] = useState<OrganizationProfile>();
    const [notifications, setNotifications] = useState<OrganizationNotification[]>([]);
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const dispatch = useAppDispatch();

    /**
     * Loads the organization profile from API
     */
    const getProfile = async () => {
        const response = await axios.get('/api/org_view/get_org_details');
        const orgProfile = ((await response.data) as APIResponse<OrganizationProfile>).fields;
        setProfile(orgProfile);
    };

    /**
     * Gets the org notifications (pending applications) from the API
     */
    const getNotifications = async () => {
        const response = await axios.get('/api/org_view/view_org_notifs');
        console.log(await response.data);
        const orgNotifs = ((await response.data) as APIResponse<OrganizationNotification>[]).map((notification) => ({
            ...notification.fields,
            pk: notification.pk,
        }));
        setNotifications(orgNotifs);
    };

    /**
     * Approves or rejects the application and remove it from state
     *
     * @param {number} pk - The pk of the pending app
     * @param {number} user_id - Ther user_id of the pending app
     * @param {number} campaign_id - The campaign_id of the pending app
     * @param {string} status - R | A for Reject or Approve
     */
    const approveApplication = async (pk: number, user_id: number, campaign_id: number, status: string) => {
        dispatch(setLoading());
        try {
            const response = await axios.post('/api/org_view/approve_or_reject_user_campaign_registration/', {
                user_id,
                campaign_id,
                status,
            });
            setNotifications(notifications?.filter((notification) => notification.pk !== pk));
        } catch (err) {
            console.log(err);
        }
        dispatch(unsetLoading());
    };

    const getUpcomingCampaigns = async () => {
        const response = await axios.get('/api/org_view/get_all_upcoming_campaign_details_for_org/');
        const upcomingCampaigns = ((await response.data) as APIResponse<Campaign>[]).map((campaign) => ({
            ...campaign.fields,
            pk: campaign.pk,
        }));
        setCampaigns(upcomingCampaigns);
    };

    useEffect(() => {
        if (tab === 'PROFILE') {
            getProfile();
        }

        if (tab === 'APPROVE') {
            getNotifications();
        }

        if (tab === 'EDIT') {
            getUpcomingCampaigns();
        }
    }, [tab]);
    return { profile, notifications, campaigns, approveApplication };
};

export default useLoadOrgProfile;
