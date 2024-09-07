"use client";
import GetAllOrder from "@/api/orders/getAllOrder";
import { OrderDataType } from "@/app/(admin-dashboard)/admin-dashboard/OrderTable/columns";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import Image from "next/image";
import { useState } from "react";

const UserDashboardOrders = () => {
    const { user, setUser, userLoading } = useAuth();
    const [cardOpen, setCardOpen] = useState(false);

    const { isLoading, data: ordertlist } = useQuery({
        queryKey: ["ordertlist"],
        queryFn: GetAllOrder,
    });

    // console.log("ordertlist is :", ordertlist);

    return (
        <main>
            <h2 className="py-8 px-5 text-xl font-bold border-b-2">
                Order History
            </h2>

            {isLoading ? (
                <section className="grid grid-cols-1 gap-5 p-5">
                    {Array.from({ length: 3 }, (_, index) => (
                        <div
                            key={index}
                            className="bg-white py-2 w-full lg:min-w-[220px] flex items-start gap-4 border-b"
                        >
                            <Skeleton className="w-[60px] h-[60px] bg-gray-300" />

                            <div className="space-y-1.5 w-full">
                                <Skeleton className="w-full h-[15px] bg-gray-300" />
                                <Skeleton className="w-full h-[15px] bg-gray-300" />
                                <Skeleton className="w-[60%] h-[15px] bg-gray-300" />
                            </div>
                        </div>
                    ))}
                </section>
            ) : (
                <></>
            )}
            <Accordion
                type="single"
                collapsible
                className="w-full overflow-hidden p-5 bg-white"
            >
                {ordertlist && ordertlist.length > 0 ? (
                    <>
                        {ordertlist
                            .filter((order: any) => order.userId === user?._id)
                            .map((order: OrderDataType) => {
                                return (
                                    <AccordionItem
                                        key={order._id}
                                        value={order._id}
                                        className=""
                                    >
                                        <AccordionTrigger className="hover:no-underline w-full justify-between py-3">
                                            <p className="text-sm font-semibold">
                                                Total Ammount: ৳
                                                {order.totalAmmount}
                                            </p>
                                            <p className="text-sm font-semibold">
                                                {format(
                                                    order.updatedAt,
                                                    "MMM dd, yyyy | h:mma"
                                                )}
                                            </p>
                                            <div className="flex items-center gap-1">
                                                <p className="text-sm font-semibold">
                                                    Order Id:
                                                </p>
                                                <Button className="px-4 font-semibold rounded-full">
                                                    #{order.transactionId}
                                                </Button>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div
                                                className={`grid grid-cols-1 gap-2 py-4`}
                                            >
                                                {order.productList.map(
                                                    (
                                                        product: any,
                                                        index: number
                                                    ) => {
                                                        return (
                                                            <div
                                                                key={index}
                                                                className="flex items-start justify-between"
                                                            >
                                                                <div className="flex items-start gap-2">
                                                                    <Image
                                                                        src={
                                                                            product.productImage
                                                                        }
                                                                        alt="product Image"
                                                                        width={
                                                                            60
                                                                        }
                                                                        height={
                                                                            60
                                                                        }
                                                                        className="rounded-md"
                                                                    />
                                                                    <div>
                                                                        <p className="text-sm capitalize">
                                                                            {
                                                                                product.productName
                                                                            }
                                                                        </p>
                                                                        <p className="text-sm">
                                                                            {
                                                                                product.productCount
                                                                            }{" "}
                                                                            Pack
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-bold">
                                                                        ৳
                                                                        {product.productPrice *
                                                                            product.productCount}
                                                                    </p>
                                                                    <p className="text-sm font-semibold">
                                                                        Qty:{" "}
                                                                        {""}
                                                                        {
                                                                            product.productCount
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                );
                            })}
                    </>
                ) : (
                    <div>
                        <p className="text-lg font-semibold text-center">
                            No order history
                        </p>
                    </div>
                )}
            </Accordion>
        </main>
    );
};

export default UserDashboardOrders;
