import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="flex justify-center bg-black py-12 md:py-24 lg:py-32">
      <div className=" container px-4 md:px-6 grid md:grid-cols-2 gap-8 items-center text-center md:text-left">
        <div className="animate-slidein300 opacity-0 text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold ">
            Transform Your Care Routine
          </h1>
          <p className="text-lg text-grey md:text-xl mt-4">
            Shop our curated selection of premium personal care essentials,
            designed to elevate your daily routine and enhance your well-being.
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
            className="animate-slidein700 opacity-0 rounded-lg shadow-lg"
            style={{ aspectRatio: "400/400", objectFit: "cover" }}
          />
        </div>
      </div>
    </section>
  );
}
