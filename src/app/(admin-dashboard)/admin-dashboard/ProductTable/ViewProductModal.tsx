import UpdateProduct from "@/api/product/updateProduct";
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
import { Loader, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { ProductDataType } from "./columns";

const ViewProductModal = ({
    productData,
    onModalClose,
}: {
    productData: ProductDataType;
    onModalClose: () => void;
}) => {
    const queryClient = useQueryClient();
    const handleClose = () => {
        onModalClose();
    };
    const [isTouched, setIsTouched] = useState<boolean>(false);
    const [stock, setStock] = useState<number>(productData?.productStock);
    console.log("changeedStatus", stock);

    const { mutate, isPending } = useMutation({
        mutationKey: [],
        mutationFn: UpdateProduct,
        onSuccess: (response) => {
            if (response.statusCode === 200) {
                toast.success("Stock Updateed");
                queryClient.invalidateQueries({ queryKey: ["productlist"] });
                onModalClose();
            }
        },
        onError: (error: any) => {
            console.log("The Error Appointment is:", error);
            if (error?.response?.status == 409) {
                toast.warning(
                    "There is already an appointment with this name and date."
                );
            } else if (error?.response?.status == 500) {
                toast.error("Something went wrong during an appointment");
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

    const handleChanges = async () => {
        const productId = productData?._id;
        const newData = { productStock: stock };

        await mutate({ productId, data: newData });
    };

    // useEffect(()=>{
    //   setStatus(appointmentData?.status);
    // },[])

    return (
        <Dialog>
            <DialogTrigger asChild className="w-full">
                <h2>View product details</h2>
            </DialogTrigger>
            <DialogContent className="lg:max-w-[600px] md:max-w-[550px] max-w-[90dvw] rounded-lg">
                <DialogHeader>
                    <DialogTitle className="">Product Details</DialogTitle>
                </DialogHeader>
                <Separator className="bg-primary" />
                <>
                    {productData?.productImage && (
                        <div className="mx-auto">
                            <Image
                                src={productData?.productImage}
                                width={100}
                                height={100}
                                className="min-w-[100px] w-[100px] h-[100px] rounded-md object-cover object-center mx-auto"
                                alt="Product Image"
                            />
                        </div>
                    )}
                </>
                <section className="grid grid-cols-10 gap-2 sm:items-center items-start my-2">
                    <Label className="text-base font-semibold sm:col-span-4 col-span-6 flex items-center justify-between">
                        Product Name<span>:</span>
                    </Label>
                    <h2 className="sm:col-span-6 col-span-4 text-gray-900 capitalize font-medium text-base text-start">
                        {productData?.productName}
                    </h2>

                    <Label className="text-base font-semibold sm:col-span-4 col-span-6 flex items-center justify-between">
                        Product Price<span>:</span>
                    </Label>
                    <h2 className="sm:col-span-6 col-span-4 text-gray-900 font-medium text-base text-start">
                        {productData?.productPrice}
                    </h2>

                    <Label className="text-base font-semibold sm:col-span-4 col-span-6 flex items-center justify-between">
                        Product Quantity<span>:</span>
                    </Label>
                    <h2 className="sm:col-span-6 col-span-4 text-gray-900 font-medium text-base text-start">
                        {productData?.productQuantity}
                    </h2>

                    <Label className="text-base font-semibold sm:col-span-4 col-span-6 flex items-center justify-between">
                        Product Category<span>:</span>
                    </Label>
                    <h2 className="sm:col-span-6 col-span-4 text-gray-900 capitalize font-medium text-base text-start">
                        {productData?.productCategory}
                    </h2>

                    <Label className="text-base font-semibold sm:col-span-4 col-span-6 flex items-center justify-between">
                        Product Description<span>:</span>
                    </Label>
                    <h2 className="sm:col-span-6 col-span-4 text-gray-900 line-clamp-2 font-medium text-sm text-start">
                        {productData?.productDescription}
                    </h2>

                    {/* <Label className="text-base font-semibold sm:col-span-4 col-span-6 flex items-center justify-between">
                        Product Created at<span>:</span>
                    </Label>
                    <h2 className="sm:col-span-6 col-span-4 text-gray-900 font-medium text-base text-start">
                        {format(productData?.createdAt, "dd MMMM yyyy")}
                    </h2> */}

                    <Label className="text-base font-semibold sm:col-span-4 col-span-6 flex items-center justify-between">
                        Product Stock<span>:</span>
                    </Label>
                    <section className="sm:col-span-6 col-span-4 flex items-center flex-wrap gap-4 w-fit">
                        <div className="flex items-center sm:gap-3 gap-1">
                            {/* <Plus /> */}
                            <div
                                onClick={() => {
                                    setStock(stock > 0 ? stock - 1 : stock);
                                    setIsTouched(true);
                                }}
                                className="text-primary px-0 flex justify-center items-center cursor-pointer border-2 border-primary rounded-md"
                            >
                                <Minus />
                            </div>
                            {/* <MinusCircle
                            onClick={() =>
                                {setStock(stock > 0 ? stock - 1 : stock);setIsTouched(true)}
                            }
                            className="text-primary cursor-pointer"
                        /> */}
                            <p className="text-gray-900 line-clamp-2 font-medium text-base border-2 bg-slate-200 rounded-md px-1">
                                {stock}
                            </p>
                            {/* <Minus /> */}
                            {/* <CirclePlus
                            onClick={() => {setStock(stock + 1);setIsTouched(true)}}
                            className="text-primary cursor-pointer"
                        /> */}
                            <div
                                onClick={() => {
                                    setStock(stock + 1);
                                    setIsTouched(true);
                                }}
                                className="text-primary px-0 flex justify-center items-center cursor-pointer border-2 border-primary rounded-md"
                            >
                                <Plus />
                            </div>
                        </div>

                        <div className="flex items-center gap-2 flex-wrap">
                        <div
                            onClick={() => {
                                setStock(stock + 10);
                                setIsTouched(true);
                            }}
                            className="text-primary px-1 flex justify-center items-center cursor-pointer border-2 border-primary rounded-md"
                        >
                            10+
                        </div>
                        <div
                            onClick={() => {
                                setStock(stock + 20);
                                setIsTouched(true);
                            }}
                            className="text-primary px-1 flex justify-center items-center cursor-pointer border-2 border-primary rounded-md"
                        >
                            20+
                        </div>
                        <div
                            onClick={() => {
                                setStock(stock + 100);
                                setIsTouched(true);
                            }}
                            className="text-primary px-1 flex justify-center items-center cursor-pointer border-2 border-primary rounded-md"
                        >
                            100+
                        </div>
                        </div>
                    </section>
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
                        disabled={isPending || !isTouched}
                        className="hover:bg-primary"
                    >
                        {" "}
                        {isPending ? (
                            <>
                                <Loader /> Saviing
                            </>
                        ) : (
                            "Save changes"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ViewProductModal;
