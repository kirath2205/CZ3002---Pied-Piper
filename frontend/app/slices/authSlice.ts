import { OrganizationWithPW } from '@/interfaces/Organization';
import { UserWithPW } from '@/interfaces/User';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '../store';

export type UserType = 'ORG' | 'USER';

export type AuthState = {
    loggedIn: boolean;
    loading: boolean;
    message?: string;
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

const login = createAsyncThunk<UserType, LoginBody, { rejectValue: ErrorMessage }>(
    'auth/login',
    async (loginBody, thunkAPI) => {
        try {
            const res = await axios.post('/api/auth/login', loginBody);
            if (res.status === 226) {
                return res.data.accountType as UserType;
            } else {
                return thunkAPI.rejectWithValue(res.data as ErrorMessage);
            }
        } catch (err) {
            return thunkAPI.rejectWithValue({ error: 'Something went wrong logging in.' });
        }
    }
);

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

const register = createAsyncThunk<void, OrganizationWithPW | UserWithPW, { rejectValue: ErrorMessage }>(
    'auth/register',
    async (registerBody, thunkAPI) => {
        try {
            const res = await axios.post('/api/auth/register', registerBody);
            if (res.status === 200) {
                return;
            } else {
                return thunkAPI.rejectWithValue(res.data as ErrorMessage);
            }
        } catch (err) {
            return thunkAPI.rejectWithValue({ error: 'Something went wrong went registering.' });
        }
    }
);

const checkAuthStatus = createAsyncThunk('auth/checkStatus', async (_, thunkAPI) => {
    try {
        const res = await axios.get('/api/auth/verify_token');
        const data = await res.data;
        if (res.status === 200) {
            return res.data.accountType as UserType;
        } else {
            return thunkAPI.rejectWithValue({ error: data });
        }
    } catch (err) {
        return thunkAPI.rejectWithValue({ error: 'Somethign went wrong when verifying.' });
    }
});

const refreshToken = createAsyncThunk('auth/refreshToken', async (_, thunkAPI) => {
    try {
        const res = await axios.get('/api/auth/refresh_token');
        const data = await res.data;
        if (res.status === 200) {
            return thunkAPI.dispatch(checkAuthStatus());
        } else {
            return thunkAPI.rejectWithValue({ error: data });
        }
    } catch (err) {
        return thunkAPI.rejectWithValue({ error: 'Something went wrong when refreshing token' });
    }
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            return { ...state, error: undefined, message: undefined };
        },
    },
    extraReducers: (builder) => {
        //Login cases
        builder.addCase(login.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.loggedIn = true;
            state.loading = false;
            state.user = action.payload;
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
        //Logout cases
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
        //Register cases
        builder.addCase(register.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(register.fulfilled, (state) => {
            state.loading = false;
            state.message = 'Registered succesfully. You may now proceed to login.';
        });
        builder.addCase(register.rejected, (state, action) => {
            const { payload } = action;
            state.loading = false;
            if (payload) {
                state.error = payload.error;
            } else {
                state.error = action.error.message;
            }
        });
        //Check auth status
        builder.addCase(checkAuthStatus.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(checkAuthStatus.fulfilled, (state, action) => {
            state.loading = false;
            state.loggedIn = true;
            state.user = action.payload;
        });
        builder.addCase(checkAuthStatus.rejected, (state) => {
            state.loading = false;
            state.loggedIn = false;
        });
        //Refresh token
        builder.addCase(refreshToken.fulfilled, (state, action) => ({
            ...state,
            loading: false,
            user: action.payload.payload as UserType,
        }));
        builder.addCase(refreshToken.pending, (state) => ({ ...state, loading: true }));
        builder.addCase(refreshToken.rejected, (state) => {
            state.loggedIn = false;
            state.loading = false;
        });
    },
});

export const { clearError } = authSlice.actions;

export { login, logout, register, refreshToken, checkAuthStatus };

export const selectAuthState = (state: RootState) => state.auth;
export const selectLoading = (state: RootState) => state.auth.loading;
export const selectLoggedIn = (state: RootState) => state.auth.loggedIn;
export const selectUserType = (state: RootState) => state.auth.user;

export default authSlice.reducer;
