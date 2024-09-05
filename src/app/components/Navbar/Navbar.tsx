"use client";
import { AlignLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import BabyCareIcon from "../../../../public/icons/babyCare.webp";

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

const handleHover = (event: any) => {
    console.log("Hover item", event);
};

const Navbar = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    console.log("menu is open", isOpen);

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
        } else {
            document.removeEventListener("click", handleClickOutside);
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <nav className="bg-[#34ad38] py-2 hidden md:block">
            <main className="container flex items-center justify-between relative">
                <section ref={menuItemRef} className="flex items-center gap-2">
                    <AlignLeft
                        size={30}
                        className="text-white cursor-pointer"
                        onClick={(e) => setIsOpen((prev) => !prev)}
                    />
                    <p className="text-base font-semibold text-white capitalize">
                        Shop by category
                    </p>
                </section>

                <section
                    ref={menuItemRef}
                    className={`bg-slate-100 w-[310px] p-2 shadow-lg rounded-sm absolute transition-all top-[130%] left-0 ${isOpen ? "scale-100" : "scale-0"}`}
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
            </main>
        </nav>
    );
};

export default Navbar;

const NavigationMenu = ({ categoryData }: any) => {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
                <Image
                    src={BabyCareIcon}
                    alt="BabyCareIcon"
                    width={25}
                    height={25}
                    placeholder="blur"
                />
                <p className="text-base font-semibold">
                    {categoryData?.categoryName}
                </p>
            </div>
            <ChevronRight />
        </div>
    );
};
