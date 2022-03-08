import { useEffect } from 'react';
import { useAppDispatch } from '@/app/hooks';
import { login as loginAction } from '@/app/slices/authSlice';
//hack
const useLogin = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        const refresh_token = localStorage.getItem('refresh_token');
        if (refresh_token) {
            dispatch(loginAction({ refresh_token, loggedIn: true }));
        }
    }, []);
};

export default useLogin;
