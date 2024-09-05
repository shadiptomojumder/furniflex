import { Skeleton } from "@/components/ui/skeleton";

const ProductCardLoading = () => {
    return (
        <section className="bg-white p-3 w-full lg:min-w-[220px] flex flex-col justify-between border shadow  rounded-md">
            <Skeleton className="sm:w-[150px] w-full sm:h-[150px] h-[70px] mx-auto bg-gray-300 md:mb-4 mb-2" />

            <Skeleton className="w-full md:h-[25px] h-[15px] mx-auto bg-gray-300 md:mb-2 mb-2" />
            <Skeleton className="w-full md:h-[25px] h-[15px] mx-auto bg-gray-300 md:mb-2 mb-2" />

            <div className="flex justify-between items-center gap-3 w-[60%] mx-auto">
                <Skeleton className="w-full md:h-[15px] h-[10px] mx-auto bg-gray-300" />
                <Skeleton className="w-full md:h-[15px] h-[10px] mx-auto bg-gray-300" />
            </div>
            <Skeleton className="w-full md:h-[32px] h-[20px] rounded-full mx-auto bg-gray-300 md:mt-4 mt-4" />
        </section>
    );
};

export default ProductCardLoading;
