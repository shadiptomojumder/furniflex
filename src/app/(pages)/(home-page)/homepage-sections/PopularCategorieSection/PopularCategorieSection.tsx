"use client";
import ProductCardLoading from "@/app/components/ProductCardLoading/ProductCardLoading";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { GetCategory } from "@/StaticData/CategoryData/CategoryData";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Define the type of the category object
type CategoryType = {
    _id: number;
    categoryName: string;
    categoryTitle: string;
    categoryImage: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
};

const PopularCategorieSection = () => {
    const { isLoading, data, error } = useQuery({
        queryKey: ["categories"],
        queryFn: GetCategory,
    });

    const CategoryList = data;
    // console.log("data is", data);

    return (
        <main className="lg:mt-20 mt-0 mb-10 overflow-hidden">
            <section className="flex items-center justify-between my-4">
                <h2 className="lg:text-2xl md:text-lg text-xl text-[#1A1A1A] font-semibold">
                    Popular Categories
                </h2>
                <div className="flex items-center gap-1">
                    <p className="text-[#00B307] md:font-semibold font-medium">
                        View all
                    </p>
                    <ChevronRight className="text-[#00B307]" />
                </div>
            </section>
            <Carousel
                opts={{
                    align: "start",
                }}
                className="w-full"
            >
                <CarouselContent className="w-full h-full">
                    {isLoading ? (
                        <>
                            {Array.from({ length: 10 }, (_, index) => (
                                <CarouselItem
                                    key={index}
                                    className="2xl:basis-1/6 xl:basis-1/5 lg:basis-1/4 md:basis-1/3 sm:basis-1/2 basis-1/2 w-full"
                                >
                                    <ProductCardLoading></ProductCardLoading>
                                </CarouselItem>
                            ))}
                        </>
                    ) : (
                        <>
                            {CategoryList &&
                                CategoryList.length > 0 &&
                                CategoryList.map((category, index: number) => (
                                    <CarouselItem
                                        key={index}
                                        className="2xl:basis-1/6 xl:basis-1/6 lg:basis-1/5 md:basis-1/4 min-[450px]:basis-1/3 basis-1/2 w-full"
                                    >
                                        <Link
                                            href={`/${category.link}`}
                                            className="p-1"
                                        >
                                            <Card className="hover:shadow-[#00B307] hover:border hover:border-[#00B307] transition-all duration-300 cursor-pointer group h-fit p-1">
                                                <CardContent className="flex items-center justify-center h-full p-0 pb-1">
                                                    <section className="flex flex-col justify-between h-full">
                                                        <div className="max-w-[190px] xl:w-[190px] lg:w-[180px] md:w-[130px] w-[130px] sm:h-[130px] bg-white rounded-lg sm:p-2 overflow-hidden flex justify-center items-center">
                                                            <Image
                                                                src={
                                                                    category?.categoryImage
                                                                }
                                                                alt="food"
                                                                width={200}
                                                                height={200}
                                                                className="w-full object-cover object-center rounded-lg"
                                                            />
                                                        </div>
                                                        <p className="sm:text-base text-sm capitalize group-hover:text-[#2C742F] text-center font-semibold">
                                                            {
                                                                category.categoryTitle
                                                            }
                                                        </p>
                                                    </section>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    </CarouselItem>
                                ))}
                        </>
                    )}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </main>
    );
};

export default PopularCategorieSection;

<div className="left-ribbon flex flex-col justify-start items-start absolute top-0 left-2.5 z-50 max-w-[50%] text-left">
    <div className="bg-main text-white text-[11px] inline-block leading-none font-medium min-w-30 text-center p-[5px] pb-0 mb-2.5 relative after:h-[10px] after:w-full after:absolute after:top-[calc(100%-1px)] after:left-0 after:bg-[url(/ribbon-icon-bg.png)] after:bg-[length:10px_10px] after:bg-[bottom_center] after:bg-repeat-x">
        ৳13.40
        <br />
        OFF
    </div>
</div>;
