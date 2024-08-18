"use client";

import { useRef } from "react";
import { useCart } from "@/context/CartContext";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import BaseButton from "./Button";
import Image from "next/image";

export default function ShoppingCart({ onClose }: { onClose: () => void }) {
  const { cartItems, removeFromCart, clearCart, totalPrice, loading } = useCart();
  const cartRef = useRef<HTMLDivElement>(null);

  // Use the custom hook to detect outside clicks
  useOutsideClick(cartRef, onClose);

  return (
    <div className="fixed inset-0 bg-primary/50 z-50 flex items-center justify-center">
      <div
        ref={cartRef}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <div className="flex items-center gap-2">
            <button onClick={clearCart}>
              <TrashIcon />
              <span className="sr-only">Clear Cart</span>
            </button>
            <button onClick={onClose}>
              <XIcon />
              <span className="sr-only">Close Cart</span>
            </button>
          </div>
        </div>
        {cartItems.length === 0 ? (
          <p className="text-muted-foreground">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="rounded-md"
                    style={{ aspectRatio: "64/64", objectFit: "cover" }}
                  />
                  <div>
                    <h3 className="text-black font-medium">{item.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)}>
                  <XIcon />
                </button>
              </div>
            ))}
            <div className="flex items-center justify-between border-t pt-4">
              <p className="text-muted-foreground font-medium">Total:</p>
              <p className="text-text font-medium">${totalPrice.toFixed(2)}</p>
            </div>
            <BaseButton mode="primary" rounded="md" extraClasses="h-10 py-2 mt-4" loading={loading}>
              Checkout
            </BaseButton>
          </div>
        )}
      </div>
    </div>
  );
}

function TrashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
