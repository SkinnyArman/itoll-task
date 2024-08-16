"use client";

import Link from "next/link";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { GiLipstick } from "react-icons/gi";
import ShoppingCart from "@/components/ShoppingCart"; // Adjust the import path as needed
import { APP_NAME } from "@/utils/constants";
import { useTheme } from "@/context/ThemeContext";

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  return (
    <>
      <header className="bg-primary text-text py-4 px-6 flex items-center justify-between">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <GiLipstick className="h-6 w-6" onClick={toggleTheme} />
          <span className="text-lg font-semibold">{APP_NAME}</span>
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-4">
            <Link href="#" className="hover:underline" prefetch={false}>
              Shop
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              About
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              Contact
            </Link>
          </nav>
          <button
            className="text-primary-foreground relative"
            onClick={toggleCart}
          >
            <FaShoppingCart className="h-6 w-6" />
            <span className="sr-only">Cart</span>
          </button>
        </div>
      </header>

      {isCartOpen && <ShoppingCart onClose={toggleCart} />}
    </>
  );
}
