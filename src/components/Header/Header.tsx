"use client";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { PiHandbagSimpleBold } from "react-icons/pi";
import AccountImage from "../../../public/images/Account.png";
import Logo from "../../../public/images/Logo.png";
import { MobileNav } from "../MobileNavbar/MobileNavbar";
import { toast } from "sonner";
import Logout from "@/api/user/logout";

const MenuItems = [
    {
        id: 1,
        title: "Home",
        href: "/",
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
    const router = useRouter()
    console.log("pathname: ", pathname);

    const { user, setUser, userLoading } = useAuth();
    const { cartItems } = useCart();
console.log("user is:",user);

    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const userId = user?._id;

    // Logout Function
    const handleLogout = async () => {
        router.push("/");
        try {
            const response = await Logout({ userId });
            console.log("The Logout Response is", response);

            if (response.statusCode === 200) {
                toast.success("User successfully Logout");
                localStorage.clear();
                setUser(null);
                document.cookie = "";
                router.refresh();
            }
        } catch (error) {
            console.log("The Error in Logout is:", error);
        }
    };

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
                    <Link href="/cart">
                        <div className="relative">
                            <PiHandbagSimpleBold
                                size={30}
                                className="text-[#323232]"
                            />
                            {cartItems && cartItems.length > 0 && (
                                <div className="h-[18px] w-[18px] absolute -bottom-[1.5px] -right-1 bg-[#323232] text-white font-medium flex items-center justify-center rounded-full">
                                    {cartItems.length}
                                </div>
                            )}
                        </div>
                    </Link>
                    {user ? (
                        <>
                            <DropdownMenu>
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
                                <DropdownMenuContent
                                    align="end"
                                    className="w-56 mt-4"
                                >
                                    <DropdownMenuItem className="py-1 font-semibold">
                                    {user?.firstName} {user?.lastName}
                                </DropdownMenuItem>
                                
                                <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        className="cursor-pointer"
                                        asChild
                                    >
                                        <Link href="/user-dashboard/profile">Profile</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="cursor-pointer"
                                        asChild
                                    >
                                        <Link href="/account/enrolled-courses">
                                            My Cart
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="cursor-pointer"
                                        asChild
                                    >
                                        <Link href="/admin-dashboard/products">
                                            Dashboard
                                        </Link>
                                    </DropdownMenuItem>

                                    <DropdownMenuItem
                                    onClick={handleLogout}
                                        className="cursor-pointer"
                                        asChild
                                    >
                                        <Link href="#">Logout</Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <>
                            <Link href="/login">
                                <Button className="font-semibold">Login</Button>
                            </Link>
                        </>
                    )}

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
