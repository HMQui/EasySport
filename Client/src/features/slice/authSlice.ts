/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }: { email: string; password: string }, thunkAPI) => {
        try {
            const response = await axios.post(
                "/api/auth/login",
                { email, password },
                { withCredentials: true }
            );

            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Login failed");
        }
    }
);

interface AuthState {
    access_token: string | null;
    user: {
        id: string;
        name: string;
        email: string;
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
        logout: (state) => {
            state.access_token = null;
            state.user = null;
            state.error = null;
        },

        setAccessToken: (state, action: PayloadAction<string>) => {
            state.access_token = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
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
            });
    }
});

export const { logout, setAccessToken } = authSlice.actions;
export default authSlice.reducer;
