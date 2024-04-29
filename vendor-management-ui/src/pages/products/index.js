import axios from 'axios';
import Link from 'next/link';
import "../../app/globals.css";


const ProductsPage = ({ products }) => {
  return (
               <div className="flex flex-col items-center justify-center">
       <h1 className="text-3xl font-bold text-center mb-4  text-black py-2 px-4 rounded">Products</h1>
       <div className="w-full max-w-screen-md">

       <table className="table-auto w-full border-collapse border border-black rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 border border-gray-500 text-left font-medium text-black uppercase">Product</th>
            <th className="px-4 py-2 border border-gray-500 text-left font-medium text-black uppercase">Vendor</th>
            <th className="px-4 py-2 border border-gray-500 text-left font-medium text-black uppercase">Edit</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td className="px-4 py-2 border border-gray-500 whitespace-nowrap">{product.name}</td>
              <td className="px-4 py-2 border border-gray-500 whitespace-nowrap">{product.vendorName}</td>
              <td className="px-4 py-2 border border-gray-500 whitespace-nowrap">
              <Link href={`/products/${product._id}`}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                      Edit
                    </button>
                  </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

<div className="mt-4">
      <Link href="/products/add">
        <button className=" bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Add New Product</button>
      </Link>
      <Link href="/">
        <button className="ml-4 bg-gray-500 hover:bg-gray-700 text-black font-bold py-2 px-4 rounded">
          Back to HomePage
        </button>
      </Link>
    </div>
    </div>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await axios.get('http://localhost:3000/products');
  const products = res.data;
  return { props: { products } };
};

export default ProductsPage;