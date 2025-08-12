/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AppDispatch } from "@/app/store";
import { logout } from "@/features/slice/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Logout() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { loading, error } = useSelector((state: any) => state.auth);

    useEffect(() => {
        dispatch(logout())
            .unwrap()
            .then(() => {
                navigate("/");
            })
            .catch(() => {
            });
    }, [dispatch, navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            {loading && <p className="text-lg">Logout...</p>}
            {error && <p className="text-red-500 mt-2">Error: {error}</p>}
        </div>
    );
}

export default Logout;
