import { useLockBody } from "@/hooks/use-lock-body";
import { cn } from "@/lib/utils";
import Link from "next/link";

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

export function MobileNav() {
    useLockBody();

    return (
        <div
            className={cn(
                "fixed inset-0 top-16 z-30 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 lg:hidden"
            )}
        >
            <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md border">
                <nav className="grid grid-flow-row auto-rows-max text-sm">
                    {MenuItems.map((item: any, index: number) => (
                        <Link
                            key={index}
                            href={item.href}
                            className={cn(
                                "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline"
                            )}
                        >
                            {item.title}
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    );
}
