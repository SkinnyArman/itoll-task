import ProductSection from "@/components/ProductSection";
import HeroSection from "@/components/HeroSection";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

export default async function Component() {
  const data = await fetch(
    "https://66be043574dfc195586e5246.mockapi.io/products",
    { cache: "no-store" }
  ).then((res) => res.json());

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <ServiceWorkerRegister />
      <main className="flex-1">
        <HeroSection></HeroSection>
        <ProductSection products={data} />
      </main>
    </div>
  );
}
