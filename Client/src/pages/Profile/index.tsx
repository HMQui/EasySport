import ProfileBgLg from "@/assets/images/bg/ProfileBgLg.avif";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import { Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { updateUserProfileApi } from "@/api/user.api";
import Loading from "@/components/ui/loading";
import { updateUserProfile } from "@/features/slice/authSlice";

function Profile() {
    const dispatch = useDispatch();
    const inputImgRef = useRef<HTMLInputElement>(null);
    const userData = useSelector((state: RootState) => state.auth.user);
    const [dataUpdate, setDataUpdate] = useState<{
        image: File | null;
        name: string;
    }>({
        image: null,
        name: userData?.name || ""
    });
    const [isChanged, setIsChanged] = useState<boolean>(false);
    const [helpText, setHelpText] = useState<{ error: string; success: string }>({
        error: "",
        success: ""
    });
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        document.title = "Profile - EasySport";
    }, []);

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>, field: string) => {
        setHelpText({
            error: "",
            success: ""
        });
        const newData = { ...dataUpdate };

        if (field === "image") {
            newData.image = e.currentTarget.files?.[0] || null;
        } else if (field === "name") {
            newData.name = e.target.value;
        }

        setDataUpdate(newData);

        if (userData?.name.trim() !== newData.name.trim() || newData.image !== null) {
            setIsChanged(true);
        } else {
            setIsChanged(false);
        }
    };

    const handleCancelChangeInput = (field: string = "all") => {
        setHelpText({
            error: "",
            success: ""
        });
        const newData = { ...dataUpdate };

        if (field === "all") {
            newData.name = userData?.name || "";
            newData.image = null;
        } else {
            if (field === "name") newData.name = userData?.name || "";
            else if (field === "image") newData.image = null;
        }

        setDataUpdate(newData);

        if (userData?.name.trim() !== newData.name.trim() || newData.image !== null) {
            setIsChanged(true);
        } else {
            setIsChanged(false);
        }
    };

    const handleUpdate = async () => {
        const formUpdate = new FormData();
        if (!dataUpdate.name.trim() && dataUpdate.image === null) {
            setDataUpdate({ name: userData?.name || "", image: null });
            return;
        }

        if (dataUpdate.name.trim()) {
            formUpdate.append("name", dataUpdate.name.trim());
        }

        if (dataUpdate.image) {
            formUpdate.append("image", dataUpdate.image);
        }

        try {
            setLoading(true);
            const res = await updateUserProfileApi(formUpdate, Number(userData?.id));

            if (res.message === "success") {
                dispatch(
                    updateUserProfile({
                        id: res.user.id,
                        name: res.user.name,
                        email: res.user.email,
                        avatar: res.user.avatar,
                        role: res.user.role
                    })
                );
                setHelpText({ error: "", success: "Profile updated successfully!" });
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.response) {
                const status = error.response.status;

                if (status === 400) {
                    setHelpText({ error: "Invalid request. Please check your data.", success: "" });
                } else if (status === 401) {
                    setHelpText({ error: "Unauthorized. Please login again.", success: "" });
                } else if (status === 403) {
                    setHelpText({
                        error: "Forbidden. You are not allowed to update this field.",
                        success: ""
                    });
                } else if (status === 404) {
                    setHelpText({ error: "User not found.", success: "" });
                } else {
                    setHelpText({
                        error: "Something went wrong. Please try again later.",
                        success: ""
                    });
                }
            } else {
                setHelpText({ error: "Network error. Please check your connection.", success: "" });
            }
        } finally {
            setLoading(false);
            setDataUpdate({
                name: userData?.name || "",
                image: null
            });
            setIsChanged(false);
        }
    };

    return (
        <>
            <div
                className="min-h-[900px] bg-cover bg-center relative overflow-y-hidden"
                style={{ backgroundImage: `url(${ProfileBgLg})` }}>
                {/* Overlay */}
                <div className="w-full h-full absolute inset-0 bg-black opacity-70"></div>
                <div className="pt-3 pb-10 md:px-6 px-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[95%] md:min-w-3/4 md:max-w-5/6 min-h-fit max-h-5/6 bg-white shadow-2xl rounded-2xl overflow-y-auto">
                    {/* Header */}
                    <div className="flex justify-between items-center w-full">
                        <div className="flex flex-col justify-start items-start">
                            <h1 className="text-lg font-semibold">Profile</h1>
                            <p className="text-sm text-gray-500">
                                Setting for your personal profile
                            </p>
                        </div>
                        <div>
                            <Button
                                variant="ghost"
                                className="mr-2 cursor-pointer"
                                onClick={() => handleCancelChangeInput()}>
                                Cancel
                            </Button>
                            <Button
                                disabled={!isChanged}
                                className={`cursor-pointer transition-colors duration-200 ${
                                    isChanged
                                        ? "cursor-pointer"
                                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                }`}
                                onClick={handleUpdate}>
                                Save changes
                            </Button>
                        </div>
                    </div>

                    <hr className="my-4 w-full" />

                    {/* Main */}
                    <div className="flex flex-col justify-start items-start w-full">
                        {/* Avatar */}
                        <div className="inline-block w-full">
                            <h2 className="mb-2 text-lg font-normal">Profile picture</h2>
                            <div className="flex justify-between items-center w-full">
                                <div className="flex justify-start items-center gap-4">
                                    <img
                                        src={userData?.avatar}
                                        alt="Avatat"
                                        className="w-14 h-14 rounded-full"
                                    />
                                    <div className="flex flex-col justify-start items-start">
                                        <p className="text-lg font-semibold">{userData?.name}</p>
                                        <p className="text-xs text-gray-500">
                                            Workspace {userData?.role}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center items-center">
                                    {dataUpdate.image !== null ? (
                                        <div className="flex flex-col justify-start items-start relative min-w-[100px] max-w-[350px] px-2 py-1 text-lg">
                                            <span>Your file name:</span>
                                            <div>
                                                <span>{dataUpdate.image.name}</span>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="hover:bg-transparent cursor-pointer text-red-500 hover:text-red-800 font-bold"
                                                    onClick={() =>
                                                        handleCancelChangeInput("image")
                                                    }>
                                                    <X size={80} className="text-red-500" />{" "}
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div
                                            className="px-2 py-1 border-2 border-gray-300 text-sm rounded-md cursor-pointer"
                                            onClick={() => {
                                                inputImgRef.current?.click();
                                            }}>
                                            <span className="flex justify-center items-center gap-1 font-semibold text-gray-500">
                                                <Upload size="14" /> Upload photo
                                            </span>
                                            <Input
                                                type="file"
                                                className="hidden"
                                                ref={inputImgRef}
                                                onChange={(e) => handleChangeInput(e, "image")}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Noitce */}
                        <div className="my-7 px-5 py-3 border-2 border-purple-500 w-fit h-fit flex justify-start items-center gap-2 rounded-xl bg-purple-50">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                width="20"
                                height="20"
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
                            <p className="text-purple-950 opacity-60">
                                This account can connect to your Google account. Your email can not
                                be changed.
                            </p>
                        </div>

                        {/* Others fields */}
                        <div className="inline-block w-full">
                            <Label htmlFor="name" className="mb-2">
                                Full name
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                value={dataUpdate.name}
                                onChange={(e) => handleChangeInput(e, "name")}
                            />

                            <Label htmlFor="email" className="mb-2 mt-7">
                                Email address
                            </Label>
                            <Input
                                id="email"
                                type="text"
                                name="email"
                                disabled
                                defaultValue={userData?.email}
                            />

                            <Label htmlFor="email" className="mb-2 mt-7">
                                Role
                            </Label>
                            <Input
                                id="email"
                                type="text"
                                name="email"
                                disabled
                                defaultValue={userData?.role.toLocaleUpperCase()}
                            />
                        </div>
                    </div>

                    {/* Help text */}
                    {helpText.error && (
                        <p className="mt-2 text-sm text-red-500 font-medium">{helpText.error}</p>
                    )}

                    {helpText.success && (
                        <p className="mt-2 text-sm text-green-600 font-medium">
                            {helpText.success}
                        </p>
                    )}
                </div>
            </div>

            {loading && <Loading />}
        </>
    );
}

export default Profile;
