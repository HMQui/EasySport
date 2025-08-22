/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/components/ui/loading";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function GuessRoute() {
    const authData = useSelector((state: any) => state?.auth);
    console.log(authData);
    
    if (authData.loading) {
        return <Loading />;
    }

    if (authData?.access_token) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

export default GuessRoute;
