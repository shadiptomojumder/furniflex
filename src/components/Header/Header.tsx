"use client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import AccountImage from "../../../public/images/Account.png";
import Logo from "../../../public/images/Logo.png";
import { MobileNav } from "../MobileNavbar/MobileNavbar";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

const MenuItems = [
    {
        id: 1,
        title: "Home",
        href: "",
    },
    {
        id: 2,
        title: "Products",
        href: "/products",
    },
    {
        id: 3,
        title: "Categories",
        href: "/categories",
    },
    {
        id: 4,
        title: "Custom",
        href: "/custom",
    },
    {
        id: 5,
        title: "Blog",
        href: "/blog",
    },
];

export default function Header() {
    const pathname = usePathname();
    console.log("pathname: " , pathname);
    
    const { user, setUser, userLoading } = useAuth();

    const [showMobileMenu, setShowMobileMenu] = useState(false);

    return (
        <header className="py-[40px] border-b">
            <section className="container flex justify-between items-center">
            <div className="flex gap-6 lg:gap-10">
                <Link href="/">
                    <Image
                        src={Logo}
                        alt="Furniflex"
                        width={135}
                        height={100}
                        className="w-[135px] h-auto"
                    />
                </Link>

                {showMobileMenu && MenuItems && <MobileNav></MobileNav>}
            </div>
            <div>
                {MenuItems?.length ? (
                    <nav className="hidden gap-6 lg:flex">
                        {MenuItems?.map((item: any, index: number) => {
                            const isActive = pathname == item.href;
                            return (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className={`flex items-center ${isActive ? "bg-[#F8F8F8] font-semibold" : "font-medium"}  px-5 py-2 rounded-md text-lg text-[#202020] hover:text-foreground/80`}
                                >
                                    {item.title}
                                </Link>
                            );
                        })}
                    </nav>
                ) : null}
            </div>
            <nav className="flex items-center gap-3">
                {
                    user ? <><DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="cursor-pointer">
                            <Image
                                src={AccountImage}
                                alt="image"
                                width={40}
                                height={40}
                                className="w-[40px] h-[40px] rounded-full"
                            />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 mt-4">
                        <DropdownMenuItem className="cursor-pointer" asChild>
                            <Link href="/account">Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" asChild>
                            <Link href="/account/enrolled-courses">
                                My Cart
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" asChild>
                            <Link href="/admin-dashboard">Dashboard</Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem className="cursor-pointer" asChild>
                            <Link href="#">Logout</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu></>:<><Link href="/login"><Button>Login</Button></Link></>
                }
                
                <button
                    className="flex items-center space-x-2 p-2 z-40 lg:hidden"
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                >
                    {showMobileMenu ? (
                        <X size={30} color="#202020" />
                    ) : (
                        <Menu size={30} color="#202020" />
                    )}
                </button>
            </nav>
            </section>
        </header>
    );
}
