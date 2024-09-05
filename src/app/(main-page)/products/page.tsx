"use client";
import GetAllProducts, {
    GetProductByQuery,
} from "@/api/product/getAllProducts";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination";
import { ProductType } from "@/types/product.type";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductCard from "../_components/ProductCard/ProductCard";
import ProductCartCardLoading from "../_components/ProductCardLoading/ProductCardLoading";

const ProductPage = () => {
    const searchPrams = useSearchParams();
    const category = searchPrams.get("category") || "";

    console.log("searchPrams is", searchPrams);
    console.log("sortBy is", category);
    // const { data, error } = useQuery({
    //     queryKey: ["productlist", "", ""],
    //     queryFn: GetAllProducts,
    // });

    // Set up state for pagination
    const [currentPage, setCurrentPage] = useState(1); // Start on page 1
    const itemsPerPage = 6; // Number of items per page
    console.log("currentPage is:",currentPage);
    

    const { isLoading, data: responseData } = useQuery({
        queryKey: [
            "productlist",
            {
                queryFilter: {
                    category: category,
                    sortBy: "desc",
                    page: currentPage, // Pass current page
                    limit: itemsPerPage, // Pass limit (items per page)
                },
            },
        ],
        queryFn: GetProductByQuery,
    });
    const productList = responseData?.data || [];
    const paginationData = responseData?.pagination || {
        totalPages: 2,
        currentPage: 1,
    };
    console.log("queryProductList is:", productList);
    console.log("paginationData is:", paginationData);

    // Handle page change
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage); // Update current page
    };
    useEffect(()=>{
        setCurrentPage(1);
    },[category])

    return (
        <section>
            <div className="grid grid-cols-3 gap-8 mb-10">
                {isLoading ? (
                    <>
                        {Array.from({ length: 6 }, (_, index) => (
                            <ProductCartCardLoading key={index} />
                        ))}
                    </>
                ) : (
                    <>
                        {productList.map(
                            (product: ProductType, index: number) => (
                                <ProductCard key={index} product={product} />
                            )
                        )}
                    </>
                )}
            </div>

            {/* Pagination Component */}
            <Pagination>
                <PaginationContent className="gap-2">
                    {/* Previous Page Button */}
                    <PaginationItem>
                        <button
                        disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                            className={`w-[36px] h-[36px]  ${currentPage === 1 ? "bg-[#DADADA]" : "bg-white border-2 cursor-pointer"}  rounded flex justify-center items-center`}
                        >
                            <ChevronLeft className={` text-[#C4CDD5]`} />
                        </button>
                    </PaginationItem>

                    {/* Pagination Links */}
                    {Array.from(
                        { length: paginationData.totalPages || 1 },
                        (_, index) => {
                            const isActive = currentPage === index + 1;
                            return (
                                <PaginationItem
                                    key={index}
                                    className="border-red-500"
                                >
                                    <PaginationLink
                                        className={`border-2 ${isActive ? "border-black" : ""}`}
                                        href="#"
                                        isActive={currentPage === index + 1}
                                        onClick={() =>
                                            handlePageChange(index + 1)
                                        }
                                    >
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            );
                        }
                    )}

                    {/* Ellipsis (if needed) */}
                    {paginationData.totalPages > 3 && (
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    )}

                    {/* Next Page Button */}
                    <PaginationItem>
                        <button
                            disabled={currentPage === paginationData.totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                            className={`w-[36px] h-[36px]  ${currentPage === paginationData.totalPages ? "bg-[#DADADA]" : "border-2 bg-white cursor-pointer"} rounded flex justify-center items-center`}
                        >
                            {" "}
                            <ChevronRight className={`text-[#C4CDD5]`} />
                        </button>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </section>
    );
};

export default ProductPage;
