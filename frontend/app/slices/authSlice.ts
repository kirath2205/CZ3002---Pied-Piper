import { OrganizationWithPW } from '@/interfaces/Organization';
import { UserWithPW } from '@/interfaces/User';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '../store';

type UserType = 'ORG' | 'VOLUNTEER';

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

const login = createAsyncThunk<string, LoginBody, { rejectValue: ErrorMessage }>(
    'auth/login',
    async (loginBody, thunkAPI) => {
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
            return;
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
            thunkAPI.dispatch(checkAuthStatus());
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
        builder.addCase(register.fulfilled, (state, action) => {
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
        builder.addCase(checkAuthStatus.fulfilled, (state) => {
            state.loading = false;
            state.loggedIn = true;
        });
        builder.addCase(checkAuthStatus.rejected, (state) => {
            state.loading = false;
            state.loggedIn = false;
        });
        //Refresh token
        builder.addCase(refreshToken.fulfilled, (state) => ({ ...state, loading: false }));
        builder.addCase(refreshToken.pending, (state) => ({ ...state, loading: true }));
        builder.addCase(refreshToken.rejected, (state) => {
            state.loggedIn = false;
        });
    },
});

export const { clearError } = authSlice.actions;

export { login, logout, register, refreshToken, checkAuthStatus };

export const selectAuthState = (state: RootState) => state.auth;
export const selectLoading = (state: RootState) => state.auth.loading;
export const selectLoggedIn = (state: RootState) => state.auth.loggedIn;

export default authSlice.reducer;
