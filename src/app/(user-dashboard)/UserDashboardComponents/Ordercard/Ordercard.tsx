import { OrderDataType } from "@/app/(admin-dashboard)/admin-dashboard/OrderTable/columns";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const Ordercard = ({ OrderData }: { OrderData: OrderDataType }) => {
    const [cardOpen, setCardOpen] = useState(false);

    const cardVariants = {
        open: { y: 0, opacity: 1 },
        closed: { y: -100, opacity: 0 },
    };
    return (
        <section className="bg-slate-400 p-4 transition-all duration-1000">
            <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">
                    ৳{OrderData.totalAmmount}
                </p>
                <p className="text-sm font-semibold">
                    {format(OrderData.updatedAt, "MMM dd, yyyy | h:mma")}
                </p>
                <Button
                    onClick={() => setCardOpen(!cardOpen)}
                    className="px-2 ps-4 rounded-full"
                >
                    Show Details <ChevronRight />
                </Button>
            </div>

            <div className={`grid grid-cols-1 gap-2 py-4 ${cardOpen ? "":"h-0 overflow-hidden"}`}>
                {OrderData.productList.map((product, index) => {
                    return (
                        <div
                            key={index}
                            className="flex items-start justify-between"
                        >
                            <div className="flex items-start gap-2">
                                <Image
                                    src={product.productImage}
                                    alt="product Image"
                                    width={60}
                                    height={60}
                                    className="rounded-md"
                                />
                                <div>
                                    <p className="text-sm capitalize">
                                        {product.productName}
                                    </p>
                                    <p className="text-sm">
                                        {product.productCount} Pack
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
                                    Qty: {""}
                                    {product.productCount}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Ordercard;
