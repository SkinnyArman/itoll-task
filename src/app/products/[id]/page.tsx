import ProductDetails from "@/components/ProductDetails";

interface ProductDetailsPageParams {
  params: {
    id: string;
  };
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageParams) {
  const product = await fetch(
    `https://66be043574dfc195586e5246.mockapi.io/products/${params.id}`,
    { cache: "no-store" }
  ).then((res) => res.json());

  return <ProductDetails product={product} />;
}
