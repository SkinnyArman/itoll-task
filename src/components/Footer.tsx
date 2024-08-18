"use client";
import { useEffect, useState } from "react";
import { APP_NAME } from "@/utils/constants";
import Link from "next/link";
import { GiLipstick } from "react-icons/gi";
import { AiOutlineHome, AiOutlineInfoCircle } from "react-icons/ai";
import { Routes } from "@/utils/routes";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <footer
      className={`bg-primary text-text border-gray-300 border border-solid p-2 md:p-4 fixed bottom-[-1px] left-[-1px] w-[101%] z-10 justify-center flex transition-transform duration-500 ease-in-out ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="container flex items-center justify-between flex-col md:flex-row">
        <div className="md:flex items-center gap-2 hidden">
          <GiLipstick className="h-6 w-6" />
          <span className="text-lg font-semibold">{APP_NAME}</span>
        </div>
        <div className="flex gap-x-6">
          <Link
            href={Routes.Home}
            className="flex flex-col items-center justify-center text-center"
            prefetch={false}
          >
            <AiOutlineHome className="md:hidden h-6 w-6 mb-1" />
            <span className="text-sm">Home</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
