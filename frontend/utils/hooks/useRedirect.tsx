import { useEffect, useState } from 'react';
import { useAppSelector } from '@/app/hooks';
import { selectLoggedIn } from '@/app/slices/authSlice';
import Router from 'next/router';
//hack
const useRedirect = () => {
    const [redirecting, setRedirecting] = useState(true);
    const loggedIn = useAppSelector(selectLoggedIn);
    useEffect(() => {
        if (loggedIn) {
            Router.replace('/').then(() => setRedirecting(false));
        } else {
            setRedirecting(false);
        }
    }, [loggedIn]);

    return [loggedIn, redirecting];
};

export default useRedirect;
