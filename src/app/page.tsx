import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductSection from "@/components/ProductSection";

export default async function Component() {
  const data = await fetch(
    "https://66be043574dfc195586e5246.mockapi.io/products",
    { cache: "no-store" }
  ).then((res) => res.json());
  console.log(data);
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header />
      <main className="flex-1">
        <section className="flex justify-center bg-black py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 grid md:grid-cols-2 gap-8 items-center text-center md:text-left">
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold ">
                Transform Your Care Routine
              </h1>
              <p className="text-lg text-grey md:text-xl mt-4">
                Shop our curated selection of premium personal care essentials,
                designed to elevate your daily routine and enhance your
                well-being.
              </p>
              <div className="mt-8">
                <Link
                  href="#products"
                  className="inline-flex items-center justify-center rounded-full text-black bg-white px-6 py-3 text-lg font-medium transition-colors hover:bg-primary-foreground/90 focus:outline-none focus:ring-2 focus:ring-primary-foreground focus:ring-offset-2"
                  prefetch={false}
                >
                  Shop Now
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src="/hero-img.jpg"
                alt="a man smiling and holding a personal care product"
                width={400}
                height={400}
                className="rounded-lg shadow-lg"
                style={{ aspectRatio: "400/400", objectFit: "cover" }}
              />
            </div>
          </div>
        </section>
        <ProductSection products={data} />
      </main>
      <Footer />
    </div>
  );
}

function MountainIcon(props) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function ShoppingCartIcon(props) {
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
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}
