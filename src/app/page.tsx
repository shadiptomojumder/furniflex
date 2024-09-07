"use client";
import { GetProductByQuery } from "@/api/product/getAllProducts";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination";
import { ProductType } from "@/types/product.type";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard/ProductCard";
import ProductCardLoading from "../components/ProductCardLoading/ProductCardLoading";

const HomePage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    // Set up initial state for pagination
    const [currentPage, setCurrentPage] = useState(() => {
        const pageParam = searchParams.get("page");
        return pageParam ? parseInt(pageParam) : 1;
    });
    const itemsPerPage = 6; // Number of items per page

    const { isLoading, data: responseData } = useQuery({
        queryKey: [
            "productlist",
            {
                queryFilter: {
                    page: currentPage,
                    limit: itemsPerPage,
                },
            },
        ],
        queryFn: GetProductByQuery,
        placeholderData: keepPreviousData,
    });
    const productList = responseData?.data || [];
    const paginationData = responseData?.pagination || {
        totalPages: 2,
        currentPage: 1,
    };

    // Handle page change
    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= paginationData.totalPages) {
            setCurrentPage(newPage);
        }
    };

    // Update URL query parameters when page changes
    useEffect(() => {
        const params = new URLSearchParams();

        params.set("page", currentPage.toString());

        router.push(`/?${params.toString()}`);
    }, [currentPage]);

    return (
        <>
            <Header />
            <section className="container py-20">
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mb-10">
                    {isLoading ? (
                        <>
                            {Array.from({ length: 6 }, (_, index) => (
                                <ProductCardLoading key={index} />
                            ))}
                        </>
                    ) : (
                        <>
                            {productList.map(
                                (product: ProductType, index: number) => (
                                    <ProductCard
                                        key={index}
                                        product={product}
                                    />
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
                                onClick={() =>
                                    handlePageChange(currentPage - 1)
                                }
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
                                disabled={
                                    currentPage === paginationData.totalPages
                                }
                                onClick={() =>
                                    handlePageChange(currentPage + 1)
                                }
                                className={`w-[36px] h-[36px]  ${currentPage === paginationData.totalPages ? "bg-[#DADADA]" : "border-2 bg-white cursor-pointer"} rounded flex justify-center items-center`}
                            >
                                {" "}
                                <ChevronRight className={`text-[#C4CDD5]`} />
                            </button>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </section>
            <Footer />
        </>
    );
};

export default HomePage;
