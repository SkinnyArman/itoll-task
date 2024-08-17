import ProductDetails from "@/components/ProductDetails";
import { CiWifiOff } from "react-icons/ci";

interface ProductDetailsPageParams {
  params: {
    id: string;
  };
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageParams) {
  let product;

  try {
    // Fetch the product data, relying on Next.js and browser caching
    product = await fetch(
      `https://66be043574dfc195586e5246.mockapi.io/products/${params.id}`
    ).then((res) => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    });
  } catch (error) {
    console.error("Fetch failed:", error);

    // If the product data isn't cached and the network is unavailable, show a fallback
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <CiWifiOff className="w-20 h-20"/>
        <h1 className="text-2xl font-bold mb-4">Product Not Available</h1>
        <p className="text-gray-600">This product is not available offline. Please check your connection and try again.</p>
      </div>
    );
  }

  // Render the product details if product data is available
  return <ProductDetails product={product} />;
}
