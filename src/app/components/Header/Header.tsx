"use client";
import Logout from "@/api/user/logout";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { AlignLeft, ChevronRight, CircleUserRound, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { toast } from "sonner";

const categoryList = [
    {
        id: 1,
        categoryName: "spices",
        categoryTitle: "Spices",
        link: "spices",
    },
    {
        id: 2,
        categoryName: "salt_sugar",
        categoryTitle: "Salt & Sugar",
        link: "salt-sugar",
    },
    {
        id: 3,
        categoryName: "rice",
        categoryTitle: "Rice",
        link: "rice",
    },
    {
        id: 4,
        categoryName: "dal",
        categoryTitle: "Dal",
        link: "dal",
    },
    {
        id: 5,
        categoryName: "readymix",
        categoryTitle: "Ready Mix",
        link: "ready-mix",
    },
    {
        id: 6,
        categoryName: "shemai_suji",
        categoryTitle: "Shemai & Suji",
        link: "shemai-suji",
    },
    {
        id: 7,
        categoryName: "oil",
        categoryTitle: "Oil",
        link: "oil",
    },
];

const Header = () => {
    const { user, setUser, userLoading } = useAuth();
    //console.log("The User is ", user);
    //console.log("The userLoading is ", userLoading);
    const { cartItems, addToCart, removeFromCart, updateCartItem, clearCart } =
        useCart();
    const pathname = usePathname();
    const router = useRouter();
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

    const [searchText, setSearchText] = useState("");

    const handleSearch = (searchValue: string) => {
        setSearchText(searchValue);
        //console.log("Search Text is:", searchText);
        router.push(`/search?q=${searchText}`);
    };

    const [isOpen, setIsOpen] = useState<boolean>(false);
    //console.log("menu is open", isOpen);

    const menuItemRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: any) => {
        if (
            menuItemRef.current &&
            !menuItemRef.current.contains(event.target)
        ) {
            setIsOpen(false);
        }
    };
    useEffect(() => {
        if (isOpen) {
            document.addEventListener("click", handleClickOutside);
            document.body.style.overflowY = "hidden";
        } else {
            document.removeEventListener("click", handleClickOutside);
            document.body.style.overflowY = "scroll";
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
            document.body.style.overflowY = "scroll";
        };
    }, [isOpen]);

    return (
        <header className="bg-white py-2 shadow-md">
            <section className="container flex items-center justify-between">
                <Link href={"/"} className="hidden md:block">
                    <h2 className="md:text-2xl sm:text-xl text-lg font-extrabold dark:text-primary text-nowrap">
                        Lalon Store
                    </h2>
                </Link>
                <div className="flex items-center gap-[2px] md:hidden">
                    <AlignLeft
                        onClick={() => setIsOpen(!isOpen)}
                        size={28}
                        className="text-black"
                    />
                    <Link href={"/"}>
                        <h2 className="md:text-2xl uppercase italic sm:text-xl text-lg font-extrabold dark:text-primary text-nowrap">
                            Store
                        </h2>
                    </Link>
                </div>

                {/* <div className="w-[50%] hidden">
                    <Input
                        type="text"
                        placeholder="Search your products"
                        className="p-2 focus-visible:ring-primary sm:h-10 h-fit text-xs"
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div> */}
                <div className="w-[50%] flex items-center border border-primary rounded-full sm:rounded-lg overflow-hidden">
                    <Input
                        type="text"
                        placeholder="Search your products"
                        className="p-2 focus-visible:ring-0 border-none sm:h-10 h-fit text-xs sm:text-sm"
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    <div className="bg-primary text-white px-1 sm:px-2 py-1 sm:py-2 cursor-pointer">
                        <Search />
                    </div>
                </div>
                <div className="flex items-center sm:gap-3">
                    <Link href={"/checkout"}>
                        <div className="relative hidden sm:block">
                            <MdOutlineShoppingCartCheckout
                                size={35}
                                className="text-[#040D12]"
                            />
                            {cartItems && cartItems.length > 0 && (
                                <p className="text-primary font-bold absolute -top-1 -right-2 rounded-full h-[20px] w-[20px] bg-slate-200 flex justify-center items-center">
                                    {cartItems.length}
                                </p>
                            )}
                        </div>
                    </Link>

                    {userLoading ? (
                        <Skeleton className="w-[60px] h-[60px] rounded-full bg-gray-500" />
                    ) : user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                {user && user?.avatar ? (
                                    <div className="border-2 boxglow border-primary rounded-full cursor-pointer">
                                        <Image
                                            src={user?.avatar as string}
                                            alt="Uploades Image"
                                            height={50}
                                            width={50}
                                            className="min-w-[40px] w-[40px] h-[40px] rounded-full object-cover object-center"
                                        />
                                    </div>
                                ) : (
                                    <div className="cursor-pointer flex items-center justify-center boxglow border-primary rounded-full">
                                        {/* <FaUser className="text-2xl text-black" /> */}
                                        <CircleUserRound
                                            size={35}
                                            className="text-[#040D12]"
                                        />
                                    </div>
                                )}
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                className="z-[500]"
                            >
                                <DropdownMenuItem className="py-1 font-semibold">
                                    {user?.fullname}
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-xs text-[#040D12] focus:bg-transparent px-2 py-0 pb-1">
                                    {user?.role}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <Link
                                    href={`/user-dashboard/profile`}
                                >
                                    <DropdownMenuItem>Profile</DropdownMenuItem>
                                </Link>
                                {user &&
                                    user?.role &&
                                    (user?.role === "admin" ||
                                        user?.role === "super-admin") && (
                                        <Link href={`/admin-dashboard`}>
                                            <DropdownMenuItem>
                                                Admin Dashboard
                                            </DropdownMenuItem>
                                        </Link>
                                    )}
                                <Link href="/admin-dashboard">
                                    <DropdownMenuItem>
                                        Admin Dashboard
                                    </DropdownMenuItem>
                                </Link>

                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => handleLogout()}
                                >
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link href="/login">
                            <Button
                                variant="default"
                                className="sm:text-lg text-base bg-primary hover:bg-accent-foreground boxglow text-white px-3 sm:px-4 sm:py-5 py-3 font-semibold rounded-full"
                            >
                                Login
                            </Button>
                        </Link>
                    )}
                </div>

                {/* Mobile device menuitem */}
                <section
                    ref={menuItemRef}
                    className={`bg-slate-100 w-[55dvw] h-[100dvh] z-[150] md:hidden p-2 shadow-lg rounded-sm absolute transition-all top-[100%]  ${isOpen ? "left-0" : "-left-[150%]"}`}
                >
                    {categoryList.map((category) => (
                        <Link
                            href={`/${category?.link}`}
                            key={category.id}
                            onClick={() => setIsOpen(false)}
                        >
                            <div className="flex items-center justify-between py-1">
                                <div className="flex items-center gap-1">
                                    <p className="text-base font-semibold capitalize">
                                        {category?.categoryTitle}
                                    </p>
                                </div>
                                <ChevronRight />
                            </div>
                        </Link>
                    ))}
                </section>
                <div
                    className={`w-dvw h-dvh md:hidden transition-all z-[100] backdrop-blur-sm bg-black bg-opacity-5 absolute left-0 top-[100%] ${
                        isOpen ? "opacity-100" : "hidden"
                    }`}
                ></div>
            </section>
        </header>
    );
};

export default Header;
