"use client";
import GetSingleProduct from "@/api/product/getSingleProduct";
import UpdateProduct from "@/api/product/updateProduct";
import { Label } from "@/components/ui/label";
import { GetCategory } from "@/StaticData/CategoryData/CategoryData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ImageUp } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
    productName: z.string().min(2, {
        message: "Product name must be at least 2 characters.",
    }),
    productPrice: z.string().min(2, {
        message: "Product price must be at least 2 characters.",
    }),
    productQuantity: z.string().min(2, {
        message: "Product quantity must be at least 2 characters.",
    }),
    productCategory: z.string().min(2, {
        message: "Please select a product category",
    }),
    productDescription: z.string().min(2, {
        message: "Please provide a short description",
    }),
    productImage: z.any().optional(),
    // productImageOne: z.any().refine((files) => files?.length >= 1, {
    //     message: "Please select an image",
    // }),
    // productImageTwo: z.any().optional(),
    // productImageThree: z.any().optional(),
});

type FormData = z.infer<typeof formSchema>;

const AddProductStock = ({ params }: { params: { productId: string } }) => {
    const { productId } = params;
    // // console.log("The parameters is:", params);
    // // console.log("The productId is:", productId);
    const [isTouched, setIsTouched] = useState<boolean>(false);

    const { data: product } = useQuery({
        queryKey: ["product", productId],
        queryFn: GetSingleProduct,
    });
    // console.log("the product is:", product);

    const router = useRouter();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [productImagePreview, setProductImagePreview] = useState<
        string | null
    >(null);
    const [productImageOnePreview, setProductImageOnePreview] = useState<
        string | null
    >(null);
    const [productImageTwoPreview, setProductImageTwoPreview] = useState<
        string | null
    >(null);
    const [productImageThreePreview, setProductImageThreePreview] = useState<
        string | null
    >(null);

    const {
        isLoading,
        data: CategoryList,
        error,
    } = useQuery({
        queryKey: ["Products"],
        queryFn: GetCategory,
    });

    // Function to handle productImageChange
    const [productImageBase64, setProductImageBase64] = useState("");
    const productImageChange = (event: any) => {
        // console.log("The target:", event);
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = (e) => {
            if (e.target) {
                setProductImageBase64(reader.result as string);
                setProductImagePreview(e.target.result as string);
                setIsTouched(true);
            }
        };
        reader.readAsDataURL(file);
    };

    // Function to handle productImageOneChange
    const [productImageOneBase64, setProductImageOneBase64] = useState("");
    const productImageOneChange = (event: any) => {
        // console.log("The target:", event);
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = (e) => {
            if (e.target) {
                setProductImageOneBase64(reader.result as string);
                setProductImageOnePreview(e.target.result as string);
            }
        };
        reader.readAsDataURL(file);
    };

    // Function to handle productImageTwoChange
    const [productImageTwoBase64, setProductImageTwoBase64] = useState("");
    const productImageTwoChange = (event: any) => {
        // console.log("The target:", event);
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = (e) => {
            if (e.target) {
                setProductImageTwoBase64(reader.result as string);
                setProductImageTwoPreview(e.target.result as string);
            }
        };
        reader.readAsDataURL(file);
    };

    // Function to handle productImageThreeChange
    const [productImageThreeBase64, setProductImageThreeBase64] = useState("");
    const productImageThreeChange = (event: any) => {
        // console.log("The target:", event);
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = (e) => {
            if (e.target) {
                setProductImageThreeBase64(reader.result as string);
                setProductImageThreePreview(e.target.result as string);
            }
        };
        reader.readAsDataURL(file);
    };

    const {
        control,
        register,
        setValue,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>({ resolver: zodResolver(formSchema) });
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: UpdateProduct,
        onSuccess: (response) => {
            if (response.statusCode === 200) {
                toast.success("Product successfully updated");
                reset();
                setProductImagePreview(null);
                setProductImageOnePreview(null);
                setProductImageTwoPreview(null);
                setProductImageThreePreview(null);
                setIsTouched(false);
                queryClient.invalidateQueries({ queryKey: ["productlist"] });
                router.push("/admin-dashboard/products");
            }
        },
        onError: (error: any) => {
            if (error?.response?.status == 409) {
                toast.warning("Username or Email already registered !!");
            } else if (error.request) {
                toast.error("No response received from the server!!");
            } else {
                console.error(
                    "Error while sending the request:",
                    error.message
                );
            }
        },
    });

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        // console.log("Form data is:", data);

        // Create a copy of the data object
        const newData = { ...data };

        // Conditionally add the productImageBase64 property if productImageBase64 is not an empty string
        if (productImageBase64 !== undefined && productImageBase64 !== "") {
            newData.productImage = productImageBase64;
        } else {
            // Remove the field if the field is empty string
            // console.log("Come here! 123");
            delete newData.productImage;
        }

        // console.log("The new data is:", newData);

        await mutate({ productId, data: newData });
    };

    useEffect(() => {
        if (product) {
            setValue("productName", product?.productName);
            setValue("productPrice", product?.productPrice);
            setValue("productQuantity", product?.productQuantity);
            setValue("productCategory", product?.productCategory);
            setValue("productDescription", product?.productDescription);

            if (product?.productImage) {
                setProductImagePreview(product?.productImage as string);
            }
            // ... other fields
        }
    }, [product, setValue]);

    return (
        <main>
            <div className="p-5">
                <h2 className="text-lg font-semibold">Update Product Stock</h2>
                <p>
                    Add new stock for this product. If the product is available
                    only then add stock.
                </p>
            </div>
            <section className="bg-slate-100 border-2 rounded-md p-5 flex items-center justify-between m-5">
                <div className="grid grid-cols-10 gap-3 sm:items-center items-start w-[60%]">
                    <Label className="text-base font-semibold sm:col-span-3 col-span-6 flex items-center justify-between">
                        Product Name<span>:</span>
                    </Label>
                    <h2 className="sm:col-span-7 col-span-4 text-gray-900 font-medium text-base text-start">
                        {product?.productName}
                    </h2>
                    <Label className="text-base font-semibold sm:col-span-3 col-span-6 flex items-center justify-between">
                        Product Price<span>:</span>
                    </Label>
                    <h2 className="sm:col-span-7 col-span-4 text-gray-900 font-medium text-base text-start">
                        {product?.productPrice}
                    </h2>
                    <Label className="text-base font-semibold sm:col-span-3 col-span-6 flex items-center justify-between">
                        Product Quantity<span>:</span>
                    </Label>
                    <h2 className="sm:col-span-7 col-span-4 text-gray-900 font-medium text-base text-start">
                        {product?.productQuantity}
                    </h2>
                    <Label className="text-base font-semibold sm:col-span-3 col-span-6 flex items-center justify-between">
                        Product Category<span>:</span>
                    </Label>
                    <h2 className="sm:col-span-7 col-span-4 text-gray-900 font-medium text-base text-start">
                        {product?.productCategory}
                    </h2>
                </div>
                <div>
                    {product && product.productImage ? (
                        <Image
                            src={product?.productImage}
                            alt="Uploades Image"
                            height={120}
                            width={120}
                            className="min-w-[150px] w-[150px] h-[150px] rounded-md border border-primary object-cover object-center"
                        />
                    ) : (
                        <ImageUp size={100} className="text-[#040D12]" />
                    )}
                </div>
            </section>
        </main>
    );
};

export default AddProductStock;
