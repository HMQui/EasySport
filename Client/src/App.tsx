import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "@/components/LayOut";
import { Home, Profile, SignIn, SignUp } from "@/pages";
import { GuessRoute, ProtectedRoute } from "@/components/guardRoute";
import { useEffect } from "react";
import { fecthRefreshToken } from "@/api/auth.api";
import { useDispatch } from "react-redux";
import { setNewData } from "@/features/slice/authSlice";
import { LoginSuccess, Logout } from "@/components/authRoute";

function App() {
    const dispatch = useDispatch();

    // Check refresh token
    useEffect(() => {
        const handleRefreshToken = async () => {
            const refreshData = await fecthRefreshToken();
            dispatch(setNewData(refreshData));
        };

        handleRefreshToken();
    }, [dispatch]);

    return (
        <BrowserRouter>
            <Routes>
                {/* User routes */}
                <Route element={<MainLayout />}>
                    {/* Public routes */}
                    <Route path="/" element={<Home />} />

                    {/* Guess routes */}
                    <Route element={<GuessRoute />}>
                        <Route path="/login-success" element={<LoginSuccess />} />
                        <Route path="/sign-in" element={<SignIn />} />
                        <Route path="/sign-up" element={<SignUp />} />
                    </Route>

                    {/* Protected routes */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                </Route>

                {/* Admin routes */}
                {/* <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="settings" element={<Settings />} />
                </Route> */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
