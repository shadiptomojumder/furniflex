"use client";
import { CartItem } from "@/context/CartContext/CartContext";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";



interface ProductCartCardProps {
    productData: CartItem;
    cartItem: CartItem;
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    updateCartItem: (id: string, updatedItem: CartItem) => void;
    clearCart: () => void;
}

const ProductCartCard: React.FC<ProductCartCardProps> = ({
    productData,
    addToCart,
    cartItem,
    cartItems,
    removeFromCart,
    updateCartItem,
    clearCart,
}) => {
    const handleIncrement = () => {
        const cartItem = cartItems.find((item) => item.id === productData?.id);
        if (cartItem) {
            updateCartItem(productData.id, {
                ...cartItem,
                count: cartItem.count + 1,
            });
        }
    };

    const handleDecrement = () => {
        const cartItem = cartItems.find((item) => item.id === productData.id);
        if (cartItem && cartItem.count > 1) {
            updateCartItem(productData.id, {
                ...cartItem,
                count: cartItem.count - 1,
            });
        } else if (cartItem && cartItem.count === 1) {
            removeFromCart(productData.id);
        }
    };

    return (
        <div className="bg-white flex items-start border-b border-slate-400  last:border-0 py-1">
            <Image
                src={productData?.image}
                width={70}
                height={70}
                alt="product image"
                className="sm:w-[70px] sm:h-[70px] w-[60px] h-[60px]"
            />
            <section className="w-full flex flex-col gap-1">
                <h2 className="text-sm font-medium capitalize">
                    {productData?.name}
                </h2>
                <div className="flex flex-col min-[375px]:flex-row items-start justify-between sm:gap-5 gap-2 w-full">
                    <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-nowrap">
                            ৳
                            {productData &&
                                productData.price &&
                                productData?.price * productData.count}
                        </p>
                        <div className="flex items-center gap-[2px]">
                            <p className="text-sm font-medium text-slate-500">
                                ৳{productData?.price}
                            </p>
                            <p className="text-xs font-medium text-slate-400">
                                |
                            </p>
                            <p className="text-sm font-medium text-slate-500">
                                piece
                            </p>
                        </div>
                    </div>
                    <div className="text-white bg-slate-100 rounded-full flex items-center justify-around shadow-lg gap-1 border-2 border-gray-600 w-fit">
                        <button
                            onClick={handleDecrement}
                            className="p-[1px] text-gray-800 border-r-2 px-2 border-gray-600"
                        >
                            <Minus />
                        </button>
                        <p className="text-base text-gray-900 font-semibold w-7 flex items-center justify-center">
                            {productData?.count}
                        </p>
                        <button
                            onClick={handleIncrement}
                            className="p-[1px] text-gray-800 border-l-2 px-2 border-gray-600"
                        >
                            <Plus />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProductCartCard;
