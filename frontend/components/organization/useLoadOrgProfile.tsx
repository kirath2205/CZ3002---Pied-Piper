//libs
import { useState, useEffect } from 'react';
import axios from 'axios';
//types
import { OrganizationProfile } from '@/interfaces/Organization';
import { OrganizationNotification } from '@/interfaces/Organization';
import { APIResponse } from '@/interfaces/Response';

const useLoadOrgProfile = (tab: 'PROFILE' | 'APPROVE' | 'EDIT') => {
    const [loading, setLoading] = useState<boolean>(true);
    const [profile, setProfile] = useState<OrganizationProfile>();
    const [notification, setNotifications] = useState<OrganizationNotification[]>();
    const [campaigns, setCampaigns] = useState();

    /**
     * Loads the organization profile from API
     */
    const getProfile = async () => {
        const response = await axios.get('/api/org_view/get_org_details');
        const orgProfile = ((await response.data) as APIResponse<OrganizationProfile>).fields;
        setProfile(orgProfile);
        setLoading(false);
    };

    /**
     * Gets the org notifications (pending applications) from the API
     */
    const getNotifications = async () => {
        const response = await axios.get('/api/org_view/view_org_notifs');
        const orgNotifs = ((await response.data) as APIResponse<OrganizationNotification>[]).map((notification) => ({
            ...notification.fields,
            pk: notification.pk,
        }));
        setNotifications(orgNotifs);
        setLoading(false);
    };

    useEffect(() => {
        if (tab === 'PROFILE') {
            getProfile();
        }

        if (tab === 'APPROVE') {
            //TODO
            //view org notifs
            getNotifications();
        }

        if (tab === 'EDIT') {
            //TODO
            //get all campaign details/ get upcoming for org
        }
    }, [tab]);
    return { loading, profile, notification, campaigns };
};

export default useLoadOrgProfile;
