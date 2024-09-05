"use client";
import { createContext, FC, ReactNode, useEffect, useState } from "react";

interface CartContextProviderProps {
    children: ReactNode;
}

export interface CartItem {
    id: string;
    name: string;
    image: string;
    quantity: string;
    count: number;
    price?: number;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    updateCartItem: (id: string, updatedItem: CartItem) => void;
    clearCart: () => void;
    isLoading: boolean;
}

const CartContext = createContext<CartContextType>({
    cartItems: [],
    addToCart: () => {},
    removeFromCart: () => {},
    updateCartItem: () => {},
    clearCart: () => {},
    isLoading: true,
});

const CartContextProvider: FC<CartContextProviderProps> = ({ children }) => {
    // const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    //     if (typeof window !== 'undefined') {
    //         const storedCart = localStorage.getItem('cartItems');
    //         return storedCart ? JSON.parse(storedCart) : [];
    //       }
    //       return [];
    // });

    // useEffect(() => {
    //     //console.log("Saving cart items to localStorage:", cartItems);
    //     localStorage.setItem("cartItems", JSON.stringify(cartItems));
    // }, [cartItems]);


    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isMounted, setIsMounted] = useState(false);
    const [isLoading,setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsMounted(true);
        if (typeof window !== 'undefined') {
            const storedCart = localStorage.getItem('cartItems');
            if (storedCart) {
                setCartItems(JSON.parse(storedCart));
                setIsLoading(false)
            }
        }
    }, []);

    useEffect(() => {
        if (isMounted) {
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
        }
    }, [cartItems, isMounted]);

    const addToCart = (item: CartItem) => {
        setCartItems([...cartItems, { ...item}]);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    };

    const removeFromCart = (id: string) => {
        // Logic to remove item from cart
        setCartItems(cartItems.filter((item) => item.id !== id));
    };

    // const updateCartItem = (id: string, updatedItem: CartItem) => {
    //     setCartItems(
    //         cartItems.map((item) => (item.id === id ? updatedItem : item))
    //     );
    // };

    const updateCartItem = (id: string, updatedItem: CartItem) => {
        // ... other logic
        setCartItems(
          cartItems.map((item) => (item.id === id ? { ...updatedItem } : item))
        );
      };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateCartItem,
                clearCart,
                isLoading
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export { CartContext, CartContextProvider };
