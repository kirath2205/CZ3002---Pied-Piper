import { useEffect, useState } from 'react';
import { useAppSelector } from '@/app/hooks';
import { selectLoggedIn } from '@/app/slices/authSlice';
import Router from 'next/router';
//hack
const useRedirect = () => {
    const [loading, setLoading] = useState(true);
    const loggedIn = useAppSelector(selectLoggedIn);
    useEffect(() => {
        if (loggedIn) {
            Router.replace('/').then(() => setLoading(false));
        }
    }, [loggedIn]);

    return loading;
};

export default useRedirect;
