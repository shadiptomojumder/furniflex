import { Toaster } from "@/components/ui/sonner";
import AuthContextProvider from "@/context/AuthContext/AuthContext";
import TanstackProvider from "@/TanstackProvider/TanstackProvider";
import type { Metadata } from "next";
import { Barlow, Inter } from "next/font/google";
import { Suspense } from "react";

import { CartContextProvider } from "@/context/CartContext/CartContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const barlow = Barlow({
    weight: ["100", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "FurniFlex - Best furniture of the town",
    description: "Furniture",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={barlow.className}>
                <TanstackProvider>
                    <AuthContextProvider>
                        <CartContextProvider>
                            {/* <Header /> */}
                            <Suspense
                                fallback={<div className="w-dvh h-dvh"></div>}
                            >
                                {children}
                            </Suspense>
                            {/* <Footer /> */}
                            {/* <CartForMobile></CartForMobile> */}
                            <Toaster richColors />
                        </CartContextProvider>
                    </AuthContextProvider>
                </TanstackProvider>
            </body>
        </html>
    );
}
