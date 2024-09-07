"use client";
import GetAllProducts from "@/api/product/getAllProducts";
import { useQuery } from "@tanstack/react-query";
import { ProductTableLoading } from "../../DashboardComponents/ProductTableLoading/ProductTableLoading";
import { columns } from "../ProductTable/columns";
import { DataTable } from "../ProductTable/data-table";

const DashboardProductsPage = () => {
    const { isLoading, data: productlist } = useQuery({
        queryKey: ["productlist", "", "newest"],
        queryFn: GetAllProducts,
    });

    // // console.log("productlist is :", productlist);

    return (
        <>
            <h2 className="text-lg font-semibold p-5">Product List</h2>
            <section className="">
                {isLoading ? (
                    <ProductTableLoading />
                ) : (
                    <DataTable columns={columns} data={productlist || []} />
                )}
            </section>
        </>
    );
};

export default DashboardProductsPage;
