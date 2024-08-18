import ProductSection from "@/components/ProductSection";
import HeroSection from "@/components/HeroSection";
import { fetchProducts } from "@/api/index";

export default async function Component() {
  try {
    // Fetching products with caching strategy
    const data = await fetchProducts({ cache: "force-cache" });

    return (
      <div className="flex flex-col min-h-[100dvh]">
        <main className="flex-1">
          <HeroSection />
          <ProductSection products={data} />
        </main>
      </div>
    );
  } catch (error) {
    // Displaying an error message to the user
    return (
      <div className="flex flex-col min-h-[100dvh] justify-center items-center">
        <p className="text-red-500">
          Failed to load products. Please try again later.
        </p>
      </div>
    );
  }
}
