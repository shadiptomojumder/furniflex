import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { OrderDataType } from "./columns";
// import DeleteProducts from "@/api/order/deleteProducts";
import { useRouter } from "next/navigation";
import ViewOrderModal from "./ViewOrderModal";

const ActionButton = ({ order }: { order: OrderDataType }) => {
    const queryClient = useQueryClient();
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const router = useRouter();
    const [status, setStatus] = useState<string>("");

    const handleModalClose = () => {
        setMenuOpen(false);
    };

    // const { mutate, isPending } = useMutation({
    //   mutationKey: [],
    //   mutationFn: DeleteProducts,
    //   onSuccess: (response) => {
    //     console.log("the res is ", response);

    //     if (response.statusCode === 200) {
    //       toast.success("Product deleted successfully");
    //       queryClient.invalidateQueries({ queryKey: ["productlist"] });
    //     }
    //   },
    //   onError: (error: any) => {
    //     if (error?.response?.status == 400) {
    //       toast.warning(
    //         "Missing order Id"
    //       );
    //     } else if (error?.response?.status == 500) {
    //       toast.error("Something went wrong during an appointment");
    //     } else if (error.request) {
    //       toast.error("No response received from the server!!");
    //     } else {
    //       console.error("Error while sending the request:", error.message);
    //     }
    //   },
    // });

    const handleDelete = async () => {
        console.log("Delete Appointments", order);
        console.log("Delete button clicked");
        const productIds = [`${order._id}`];
        // await mutate({ productIds });
    };

    console.log("order is:", order);

    return (
        <>
            <DropdownMenu onOpenChange={setMenuOpen} open={menuOpen}>
                <DropdownMenuTrigger
                    asChild
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="bg-slate-100"
                >
                    <Button
                        variant="ghost"
                        className="h-8 w-8 p-0 border-none focus-visible:ring-0"
                    >
                        <span className="sr-only">Open menu</span>
                        <DotsHorizontalIcon className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                        onClick={() =>
                            navigator.clipboard.writeText(order?._id)
                        }
                    >
                        Copy Transaction ID
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem onSelect={(e) => e.preventDefault()}><StatusChangeOption status={status} 
          setStatus={setStatus}  order={order}/></DropdownMenuItem> */}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <ViewOrderModal
                            onModalClose={handleModalClose}
                            orderData={order}
                        />
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={handleDelete}
                        onSelect={(e) => e.preventDefault()}
                        className="text-white focus:text-white bg-[#6a1c1d] focus:bg-[#782c2c] mt-1"
                    >
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default ActionButton;
