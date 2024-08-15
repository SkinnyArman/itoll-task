import Link from "next/link";
import { GiLipstick } from "react-icons/gi";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-6 px-4 md:px-6">
      <div className="container flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <GiLipstick className="h-6 w-6" />
          <span className="text-lg font-semibold">Acme Store</span>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0">
          <Link href="#" className="hover:underline" prefetch={false}>
            Privacy Policy
          </Link>
          <Link href="#" className="hover:underline" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="hover:underline" prefetch={false}>
            Contact Us
          </Link>
        </div>
        <p className="text-sm mt-4 md:mt-0 text-primary-foreground/80">
          &copy; 2024 Acme Store. All rights reserved.
        </p>
      </div>
    </footer>
  );
}