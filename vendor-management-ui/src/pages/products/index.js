import axios from 'axios';
import Link from 'next/link';
import "../../app/globals.css";


const ProductsPage = ({ products }) => {
  return (
    <div>
       <h1 className="text-3xl font-bold text-center mb-4  text-black
  py-2 px-4 rounded">Products</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edit</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map(product => (
            <tr key={product._id}>
              <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{product.vendorName}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Link href={`/products/${product._id}`}>
                  <button className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link href="/products/add">
        <button className="mt-4 inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Add New Product</button>
      </Link>
      <Link href="/">
        <button className="mt-4 inline-block bg-gray-500 hover:bg-gray-700 text-black font-bold py-2 px-4 rounded">
          Back to HomePage
        </button>
      </Link>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await axios.get('http://localhost:3000/products');
  const products = res.data;
  return { props: { products } };
};

export default ProductsPage;