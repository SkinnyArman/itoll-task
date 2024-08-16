"use client"

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
  addToCart: (product: Product) => Promise<void>;
  removeFromCart: (id: number) => Promise<void>;
  clearCart: () => Promise<void>;
  totalItems: number;
  totalPrice: number;
  loading: boolean; // Add loading state to context
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Initialize loading state

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
    setLoading(true); // Set loading to true when the request starts
    try {
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
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    } finally {
      setLoading(false); // Set loading to false when the request finishes
    }
  };

  const removeFromCart = async (id: number) => {
    setLoading(true);
    try {
      await deleteCartItemFromServer(id);
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    setLoading(true);
    try {
      for (const item of cartItems) {
        await deleteCartItemFromServer(item.id);
      }
      setCartItems([]); // Clear the cart locally
    } catch (error) {
      console.error("Failed to clear the cart:", error);
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
        loading, // Provide the loading state to the context
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
