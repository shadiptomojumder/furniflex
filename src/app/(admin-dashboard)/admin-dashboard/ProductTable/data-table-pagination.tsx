import DeleteProducts from "@/api/product/deleteProducts";
import Spinner from "@/components/Spinner/Spinner";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Table } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";

interface DataTablePaginationProps<TData> {
    table: Table<TData>;
}

export function DataTablePagination<TData>({
    table,
}: DataTablePaginationProps<TData>) {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    // // console.log("selected rows: ", selectedRows);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] =
        useState<boolean>(false);
    const productIds = selectedRows.map((product: any) => {
        const productId = product?.original._id;
        return productId;
    });

    // // console.log("selectedAppointmentIds", selectedAppointmentIds);
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationKey: [],
        mutationFn: DeleteProducts,
        onSuccess: (response) => {
            // console.log("the res is ", response);

            if (response.statusCode === 200) {
                selectedRows.forEach((row) => {
                    table.toggleAllRowsSelected(false);
                });
                toast.success("Selected products are deleted");
                queryClient.invalidateQueries({ queryKey: ["productlist"] });
                setIsDeleteDialogOpen(false);
            }
        },
        onError: (error: any) => {
            // console.log("The Error Appointment is:", error);
            if (error?.response?.status == 400) {
                toast.warning("Nothing selected!");
            } else if (error?.response?.status == 500) {
                toast.error("Something went wrong");
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

    const handleMultipleDelete = async () => {
        await mutate({ productIds });
        // Deselect the selected items without using resetSelectedRows()
    };

    return (
        <div className="flex lg:flex-row flex-col items-center justify-between gap-2">
            <section className="flex flex-col sm:flex-row sm:items-center items-start justify-between gap-2 lg:w-1/2 w-full">
                <section className="flex items-center gap-3">
                    <div className="flex-1 text-sm text-muted-foreground">
                        {table.getFilteredSelectedRowModel().rows.length} of{" "}
                        {table.getFilteredRowModel().rows.length} row&apos;s
                        selected.
                    </div>

                    {/* {table.getFilteredSelectedRowModel().rows.length > 0 && (
            <Badge
              onClick={handleMultipleDelete}
              variant="default"
              className="bg-[#6a1c1d] hover:bg-[#782c2c] text-gray-200 font-bold cursor-pointer"
            >
              Delete selected
              
            </Badge>
            
          )} */}

                    {table.getFilteredSelectedRowModel().rows.length > 0 && (
                        <AlertDialog open={isDeleteDialogOpen}>
                            <AlertDialogTrigger asChild>
                                <Badge
                                    onClick={() => setIsDeleteDialogOpen(true)}
                                    variant="default"
                                    className="bg-[#6a1c1d] hover:bg-[#782c2c] text-gray-200 font-bold cursor-pointer"
                                >
                                    Delete selected
                                </Badge>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Are you absolutely sure?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will
                                        permanently delete this appointment and
                                        remove this data from the servers.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel
                                        onClick={setIsDeleteDialogOpen.bind(
                                            null,
                                            false
                                        )}
                                    >
                                        Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={handleMultipleDelete}
                                        disabled={isPending}
                                        className="hover:bg-primary"
                                    >
                                        {isPending ? (
                                            <>
                                                <Spinner /> Continue
                                            </>
                                        ) : (
                                            "Continue"
                                        )}
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    )}
                </section>

                <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">Rows per page</p>
                    <Select
                        value={`${table.getState().pagination.pageSize}`}
                        onValueChange={(value) => {
                            table.setPageSize(Number(value));
                        }}
                    >
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue
                                placeholder={
                                    table.getState().pagination.pageSize
                                }
                            />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <SelectItem
                                    key={pageSize}
                                    value={`${pageSize}`}
                                >
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </section>

            <section className="flex items-center lg:justify-end justify-between space-x-6 lg:space-x-8 lg:w-1/2 w-full">
                <div className="flex  items-center justify-center text-sm font-medium">
                    Page {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span className="sr-only">Go to first page</span>
                        <DoubleArrowLeftIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span className="sr-only">Go to previous page</span>
                        <ChevronLeftIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <span className="sr-only">Go to next page</span>
                        <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() =>
                            table.setPageIndex(table.getPageCount() - 1)
                        }
                        disabled={!table.getCanNextPage()}
                    >
                        <span className="sr-only">Go to last page</span>
                        <DoubleArrowRightIcon className="h-4 w-4" />
                    </Button>
                </div>
            </section>
        </div>
    );
}
