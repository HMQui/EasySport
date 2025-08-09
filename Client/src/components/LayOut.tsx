import { Outlet } from "react-router-dom";
import Header from "@/components/partial/Header";
import Footer from "@/components/partial/Footer";

export default function MainLayout() {
    return (
        <>
            <Header />
            <main className="min-h-screen pt-16 md:pt-24">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}
