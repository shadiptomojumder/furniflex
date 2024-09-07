"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import ActionButton from "./ActionButton";
import { DataTableColumnHeader } from "./data-table-column-header";

export type ProductDataType = {
    _id: string;
    productName: string;
    productPrice: number;
    productQuantity: string;
    productCategory: string;
    productDescription: string;
    productStock?: number;
    productImage?: string;
    productImageOne?: string;
    productImageTwo?: string;
    productImageThree?: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
};
export type OrderDataType = {
    _id: string;
    userId: string;
    username: string;
    deliveryAddress: string;
    phoneNumber: string;
    productList: {
        productId: string;
        productName: string;
        productPrice: number;
        productQuantity: string;
        productImage: string;
        productCount: number;
    }[];
    totalAmmount: number;
    transactionId?: string;
    deliveryStatus: string;
    paymentStatus: boolean;
    paymentType: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
};

export const columns: ColumnDef<OrderDataType>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: "username",
        accessorKey: "username",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="User Name" />
        ),
        cell: ({ row }) => (
            <div className="capitalize text-nowrap">
                {row.getValue("username")}
            </div>
        ),
    },
    {
        id: "deliveryAddress",
        accessorKey: "deliveryAddress",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Delivery Address" />
        ),
        enableSorting: true,
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("deliveryAddress")}</div>
        ),
    },
    {
        id: "phoneNumber",
        accessorKey: "phoneNumber",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Phone Number" />
        ),
        cell: ({ row }) => (
            <div className="capitalize">+88{row.getValue("phoneNumber")}</div>
        ),
    },
    {
        id: "totalAmmount",
        accessorKey: "totalAmmount",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Order Ammount" />
        ),
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("totalAmmount")} tk</div>
        ),
    },
    {
        id: "paymentStatus",
        accessorKey: "paymentStatus",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Payment Status" />
        ),
        cell: ({ row }) => {
            const status = row.getValue("paymentStatus");
            return (
                <>
                    {status ? (
                        <Badge
                            variant="default"
                            className="bg-[#a6d296] hover:bg-[#297c0b] uppercase"
                        >
                            paid
                        </Badge>
                    ) : (
                        <Badge
                            variant="default"
                            className="bg-[#FFE569] hover:bg-[#FFE569] uppercase"
                        >
                            cod
                        </Badge>
                    )}
                </>
            );
        },
        filterFn: (row, paymentStatus, value) => {
            return value.includes(row.getValue(paymentStatus));
        },
    },
    {
        id: "deliveryStatus",
        accessorKey: "deliveryStatus",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Delivery Status" />
        ),
        cell: ({ row }) => {
            const status = row.getValue("deliveryStatus");
            return (
                <>
                    {status === "pending" && (
                        <Badge
                            variant="default"
                            className="bg-[#FFE569] hover:bg-[#FFE569] uppercase"
                        >
                            Pending
                        </Badge>
                    )}
                    {status === "inprogress" && (
                        <Badge
                            variant="default"
                            className="bg-yellow-600 hover:bg-yellow-600 cursor-pointer uppercase"
                        >
                            inprogress
                        </Badge>
                    )}
                    {status === "done" && (
                        <Badge
                            variant="default"
                            className="bg-[#a6d296] hover:bg-[#a6d296] cursor-pointer uppercase"
                        >
                            done
                        </Badge>
                    )}
                    {status === "failed" && (
                        <Badge variant="destructive">
                            {row.getValue("status")}
                        </Badge>
                    )}
                </>
            );
        },
        filterFn: (row, paymentStatus, value) => {
            return value.includes(row.getValue(paymentStatus));
        },
    },
    {
        id: "productList",
        accessorKey: "productList",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Products" />
        ),
        cell: ({ row }) => {
            const productData = row.getValue("productList");
            //const productList = ['66867f3eb7ee85e7f02be42e', '66867e48b7ee85e7f02be410'];
            // console.log("productList:", productData);

            return (
                <>
                    {/* {productList &&
                        Array.isArray(productList) &&
                        productList.map((id: string, index: number) => (
                            <div key={index}>product {id}</div>
                        ))} */}
                    {productData && Array.isArray(productData) && (
                        <div>{productData.length}</div>
                    )}
                </>
            );
        },
    },
    {
        id: "createdAt",
        accessorKey: "createdAt",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Order Time" />
        ),
        cell: ({ row }) => {
            const date = new Date(row.getValue("createdAt"));
            return (
                <div className="capitalize">
                    {format(date, "h:mm a,dd MMM")}
                </div>
            );
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const order = row.original;
            // // console.log("Apointment", apoointment);

            return <ActionButton order={order} />;
        },
    },
];
