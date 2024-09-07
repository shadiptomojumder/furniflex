"use client";
import PaymentInit from "@/api/payment/paymentinit";
import ProductCartCard from "@/components/ProductCartCard/ProductCartCard";
import ProductCartCardLoading from "@/components/ProductCartCardLoading/ProductCartCardLoading";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { formatEuroCurrency } from "@/lib/formatPrice";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const CartPage = () => {
    const {
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
        isLoading,
    } = useCart();
    const { user } = useAuth();

    // console.log("cartItems is:", cartItems);

    const calculateTotal = () => {
        const total = cartItems.reduce((accumulator, item) => {
            const itemTotal = item.count * (item?.price ?? 0);
            return accumulator + itemTotal;
        }, 0);
        return total;
    };

    const fullname = user?.firstName + " " + user?.lastName;
    const totalAmmount = calculateTotal();
    const [productList, setProductList] = useState<object[]>([]);
    const [orderData, setOrderData] = useState();

    useEffect(() => {
        const updatedProductList = cartItems.map((item) => ({
            productId: item.id,
            productName: item.name,
            productPrice: item.price,
            productQuantity: item.quantity,
            productImage: item.image,
            productCount: item.count,
        }));

        setProductList(updatedProductList);
    }, [cartItems]);

    // console.log("productList is:", productList);

    const { mutate, isPending } = useMutation({
        mutationKey: [],
        mutationFn: PaymentInit,
        onSuccess: (response) => {
            // console.log("payment success", response);

            if (response.statusCode === 200) {
                // toast.success("Status successfully Update");
                window.location.replace(
                    `${response.data.paymentGetwaydata.GatewayPageURL}`
                );
            }
        },
        onError: (error: any) => {
            // console.log("The payment error is:", error);
            if (error?.response?.status == 409) {
                toast.warning("Something went wrong");
            } else if (error?.response?.status == 500) {
                toast.error("Something went wrong");
            } else if (error.request) {
                toast.error("No response received from the server!!");
            } else {
                console.error(
                    "Error while sending the request:",
                    error.message
                );
            }
        },
    });

    const handleCheckout = async () => {
        const totalAmmount = calculateTotal();
        const productData = {
            userId: `${user?._id}`,
            username: fullname,
            deliveryAddress: `${user?.address}`,
            phoneNumber: `${user?.phone}`,
            productList,
            totalAmmount: `${totalAmmount}`,
        };

        // console.log("productData is:", productData);

        await mutate(productData);
    };

    return (
        <main className="py-10">
            <section className="container grid grid-cols-7">
                <div className="md:col-span-4 col-span-7">
                    <h2 className="text-[#1E1E1E] text-[28px] md:text-start text-center font-semibold mb-10">
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

                <div className="md:col-span-1 col-span-7"></div>

                <div className="md:col-span-2 col-span-7">
                    <h2 className="text-[#1E1E1E] text-[28px] md:text-start text-center font-semibold mb-10">
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
                    <Button
                        onClick={handleCheckout}
                        className="text-[17px] bg-black hover:bg-black font-medium text-white mt-6 w-full h-[56px]"
                    >
                        Go to Checkout
                    </Button>
                </div>
            </section>
        </main>
    );
};

export default CartPage;
