import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

type UserType = 'ORG' | 'VOLUNTEER';

export type AuthState = {
    loggedIn: boolean;
    access_token?: string | null;
    refresh_token?: string | null;
};

const initialState: AuthState = { loggedIn: false };

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<AuthState>) => {
            const { access_token, refresh_token } = action.payload;
            console.log(access_token);
            localStorage.setItem('refresh_token', refresh_token as string);
            localStorage.setItem('access_token', access_token as string);
            return { access_token, refresh_token, loggedIn: true };
        },
        logout: (state) => {
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('access_token');
            return { loggedIn: false, refresh_token: null, access_token: null };
        },
    },
});

export const { login, logout } = authSlice.actions;

export const selectAuthState = (state: RootState) => state.auth;
export const selectLoggedIn = (state: RootState) => state.auth.loggedIn;

export default authSlice.reducer;
