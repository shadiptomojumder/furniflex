"use client";
import ProductCartCard from "@/app/components/ProductCartCard/ProductCartCard";
import ProductCartCardLoading from "@/app/components/ProductCartCardLoading/ProductCartCardLoading";
import { Label } from "@/components/ui/label";
import { useCart } from "@/hooks/useCart";
import { PiEmptyBold } from "react-icons/pi";

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

    return (
        <main className="py-10">
            <section className="container">
                <h2 className="text-2xl font-bold text-center py-10">
                    My Shopping Cart
                </h2>
                <section className="grid grid-cols-12 gap-3">
                    <div className="border-2 rounded-md md:p-5 p-2 md:col-span-8 col-span-12">
                        {/* <ProductCartCardLoading/> */}
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
                            <>
                                <p className="text-lg font-semibold text-center">
                                    Your cart is empty
                                </p>
                                <PiEmptyBold className="text-gray-300 mx-auto md:mt-8 mt-2 md:text-[150px] text-[70px]"/>
                            </>
                        )}

                        {/* <ProductCartCard></ProductCartCard> */}
                    </div>

                    <div className="md:col-span-1 col-span-12"></div>
                    <div className="border-2 rounded-md p-5 md:col-span-3 col-span-12 space-y-4 h-fit">
                        <h2 className="text-xl font-bold">Cart Total</h2>
                        <div className="flex items-center justify-between gap-5 py-2 border-b-2 border-slate-400">
                            <Label className="text-sm font-semibold text-slate-500">
                                Subtotal:
                            </Label>
                            <p className="text-sm font-bold">
                                ৳{calculateTotal()}
                            </p>
                        </div>
                        <div className="flex items-center justify-between gap-5 py-2 border-b-2 border-slate-400">
                            <Label className="text-sm font-semibold text-slate-500">
                                Shipping:
                            </Label>
                            <p className="text-sm font-bold capitalize">Free</p>
                        </div>
                        <div className="flex items-center justify-between gap-5 py-2">
                            <Label className="text-sm font-semibold text-slate-500">
                                Total:
                            </Label>
                            <p className="text-sm font-bold capitalize">
                                ৳{calculateTotal()}
                            </p>
                        </div>
                        <button className="text-white text-sm font-semibold py-2 flex items-center justify-center shadow-lg rounded-full w-full bg-primary">
                            Confirm Order
                        </button>
                    </div>
                </section>
            </section>
        </main>
    );
};

export default CartPage;
