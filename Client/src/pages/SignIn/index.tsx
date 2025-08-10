import SignInBgLg from "@/assets/images/bg/SignInBgLg.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { validateInput } from "@/utils/validateInput";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { LoaderCircle } from "lucide-react";
import { login } from "@/features/slice/authSlice";
import type { AppDispatch } from "@/app/store";

function SignIn() {
    const dispatch = useDispatch<AppDispatch>();
    const [valueSignIn, setValueSignIn] = useState({
        email: "",
        password: ""
    });
    const [helpText, setHelpText] = useState("");
    const [loading, setLoading] = useState({
        local: false,
        google: false
    });

    useEffect(() => {
        document.title = "SignIn - EasySport";
    }, []);

    const handleChangeInput = (value: string, fieldName: string) => {
        setValueSignIn((prev) => ({ ...prev, [fieldName]: value }));
        setHelpText("");
    };

    const handleLoginLocal = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const email = valueSignIn.email;
        const password = valueSignIn.password;

        const validator = new validateInput();

        let isValid: string | boolean = validator.email(email);
        if (isValid !== true) {
            setHelpText(isValid);
            return;
        }
        isValid = validator.password(password);
        if (isValid !== true) {
            setHelpText(isValid);
            return;
        }

        await fetchLoginLocal();
    };

    const fetchLoginLocal = async () => {
        try {
            setLoading((prev) => ({ ...prev, local: true }));

            const { email, password } = valueSignIn;
            const data = await dispatch(login({ email, password })).unwrap();
            console.log(data);
            
            if (data.message === "success") {
                alert("Sign in successfully");

                return;
            }
        } catch (error) {
            if (error === 401) {
                setHelpText("Email or Password is wrong.");
                return;
            }
            setHelpText("Something went wrong. Please try again.");
        } finally {
            setLoading((prev) => ({ ...prev, local: false }));
        }
    };

    return (
        <div
            className="min-h-[900px] bg-cover bg-center relative"
            style={{ backgroundImage: `url(${SignInBgLg})` }}>
            {/* Overlay */}
            <div className="w-full h-full absolute inset-0 bg-black opacity-50"></div>

            {/* Form login - centered */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md px-6">
                <div className="bg-white p-8 rounded-lg shadow-2xl">
                    <h1 className="text-2xl font-semibold mb-6 text-center">Sign In</h1>

                    {/* Local login */}
                    <form className="space-y-4" onSubmit={handleLoginLocal}>
                        <Input
                            type="email"
                            placeholder="Email"
                            value={valueSignIn.email}
                            onChange={(e) => handleChangeInput(e.target.value, "email")}
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            value={valueSignIn.password}
                            onChange={(e) => handleChangeInput(e.target.value, "password")}
                        />
                        <span className="text-sm text-red-500 text-left">{helpText}</span>
                        {loading.local ? (
                            <Button className="mt-2 w-full h-10" size="icon">
                                <LoaderCircle className="animate-spin" />
                            </Button>
                        ) : (
                            <Button className="mt-2 w-full cursor-pointer h-10" type="submit">
                                Login
                            </Button>
                        )}
                    </form>
                    <div className="mt-3 flex justify-end items-start gap-2 text-gray-500 text-sm">
                        <a href="/forgot-password" className="hover:text-black">
                            Forgot password?
                        </a>
                    </div>

                    <div className="mb-5 mt-2 flex justify-center items-center w-full gap-2">
                        <hr className="w-full border-[1px] border-gray-200" />
                        <span className="mb-1 text-gray-500">or</span>
                        <hr className="w-full border-[1px] border-gray-200" />
                    </div>

                    {/* Google login */}
                    <div className="flex flex-col justify-start items-center gap-2 w-full">
                        {loading.google ? (
                            <Button className="w-full flex justify-center items-center border-[1px] h-10">
                                <LoaderCircle className="animate-spin" />
                            </Button>
                        ) : (
                            <Button
                                variant="ghost"
                                className="w-full flex justify-center items-center border-[1px] h-10 cursor-pointer">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="100"
                                    height="100"
                                    viewBox="0 0 48 48">
                                    <path
                                        fill="#FFC107"
                                        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                    <path
                                        fill="#FF3D00"
                                        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                                    <path
                                        fill="#4CAF50"
                                        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                                    <path
                                        fill="#1976D2"
                                        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                </svg>
                                Continue with Google
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
