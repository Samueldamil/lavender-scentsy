import { useContext, createContext, useState, useEffect } from "react";

const CartContext = createContext();

export default function CartProvider({ children }) {
    const [ cart, setCart ] = useState(() => {
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : [];
    });

    const totalItem = cart.length;

    function addToCart(product) {
        setCart((prev) => {
            const existing = prev.find(item => item._id === product._id)

            if (existing) {
                return prev.map(item => item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    function removeFromCart(id) {
        setCart((prev) => prev.filter(item => item._id !== id));
    };

    function increaseQty(id) {
        setCart((prev) => prev.map(item => item._id === id ? { ...item, quantity: item.quantity + 1 } : item));
    };

    function decreaseQty(id) {
        setCart((prev) => prev.map(item => item._id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
    };

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    return(
        <CartContext.Provider value={{cart, setCart, addToCart, removeFromCart, increaseQty, decreaseQty, totalItem}}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
} 