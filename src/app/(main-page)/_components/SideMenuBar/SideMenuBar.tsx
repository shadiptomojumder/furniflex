"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const FilterItems = [
    {
        id: 1,
        title: "All",
        filter: "",
    },
    {
        id: 2,
        title: "Rocking chair",
        filter: "rocking-chair",
    },
    {
        id: 3,
        title: "Side chair",
        filter: "side-chair",
    },
    {
        id: 4,
        title: "Lounge chair",
        filter: "lounge-chair",
    },
];

const SideMenuBar = () => {
    const [categoryQuery, setCategoryQuery] = useState("");
    const pathname = usePathname();
    const router = useRouter();
    const searchPrams = useSearchParams();
    const category = searchPrams.get("category") || "";

    // console.log("pathname is", pathname);
    // console.log("sortByText is", categoryQuery);
    // console.log("category is", category);

    useEffect(() => {
        if (categoryQuery === "") {
            router.push(`${pathname}`);
        } else {
            router.push(`${pathname}?category=${categoryQuery}`);
        }
    }, [categoryQuery, pathname, router]);

    return (
        <section className="bg-white pr-8 pt-10 border-r">
            <div className="flex flex-col gap-4">
                {FilterItems.map((item: any, index: number) => {
                    const isActive = item?.filter === category
                    return (
                        <div onClick={() => setCategoryQuery(item?.filter)} key={index} className="border-b pb-3 last:border-b-0 min-w-[231px] cursor-pointer">
                        <div
                            className={`w-full ${isActive ? "text-white bg-[#0E0E0E]":"text-[#717171] bg-white"} px-6 py-2 text-[22px]  font-semibold text-nowrap rounded-md transition-all`}
                        >
                            {item?.title}
                        </div>
                    </div>
                    )
                })}
            </div>
        </section>
    );
};

export default SideMenuBar;
