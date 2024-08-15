export default function ProductCard({ product }) {
  return (
    <div
      key={product.id}
      className="bg-white rounded-lg shadow-sm overflow-hidden h-[330px] flex flex-col"
    >
      <img
        src={product.image}
        alt={`Product ${product}`}
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
        <div className="text-black font-medium mt-4">${product.price}</div>
      </div>
    </div>
  );
}
