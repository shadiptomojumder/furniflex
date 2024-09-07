"use client";
import UpdateUser from "@/api/user/updateUser";
import Spinner from "@/components/Spinner/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
    firstName: z.string().min(2, {
        message: "Fullname must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
        message: "Fullname must be at least 2 characters.",
    }),
    address: z.string().min(2, {
        message: "Fullname must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Email Invalid",
    }),
    phone: z
        .string({ required_error: "Phone number is required" })
        .min(1, "Please enter your phone number")
        .refine((phone) => /^01[3-9]\d{8}$/.test(phone), {
            message: "Please enter a valid phone number",
        }),
    avatar: z.any().optional(),
});

type FormData = z.infer<typeof formSchema>;

const UserDashboardProfile = () => {
    const router = useRouter();
    const { user, setUser, userLoading } = useAuth();
    // console.log("The user is:", user);

    const [isTouched, setIsTouched] = useState<boolean>(false);
    // console.log("isTouched :",isTouched);

    const [previewImage, setPreviewImage] = useState<string | null>(null);
    console.log("previewImage", previewImage);

    const [avatarBase64, setAvatarBase64] = useState("");
    // Function to handle logo change
    const handleAvatarImageChange = (event: any) => {
        console.log("Here 51");

        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = (e) => {
            if (e.target) {
                setAvatarBase64(reader.result as string);
                setPreviewImage(e.target.result as string);
                setIsTouched(true);
            }
        };
        reader.readAsDataURL(file);
    };

    // const handleImageChange = (event: any) => {
    //   const file = event.target.files[0];
    //   const reader = new FileReader();
    //   reader.onload = (e) => {
    //     if (e.target) {
    //       setPreviewImage(e.target.result as string);
    //     }
    //   };
    //   reader.readAsDataURL(file);
    // };

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>({ resolver: zodResolver(formSchema) });

    const { mutate, isPending } = useMutation({
        mutationFn: UpdateUser,
        onSuccess: (response) => {
            console.log("response is", response);

            if (response.statusCode === 200) {
                toast.success("User successfully updated");
                setPreviewImage(response.data.avatar);
                localStorage.setItem("userData", JSON.stringify(response.data));
                setUser(response.data);
                setIsTouched(false);
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
        console.log("The old data is:", data);
        console.log("The avatarBase64 is:", avatarBase64);
        // Create a copy of the data object
        const newData = { ...data };

        // Conditionally add the avatar property if avatarBase64 is not an empty string
        if (avatarBase64 !== undefined && avatarBase64 !== "") {
            newData.avatar = avatarBase64;
            console.log("Come here!");
        } else {
            // Remove avatar field if avatarBase64 is empty string
            console.log("Come here! 123");
            delete newData.avatar;
        }
        console.log("The new data is:", newData);

        if (user && user._id) {
            await mutate({ data: newData, userId: user._id?.toString() });
        } else {
            console.error("User or user ID is not defined");
        }
    };

    useEffect(() => {
        if (user) {
            setValue("firstName", user?.firstName);
            setValue("lastName", user?.lastName);
            setValue("address", user?.address ?? "");
            setValue("email", user?.email);
            if (user?.phone) {
                setValue("phone", user?.phone?.toString());
            }
            if (user?.avatar) {
                console.log("Avatar is:", user?.avatar);

                setPreviewImage(user?.avatar as string);
            }
            // ... other fields
        }
    }, [user, setValue]);

    return (
        <main>
            <div className="p-5">
                <h1 className="text-2xl text-gray-900 font-bold">Profile</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    This is how others will see you on the site.
                </p>
            </div>
            <Separator className="my-4" />
            <section className="p-5">
                <form
                    className="grid grid-cols-2 gap-8"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="col-span-2 sm:col-span-1">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">Full Name</Label>
                            <Input
                                {...register("firstName")}
                                id="firstName"
                                name="firstName"
                                placeholder="Enter your first name"
                                type="text"
                                onChange={() => setIsTouched(true)}
                                className="focus:border-primary h-11"
                            />
                        </div>
                        {errors.firstName && (
                            <span className="text-red-500 text-xs">
                                {errors.firstName.message}
                            </span>
                        )}
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Full Name</Label>
                            <Input
                                {...register("lastName")}
                                id="lastName"
                                name="lastName"
                                placeholder="Enter your last name"
                                type="text"
                                onChange={() => setIsTouched(true)}
                                className="focus:border-primary h-11"
                            />
                        </div>
                        {errors.lastName && (
                            <span className="text-red-500 text-xs">
                                {errors.lastName.message}
                            </span>
                        )}
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                {...register("email")}
                                id="email"
                                name="email"
                                placeholder="Enter your email address"
                                type="email"
                                onChange={() => setIsTouched(true)}
                                className="focus:border-primary h-11"
                            />
                        </div>
                        {errors.email && (
                            <span className="text-red-500 text-xs">
                                {errors.email.message}
                            </span>
                        )}
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                {...register("phone")}
                                id="phone"
                                name="phone"
                                placeholder="Enter your phone number"
                                type="number"
                                onChange={() => setIsTouched(true)}
                                className="focus:border-primary h-11"
                            />
                        </div>
                        {errors.phone && (
                            <span className="text-red-500 text-xs">
                                {errors.phone.message}
                            </span>
                        )}
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                        <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Input
                                {...register("address")}
                                id="address"
                                name="address"
                                placeholder="Enter your address number"
                                type="text"
                                onChange={() => setIsTouched(true)}
                                className="focus:border-primary h-11"
                            />
                        </div>
                        {errors.address && (
                            <span className="text-red-500 text-xs">
                                {errors.address.message}
                            </span>
                        )}
                    </div>

                    <Button
                        className="w-full col-span-2 hover:bg-primary gap-2 justify-center text-black font-bold"
                        type="submit"
                        disabled={isPending || !isTouched}
                    >
                        {isPending ? (
                            <>
                                <Spinner /> Updating
                            </>
                        ) : (
                            "Update"
                        )}
                    </Button>
                </form>
            </section>
        </main>
    );
};

export default UserDashboardProfile;
