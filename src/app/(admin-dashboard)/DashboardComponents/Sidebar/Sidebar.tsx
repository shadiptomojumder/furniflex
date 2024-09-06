"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { ArrowLeftToLine, Boxes, LayoutList, PackagePlus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BiArrowToRight } from "react-icons/bi";

const QuickLinks = [
    {
        id: 4,
        title: "Products",
        link: "/admin-dashboard/products",
        icon: <Boxes size={25} />,
    },
    {
        id: 3,
        title: "Create Product",
        link: "/admin-dashboard/create-product",
        icon: <PackagePlus size={25} />,
    },

    {
        id: 4,
        title: "Orders",
        link: "/admin-dashboard/orders",
        icon: <LayoutList size={25} />,
    },
];

const Sidebar = () => {
    const pathname = usePathname();
    const [showSideBar, setShowSideBar] = useState<boolean>(false);

    const { user, setUser, userLoading } = useAuth();

    const sideBarRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: any) => {
        if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
            setShowSideBar(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Here logic of when menu is open the scrollbar willbe disable
    useEffect(() => {
        if (showSideBar) {
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "scroll";
        }
        return () => {
            document.body.style.overflowY = "scroll";
        };
    }, [showSideBar]);

    return (
        <>
            {/* This is for big screens */}
            <main className="bg-white min-w-[288px] h-[80dvh] rounded-lg hidden lg:block border">
                <h2 className="text-xl font-semibold px-5 pt-10 pb-4 mb-3 border-b-2 border-primary">
                    Navigation
                </h2>
                {/* All the Links */}
                {userLoading ? (
                    <section className="space-y-2">
                        {Array.from({ length: 6 }, (_, index) => (
                            <Skeleton
                                key={index}
                                className="w-full h-[35px] rounded-none bg-gray-300"
                            />
                        ))}
                    </section>
                ) : (
                    <>
                        <section className="space-y-2">
                            {QuickLinks.map((item) => {
                                const isActive = pathname === item.link;
                                return (
                                    <Link
                                        href={`${item.link}`}
                                        key={item.id}
                                        className="block"
                                    >
                                        <div
                                            className={
                                                isActive
                                                    ? "py-2 px-4 cursor-pointer flex items-center gap-2 bg-primary-foreground border-l-2 border-primary hover:text-primary transition-all ease-in-out duration-300"
                                                    : "py-2 px-4 cursor-pointer bg-white group flex items-center gap-2 hover:bg-primary-foreground border-l-2 border-transparent hover:border-primary hover:text-primary transition-all ease-in-out duration-300"
                                            }
                                        >
                                            {item.icon && (
                                                <div
                                                    className={`flex items-center gap-2 group-hover:text-primary transition-all ease-in-out duration-300 ${isActive ? "text-primary" : "text-[#040D12]"}`}
                                                >
                                                    {item.icon}
                                                </div>
                                            )}
                                            <h2
                                                className={
                                                    isActive
                                                        ? "text-primary font-semibold capitalize transition-all ease-in-out duration-300"
                                                        : "text-[#040D12] font-semibold group-hover:text-primary capitalize transition-all ease-in-out duration-300"
                                                }
                                            >
                                                {item.title}
                                            </h2>
                                        </div>
                                    </Link>
                                );
                            })}
                        </section>
                    </>
                )}
            </main>

            {/* This is for small screens */}
            <main
                ref={sideBarRef}
                className={`px-0 py-10 transition-all lg:hidden md:min-w-[288px] min-w-[150px] flex flex-col justify-between h-[100dvh] z-[500] absolute bg-white border-r-2 ${
                    showSideBar ? "top-[0%] left-0" : "top-0 -left-[95%]"
                }`}
            >
                {/* All the Links */}

                {userLoading ? (
                    <section className="space-y-3">
                        {Array.from({ length: 6 }, (_, index) => (
                            <Skeleton
                                key={index}
                                className="w-full h-[35px] rounded-none bg-gray-300"
                            />
                        ))}
                    </section>
                ) : (
                    <>
                        <section className="space-y-2">
                            {QuickLinks.map((item) => {
                                const isActive = pathname === item.link;
                                return (
                                    <Link
                                        onClick={() => setShowSideBar(false)}
                                        href={`${item.link}`}
                                        key={item.id}
                                        className="block"
                                    >
                                        <div
                                            className={
                                                isActive
                                                    ? "py-2 px-4 cursor-pointer flex items-center gap-2 bg-[#edf2ee] border-l-2 border-primary hover:text-primary transition-all ease-in-out duration-300"
                                                    : "py-2 px-4 cursor-pointer bg-white group flex items-center gap-2 hover:bg-[#edf2ee] border-l-2 border-transparent hover:border-primary hover:text-primary transition-all ease-in-out duration-300"
                                            }
                                        >
                                            {item.icon && (
                                                <div
                                                    className={`flex items-center gap-2 group-hover:text-primary transition-all ease-in-out duration-300 ${isActive ? "text-primary" : "text-[#040D12]"}`}
                                                >
                                                    {item.icon}
                                                </div>
                                            )}
                                            <h2
                                                className={
                                                    isActive
                                                        ? "text-primary font-semibold capitalize transition-all ease-in-out duration-300"
                                                        : "text-[#040D12] font-semibold group-hover:text-primary capitalize transition-all ease-in-out duration-300"
                                                }
                                            >
                                                {item.title}
                                            </h2>
                                        </div>
                                    </Link>
                                );
                            })}
                        </section>
                    </>
                )}

                {/* sidebar close button */}
                <div
                    onClick={() => setShowSideBar(false)}
                    className="mx-2 md:mb-20 mb-10"
                >
                    <Button className="hover:bg-primary bg-[#b7e7c1] w-full gap-1 font-semibold text-sm shadow-md">
                        <ArrowLeftToLine className="text-gray-950" />
                        Close
                    </Button>
                </div>
            </main>

            <div
                className={`w-dvw h-dvh lg:hidden transition-all z-[400] backdrop-blur-sm bg-black bg-opacity-5 fixed left-0 top-0 ${
                    showSideBar ? "opacity-100" : "hidden"
                }`}
            ></div>

            <div
                onClick={() => setShowSideBar(!showSideBar)}
                className={`w-7 h-14 bg-[#b7e7c1] transition-all duration-300 flex items-center z-[480] justify-center rounded-r-lg lg:hidden fixed left-0 top-1/2 -translate-y-1/2 ${
                    showSideBar ? "scale-0" : "scale-100"
                }`}
            >
                <BiArrowToRight className="text-2xl text-gray-950 font-bold" />
            </div>
        </>
    );
};

export default Sidebar;
