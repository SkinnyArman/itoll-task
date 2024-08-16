"use client";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types/Product";
import BaseButton from "./Button";

export default function ProductDetails({ product }: { product: Product }) {
  const { addToCart, loading } = useCart();

  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
      <div className="grid gap-4 md:gap-10 items-start order-2 md:order-1">
        <div className="hidden md:flex items-start">
          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-3xl">{product.name}</h1>
            <div>
              <p>{product.description}</p>
            </div>
          </div>
          <div className="text-4xl font-bold ml-auto">${product.price}</div>
        </div>
        <BaseButton
          mode="secondary"
          rounded="lg"
          extraClasses="h-12"
          loading={loading}
          onClick={addToCart.bind(null, product)}
        >
          Add to Cart
        </BaseButton>
      </div>
      <div className="grid gap-3 items-start order-1">
        <img
          src={product.image}
          alt="Product Image"
          width={600}
          height={600}
          className="aspect-square object-cover border w-full rounded-lg overflow-hidden"
        />
      </div>
    </div>
  );
}
