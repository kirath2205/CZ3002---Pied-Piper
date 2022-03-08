import { useEffect } from 'react';
import { useAppSelector } from '@/app/hooks';
import { selectLoggedIn } from '@/app/slices/authSlice';
import Router from 'next/router';
//hack
const useRedirect = () => {
    const loggedIn = useAppSelector(selectLoggedIn);
    useEffect(() => {
        if (loggedIn) {
            Router.replace('/');
        }
    }, [loggedIn]);
};

export default useRedirect;
