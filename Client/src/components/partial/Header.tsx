import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronRight } from "lucide-react";

function Header() {
    return (
        <>
            {/* PC header */}
            <header className="px-16 md:flex hidden justify-between items-center min-h-24 max-h-26 w-screen bg-white shadow-2xs fixed z-50">
                <a href="/">
                    <h1 className="text-3xl font-bold">Easy Sport</h1>
                </a>
                <nav>
                    <ul className="flex justify-end items-center gap-8">
                        <li>
                            <a
                                href="/fields"
                                className="py-2 px-3 text-lg font-semibold bg-transparent hover:bg-gray-50 rounded-xl">
                                Discover
                            </a>
                        </li>
                        <li>
                            <a
                                href="/policy"
                                className="py-2 px-3 text-lg font-semibold bg-transparent hover:bg-gray-50 rounded-xl">
                                Policy
                            </a>
                        </li>
                        <li>
                            <a
                                href="/about"
                                className="py-2 px-3 text-lg font-semibold bg-transparent hover:bg-gray-50 rounded-xl">
                                About
                            </a>
                        </li>
                        <li>
                            <a href="/sign-in">
                                <Button variant="secondary" className="cursor-pointer text-lg">
                                    Sign In
                                </Button>
                            </a>
                        </li>
                        <li>
                            <a href="/sign-up">
                                <Button className="cursor-pointer text-lg">Sign Up</Button>
                            </a>
                        </li>
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
                                <a
                                    href="/fields"
                                    className="p-2 border-b-2 w-full flex justify-between items-center">
                                    <span className=" font-semibold">Discover</span>
                                    <Button size="icon" variant="secondary">
                                        <ChevronRight />
                                    </Button>
                                </a>
                                <a
                                    href="/policy"
                                    className="p-2 border-b-2 w-full flex justify-between items-center">
                                    <span className=" font-semibold">Policy</span>
                                    <Button size="icon" variant="secondary">
                                        <ChevronRight />
                                    </Button>
                                </a>
                                <a
                                    href="/about"
                                    className="p-2 border-b-2 w-full flex justify-between items-center">
                                    <span className=" font-semibold">About</span>
                                    <Button size="icon" variant="secondary">
                                        <ChevronRight />
                                    </Button>
                                </a>
                                <div className="p-2 w-full flex justify-between items-center">
                                    <a href="/sign-in" className="w-full">
                                        <Button
                                            variant="secondary"
                                            className="cursor-pointer w-full h-10">
                                            Sign In
                                        </Button>
                                    </a>
                                </div>
                                <div className="p-2 w-full flex justify-between items-center">
                                    <a href="/sign-up" className="w-full">
                                        <Button className="cursor-pointer w-full h-10">
                                            Sign Up
                                        </Button>
                                    </a>
                                </div>
                            </div>
                        </nav>
                    </SheetContent>
                </Sheet>

                <h1 className="text-xl font-bold text-center">
                    <a href="/">Easy Sport</a>
                </h1>
            </header>
        </>
    );
}

export default Header;
