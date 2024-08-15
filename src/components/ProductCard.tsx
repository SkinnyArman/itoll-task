import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.id}`}>
      <div
        key={product.id}
        className="bg-white rounded-lg shadow-sm overflow-hidden h-[330px] flex flex-col cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105"
      >
        <img
          src={product.image}
          alt={`Product ${product.name}`}
          width={200}
          height={200}
          className="w-full h-40 object-cover"
          style={{ aspectRatio: "200/200", objectFit: "cover" }}
        />
        <div className="flex flex-col justify-between flex-grow p-4">
          <div>
            <h3 className="text-lg font-semibold text-black">{product.name}</h3>
            <p className="text-dark-grey mt-1">{product.description}</p>
          </div>
          <div className="text-black font-medium mt-4">
            {product.hasDiscount ? (
              <div className="flex items-center space-x-2">
                <span className="line-through text-gray-500">
                  ${product.price}
                </span>
                <span className="font-semibold">
                  ${product.discountedPrice}
                </span>
              </div>
            ) : (
              <span>${product.price}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
