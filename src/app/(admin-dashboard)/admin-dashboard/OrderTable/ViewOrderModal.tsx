"use client";
import UpdateOrder from "@/api/orders/updateOrder";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { OrderDataType } from "./columns";
import DeliveryStatusChangeOption from "./DeliveryStatusChangeOption";

const ViewOrderModal = ({
    orderData,
    onModalClose,
}: {
    orderData: OrderDataType;
    onModalClose: () => void;
}) => {
    const queryClient = useQueryClient();
    const handleClose = () => {
        onModalClose();
    };
    const [deliveryStatus, setDeliveryStatus] = useState<string>("");
    const [isTouched, setIsTouched] = useState<boolean>(false);

    const { mutate, isPending } = useMutation({
        mutationKey: [],
        mutationFn: UpdateOrder,
        onSuccess: (response) => {
            if (response.statusCode === 200) {
                toast.success("Delivery Status Updateed");
                queryClient.invalidateQueries({ queryKey: ["ordertlist"] });
                onModalClose();
            }
        },
        onError: (error: any) => {
            console.log("The Error UpdateOrder is:", error);
            if (error?.response?.status == 500) {
                toast.error("Something went wrong during an UpdateOrder");
            } else if (error) {
                toast.error("No response received from the server!!");
            } else {
                console.error(
                    "Error while sending the request:",
                    error.message
                );
            }
        },
    });

    console.log("orderData is:", orderData);

    const handleChanges = async () => {
        const orderId = orderData?._id;

        await mutate({ data: { deliveryStatus: deliveryStatus }, orderId });
    };

    return (
        <Dialog>
            <DialogTrigger asChild className="w-full">
                <h2>View Order details</h2>
            </DialogTrigger>
            <DialogContent className="lg:max-w-[600px] md:max-w-[550px] max-w-[90dvw] rounded-lg">
                <DialogHeader>
                    <DialogTitle className="">Order Details</DialogTitle>
                </DialogHeader>
                <Separator className="bg-primary" />

                <section className="grid md:grid-cols-4 min-[425px]:grid-cols-3 grid-cols-2 gap-2">
                    {orderData.productList &&
                        orderData.productList.length > 0 &&
                        orderData.productList.map((product, index) => {
                            console.log("product is:", product);

                            return (
                                <div
                                    key={index}
                                    className="px-1 pb-1 bg-white shadow-md rounded-md"
                                >
                                    <div className="mx-auto">
                                        <Image
                                            src={product?.productImage}
                                            width={100}
                                            height={100}
                                            className=" w-[80px] rounded-md object-cover object-center mx-auto"
                                            alt="Product Image"
                                        />
                                    </div>
                                    <h2 className="text-sm md:max-w-[140px] text-center line-clamp-1 mt-1 capitalize">
                                        {product?.productName}
                                    </h2>
                                    <div className="flex items-center gap-1 justify-center">
                                        <p className="text-sm text-center">
                                            {product?.productQuantity}
                                        </p>
                                        -
                                        <p className="text-sm text-center font-semibold">
                                            {product?.productCount} piece
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                </section>

                <section className="grid grid-cols-10 gap-2 sm:items-center items-start my-2">
                    <Label className="text-sm font-semibold sm:col-span-4 col-span-6 flex items-center justify-between">
                        Username<span>:</span>
                    </Label>
                    <h2 className="sm:col-span-6 col-span-4 text-gray-900 capitalize font-medium text-sm text-start">
                        {orderData?.username}
                    </h2>

                    <Label className="text-sm font-semibold sm:col-span-4 col-span-6 flex items-center justify-between">
                        Order Ammount<span>:</span>
                    </Label>
                    <h2 className="sm:col-span-6 col-span-4 text-gray-900 font-medium text-sm text-start">
                        {orderData?.totalAmmount} Tk
                    </h2>

                    <Label className="text-sm font-semibold sm:col-span-4 col-span-6 flex items-center justify-between">
                        Delivery Status<span>:</span>
                    </Label>
                    <div className="sm:col-span-6 col-span-4 text-gray-900 font-medium text-sm text-start">
                        <DeliveryStatusChangeOption
                            order={orderData}
                            setDeliveryStatus={setDeliveryStatus}
                            deliveryStatus={deliveryStatus}
                        />
                    </div>

                    <Label className="text-sm font-semibold sm:col-span-4 col-span-6 flex items-center justify-between">
                        Payment Status<span>:</span>
                    </Label>
                    <h2 className="sm:col-span-6 col-span-4 text-gray-900 font-medium text-sm text-start">
                        {orderData?.paymentStatus ? (
                            <Badge
                                variant="default"
                                className="bg-[#a6d296] hover:bg-[#a6d296] uppercase"
                            >
                                paid
                            </Badge>
                        ) : (
                            <Badge
                                variant="default"
                                className="bg-[#FFE569] hover:bg-[#FFE569] uppercase"
                            >
                                cod
                            </Badge>
                        )}
                    </h2>

                    {/* <Label className="text-base font-semibold sm:col-span-4 col-span-6 flex items-center justify-between">
                        Product Created at<span>:</span>
                    </Label>
                    <h2 className="sm:col-span-6 col-span-4 text-gray-900 font-medium text-base text-start">
                        {format(orderData?.createdAt, "dd MMMM yyyy")}
                    </h2> */}
                </section>

                <DialogFooter className="gap-4">
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={handleClose}
                        >
                            Close
                        </Button>
                    </DialogClose>
                    <Button
                        type="submit"
                        onClick={handleChanges}
                        disabled={orderData?.deliveryStatus === deliveryStatus}
                        className="hover:bg-primary"
                    >
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ViewOrderModal;
