import { Outlet } from "react-router-dom";
import Header from "@/components/partial/Header";
import Footer from "@/components/partial/Footer";

export default function MainLayout() {
    return (
        <>
            <Header />
            <main className="min-h-screen px-4 py-6">
            <Outlet />
            </main>
            <Footer />
        </>
    );
}
