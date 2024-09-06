"use client";
import { CartItem } from "@/context/CartContext/CartContext";
import { formatEuroCurrency } from "@/lib/formatPrice";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";

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
        <div className="border-b border-[#ECECEC] last:border-none pb-5 pt-5 first:pt-0 last:pb-0">
            <div className="flex items-center gap-3 w-full">
                <div className="bg-slate-100 p-3 w-[100px] border border-[#DEDEDE] rounded-[6px] flex items-center justify-between gap-2">
                    <button
                        onClick={handleDecrement}
                        className="text-[#CFCFCF] cursor-pointer"
                    >
                        <Minus size={18} />
                    </button>
                    <p className="text-[20px] font-semibold text-[#0E0E0E]">
                        {productData?.count}
                    </p>
                    <button
                        onClick={handleIncrement}
                        className="text-[#5C5C5C] cursor-pointer"
                    >
                        <Plus size={18} />
                    </button>
                </div>
                <div className="flex items-start justify-between gap-4 w-full">
                    <div className="flex items-start gap-4">
                        <Image
                            src={productData?.image}
                            width={88}
                            height={88}
                            alt="product image"
                            className="w-[88px] h-[88px] object-cover object-center border border-[#DEDEDE] rounded-[6px]"
                        />
                        <h2 className="text-base font-bold text-[#434343] capitalize">
                            {productData?.name}
                        </h2>
                    </div>
                    <div onClick={()=>removeFromCart(productData.id)} className="cursor-pointer">
                        <RxCross2 size={25} />
                    </div>
                </div>
            </div>
            <p className="text-[20px] font-semibold text-right text-[#0E0E0E] mt-2">
                {formatEuroCurrency(productData?.price)}
            </p>
        </div>
    );
};

export default ProductCartCard;
