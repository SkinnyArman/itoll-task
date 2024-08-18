import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { ThemeProvider } from "@/context/ThemeContext";
import nookies from "nookies";
import { ReactNode } from "react";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import { Toaster } from "react-hot-toast";
import NetworkCheck from "@/components/NetworkCheck";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PWA NextJS",
  description: "It's a simple progressive web application made with NextJS",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "next14", "pwa", "next-pwa"],
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  authors: [
    {
      name: "imvinojanv",
      url: "https://www.linkedin.com/in/imvinojanv/",
    },
  ],
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-128x128.png" },
    { rel: "icon", url: "icons/icon-128x128.png" },
  ],
};

// Export viewport configuration separately
export const viewport = {
  "minimum-scale": "1",
  "initial-scale": "1",
  width: "device-width",
  "shrink-to-fit": "no",
  "viewport-fit": "cover",
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
      <body className={`${inter.className}`}>
        <ServiceWorkerRegister />
        <ThemeProvider initialTheme={initialTheme}>
          <CartProvider>
            <Toaster position="top-center" />
            <NetworkCheck />
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
