"use client";
import Register from "@/api/user/register";
import Spinner from "@/app/components/Spinner/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { FaGoogle } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

const formSchema = z.object({
    fullname: z.string().min(2, {
        message: "Fullname must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Email Invalid",
    }),
    password: z.string().min(2, {
        message: "Password must be at least 2 characters.",
    }),
});

type FormData = z.infer<typeof formSchema>;

const Signup = () => {
    const router = useRouter();

    const {
        register,
        setValue,
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
        await mutate(data);
    };
    

    const handleGoogleSignup = async () => {
        // window.open("http://localhost:5000/api/auth/google","_self")
        // HandleGoogleAuth()
        // const response = axios.get("http://localhost:5000/api/auth/google");
        // console.log("The response is:",response);
        window.location.href = "http://localhost:5000/api/auth/google";
        
    }

    return (
        <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-950">
            <div className="mx-auto w-full max-w-md space-y-6 rounded-lg bg-white py-6 px-3 sm:px-6 shadow-lg dark:bg-black">
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl font-bold">Sign Up</h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        Create your account to get started.
                    </p>
                </div>
                <form
                    target=""
                    className="space-y-4"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div>
                        <div className="space-y-2">
                            <Label htmlFor="fullname">
                                Full Name{" "}
                                <span className="text-red-600">*</span>
                            </Label>
                            <Input
                                {...register("fullname")}
                                id="fullname"
                                name="fullname"
                                placeholder="Enter your full name"
                                className="focus-visible:ring-primary h-11"
                            />
                        </div>
                        {errors.fullname && (
                            <span className="text-red-500 text-xs">
                                {errors.fullname.message}
                            </span>
                        )}
                    </div>

                    <div>
                        <div className="space-y-2">
                            <Label htmlFor="email">
                                Email <span className="text-red-600">*</span>
                            </Label>
                            <Input
                                {...register("email")}
                                id="email"
                                name="email"
                                placeholder="Enter your email address"
                                type="email"
                                className="focus-visible:ring-primary h-11"
                            />
                        </div>
                        {errors.email && (
                            <span className="text-red-500 text-xs">
                                {errors.email.message}
                            </span>
                        )}
                    </div>

                    <div>
                        <div className="space-y-2">
                            <Label htmlFor="password">
                                Password <span className="text-red-600">*</span>
                            </Label>
                            <Input
                                {...register("password")}
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                type="password"
                                className="focus-visible:ring-primary h-11"
                            />
                        </div>
                        {errors.password && (
                            <span className="text-red-500 text-xs">
                                {errors.password.message}
                            </span>
                        )}
                    </div>

                    <Button
                        className="w-full bg-primary hover:bg-accent gap-2 justify-center text-white font-bold"
                        type="submit"
                        disabled={isPending}
                    >
                        {isPending ? (
                            <>
                                <Spinner /> Sign Up
                            </>
                        ) : (
                            "Sign Up"
                        )}
                    </Button>
                    <div
                        onClick={handleGoogleSignup}
                        className="flex items-center justify-center py-2 text-sm font-semibold text-black rounded-md cursor-pointer shadow-xl bg-slate-100 gap-2 w-full"
                        
                    >
                        <FcGoogle className="text-2xl"/>
                        Sign up with Google
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="text-sm text-gray-500 dark:text-white">
                            Already have an account?
                            <Link
                                className="font-medium underline text-primary"
                                href="/login"
                            >
                                {""} Login
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
