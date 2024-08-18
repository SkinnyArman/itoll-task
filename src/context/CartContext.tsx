"use client";

import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { Product } from "@/types/Product";
import { CartItem } from "@/types/CartItem";
import {
  fetchCartItems,
  updateCartItem,
  addCartItem,
  deleteCartItem,
} from "@/api/index";
import { messages } from "@/utils/messages";

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  removeFromCart: (id: number) => Promise<void>;
  clearCart: () => Promise<void>;
  totalItems: number;
  totalPrice: number;
  loading: boolean;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const initializeCart = async () => {
      try {
        const items = await fetchCartItems();
        setCartItems(items);
      } catch (error) {
        console.error(messages.cart.fetchFailure, error);
      }
    };

    initializeCart();
  }, []);

  const addToCart = async (product: Product, quantity: number = 1) => {
    setLoading(true);
    try {
      const existingItem = cartItems.find((item) => item.name === product.name);

      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + quantity,
        };
        await updateCartItem(updatedItem);
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.id === updatedItem.id ? updatedItem : item
          )
        );
      } else {
        const newItem = { ...product, quantity };
        const serverItem = await addCartItem(newItem);
        setCartItems((prevItems) => [...prevItems, serverItem]);
      }
    } catch (error) {
      console.error(messages.cart.addToCartFailure, error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (id: number) => {
    setLoading(true);
    try {
      await deleteCartItem(id);
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error(messages.cart.removeFromCartFailure, error);
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    setLoading(true);
    try {
      for (const item of cartItems) {
        await deleteCartItem(item.id);
      }
      setCartItems([]);
    } catch (error) {
      console.error(messages.cart.clearCartFailure, error);
    } finally {
      setLoading(false);
    }
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) =>
      sum +
      (item.hasDiscount ? item.discountedPrice! : item.price) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
