"use client";
import { useProductQuantity } from "@/hooks/useProductQuantity";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types/Product";
import BaseButton from "./Button";
import Image from "next/image";

export default function ProductDetails({ product }: { product: Product }) {
  const { quantity, handleQuantityChange } = useProductQuantity(1);
  const { addToCart, loading } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="flex flex-col md:flex-row items-start max-w-6xl px-4 mx-auto py-6 gap-6 lg:gap-12">
      <div className="w-full md:w-1/2">
        <Image
          src={product.image}
          alt="Product Image"
          width={600}
          height={600}
          className="aspect-square object-cover border w-full rounded-lg overflow-hidden"
        />
      </div>

      <div className="flex flex-col w-full md:w-1/2 gap-4">
        <h1 className="font-bold text-3xl">{product.name}</h1>
        <div>
          <p>{product.detailedDescription}</p>
        </div>
        <div className="text-4xl font-bold mt-2">${product.price}</div>

        <div className="flex justify-between gap-4 mt-4">
          <div className="flex items-center border rounded-lg overflow-hidden">
            <BaseButton
              mode="secondary"
              extraClasses="px-4 py-2 bg-gray-200 hover:bg-gray-300 transition"
              onClick={() => handleQuantityChange(-1)}
            >
              -
            </BaseButton>

            <input
              type="text"
              value={quantity}
              readOnly
              className="w-12 text-center border-none outline-none focus:ring-0"
            />

            <BaseButton
              mode="secondary"
              extraClasses="px-4 py-2 bg-gray-200 hover:bg-gray-300 transition"
              onClick={() => handleQuantityChange(1)}
            >
              +
            </BaseButton>
          </div>
          <BaseButton
            mode="secondary"
            rounded="lg"
            extraClasses="h-12 w-1/2"
            fullWidth={false}
            loading={loading}
            onClick={handleAddToCart}
          >
            Add {quantity} to Cart
          </BaseButton>
        </div>
      </div>
    </div>
  );
}
