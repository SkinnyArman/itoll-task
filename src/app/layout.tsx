import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { ThemeProvider } from "@/context/ThemeContext";
import nookies from "nookies";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SelfCareBox",
  description: "SelfCareBox is your go-to app for premium self-care products.",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "next14", "pwa", "next-pwa"],
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  authors: [
    {
      name: "Arman Amini",
    },
  ],
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-128x128.png" },
    { rel: "icon", url: "icons/icon-128x128.png" },
  ],
};

interface RootLayoutProps {
  children: ReactNode;
  initialTheme: "light" | "dark";
}

export default function RootLayout({
  children,
  initialTheme,
}: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${inter.className} pb-20 lg:pb-0`}>
        <ThemeProvider initialTheme={initialTheme}>
          <CartProvider>
            <Toaster position="top-center" />
            <Header />
            {children}
            <Footer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

RootLayout.getInitialProps = async ({ ctx }: any) => {
  const cookies = nookies.get(ctx);
  return {
    initialTheme: cookies.theme || "dark",
  };
};
