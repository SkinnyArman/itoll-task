"use client"

// This hook works as logic for setting quantity for a product

/* Clearly, this might be "too much" for a simple app but when building applications of this nature
    in large scales, there will be situations where I have seen even a piece of code as simple as this be repeated.
    For example, the component for handling this in mobile might differ from the one on desktop.
*/

import { useState } from "react";

export const useProductQuantity = (initialQuantity: number = 1) => {
  const [quantity, setQuantity] = useState<number>(initialQuantity);

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => {
      const newQuantity = prev + amount;
      return newQuantity < 1 ? 1 : newQuantity; // Ensure quantity is always at least 1
    });
  };

  return {
    quantity,
    handleQuantityChange,
  };
};
