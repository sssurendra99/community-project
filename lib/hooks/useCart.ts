import { CartItem, CartState } from "@/types/cart";
import { CartStorage } from "@/utils/cartStoarage";
import { useEffect, useState } from "react";

export const useCart = () => {
    const [cart, setCart] = useState<CartState>({ items: [], totalItems: 0, totalPrice: 0 });
    const [isLoaded, setIsLoaded] = useState(false);
  
    useEffect(() => {
      if (typeof window !== "undefined") {
        const savedCart = CartStorage.getCart();
        setCart(savedCart);
        setIsLoaded(true);
      }
    }, []);
  
    const addToCart = (item: Omit<CartItem, 'id'>) => {
      if (!isLoaded) return;
      const updatedCart = CartStorage.addItem(item);
      setCart(updatedCart);
    };
  
    return {
      cart,
      isLoading: !isLoaded,
      addToCart,
      removeFromCart: (id: string) => setCart(CartStorage.removeItem(id)),
      updateQuantity: (id: string, qty: number) => setCart(CartStorage.updateQuantity(id, qty)),
      clearCart: () => {
        CartStorage.clearCart();
        setCart({ items: [], totalItems: 0, totalPrice: 0 });
      }
    };
  };
  