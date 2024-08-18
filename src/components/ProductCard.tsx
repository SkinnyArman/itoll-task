import Link from "next/link";
import { Product } from "@/types/Product";
import { Routes } from "@/utils/routes";
import Image from "next/image";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={Routes.ProductDetails(product.id)}>
      <div
        key={product.id}
        className="bg-white rounded-lg shadow-md overflow-hidden h-[330px] flex flex-col cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 relative"
      >
        <div className="relative">
          {product.isBestSeller && <BestSellerBadge />}
          <Image
            src={product.image}
            alt={`Product ${product.name}`}
            width={200}
            height={200}
            className="w-full h-40 object-cover"
            style={{ aspectRatio: "200/200", objectFit: "cover" }}
          />
        </div>
        <div className="flex flex-col justify-between flex-grow p-4">
          <div>
            <h3 className="text-lg font-semibold text-black">
              {product.name}
            </h3>
            <p className="text-black mt-1 text-sm line-clamp-3">
              {product.description}
            </p>
          </div>
          <div className=" font-medium mt-4">
            {product.hasDiscount ? (
              <div className="flex items-center space-x-2">
                <span className="line-through text-gray-500">
                  ${product.price}
                </span>
                <span className="font-semibold">
                  ${product.discountedPrice}
                </span>
              </div>
            ) : (
              <span>${product.price}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

function BestSellerBadge() {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      <div className="absolute transform -rotate-45 bg-yellow-300 text-primary text-xs font-bold py-1 w-[150px] top-4 left-[-45px] flex items-center justify-center">
        Best Seller
      </div>
    </div>
  );
}
