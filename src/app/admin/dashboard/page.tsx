"use client";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [products, setProducts] = useState<any[]>([]);

  async function fetchProducts() {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  }

  useEffect(() => { fetchProducts(); }, []);

  async function handleDelete(id: string) {
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <form
        action="/api/products"
        method="POST"
        encType="multipart/form-data"
        className="mb-8 space-y-3"
      >
        <input name="name" placeholder="Name" className="border p-2 w-full"/>
        <input name="price" placeholder="Price" type="number" className="border p-2 w-full"/>
        <input name="image" placeholder="image" type="file" className="border p-2 w-full"/>
        <button className="bg-black text-white px-6 py-2 rounded">
          Add Product
        </button>
      </form>

      {products.map((p) => (
        <div key={p.id} className="flex justify-between border p-4 mb-2">
          <span>{p.name}</span>
          <button onClick={()=>handleDelete(p.id)} className="text-red-500">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}