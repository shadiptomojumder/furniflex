import Header from "@/components/Header/Header";
import type { Metadata } from "next";
import React from "react";
import SideMenuBar from "./_components/SideMenuBar/SideMenuBar";
import Footer from "@/components/Footer/Footer";
export const metadata: Metadata = {
    title: "FurniFlex - Best furniture of the town",
    description: "Furniture",
};

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            <main className={`bg-white py-10 relative`}>
                <section className="md:px-5 overflow-auto min-h-[80dvh] container">
                    <div className="flex gap-6 pb-20">
                        <SideMenuBar />
                        <div className="w-full overflow-auto bg-white">
                            {children}
                        </div>
                    </div>
                </section>
            </main>
            <Footer/>
        </>
    );
}
