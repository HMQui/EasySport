/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function GuessRoute() {
    const authData = useSelector((state: any) => state?.auth);

    if (authData?.access_token) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

export default GuessRoute;
