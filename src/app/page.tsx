import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"

export default function Component() {
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
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div
                  key={item}
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  <img
                    src="/placeholder.svg"
                    alt={`Product ${item}`}
                    width={200}
                    height={200}
                    className="w-full h-40 object-cover"
                    style={{ aspectRatio: "200/200", objectFit: "cover" }}
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-black">
                      Product {item}
                    </h3>
                    <p className="text-dark-grey mt-1">
                      Description for Product {item}
                    </p>
                    <div className="mt-4">
                      <span className="text-black font-medium">$49.99</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
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
