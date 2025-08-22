/* eslint-disable @typescript-eslint/no-explicit-any */
import type { refreshTokenInterface } from "@/interfaces/auth.interface";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }: { email: string; password: string }, thunkAPI) => {
        try {
            const response = await axios.post(
                import.meta.env.VITE_SERVER_DOMAIN + "/auth/login-local",
                { email, password },
                { withCredentials: true }
            );

            return response.data;
        } catch (error: any) {
            const message = error.response?.status || 500;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
    try {
        await axios.post(
            import.meta.env.VITE_SERVER_DOMAIN + "/auth/logout",
            {},
            { withCredentials: true }
        );
        return true; // thành công
    } catch (error: any) {
        const message = error.response?.status || 500;
        return thunkAPI.rejectWithValue(message);
    }
});

interface AuthState {
    access_token: string | null;
    user: {
        id: string;
        name: string;
        email: string;
        avatar: string;
        role: string;
    } | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    access_token: null,
    user: null,
    loading: false,
    error: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setNewData: (state, action: PayloadAction<refreshTokenInterface>) => {
            state.access_token = action.payload.access_token;
            state.user = action.payload.user;
            state.loading = false;
        },
        updateUserProfile: (
            state,
            action: PayloadAction<{
                id: string | number;
                name: string;
                email: string;
                avatar: string;
                role: string;
            }>
        ) => {
            if (state.user) {
                state.user = {
                    ...state.user,
                    id: String(action.payload.id),
                    name: action.payload.name,
                    email: action.payload.email,
                    avatar: action.payload.avatar,
                    role: action.payload.role
                };
            }
        }
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.access_token = action.payload.access_token;
                state.user = action.payload.user;
            })
            .addCase(login.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload || "Login failed";
            })

            // Logout
            .addCase(logout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false;
                state.access_token = null;
                state.user = null;
                state.error = null;
            })
            .addCase(logout.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload || "Logout failed";
            });
    }
});

export const { setNewData, updateUserProfile } = authSlice.actions;
export default authSlice.reducer;
