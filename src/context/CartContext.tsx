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

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Fetch the initial cart state from the mock API backend
  useEffect(() => {
    async function fetchCart() {
      const response = await fetch(
        "https://66be043574dfc195586e5246.mockapi.io/cart"
      );
      const data = await response.json();
      setCartItems(data || []);
    }

    fetchCart();
  }, []);

  const updateCartItemOnServer = async (item: CartItem) => {
    await fetch(`https://66be043574dfc195586e5246.mockapi.io/cart/${item.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
  };

  const addCartItemToServer = async (item: CartItem) => {
    const response = await fetch(
      "https://66be043574dfc195586e5246.mockapi.io/cart",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      }
    );
    return await response.json();
  };

  const deleteCartItemFromServer = async (id: number) => {
    await fetch(`https://66be043574dfc195586e5246.mockapi.io/cart/${id}`, {
      method: "DELETE",
    });
  };

  const addToCart = async (product: Product) => {
    const existingItem = cartItems.find((item) => item.name === product.name);

    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      await updateCartItemOnServer(updatedItem);
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        )
      );
    } else {
      const newItem = { ...product, quantity: 1 };
      const serverItem = await addCartItemToServer(newItem);
      setCartItems((prevItems) => [...prevItems, serverItem]);
    }
  };

  const removeFromCart = async (id: number) => {
    await deleteCartItemFromServer(id);
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = async () => {
    for (const item of cartItems) {
      await deleteCartItemFromServer(item.id);
    }
    setCartItems([]); // Clear the cart locally
  };

  // Calculate the total number of items in the cart
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Calculate the total price of the items in the cart
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
