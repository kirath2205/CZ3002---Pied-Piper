//libs
import { useState, useEffect } from 'react';
import axios from 'axios';
//types
import { UserType } from '@/app/slices/authSlice';
import { OrganizationProfile } from '@/interfaces/Organization';
import { UserProfile } from '@/interfaces/User';

const useLoadProfile = (accountType: UserType) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [profile, setProfile] = useState<UserProfile | OrganizationProfile>();
    useEffect(() => {
        const getProfile = async () => {
            if (accountType === 'ORG') {
                const response = await axios.get('/api/org_view/get_org_details');
                const orgProfile = await response.data.fields;
                setProfile(orgProfile);
            } else {
                const response = await axios.get('/api/user_view/get_user_details');
                const userProfile = await response.data.fields;
                setProfile(userProfile);
            }
            setLoading(false);
        };
        getProfile();
    }, []);
    return { loading, profile };
};

export default useLoadProfile;
