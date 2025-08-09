import axios from "axios";
import { store } from "@/app/store";
import { logout, setAccessToken } from "@/features/slice/authSlice";

const axiosAuth = axios.create({
    baseURL: import.meta.env.VITE_SERVER_DOMAIN,
    withCredentials: true
});

axiosAuth.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.access_token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosAuth.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshResponse = await axios.post(
                    "/auth/refresh-token",
                    {},
                    { withCredentials: true }
                );

                const newAccessToken = refreshResponse.data.access_token;
                store.dispatch(setAccessToken(newAccessToken));

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosAuth(originalRequest);
            } catch (refreshError) {
                store.dispatch(logout());
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosAuth;
