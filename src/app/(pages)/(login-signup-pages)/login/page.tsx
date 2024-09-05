"use client";
import { BaseURL } from "@/api/api";
import Login from "@/api/user/login";
import Spinner from "@/app/components/Spinner/Spinner";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
    email: z.string().email({
        message: "Email Invalid",
    }),
    password: z.string().min(2, {
        message: "Password must be at least 2 characters.",
    }),
});
type FormData = z.infer<typeof formSchema>;

const LoginPage = () => {
    const router = useRouter();
    const { user, setUser, userLoading } = useAuth();

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>({ resolver: zodResolver(formSchema) });

    const { mutate, isPending } = useMutation({
        mutationFn: Login,
        onSuccess: (response) => {
            console.log("response", response);

            if (response.statusCode === 200) {
                toast.success("User successfully Login");

                localStorage.setItem(
                    "userData",
                    JSON.stringify(response.data.loggedInUser)
                );
                localStorage.setItem(
                    "accessToken",
                    JSON.stringify(response?.data?.accessToken)
                );
                localStorage.setItem(
                    "refreshToken",
                    JSON.stringify(response?.data?.refreshToken)
                );

                const accessToken = response.data.accessToken;
                const expires = new Date();
                expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000); // Cookie expires in 7 days

                //document.cookie = `accessTokenByF=${accessToken}; expires=${expires.toUTCString()}; path=/; secure; samesite=strict`;
                setUser(response.data.loggedInUser);
                router.push("/");
                router.refresh();
            }
        },
        onError: (error: any) => {
            if (
                error?.response?.status == 400 ||
                error?.response?.status == 401
            ) {
                toast.warning("Email or Password don't match !!");
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

    const handleGoogleLogin = async () => {
        window.open(`${BaseURL}/auth/google`, "_self");
        // HandleGoogleAuth()
        // const response = axios.get("http://localhost:5000/api/auth/google");
        // console.log("The response is:",response);
        //window.location.href = "https://lalon-store-backend-production.up.railway.app/api/auth/google";
    };

    return (
        <div className="flex h-[80dvh] w-full items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
            <Card className="w-full max-w-md dark:bg-black">
                <CardHeader className="space-y-1 py-6 px-3 sm:px-6">
                    <CardTitle className="text-2xl font-bold text-center">
                        Login
                    </CardTitle>
                    <CardDescription className="text-center">
                        Enter your email and password to access your account.
                    </CardDescription>
                </CardHeader>
                <CardContent className="py-6 px-3 sm:px-6">
                    <form
                        className="space-y-4"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div>
                            <div className="space-y-2">
                                <Label htmlFor="email-username">
                                    Email{" "}
                                    <span className="text-red-600">*</span>
                                </Label>
                                <Input
                                    id="email-username"
                                    placeholder="Enter your email"
                                    {...register("email")}
                                    type="text"
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
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">
                                        Password{" "}
                                        <span className="text-red-600">*</span>
                                    </Label>
                                    <Link
                                        className="text-sm underline"
                                        href="/forgot-password"
                                    >
                                        Forgot Password?
                                    </Link>
                                </div>
                                <Input
                                    id="password"
                                    placeholder="Enter your password"
                                    {...register("password")}
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
                            className="w-full bg-primary hover:bg-accent-foreground gap-2 justify-center font-bold text-white"
                            type="submit"
                            disabled={isPending}
                        >
                            {isPending ? (
                                <>
                                    <Spinner /> Login
                                </>
                            ) : (
                                "Login"
                            )}
                        </Button>

                        {/* <div
                            onClick={handleGoogleLogin}
                            className="flex items-center justify-center py-2 text-sm font-semibold text-black rounded-md cursor-pointer shadow-xl bg-slate-100 gap-2 w-full"
                        >
                            <FcGoogle className="text-2xl" />
                            Login with Google
                        </div> */}

                        <div className="flex items-center justify-center">
                            <div className="text-sm text-gray-500 dark:text-white">
                                Don&apos;t have an account?
                                <Link
                                    className="font-medium underline text-primary"
                                    href="/signup"
                                >
                                    {""} Sign up
                                </Link>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default LoginPage;
