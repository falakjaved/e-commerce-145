import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <Navbar />
      <div className="bg-gray-900 min-h-screen p-8">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Our Latest Products
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="relative h-64 w-full">
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-5">
                <h2 className="text-xl font-semibold text-white">{p.name}</h2>
                <p className="text-gray-300 mt-1">${p.price}</p>
                <button className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-700 transition">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}