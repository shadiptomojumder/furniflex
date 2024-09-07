import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ProductDataType } from "./columns";

// interface AppointmentData {
//   // Define the structure of your appointmentData prop here
//   _id: string;
//   name: string;
//   phone: string;
//   address: string;
//   service: string;
//   appointmentDate: string;
//   appointmentTime: string;
//   message: string;
//   status: string;
//   createdBy: string;
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// }

const StatusChangeOption = ({
    product,
    status,
    setStatus,
}: {
    product: ProductDataType;
    status: string;
    setStatus: (status: string) => void;
}) => {
    const router = useRouter();
    const queryClient = useQueryClient();

    // const [status, setStatus] = useState<string>();
    // console.log("status is", status);

    // const { mutate, isPending } = useMutation({
    //   mutationKey: [],
    //   mutationFn: UpdateAppointment,
    //   onSuccess: (response) => {
    //     // console.log("the res is ", response);

    //     if (response.statusCode === 200) {
    //       toast.success("Status successfully Update");
    //       router.refresh();
    //       queryClient.invalidateQueries({ queryKey: ["appointments"] });
    //     }
    //   },
    //   onError: (error: any) => {
    //     // console.log("The Error Appointment is:", error);
    //     if (error?.response?.status == 409) {
    //       toast.warning(
    //         "There is already an appointment with this name and date."
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

    const handleStatusChange = async (value: string) => {
        setStatus(value);
        // console.log("The value is:", value);
        const appointmentId = product._id;

        // await mutate({ data: { status: value }, appointmentId });
    };

    useEffect(() => {
        setStatus(product.productCategory);
    }, []);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="w-full">
                    <div>DOOP</div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                    <DropdownMenuLabel>Change status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup
                        value={status}
                        onValueChange={handleStatusChange}
                    >
                        <DropdownMenuRadioItem
                            value="pending"
                            className={
                                status === "pending"
                                    ? "bg-accent font-semibold"
                                    : ""
                            }
                        >
                            Pending
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                            value="booked"
                            className={
                                status === "booked"
                                    ? "bg-accent font-semibold"
                                    : ""
                            }
                        >
                            Booked
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                            value="done"
                            className={
                                status === "done"
                                    ? "bg-accent font-semibold"
                                    : ""
                            }
                        >
                            Done
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                            value="failed"
                            className={
                                status === "failed"
                                    ? "bg-accent font-semibold"
                                    : ""
                            }
                        >
                            Failed
                        </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default StatusChangeOption;
