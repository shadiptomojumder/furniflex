"use client";
import GetAllProducts from "@/api/product/getAllProducts";
import ProductCard from "@/app/components/ProductCard/ProductCard";
import ProductCardLoading from "@/app/components/ProductCardLoading/ProductCardLoading";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";

const ProductData = [
    {
        productName: "Green Apple and sot uijnb jnj  vnjb vnj fdnvjb hnb",
        productPrice: "৳ 299",
        productQuantity: "1 kg",
    },
    {
        productName: "Red Tomato",
        productPrice: "৳ 150",
        productQuantity: "500 gm",
        review: "Very fresh and juicy!",
    },
    {
        productName: "Large Brown Eggs (Dozen)",
        productPrice: "৳ 120",
        productQuantity: "1 Dozen",
    },
    {
        productName: "Banana Bunch (Approx. 5 pcs)",
        productPrice: "৳ 75",
        productQuantity: "Approx. 5 pcs",
    },
    {
        productName: "Fresh Broccoli",
        productPrice: "৳ 199",
        productQuantity: "500 gm",
    },
    {
        productName: "Red Onion",
        productPrice: "৳ 35",
        productQuantity: "4 pcs",
    },
    {
        _id: "milk123",
        productName: "Full Cream Milk (1L)",
        productPrice: "৳ 85",
        productQuantity: "1L",
    },
    {
        productName: "Sliced White Bread",
        productPrice: "৳ 50",
        productQuantity: "700 gm",
    },
    {
        productName: "Chicken Breast (Boneless, Skinless)",
        productPrice: "৳ 450",
        productQuantity: "1 kg",
    },
    {
        productName: "Ground Beef (Minced)",
        productPrice: "৳ 599",
        productQuantity: "500 gm",
    },
    {
        productName: "Potatoes (White)",
        productPrice: "৳ 49",
        productQuantity: "2 kg",
    },
    {
        productName: "Cucumber",
        productPrice: "৳ 25",
        productQuantity: "1 pc",
    },
    {
        productName: "Garlic (Loose)",
        productPrice: "৳ 39",
        productQuantity: "100 gm",
    },
    {
        productName: "Cooking Oil (Vegetable)",
        productPrice: "৳ 220",
        productQuantity: "1L",
    },
    {
        productName: "Basmati Rice (Long Grain)",
        productPrice: "৳ 299",
        productQuantity: "5 kg",
    },
    {
        productName: "Instant Noodles (Pack of 12)",
        productPrice: "৳ 110",
        productQuantity: "12 packs",
    },
    {
        productName: "Orange Juice (Carton)",
        productPrice: "৳ 180",
        productQuantity: "1L",
    },
    {
        productName: "Coffee Powder",
        productPrice: "৳ 350",
        productQuantity: "250 gm",
    },
    {
        productName: "Green Tea Bags (Box of 50)",
        productPrice: "৳ 150",
        productQuantity: "50 bags",
    },
];

const PopularProductSection = () => {
    const {
        isLoading,
        data: productList,
        error,
    } = useQuery({
        queryKey: ["productlist", "", ""],
        queryFn: GetAllProducts,
    });
    // console.log("productList:", productList);

    return (
        <main className="mt-20 mb-10">
            <section className="flex items-center justify-between my-4">
                <h2 className="lg:text-2xl md:text-lg text-xl text-[#1A1A1A] font-semibold">
                    Popular Products
                </h2>
                <div className="flex items-center gap-3">
                    <p className="text-[#00B307] font-semibold">View all</p>
                    <ChevronRight className="text-[#00B307]" />
                </div>
            </section>
            <section className="grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 lg:gap-5 gap-3">
                {isLoading ? (
                    <>
                        {Array.from({ length: 10 }, (_, index) => (
                            <ProductCardLoading
                                key={index}
                            ></ProductCardLoading>
                        ))}
                    </>
                ) : (
                    <>
                        {productList &&
                            productList.length > 0 &&
                            productList.map((product: any) => {
                                return (
                                    <ProductCard
                                        key={product._id}
                                        productData={product}
                                    />
                                );
                            })}
                    </>
                )}
            </section>
        </main>
    );
};

export default PopularProductSection;
