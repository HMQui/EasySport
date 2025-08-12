import type { refreshTokenInterface } from "@/interfaces/auth.interface";
import axiosPublic from "@/lib/axiosPublic";

export const fetchVerifyEmail = async (email: string): Promise<string> => {
    const res = await axiosPublic.post("/auth/verify-email", {
        email,
        purpose: "verify email"
    });
    return res.data.verify_code;
};

export const fecthRefreshToken = async (): Promise<refreshTokenInterface> => {
    const res = await axiosPublic.post("/auth/refresh-token");

    return res.data;
};
