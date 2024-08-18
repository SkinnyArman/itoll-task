"use client";

import Link from "next/link";
import { useState, Suspense, lazy } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { GiLipstick } from "react-icons/gi";
import { APP_NAME } from "@/utils/constants";
import { useTheme } from "@/context/ThemeContext";
import { IoIosColorPalette } from "react-icons/io";
import { Routes } from "@/utils/routes";

// Dynamically import the ShoppingCart component
const ShoppingCart = lazy(() => import("@/components/ShoppingCart"));

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
          <GiLipstick className="h-6 w-6" />
          <span className="text-lg font-semibold">{APP_NAME}</span>
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-4">
            <Link href={`${Routes.Home}#products`} className="hover:underline" prefetch={false}>
              Shop
            </Link>
            <IoIosColorPalette
              className="h-6 w-6 cursor-pointer"
              onClick={toggleTheme}
            />
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

      {isCartOpen && (
        <Suspense fallback={<LoadingSpinner />}>
          <ShoppingCart onClose={toggleCart} />
        </Suspense>
      )}
    </>
  );
}

function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-500 z-50">
      <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
    </div>
  );
}
