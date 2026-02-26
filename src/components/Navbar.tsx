import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-black text-white px-8 py-4 flex justify-between shadow-lg">
      <Link href="/" className="text-2xl font-bold">
        MyShop
      </Link>
      <div className="space-x-6">
        <Link href="/">Home</Link>
        <Link href="/admin/login">Admin</Link>
      </div>
    </nav>
  );
}