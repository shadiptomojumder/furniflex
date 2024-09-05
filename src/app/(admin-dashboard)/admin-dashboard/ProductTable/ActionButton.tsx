import DeleteAppointment from "@/api/appointment/deleteAppointment";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import ViewCustomerModal from "./ViewProductModal";
import { useState } from "react";
import { ProductDataType } from "./columns"
import DeleteProducts from "@/api/product/deleteProducts";
import { useRouter } from "next/navigation";
import StatusChangeOption from "./StatusChangeOption";

const ActionButton = ({ product }: { product: ProductDataType }) => {
  const queryClient = useQueryClient();
  const [menuOpen,setMenuOpen] = useState<boolean>(false);
  const router = useRouter();
  const [status, setStatus] = useState<string>("");

  const handleModalClose = () => {
    setMenuOpen(false);
  };

  const { mutate, isPending } = useMutation({
    mutationKey: [],
    mutationFn: DeleteProducts,
    onSuccess: (response) => {
      console.log("the res is ", response);

      if (response.statusCode === 200) {
        toast.success("Product deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["productlist"] });
      }
    },
    onError: (error: any) => {
      if (error?.response?.status == 400) {
        toast.warning(
          "Missing product Id"
        );
      } else if (error?.response?.status == 500) {
        toast.error("Something went wrong during an appointment");
      } else if (error.request) {
        toast.error("No response received from the server!!");
      } else {
        console.error("Error while sending the request:", error.message);
      }
    },
  });

  const handleDelete = async () => {
    console.log("Delete Appointments", product);
    console.log("Delete button clicked");
    const productIds = [`${product._id}`];
    await mutate({ productIds });
  };

  const handleEditProduct = () => {
    console.log("Edit Product clicked", product?.productName);
    router.push(`/admin-dashboard/update-product/${product?._id}`)
    
  } 
  const handleAddProductStock = () => {
    console.log("Edit Product clicked", product?.productName);
    router.push(`/admin-dashboard/add-product-stock/${product?._id}`)
    
  } 

  return (
    <>
      <DropdownMenu  onOpenChange={setMenuOpen} open={menuOpen}>
        <DropdownMenuTrigger asChild onClick={()=>setMenuOpen(!menuOpen)}>
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
            onClick={() => navigator.clipboard.writeText(product._id)}
          >
            Copy product ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <ViewCustomerModal  onModalClose={handleModalClose} productData={product} />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleEditProduct}>Edit product details</DropdownMenuItem>
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
