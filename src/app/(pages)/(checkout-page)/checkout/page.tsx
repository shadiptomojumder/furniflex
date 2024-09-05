"use client";
import PaymentInit from "@/api/payment/paymentinit";
import AddNewAddressModal from "@/app/components/AddNewAddressModal/AddNewAddressModal";
import LoginModal from "@/app/components/LoginModal/LoginModal";
import ProductCartCard from "@/app/components/ProductCartCard/ProductCartCard";
import ProductCartCardLoading from "@/app/components/ProductCartCardLoading/ProductCartCardLoading";
import { Label } from "@/components/ui/label";
import { User } from "@/context/AuthContext/AuthContext";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PiEmptyBold } from "react-icons/pi";
import { toast } from "sonner";

const Checkout = () => {
    const {
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
        isLoading,
    } = useCart();
    const router = useRouter();
    const { user, setUser, userLoading } = useAuth();
    console.log("cartItems is:", cartItems);
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

    console.log("productList is:", productList);

    const calculateTotal = () => {
        const total = cartItems.reduce((accumulator, item) => {
            const itemTotal = item.count * (item?.price ?? 0);
            return accumulator + itemTotal;
        }, 0);
        return total;
    };

    // payment-success
    // payment-cancel
    // payment-fail

    const { mutate, isPending } = useMutation({
        mutationKey: [],
        mutationFn: PaymentInit,
        onSuccess: (response) => {
            console.log("payment success", response);

            if (response.statusCode === 200) {
                // toast.success("Status successfully Update");
                window.location.replace(
                    `${response.data.paymentGetwaydata.GatewayPageURL}`
                );
            }
        },
        onError: (error: any) => {
            console.log("The payment error is:", error);
            if (error?.response?.status == 409) {
                toast.warning(
                    "Something went wrong"
                );
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

    const handlePayNow = async () => {
        const totalAmmount = calculateTotal();
        const productData = {
            userId: `${user?._id}`,
            username: `${user?.fullname}`,
            deliveryAddress: `${user?.address}`,
            phoneNumber: `${user?.phone}`,
            productList,
            totalAmmount: `${totalAmmount}`,
        };

        console.log("productData is:", productData);

        await mutate(productData);
    };

    console.log("User is:", user);

    return (
        <main className="md:py-10 pt-5 pb-10">
            <LoginModal user={user as User} setUser={setUser}></LoginModal>
            <section className="container">
                <h2 className="text-2xl font-bold text-center md:py-10 pb-5">
                    Checkout
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
                                <PiEmptyBold className="text-gray-300 mx-auto md:mt-8 mt-2 md:text-[150px] text-[70px]" />
                            </>
                        )}

                        {/* <div className="space-y-1 mt-5 h-fit px-5">
                            <div className="flex items-center justify-between gap-5 py-1 border-slate-400">
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
                                <p className="text-sm font-bold capitalize">
                                    Free
                                </p>
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
                        </div> */}
                    </div>

                    <div className="md:col-span-1 col-span-12"></div>
                    <div className="md:col-span-3 col-span-12 space-y-4 h-fit">
                        <div className="bg-slate-100 rounded-md h-fit">
                            <div className="flex items-center justify-between py-2 px-4 bg-primary rounded-t-md">
                                <h2 className="text-base font-semibold">
                                    Delivery address
                                </h2>
                                {/* <div className="flex items-center gap-[2px] cursor-pointer text-white">
                                    <Plus />
                                    <p className="text-xs font-semibold">
                                        Add New
                                    </p>
                                </div> */}

                                <AddNewAddressModal
                                    user={user as User}
                                    setUser={setUser}
                                />
                            </div>
                            {user && user.address ? (
                                <div className="px-4 py-4">
                                    <p className="text-sm font-bold capitalize">
                                        {user.fullname},
                                    </p>
                                    <p className="text-sm ">{user.phone}</p>
                                    <p className="text-sm capitalize">
                                        {user.address}
                                    </p>
                                </div>
                            ) : (
                                <div className="px-4 py-4">
                                    <p className="text-sm font-medium capitalize text-center">
                                        No address added
                                    </p>
                                </div>
                            )}

                            {/* <div className="px-4 py-4">
                                <p className="text-sm font-bold capitalize">Shadipto mojumder,</p>
                                <p className="text-sm ">+8801892157351</p>
                                <p className="text-sm ">42 Mollapara Rd, Dhaka, Bangladesh</p>
                            </div> */}
                        </div>
                        <div className="border-2 rounded-md p-4 space-y-2 h-fit">
                            {/* <h2 className="text-xl font-bold">Cart Total</h2> */}
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
                                <p className="text-sm font-bold capitalize">
                                    Free
                                </p>
                            </div>
                            <div className="flex items-center justify-between gap-5 py-2">
                                <Label className="text-sm font-semibold text-slate-500">
                                    Total:
                                </Label>
                                <p className="text-sm font-bold capitalize">
                                    ৳{calculateTotal()}
                                </p>
                            </div>
                            <button
                                onClick={handlePayNow}
                                className="text-white text-sm font-semibold py-2 flex items-center justify-center shadow-lg rounded-full w-full bg-primary"
                            >
                                Confirm Order
                            </button>
                        </div>
                    </div>
                </section>
            </section>
        </main>
    );
};

export default Checkout;
