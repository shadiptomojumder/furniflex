"use client";
import CreateCategory from "@/api/category/createCategory";
import Spinner from "@/app/components/Spinner/Spinner";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { GetCategory } from "@/StaticData/CategoryData/CategoryData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ImageUp } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldError, SubmitHandler, useForm , Controller } from "react-hook-form";
import { TbCategoryPlus } from "react-icons/tb";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
    productName: z.string().min(2, {
        message: "Category Name must be at least 2 characters.",
    }),
    productPrice: z.string().min(2, {
        message: "Category Name must be at least 2 characters.",
    }),
    productQuantity: z.string().min(2, {
        message: "Category Name must be at least 2 characters.",
    }),
    productCategory: z.string().min(2, {
        message: "Category Name must be at least 2 characters.",
    }),
    productDescription: z.string().min(2, {
        message: "Category Name must be at least 2 characters.",
    }),
    categoryImage: z.any(),
    categoryImageOne: z.any(),
    categoryImageTwo: z.any(),
    categoryImageThree: z.any(),
});

type FormData = z.infer<typeof formSchema>;

const CreateCategoryModal = () => {
    const router = useRouter();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const { isLoading, data:CategoryList, error } = useQuery({
        queryKey: ["categoryList"],
        queryFn: GetCategory,
    });
      //console.log("CategoryList is:",CategoryList);
      
    

    const [categoryImageBase64, setCategoryImageBase64] = useState("");
    // Function to handle logo change
    const handleAvatarImageChange = (event: any) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = (e) => {
            if (e.target) {
                setCategoryImageBase64(reader.result as string);
                setPreviewImage(e.target.result as string);
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

    const { mutate, isPending } = useMutation({
        mutationFn: CreateCategory,
        onSuccess: (response) => {
            if (response.statusCode === 200) {
                toast.success("Category successfully created");
                reset();
                setPreviewImage(null);
                setShowModal(false);
                router.push("/admin-dashboard/categories");
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
        console.log("Form data is:", data);

        // Create a copy of the data object
        const newData = { ...data };

        // Conditionally add the avatar property if avatarBase64 is not an empty string
        if (categoryImageBase64 !== undefined && categoryImageBase64 !== "") {
            newData.categoryImage = categoryImageBase64;
            console.log("Come here!");
        } else {
            // Remove avatar field if avatarBase64 is empty string
            console.log("Come here! 123");
            delete newData.categoryImage;
        }
        console.log("The new data is:", newData);

        // await mutate(newData);
    };

    return (
        <Dialog open={showModal} onOpenChange={() => setShowModal(!showModal)}>
            <DialogTrigger asChild>
                <Button variant={"outline"} className="gap-2">
                    <TbCategoryPlus size={18} />
                    Create Product
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle>Create Product</DialogTitle>
                    <DialogDescription>
                        Select your image and suitable name for product and
                        click create button.
                    </DialogDescription>
                </DialogHeader>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <section className="flex items-center justify-between">
                        <div className="">
                            <Label
                                htmlFor="categoryImage"
                                className="flex justify-center"
                            >
                                {previewImage ? (
                                    <Image
                                        src={previewImage}
                                        alt="Uploades Image"
                                        height={120}
                                        width={120}
                                        className="min-w-[150px] h-[150px] p-2 rounded-md border border-primary object-cover object-center"
                                    />
                                ) : (
                                    <div>
                                        <ImageUp
                                            size={100}
                                            className="text-[#040D12]"
                                        />
                                    </div>
                                )}
                            </Label>
                            <Input
                                id="categoryImage"
                                {...register("categoryImage")}
                                onChange={handleAvatarImageChange}
                                type="file"
                                className="appearance-none hidden"
                            />
                            {errors.categoryImage?.message && (
                                <span className="text-red-500 text-xs">
                                    {
                                        (errors.categoryImage as FieldError)
                                            .message
                                    }
                                </span>
                            )}
                        </div>
                        
                    </section>

                    <div>
                        <div className="space-y-2">
                            <Label
                                htmlFor="productName"
                                className="font-semibold"
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
                                className="font-semibold"
                            >
                                Product Price{" "}
                                <span className="text-red-600">*</span>
                            </Label>
                            <Input
                                {...register("productPrice")}
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
                                className="font-semibold"
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

                    <div>
                        <div className="space-y-2">
                            <Label
                                htmlFor="productDescription"
                                className="font-semibold"
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

                    <div className="space-y-2">
                    <Label htmlFor="productCategory" className="text-base">productCategory <span className="text-red-500">*</span></Label>
                    <Controller
                    name="productCategory"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <Select onValueChange={field.onChange}>
                        <SelectTrigger className="focus:border-primary h-11">
                            <SelectValue placeholder="Select a productCategory" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                CategoryList && CategoryList.length > 0 && CategoryList.map((category) => {
                                    return (
                                        <SelectItem value={category?.categoryName} key={category.id}>
                                            {category.categoryName}
                                        </SelectItem>
                                    )
                                })
                            }
                            <SelectItem value="cleaning">Teeth Cleaning</SelectItem>
                            <SelectItem value="filling">Fillings</SelectItem>
                            <SelectItem value="extraction">Tooth Extraction</SelectItem>
                            <SelectItem value="whitening">Teeth Whitening</SelectItem>
                            <SelectItem value="root-canal">Root Canal</SelectItem>
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

                    <Button
                        className="w-full bg-primary hover:bg-accent-foreground gap-2 justify-center text-white font-bold"
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
            </DialogContent>
        </Dialog>
    );
};

export default CreateCategoryModal;
