"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import AppleIcon from "/public/images/apple.png";
import Banner from "/public/images/chairbanner.png";
import GoogleIcon from "/public/images/google.png";
import Logo from "/public/images/logoicon.png";
import { useMutation } from "@tanstack/react-query";
import Register from "@/api/user/register";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

const formSchema = z.object({
    firstName: z.string().min(2, {
        message: "FirstName must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
        message: "LastName must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please provide valid email.",
    }),
    password: z.string().min(2, {
        message: "Password must be at least 2 characters.",
    }),
});

type FormData = z.infer<typeof formSchema>;

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>({ resolver: zodResolver(formSchema) });

    const { mutate, isPending } = useMutation({
        mutationFn: Register,
        onSuccess: (response) => {
            if (response.statusCode === 200) {
                toast.success("User successfully registered");
                reset();
                router.push("/login");
            }
        },
        onError: (error: any) => {
            if (error?.response?.status == 400) {
                toast.error("Please fill all the required fild.");
            } else if (error?.response?.status == 409) {
                toast.warning("Username or Email already registered.");
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
        console.log("The data:", data);
        await mutate(data);
    };

    return (
        <section className="flex items-center justify-between">
            <div className="bg-white h-dvh w-[50%] flex items-center justify-center">
                <div className="max-w-[500px] w-[500px] border-2 p-6 bg-[#FAFAFA] rounded-[8px]">
                    <div className="mb-4">
                        <p className="text-2xl font-semibold text-black text-center mb-2">
                            Welcome To
                        </p>
                        <p className="text-[40px] font-bold text-center">
                            <span className="text-black">Furni</span>
                            <span className="text-primary">Flex</span>
                        </p>
                        <p className="text-base font-medium text-[#707070] text-center">
                            Signup for purchase your desire products
                        </p>
                    </div>
                    <form className="" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex items-start gap-[14px] mb-[14px]">
                            {/* First name */}
                            <div className="w-full">
                                <div className="border-2 pl-3 pt-2 pr-3 rounded-md w-full">
                                    <label
                                        htmlFor="firstName"
                                        className="text-xs text-[#707070] block mb-[2px]"
                                    >
                                        First name (optional)
                                    </label>
                                    <Input
                                        {...register("firstName")}
                                        id="firstName"
                                        name="firstName"
                                        placeholder="Enter your first name"
                                        className="px-0 py-0 h-7 w-full border-none focus-visible:ring-0"
                                    />
                                </div>
                                {errors.firstName && (
                                    <span className="text-red-500 text-xs">
                                        {errors.firstName.message}
                                    </span>
                                )}
                            </div>

                            {/* Last name */}
                            <div className="w-full">
                                <div className="border-2 pl-3 pt-2 pr-3 rounded-md w-full">
                                    <label
                                        htmlFor="lastName"
                                        className="text-xs text-[#707070] block mb-[2px]"
                                    >
                                        Last name (optional)
                                    </label>
                                    <Input
                                        {...register("lastName")}
                                        id="lastName"
                                        name="lastName"
                                        placeholder="Enter your last name"
                                        className="px-0 py-0 h-7 w-full border-none focus-visible:ring-0"
                                    />
                                </div>
                                {errors.lastName && (
                                    <span className="text-red-500 text-xs">
                                        {errors.lastName.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="mb-[14px]">
                            <div className="border-2 pl-3 pt-2 pr-3 rounded-md w-full">
                                <label
                                    htmlFor="email"
                                    className="text-xs text-[#707070] block mb-[2px]"
                                >
                                    Email address
                                </label>
                                <Input
                                    {...register("email")}
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className="px-0 py-0 h-7 w-full border-none focus-visible:ring-0"
                                />
                            </div>
                            {errors.email && (
                                <span className="text-red-500 text-xs">
                                    {errors.email.message}
                                </span>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="mb-[14px]">
                            <div className="border-2 pl-3 pt-2 pr-3 rounded-md w-full relative">
                                <label
                                    htmlFor="password"
                                    className="text-xs text-[#707070] block mb-[2px]"
                                >
                                    Password
                                </label>
                                <Input
                                    {...register("password")}
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="px-0 py-0 h-7 w-full border-none focus-visible:ring-0"
                                />
                                <div
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="p-1 absolute right-2 top-1/2 -translate-y-1/2"
                                >
                                    {showPassword ? (
                                        <Eye className="text-[#707070]" />
                                    ) : (
                                        <EyeOff className="text-[#707070]" />
                                    )}
                                </div>
                            </div>
                            {errors.password && (
                                <span className="text-red-500 text-xs">
                                    {errors.password.message}
                                </span>
                            )}
                        </div>

                        <div className="flex items-center space-x-2 mb-5">
                            <Checkbox id="terms" />
                            <label
                                htmlFor="terms"
                                className="text-sm text-black font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                I agree to the{" "}
                                <span className="underline cursor-pointer">
                                    Terms & Policy
                                </span>
                            </label>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-[56px] bg-black hover:bg-black text-lg font-semibold text-white"
                        >
                            Signup
                        </Button>
                    </form>
                    <div className="w-full h-[2px] my-[22px] bg-[#F1F0F0] relative">
                        <p className="text-sm font-semibold text-black p-2 rounded-full bg-[#fafafa] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                            or
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            className="gap-2 border w-full h-[52px] text-black hover:text-black font-semibold text-sm"
                        >
                            <Image
                                src={GoogleIcon}
                                alt="Google"
                                width={20}
                                height={20}
                            />
                            Sign in with Google
                        </Button>
                        <Button
                            variant="outline"
                            className="gap-2 border w-full h-[52px] text-black hover:text-black font-semibold text-sm"
                        >
                            <Image
                                src={AppleIcon}
                                alt="Google"
                                width={20}
                                height={20}
                            />
                            Sign in with Apple
                        </Button>
                    </div>
                    <Link href="/login">
                    <p className="text-sm my-5 font-medium text-black text-center">
                        Have an account?{" "}
                        <span className="text-primary cursor-pointer">
                            Sign In
                        </span>
                    </p>
                    </Link>
                </div>
            </div>
            <div className="bg-green-300 h-dvh w-[50%] relative overflow-hidden">
                <Image
                    src={Banner}
                    alt="Banner"
                    width={500}
                    height={500}
                    className="w-full object-contain object-top"
                />
                <div className="w-[445px] text-center absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                    <Image
                        src={Logo}
                        alt="Logo"
                        width={100}
                        height={100}
                        className="w-[90px] object-cover object-center mx-auto"
                    />
                    <p className="text-[40px] font-bold text-white mt-1 mb-2">
                        Furni<span className="text-primary">Flex</span>
                    </p>
                    <p className="text-base text-[#C8C4C4] font-medium">
                        Discover a seamless shopping experience with our curated
                        collection of products. From fashion to electronics, we
                        bring quality.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Signup;
