import type { Metadata } from "next";
import React from "react";
import Sidebar from "./UserDashboardComponents/Sidebar/Sidebar";
import Header from "@/components/Header/Header";

export const metadata: Metadata = {
    title: "Lalon Store",
    description: "created by shadipto",
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
        <Header/>
        <main className={`bg-white py-10 relative`}>
            <section className="overflow-auto min-h-[80dvh] container">
                <div className="flex gap-6 pb-20">
                    <Sidebar></Sidebar>
                    <div className="w-full overflow-auto border bg-white rounded-lg">
                        {children}
                    </div>
                </div>
            </section>
        </main>
        </>
    );
}
