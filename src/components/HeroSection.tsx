import Image from "next/image";
import BaseButton from "./Button";

export default function HeroSection() {
  return (
    <section className="flex bg-primary justify-center py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 grid md:grid-cols-2 gap-8 items-center text-center md:text-left">
        <div className="text-text-primary animate-slidein300 opacity-0">
          <h1 className="text-4xl text-text md:text-5xl lg:text-6xl font-bold ">
            Transform Your Care Routine
          </h1>
          <p className="text-lg md:text-xl mt-4 text-text">
            Shop our curated selection of premium personal care essentials,
            designed to elevate your daily routine and enhance your well-being.
          </p>
          <div className="mt-8">
            <BaseButton
              href="#products"
              mode="secondary"
              rounded="full"
              fullWidth={false}
              extraClasses="px-6 py-3"
            >
              Shop Now
            </BaseButton>
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
