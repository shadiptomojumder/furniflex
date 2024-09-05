import { CartContext } from "@/context/CartContext/CartContext";
import { useContext } from "react";

export const useCart = () => {
    const { cartItems, addToCart, removeFromCart, updateCartItem, clearCart , isLoading } =
        useContext(CartContext);
    return { cartItems, addToCart, removeFromCart, updateCartItem, clearCart, isLoading };
};
