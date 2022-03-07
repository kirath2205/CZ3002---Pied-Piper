import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

type UserType = 'ORG' | 'VOLUNTEER';

export type AuthState = {
    loggedIn: boolean;
    userId?: string;
    userType?: UserType;
    error?: string;
};

const initialState: AuthState = { loggedIn: false };

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<AuthState>) => {
            const { userId, userType } = action.payload;
            state.loggedIn = true;
            state.userId = userId;
            state.userType = userType;
            state.error = undefined;
        },
    },
});

export const { login } = authSlice.actions;

export const selectAuthState = (state: RootState) => state.auth;
export const selectLoggedIn = (state: RootState) => state.auth.loggedIn;

export default authSlice.reducer;
