"use client";

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { DataTableColumnHeader } from "../../admin-dashboard/ProductTable/data-table-column-header";
import { DataTableToolbar } from "../../admin-dashboard/ProductTable/data-table-toolbar";

const data: TableData[] = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

export type TableData = {};

export const columns: ColumnDef<TableData>[] = [
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
            <Skeleton className="w-7 h-8 rounded-md bg-gray-400" />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "productName",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Product Name" />
        ),
        cell: ({ row }) => (
            <Skeleton className="w-40 h-8 rounded-md bg-gray-400" />
        ),
    },
    {
        accessorKey: "productPrice",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Product Price" />
        ),
        cell: ({ row }) => (
            <Skeleton className="w-40 h-8 rounded-md bg-gray-400" />
        ),
    },
    {
        accessorKey: "productQuantity",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Product Quantity" />
        ),
        cell: ({ row }) => (
            <Skeleton className="w-40 h-8 rounded-md bg-gray-400" />
        ),
    },
    {
        accessorKey: "productCategory",
        header: "Product Category",
        cell: ({ row }) => (
            <Skeleton className="w-40 h-8 rounded-md bg-gray-400" />
        ),
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            const status = row.getValue("status");
            return <Skeleton className="w-24 h-8 rounded-md bg-gray-400" />;
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            return <Skeleton className="w-7 h-8 rounded-md bg-gray-400" />;
        },
    },
];

export function ProductTableLoading() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });
    const [filtering, setFiltering] = React.useState("");


    return (
        <div className="w-full space-y-5">
            {/* <div className="flex xl:flex-row flex-col gap-3 md:items-center items-start justify-between">
                <div className="flex items-center xl:justify-start justify-between gap-5 w-full">
                    <Skeleton className="md:w-60 w-40 h-8 rounded-md bg-gray-400" />
                    <Skeleton className="md:w-40 w-40 h-8 rounded-md bg-gray-400" />
                </div>
                <div className="flex items-center xl:justify-end justify-between gap-5 w-full">
                    <Skeleton className="md:w-60 w-40 h-8 rounded-md bg-gray-400" />
                    <Skeleton className="md:w-40 w-40 h-8 rounded-md bg-gray-400" />
                </div>
            </div> */}
            <div className="px-5">
                <DataTableToolbar
                    table={table}
                    setFiltering={setFiltering}
                    filtering={filtering}
                />
            </div>
            <div className="border-t-2 px-1">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row, index) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                    className={` ${
                                        index % 2 == 0
                                            ? "bg-slate-300"
                                            : "bg-[#edf2ee]"
                                    }`}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
