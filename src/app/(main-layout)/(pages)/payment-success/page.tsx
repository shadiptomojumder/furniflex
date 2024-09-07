"use client";
import { useCart } from "@/hooks/useCart";
import { useEffect } from "react";

const PaymentSuccess = () => {
    const { clearCart } = useCart();
    useEffect(() => {
        clearCart();

        localStorage.removeItem("cartItems");
    }, []);
    return (
        <div className="p-2 container h-[70dvh]">
            <div className="pt-28">
                <h2 className="text-2xl font-bold text-center">
                    Payment Successfull
                </h2>
                <div className="flex justify-center mt-5">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="96"
                        height="96"
                        viewBox="0 0 48 48"
                    >
                        <defs>
                            <mask id="ipTSuccess0">
                                <g
                                    fill="none"
                                    stroke="#fff"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="4"
                                >
                                    <path
                                        fill="#555"
                                        d="m24 4l5.253 3.832l6.503-.012l1.997 6.188l5.268 3.812L41 24l2.021 6.18l-5.268 3.812l-1.997 6.188l-6.503-.012L24 44l-5.253-3.832l-6.503.012l-1.997-6.188l-5.268-3.812L7 24l-2.021-6.18l5.268-3.812l1.997-6.188l6.503.012z"
                                    />
                                    <path d="m17 24l5 5l10-10" />
                                </g>
                            </mask>
                        </defs>
                        <path
                            fill="green"
                            d="M0 0h48v48H0z"
                            mask="url(#ipTSuccess0)"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
