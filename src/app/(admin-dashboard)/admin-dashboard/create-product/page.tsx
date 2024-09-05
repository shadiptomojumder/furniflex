"use client";
import CreateProduct from "@/api/product/createProduct";
import Spinner from "@/app/components/Spinner/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { GetCategory } from "@/StaticData/CategoryData/CategoryData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ImageUp } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
    Controller,
    FieldError,
    SubmitHandler,
    useForm,
} from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
    productName: z.string().min(2, {
        message: "Product name must be at least 2 characters.",
    }),
    productPrice: z.number(),
    productQuantity: z.string().min(1, {
        message: "Product quantity must be at least 2 characters.",
    }),
    productCategory: z.string().min(2, {
        message: "Please select a product category",
    }),
    productDescription: z.string().optional(),
    productImage: z.any().refine((files) => files?.length >= 1, {
        message: "Please select an image",
    }),
    productDiscount: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const CategoryList = [
    {
        id:1,
        name: "Rocking chair",
        value:"rocking-chair"
    },
    {
        id:2,
        name: "Side chair",
        value:"side-chair"
    },
    {
        id:3,
        name: "Lounge chair",
        value:"lounge-chair"
    },
    {
        id:4,
        name: "Others",
        value:"others"
    },
]

const CreateProductPage = () => {
    const router = useRouter();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [productImagePreview, setProductImagePreview] = useState<
        string | null
    >(null);

    // const {
    //     isLoading,
    //     data: CategoryList,
    //     error,
    // } = useQuery({
    //     queryKey: ["Products"],
    //     queryFn: GetCategory,
    // });

    // Function to handle productImageChange
    const [productImageBase64, setProductImageBase64] = useState("");
    const productImageChange = (event: any) => {
        console.log("The target:", event);
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = (e) => {
            if (e.target) {
                setProductImageBase64(reader.result as string);
                setProductImagePreview(e.target.result as string);
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
        mutationFn: CreateProduct,
        onSuccess: (response) => {
            if (response.statusCode === 200) {
                toast.success("Product successfully created");
                reset();
                setProductImagePreview(null);
                queryClient.invalidateQueries({ queryKey: ["productlist"] });
                router.push("/admin-dashboard/products");
            }
        },
        onError: (error: any) => {
            if (error?.response?.status == 409) {
                toast.warning("Product already created!!");
            } else if (error?.response?.status == 400) {
                toast.warning("Please fill all the required fields!");
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
        console.log("Form data is:", data);

        // Create a copy of the data object
        const newData = { ...data };

        // Conditionally add the productImageBase64 property if productImageBase64 is not an empty string
        if (productImageBase64 !== undefined && productImageBase64 !== "") {
            newData.productImage = productImageBase64;
        } else {
            // Remove the field if the field is empty string
            console.log("Come here! 123");
            delete newData.productImage;
        }

        console.log("The new data is:", newData);

        await mutate(newData);
    };

    return (
        <main>
            <div className="p-5">
                <h2 className="text-lg font-semibold sm:text-left text-center">
                    Create Product
                </h2>
                <p className="text-sm sm:text-left text-center">
                    Select your image and suitable name for product and click
                    create button.
                </p>
            </div>
            <section className="px-5 pb-5">
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Label className="font-semibold text-base">
                            Product Image{" "}
                            <span className="text-red-600">*</span>
                        </Label>
                        <p className="text-xs ">Select at least two images</p>
                    </div>

                    <section className="flex items-center gap-1">
                        <section className="space-y-2 w-[150px]">
                            <Label
                                htmlFor="productImage"
                                className="font-semibold"
                            >
                                {productImagePreview ? (
                                    <Image
                                        src={productImagePreview}
                                        alt="Uploades Image"
                                        height={120}
                                        width={120}
                                        className="min-w-[100px] w-[100px] h-[100px] p-[1px] rounded-md border border-primary object-cover object-center"
                                    />
                                ) : (
                                    <ImageUp
                                        size={100}
                                        className="text-[#040D12] mx-auto"
                                    />
                                )}
                            </Label>
                            <Controller
                                name="productImage"
                                control={control}
                                defaultValue=""
                                render={({
                                    field: { ref, name, onBlur, onChange },
                                }) => (
                                    <Input
                                        id="productImage"
                                        className="appearance-none hidden"
                                        type="file"
                                        onChange={(e) => {
                                            onChange(e);
                                            productImageChange(e);
                                        }}
                                    />
                                )}
                            />
                            {errors.productImage?.message ? (
                                <p className="text-red-500 text-xs text-center">
                                    {
                                        (errors.productImage as FieldError)
                                            .message
                                    }
                                </p>
                            ) : (
                                <p className="text-green-500 text-xs opacity-0 text-center">
                                    Please select an image
                                </p>
                            )}
                        </section>
                    </section>

                    <div>
                        <div className="space-y-2">
                            <Label
                                htmlFor="productName"
                                className="font-semibold text-base"
                            >
                                Product Name{" "}
                                <span className="text-red-600">*</span>
                            </Label>
                            <Input
                                {...register("productName")}
                                id="productName"
                                name="productName"
                                type="text"
                                placeholder="Enter Product Name"
                                className="focus-visible:ring-primary h-11"
                            />
                        </div>
                        {errors.productName && (
                            <span className="text-red-500 text-xs">
                                {errors.productName.message}
                            </span>
                        )}
                    </div>

                    <div>
                        <div className="space-y-2">
                            <Label
                                htmlFor="productPrice"
                                className="font-semibold text-base"
                            >
                                Product Price{" "}
                                <span className="text-red-600">*</span>
                            </Label>
                            <Input
                                {...register("productPrice", {
                                    valueAsNumber: true,
                                })}
                                id="productPrice"
                                name="productPrice"
                                type="number"
                                placeholder="Enter Product Price"
                                className="focus-visible:ring-primary h-11"
                            />
                        </div>
                        {errors.productPrice && (
                            <span className="text-red-500 text-xs">
                                {errors.productPrice.message}
                            </span>
                        )}
                    </div>

                    <div>
                        <div className="space-y-2">
                            <Label
                                htmlFor="productQuantity"
                                className="font-semibold text-base"
                            >
                                Product Quantity{" "}
                                <span className="text-red-600">*</span>
                            </Label>
                            <Input
                                {...register("productQuantity")}
                                id="productQuantity"
                                name="productQuantity"
                                type="text"
                                placeholder="Enter Product Quantity"
                                className="focus-visible:ring-primary h-11"
                            />
                        </div>
                        {errors.productQuantity && (
                            <span className="text-red-500 text-xs">
                                {errors.productQuantity.message}
                            </span>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label
                            htmlFor="productCategory"
                            className="font-semibold text-base"
                        >
                            Product Category{" "}
                            <span className="text-red-500">*</span>
                        </Label>
                        <Controller
                            name="productCategory"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <Select onValueChange={field.onChange}>
                                    <SelectTrigger className="focus:ring-primary h-11">
                                        <SelectValue placeholder="Select Product Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {CategoryList &&
                                            CategoryList.length > 0 &&
                                            CategoryList.map((category) => {
                                                return (
                                                    <SelectItem
                                                        value={
                                                            category?.value
                                                        }
                                                        key={category.id}
                                                    >
                                                        {category.name}
                                                    </SelectItem>
                                                );
                                            })}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.productCategory && (
                            <span className="text-red-500 text-sm">
                                {errors.productCategory.message}
                            </span>
                        )}
                    </div>

                    <div>
                        <div className="space-y-2">
                            <Label
                                htmlFor="productDescription"
                                className="font-semibold text-base"
                            >
                                Product Description{" "}
                                <span className="text-red-600">*</span>
                            </Label>
                            <Textarea
                                {...register("productDescription")}
                                id="productDescription"
                                name="productDescription"
                                placeholder="Enter Product Description"
                                className="focus-visible:ring-primary h-11"
                            />
                        </div>
                        {errors.productDescription && (
                            <span className="text-red-500 text-xs">
                                {errors.productDescription.message}
                            </span>
                        )}
                    </div>

                    <Button
                        className="w-full bg-primary gap-2 justify-center text-white font-bold"
                        type="submit"
                        disabled={isPending}
                    >
                        {isPending ? (
                            <>
                                <Spinner /> Creating
                            </>
                        ) : (
                            "Create"
                        )}
                    </Button>
                </form>
            </section>
        </main>
    );
};

export default CreateProductPage;
