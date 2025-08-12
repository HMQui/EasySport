/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import type { refreshTokenInterface } from "@/interfaces/auth.interface";
import { Menu, ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Header() {
    const authData: refreshTokenInterface = useSelector((state: any) => state.auth);

    return (
        <>
            {/* PC header */}
            <header className="px-16 md:flex hidden justify-between items-center min-h-24 max-h-26 w-screen bg-white shadow-2xs fixed z-50">
                <Link to="/">
                    <h1 className="text-3xl font-bold">Easy Sport</h1>
                </Link>
                <nav>
                    <ul className="flex justify-end items-center gap-8">
                        <li>
                            <Link
                                to="/fields"
                                className="py-2 px-3 text-lg font-semibold bg-transparent hover:bg-gray-50 rounded-xl">
                                Discover
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/policy"
                                className="py-2 px-3 text-lg font-semibold bg-transparent hover:bg-gray-50 rounded-xl">
                                Policy
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/about"
                                className="py-2 px-3 text-lg font-semibold bg-transparent hover:bg-gray-50 rounded-xl">
                                About
                            </Link>
                        </li>
                        {authData.access_token ? (
                            <>
                                <li>
                                    <Link to="/logout">
                                        <Button
                                            variant="outline"
                                            className="cursor-pointer text-lg">
                                            Logout
                                        </Button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/profile">
                                        <Button
                                            variant="ghost"
                                            className="w-12 h-12 rounded-full p-0 overflow-hidden cursor-pointer">
                                            <img
                                                src={authData.user.avatar}
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                            />
                                        </Button>
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/sign-in">
                                        <Button
                                            variant="outline"
                                            className="cursor-pointer text-lg">
                                            Sign In
                                        </Button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/sign-up">
                                        <Button className="cursor-pointer text-lg">Sign Up</Button>
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </header>

            {/* Mobile header */}
            <header className="px-3 py-4 md:hidden flex justify-start items-center gap-5 bg-white w-screen shadow-2xs fixed z-50">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu />
                        </Button>
                    </SheetTrigger>

                    <SheetContent side="left" className="w-72">
                        <nav className="flex flex-col gap-4 mt-4">
                            <div className="py-5 px-2 flex flex-col justify-start items-start gap-2 w-full">
                                {authData.access_token && (
                                    <>
                                        <Link
                                            to="/profile"
                                            className="p-2 border-b-2 w-full flex justify-between items-center">
                                            <span className=" font-semibold">Your profile</span>
                                            <Button size="icon" variant="outline">
                                                <ChevronRight />
                                            </Button>
                                        </Link>
                                    </>
                                )}
                                <Link
                                    to="/fields"
                                    className="p-2 border-b-2 w-full flex justify-between items-center">
                                    <span className=" font-semibold">Discover</span>
                                    <Button size="icon" variant="outline">
                                        <ChevronRight />
                                    </Button>
                                </Link>
                                <Link
                                    to="/policy"
                                    className="p-2 border-b-2 w-full flex justify-between items-center">
                                    <span className=" font-semibold">Policy</span>
                                    <Button size="icon" variant="outline">
                                        <ChevronRight />
                                    </Button>
                                </Link>
                                <Link
                                    to="/about"
                                    className="p-2 border-b-2 w-full flex justify-between items-center">
                                    <span className=" font-semibold">About</span>
                                    <Button size="icon" variant="outline">
                                        <ChevronRight />
                                    </Button>
                                </Link>
                                {authData.access_token ? (
                                    <>
                                        <div className="p-2 w-full flex justify-between items-center">
                                            <Link to="/logout" className="w-full">
                                                <Button className="cursor-pointer w-full h-10">
                                                    Logout
                                                </Button>
                                            </Link>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="p-2 w-full flex justify-between items-center">
                                            <Link to="/sign-in" className="w-full">
                                                <Button
                                                    variant="outline"
                                                    className="cursor-pointer w-full h-10">
                                                    Sign In
                                                </Button>
                                            </Link>
                                        </div>
                                        <div className="p-2 w-full flex justify-between items-center">
                                            <Link to="/sign-up" className="w-full">
                                                <Button className="cursor-pointer w-full h-10">
                                                    Sign Up
                                                </Button>
                                            </Link>
                                        </div>
                                    </>
                                )}
                            </div>
                        </nav>
                    </SheetContent>
                </Sheet>

                <h1 className="text-xl font-bold text-center">
                    <Link to="/">Easy Sport</Link>
                </h1>
            </header>
        </>
    );
}

export default Header;
