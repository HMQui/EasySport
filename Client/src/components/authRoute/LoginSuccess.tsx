import { fecthRefreshToken } from "@/api/auth.api";
import { setNewData } from "@/features/slice/authSlice";
import type { refreshTokenInterface } from "@/interfaces/auth.interface";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

function LoginSuccess() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                const dataRes: refreshTokenInterface = await fecthRefreshToken();
                dispatch(setNewData(dataRes));
                navigate("/");
            } catch (error) {
                console.error("Refresh token failed:", error);
                navigate("/sign-in");
            } finally {
                setLoading(false);
            }
        };

        fetch();
    }, [dispatch, navigate]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
                <Card className="p-6 shadow-xl w-[320px] text-center border border-slate-200">
                    <CardContent className="flex flex-col items-center gap-3">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                        <h2 className="text-lg font-semibold text-slate-700">Sign in...</h2>
                        <p className="text-sm text-slate-500">Please wait a minute.</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return null;
}

export default LoginSuccess;
