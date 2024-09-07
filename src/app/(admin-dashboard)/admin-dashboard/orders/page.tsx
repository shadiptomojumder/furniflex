"use client";
import GetAllOrder from "@/api/orders/getAllOrder";
import { useQuery } from "@tanstack/react-query";
import { ProductTableLoading } from "../../DashboardComponents/ProductTableLoading/ProductTableLoading";
import { columns } from "../OrderTable/columns";
import { DataTable } from "../OrderTable/data-table";

const DashboardOrdersPage = () => {
    const { isLoading, data: ordertlist } = useQuery({
        queryKey: ["ordertlist"],
        queryFn: GetAllOrder,
    });

    // console.log("ordertlist is :", ordertlist);

    return (
        <>
            <h2 className="text-lg font-semibold p-5">Order List</h2>
            <section className="">
                {isLoading ? (
                    <ProductTableLoading />
                ) : (
                    <DataTable columns={columns} data={ordertlist || []} />
                )}
            </section>
        </>
    );
};

export default DashboardOrdersPage;
