/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosAuth from "@/lib/axiosAuth";

const updateUserProfileApi = async (dataUpdate: any, userId: number) => {
    const res = await axiosAuth.patch(`/user/update/${userId}`, dataUpdate, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

    return res.data;
};

export { updateUserProfileApi };
