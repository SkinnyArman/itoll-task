"use client";

import ProductCard from "@/components/ProductCard";
import { useDebouncedSearch } from "@/hooks/useDebouncedSearch";

interface ProductSectionProps {
  products: IProduct[];
}

export default function ProductSection({ products }: ProductSectionProps) {
  const search = (product, searchTerm) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase());

  const { filteredItems: filteredProducts, onSearchInputChange } =
    useDebouncedSearch(products, search);

  return (
    <section
      className="flex justify-center bg-light-grey py-12 md:py-24 lg:py-32"
      id="products"
    >
      <div className="container px-4 md:px-6 ">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Featured Products
          </h2>
          <p className="text-muted-foreground mt-2 md:text-lg">
            Check out our top-selling and most popular products.
          </p>
          <div className="relative flex-1 max-w-md mx-auto mt-8">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search products..."
              className="bg-primary-foreground text-primary rounded-full pl-10 pr-4 py-2 w-full"
              onChange={onSearchInputChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {filteredProducts.map((item) => (
            <ProductCard product={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
