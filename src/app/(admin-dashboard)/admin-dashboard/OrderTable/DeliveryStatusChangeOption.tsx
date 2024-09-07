import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect } from "react";
import { OrderDataType } from "./columns";

const DeliveryStatusChangeOption = ({
    order,
    deliveryStatus,
    setDeliveryStatus,
}: {
    order: OrderDataType;
    deliveryStatus: string;
    setDeliveryStatus: (status: string) => void;
}) => {
    // console.log("deliveryStatus is", deliveryStatus);

    const handleStatusChange = async (value: string) => {
        setDeliveryStatus(value);
    };

    useEffect(() => {
        setDeliveryStatus(order?.deliveryStatus);
    }, []);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="w-full">
                    <div>
                        {deliveryStatus === "pending" && (
                            <Badge
                                variant="default"
                                className="bg-[#FFE569] hover:bg-[#FFE569] cursor-pointer uppercase"
                            >
                                pending
                            </Badge>
                        )}
                        {deliveryStatus === "inprogress" && (
                            <Badge
                                variant="default"
                                className="bg-yellow-600 hover:bg-yellow-600 cursor-pointer uppercase"
                            >
                                inprogress
                            </Badge>
                        )}
                        {deliveryStatus === "done" && (
                            <Badge
                                variant="default"
                                className="bg-[#a6d296] hover:bg-[#a6d296] cursor-pointer uppercase"
                            >
                                done
                            </Badge>
                        )}
                        {deliveryStatus === "failed" && (
                            <Badge
                                variant="destructive"
                                className="cursor-pointer"
                            >
                                failed
                            </Badge>
                        )}
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 z-[600]">
                    <DropdownMenuLabel>Change status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup
                        value={deliveryStatus}
                        onValueChange={handleStatusChange}
                    >
                        <DropdownMenuRadioItem
                            value="pending"
                            className={
                                deliveryStatus === "pending"
                                    ? "bg-accent font-semibold"
                                    : ""
                            }
                        >
                            Pending
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                            value="inprogress"
                            className={
                                deliveryStatus === "inprogress"
                                    ? "bg-accent font-semibold"
                                    : ""
                            }
                        >
                            In Progress
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                            value="done"
                            className={
                                deliveryStatus === "done"
                                    ? "bg-accent font-semibold"
                                    : ""
                            }
                        >
                            Done
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                            value="failed"
                            className={
                                deliveryStatus === "failed"
                                    ? "bg-accent font-semibold"
                                    : ""
                            }
                        >
                            Failed
                        </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default DeliveryStatusChangeOption;
