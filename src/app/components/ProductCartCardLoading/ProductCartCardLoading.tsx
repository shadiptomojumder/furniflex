import { Skeleton } from "@/components/ui/skeleton";

const ProductCartCardLoading = () => {
    return (
        <section className="bg-white py-2 w-full lg:min-w-[220px] flex items-start gap-4 first:border-b-2 last:border-0">
            <Skeleton className="w-[60px] h-[60px] bg-gray-300" />

            <div className="space-y-1.5 w-full">
                <Skeleton className="w-full h-[15px] bg-gray-300" />
                <Skeleton className="w-full h-[15px] bg-gray-300" />
                <Skeleton className="w-[60%] h-[15px] bg-gray-300" />
            </div>
        </section>
    );
};

export default ProductCartCardLoading;
