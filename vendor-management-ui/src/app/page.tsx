import Link from 'next/link';
import "./globals.css";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-8">Vendor Management System</h1>
      <div className="space-y-4">
        <div>
          <Link href="/vendors">
            List of Vendors
          </Link>
        </div>
        <div>
          <Link href="/products">
            Product List
          </Link>
        </div>
        <div>
          <Link href="/inventory">
            Inventory List
          </Link>
        </div>
      </div>
    </div>
  );
}
