import UpdateUser from "@/api/user/updateUser";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@/context/AuthContext/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import Spinner from "../Spinner/Spinner";

const formSchema = z.object({
    fullname: z.string().min(2, {
        message: "Fullname must be at least 2 characters.",
    }),
    address: z.string().min(2, {
        message: "Fullname must be at least 2 characters.",
    }),
    phone: z
        .string({ required_error: "Phone number is required" })
        .min(1, "Please enter your phone number")
        .refine((phone) => /^01[3-9]\d{8}$/.test(phone), {
            message: "Please enter a valid phone number",
        }),
});

type FormData = z.infer<typeof formSchema>;

const AddNewAddressModal = ({
    user,
    setUser,
}: {
    user: User;
    setUser: any;
}) => {
    const [modalOpen, setModalOpen] = useState<boolean>();
    const [isTouched, setIsTouched] = useState<boolean>(false);

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
                setUser(response?.data);
                localStorage.setItem(
                    "userData",
                    JSON.stringify(response?.data)
                );
                setModalOpen(false);
                setIsTouched(false)
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
    console.log("isPending",isPending);
    

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        console.log("The data is:", data);

        if (user && user._id) {
            await mutate({ data: data, userId: user._id?.toString() });
        } else {
            console.error("User or user ID is not defined");
        }
    };

    return (
        <Dialog onOpenChange={() => setModalOpen(!modalOpen)} open={modalOpen}>
            <DialogTrigger asChild>
                <div className="flex items-center gap-[2px] cursor-pointer text-white">
                    <Plus />
                    <p className="text-xs font-semibold">Add New</p>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Address</DialogTitle>
                    <DialogDescription>
                        Give your location address
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-1">
                        <div className="space-y-1">
                            <Label htmlFor="fullname" className="font-semibold">
                                Name <span className="text-red-600">*</span>
                            </Label>
                            <Input
                                {...register("fullname")}
                                id="fullname"
                                name="fullname"
                                type="text"
                                value={user?.fullname}
                                readOnly
                                placeholder="Enter Your Name"
                                className="focus-visible:ring-primary h-11"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="phone" className="font-semibold">
                                Phone Number{" "}
                                <span className="text-red-600">*</span>
                            </Label>
                            <Input
                                {...register("phone")}
                                id="phone"
                                name="phone"
                                type="text"
                                defaultValue={user?.phone}
                                onChange={() => setIsTouched(true)}
                                placeholder="Enter Your Phone Number"
                                className="focus-visible:ring-primary h-11"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label
                                htmlFor="address"
                                className="font-semibold capitalize"
                            >
                                address <span className="text-red-600">*</span>
                            </Label>
                            <Input
                                {...register("address")}
                                id="address"
                                name="address"
                                type="text"
                                defaultValue={user?.address}
                                onChange={() => setIsTouched(true)}
                                placeholder="Enter Your Address"
                                className="focus-visible:ring-primary h-11"
                            />
                        </div>
                    </div>
                    <DialogFooter className="mt-3">
                        <Button
                            className="w-full hover:bg-primary gap-2 justify-center text-white font-bold"
                            type="submit"
                            disabled={isPending || !isTouched}
                        >
                            {isPending ? (
                                <>
                                    <Spinner /> Saving
                                </>
                            ) : (
                                "Save Changes"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddNewAddressModal;
