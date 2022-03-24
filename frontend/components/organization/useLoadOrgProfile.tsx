//libs
import { useState, useEffect } from 'react';
import axios from 'axios';
//types
import { UserType } from '@/app/slices/authSlice';
import { OrganizationProfile } from '@/interfaces/Organization';
import { OrganizationNotification } from '@/interfaces/Organization';
import { UserProfile } from '@/interfaces/User';

const useLoadOrgProfile = (tab: 'PROFILE' | 'APPROVE' | 'EDIT') => {
    const [loading, setLoading] = useState<boolean>(true);
    const [profile, setProfile] = useState<OrganizationProfile>();
    const [notification, setNotifications] = useState<OrganizationNotification>();
    const [campaigns, setCampaigns] = useState();

    const getProfile = async () => {
        const response = await axios.get('/api/org_view/get_org_details');
        const orgProfile = await response.data.fields;
        //console.log(response);
        setProfile(orgProfile);
        setLoading(false);
    };

    const getNotifications = async () => {
        const response = await axios.get('/api/org_view/view_org_notifs');
        //console.log(response);
        //const orgNotifs = (await response.data).map((notification: { fields: any; }) => notification.fields);
        const orgNotifs = (await response.data).map(notif => ({...notif.fields, pk:notif.pk}))
        console.log(orgNotifs);
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
