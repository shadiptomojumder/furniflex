"use client";
import GetAllProducts from "@/api/product/getAllProducts";
import { ProductType } from "@/types/product.type";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./_components/ProductCard/ProductCard";

const MainPage = () => {
    const {
        isLoading,
        data: productList,
        error,
    } = useQuery({
        queryKey: ["productlist", "", ""],
        queryFn: GetAllProducts,
    });
    console.log("productList is:", productList);

    return (
        <div className="grid grid-cols-3 gap-8">
            {isLoading ? (
                <>
                    <p>Loading</p>
                </>
            ) : (
                <>
                    {productList.map((product: ProductType, index: number) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </>
            )}
        </div>
    );
};

export default MainPage;
