import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '../store';

type UserType = 'ORG' | 'VOLUNTEER';

export type AuthState = {
    loggedIn: boolean;
    loading: boolean;
    user?: UserType;
    error?: string;
};

const initialState: AuthState = { loggedIn: false, loading: false };

interface LoginBody {
    email: string;
    password: string;
}

interface ErrorMessage {
    error: string;
}

const login = createAsyncThunk<string, LoginBody, { rejectValue: ErrorMessage }>('auth/login', async (loginBody, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
        const res = await axios.post('/api/auth/login', loginBody);
        if (res.status === 226) {
            return res.data as string;
        } else {
            return thunkAPI.rejectWithValue(res.data as ErrorMessage);
        }
    } catch (err) {
        return thunkAPI.rejectWithValue({ error: 'Something went wrong logging in.' });
    }
});

const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        const res = await axios.post('/api/auth/logout');
        if (res.status === 200) {
            return;
        } else {
            return thunkAPI.rejectWithValue({ error: 'Failed to logout' });
        }
    } catch (err) {
        return thunkAPI.rejectWithValue({ error: 'Failed to logout' });
    }
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            return { ...state, error: undefined };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(login.fulfilled, (state) => {
            state.loggedIn = true;
            state.loading = false;
        });
        builder.addCase(login.rejected, (state, action) => {
            const { payload } = action;
            state.loading = false;
            state.loggedIn = false;
            if (payload) {
                state.error = payload.error;
            } else {
                state.error = action.error.message;
            }
        });
        builder.addCase(logout.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(logout.fulfilled, (state) => {
            state.loading = false;
            state.loggedIn = false;
        });
        builder.addCase(logout.rejected, (state, action) => {
            state.loading = false;
            state.error = 'Failed to logout';
        });
    },
});

export const { clearError } = authSlice.actions;

export { login, logout };

export const selectAuthState = (state: RootState) => state.auth;
export const selectLoggedIn = (state: RootState) => state.auth.loggedIn;

export default authSlice.reducer;
