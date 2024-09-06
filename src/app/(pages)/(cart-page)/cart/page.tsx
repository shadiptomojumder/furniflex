"use client";
import ProductCartCard from "@/app/components/ProductCartCard/ProductCartCard";
import ProductCartCardLoading from "@/app/components/ProductCartCardLoading/ProductCartCardLoading";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useCart } from "@/hooks/useCart";
import { formatEuroCurrency } from "@/lib/formatPrice";

const CartPage = () => {
    const {
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
        isLoading,
    } = useCart();

    console.log("cartItems is:", cartItems);

    const calculateTotal = () => {
        const total = cartItems.reduce((accumulator, item) => {
            const itemTotal = item.count * (item?.price ?? 0);
            return accumulator + itemTotal;
        }, 0);
        return total;
    };

    const totalAmmount = calculateTotal();

    return (
        <main className="py-10">
            <section className="container grid grid-cols-7">
                <div className="col-span-4">
                    <h2 className="text-[#1E1E1E] text-[28px] font-semibold mb-10">
                        An overview of your order
                    </h2>
                    <div className="bg-[#FAFAFA] p-6 md:col-span-8 col-span-12 mb-10 rounded-md">
                        {isLoading ? (
                            <>
                                {Array.from({ length: 2 }, (_, index) => (
                                    <ProductCartCardLoading key={index} />
                                ))}
                            </>
                        ) : cartItems.length > 0 ? (
                            <>
                                {cartItems &&
                                    cartItems.length > 0 &&
                                    cartItems.map((cartItem) => {
                                        return (
                                            <ProductCartCard
                                                key={cartItem.id}
                                                cartItems={cartItems}
                                                cartItem={cartItem}
                                                addToCart={addToCart}
                                                removeFromCart={removeFromCart}
                                                updateCartItem={updateCartItem}
                                                clearCart={clearCart}
                                                productData={cartItem}
                                            />
                                        );
                                    })}
                            </>
                        ) : (
                            <div className="h-[270px]">
                                <p className="text-xl font-semibold text-center">
                                    Your cart is empty
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="col-span-1"></div>

                <div className="col-span-2">
                    <h2 className="text-[#1E1E1E] text-[28px] font-semibold mb-10">
                        Oder details
                    </h2>
                    <div className="border bg-[#FAFAFA] rounded-[12px] p-6 space-y-3">
                        <div className="flex items-center justify-between gap-5">
                            <Label className="text-[20px] font-normal text-[#656565]">
                                Subtotal
                            </Label>
                            <p className="text-[20px] font-medium text-[#656565]">
                                {formatEuroCurrency(totalAmmount)}
                            </p>
                        </div>
                        <div className="flex items-center justify-between gap-5">
                            <Label className="text-[20px] font-normal text-[#656565]">
                                Shipping
                            </Label>
                            <p className="text-[20px] font-medium text-[#656565]">
                                Free
                            </p>
                        </div>
                        <div className="flex items-center justify-between gap-5 pb-3 border-b">
                            <Label className="text-[20px] font-normal text-[#656565]">
                                Estimated Tax
                            </Label>
                            <p className="text-[20px] font-medium text-[#656565]">
                                € -
                            </p>
                        </div>
                        <div className="flex items-center justify-between gap-5">
                            <Label className="text-2xl font-semibold text-[#656565]">
                                Total:
                            </Label>
                            <p className="text-2xl font-semibold text-[#0E0E0E]">
                                {formatEuroCurrency(totalAmmount)}
                            </p>
                        </div>
                    </div>
                    <Button className="text-[17px] bg-black hover:bg-black font-medium text-white mt-6 w-full h-[56px]">Go to Checkout</Button>
                </div>
            </section>
        </main>
    );
};

export default CartPage;
