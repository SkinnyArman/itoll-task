"use client";

import ProductCard from "@/components/ProductCard";
import { useDebouncedSearch } from "@/hooks/useDebouncedSearch";
import { CiSearch } from "react-icons/ci";
import { FiAlertCircle } from "react-icons/fi";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Product } from "@/types/Product";

export default function ProductSection({ products }: { products: Product[] }) {
  const { isVisible, elementRef } = useIntersectionObserver();

  // Search functionality using the custom hook
  const search = (product: Product, searchTerm: string) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase());

  const { filteredItems: filteredProducts, onSearchInputChange } =
    useDebouncedSearch(products, search);

  return (
    <section
      ref={elementRef}
      className={`flex justify-center bg-light-grey py-12 md:py-24 lg:py-32 transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      id="products"
    >
      <div className="container px-4 md:px-6 ">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Featured Products</h2>
          <p className="text-muted-foreground mt-2 md:text-lg">
            Check out our top-selling and most popular products.
          </p>
          <div className="relative flex-1 max-w-md mx-auto mt-8">
            <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search products..."
              className="border border-solid rounded-full pl-10 pr-4 py-2 w-full"
              onChange={onSearchInputChange}
            />
          </div>
        </div>
        {filteredProducts.length > 0 ? (
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 transition-transform duration-700 ${
              isVisible
                ? "transform-none"
                : "transform translate-y-10 opacity-0"
            }`}
          >
            {filteredProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        ) : (
          <div
            className={`flex flex-col items-center justify-center h-48 transition-transform duration-700 ${
              isVisible
                ? "transform-none"
                : "transform translate-y-10 opacity-0"
            }`}
          >
            <FiAlertCircle className="text-muted-foreground text-4xl mb-4" />
            <p className="text-muted-foreground text-lg">No products found</p>
          </div>
        )}
      </div>
    </section>
  );
}
