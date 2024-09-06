"use client";
import GetAllProducts from "@/api/product/getAllProducts";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../ProductTable/data-table";
import { columns } from "../ProductTable/columns";
import { ProductTableLoading } from "../../DashboardComponents/ProductTableLoading/ProductTableLoading";

const DashboardProductsPage = () => {


    const { isLoading, data: productlist } = useQuery({
        queryKey: ["productlist", "","newest",],
        queryFn: GetAllProducts,
    });

    console.log("productlist is :", productlist);

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
