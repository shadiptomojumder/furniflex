import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import type { Metadata } from "next";
import React from "react";
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
                <section className="md:px-5">{children}</section>
            </main>
            <Footer />
        </>
    );
}
