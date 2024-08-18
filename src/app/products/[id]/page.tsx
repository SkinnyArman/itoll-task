import ProductDetails from "@/components/ProductDetails";
import { CiWifiOff } from "react-icons/ci";
import { fetchProductDetails } from "@/api/index";

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
    product = await fetchProductDetails(params.id, { cache: "no-store" });
  } catch (error) {
    console.error("Fetch failed", error);

    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <CiWifiOff className="w-20 h-20" />
        <h1 className="text-2xl font-bold mb-4">Product Not Available</h1>
        <p className="text-gray-600">
          This product is not available offline. Please check your connection
          and try again.
        </p>
      </div>
    );
  }

  return <ProductDetails product={product} />;
}
