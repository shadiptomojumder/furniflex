"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import ActionButton from "./ActionButton";
import { DataTableColumnHeader } from "./data-table-column-header";

export type ProductDataType = {
    _id: string;
    productName: string;
    productPrice: number;
    productQuantity: string;
    productCategory: string;
    productDescription: string;
    productStock: number;
    productImage: string;
    productImageOne: string;
    productImageTwo: string;
    productImageThree: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
};

export const columns: ColumnDef<ProductDataType>[] = [
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
        id: "productName",
        accessorKey: "productName",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Product Name" />
        ),
        cell: ({ row }) => (
            <div className="capitalize text-nowrap">
                {row.getValue("productName")}
            </div>
        ),
    },
    {
        id: "productPrice",
        accessorKey: "productPrice",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Product Price" />
        ),
        enableSorting: true,
        cell: ({ row }) => (
            <div className="capitalize">
                {row.getValue("productPrice")} taka
            </div>
        ),
    },
    {
        id: "productQuantity",
        accessorKey: "productQuantity",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Product Quantity" />
        ),
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("productQuantity")}</div>
        ),
    },
    {
        id: "productCategory",
        accessorKey: "productCategory",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Product Category" />
        ),
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("productCategory")}</div>
        ),
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        id: "productDescription",
        accessorKey: "productDescription",
        header: ({ column }) => (
            <span className="text-nowrap">Product Description</span>
        ),
        cell: ({ row }) => {
            const productDescription = row.getValue("productDescription");
            return (
                <>
                    {productDescription ? (
                        <div className="capitalize line-clamp-2">
                            {row.getValue("productDescription")}
                        </div>
                    ) : (
                        <div className="capitalize line-clamp-2">
                            No Description
                        </div>
                    )}
                </>
            );
        },
    },
    {
        id: "productStock",
        accessorKey: "productStock",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Stock" />
        ),
        cell: ({ row }) => (
            <div className="capitalize font-bold text-center">
                {row.getValue("productStock")}
            </div>
        ),
    },
    // {
    //     id: "productStock",
    //     accessorKey: "productStock",
    //     header: ({ column }) => (
    //         <DataTableColumnHeader column={column} title="Status" />
    //     ),
    //     cell: ({ row }) => {
    //         const productStock = row.getValue("productStock") as number;
    //         // console.log("status", productStock);

    //         return (
    //             <>
    //                 {productStock > 0 && (
    //                     <Badge variant="default" className="hover:bg-green-500">
    //                         In Stock
    //                     </Badge>
    //                 )}

    //                 {productStock === 0 && (
    //                     <Badge
    //                         variant="default"
    //                         className="bg-[#4e440f] hover:bg-[#62561d] text-center"
    //                     >
    //                         Out of Stock
    //                     </Badge>
    //                 )}
    //             </>
    //         );
    //     },
    //     filterFn: (row, status, value) => {
    //         return value.includes(row.getValue(status));
    //     },
    // },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const product = row.original;
            // // console.log("Apointment", apoointment);

            return <ActionButton product={product} />;
        },
    },
];
