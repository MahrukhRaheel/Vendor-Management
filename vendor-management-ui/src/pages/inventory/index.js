
import axios from 'axios';
import Link from 'next/link';
import "../../app/globals.css";


const InventoryPage = ({ inventoryItems }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
       
       <h1 className="text-3xl font-bold text-center mb-4  text-black
  py-2 px-4 rounded">Inventory</h1>
        <div className="w-full max-w-screen-md">
      <table className="table-auto  w-full border-collapse border border-gray-500">
        <thead>
          <tr>
            <th className="border  border-gray-500 px-4 py-2">Vendor Name</th>
            <th className="border  border-gray-500 px-4 py-2">Product Name</th>
            <th className="border  border-gray-500 px-4 py-2">Quantity</th>
            <th className="border  border-gray-500 px-4 py-2">Edit</th>
          </tr>
        </thead>
        <tbody>
          {inventoryItems.map(item => (
            <tr key={item._id}>
              <td className="border  border-gray-500 px-4 py-2">{item.vendor}</td>
              <td className="border  border-gray-500 px-4 py-2">{item.product}</td>
              <td className="border  border-gray-500 px-4 py-2">{item.quantity}</td>
              <td className="border  border-gray-500 px-4 py-2">
                <Link href={`/inventory/${item._id}`}>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Edit
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <Link href="/inventory/add">
        <button className="mt-4 inline-block bg-green-500 hover:bg-green-700 text-black font-bold py-2 px-4 rounded mr-2">
          Add New Inventory Item
        </button>
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
  const res = await axios.get('http://localhost:3000/inventory');
  const inventoryItems = res.data;
  return { props: { inventoryItems } };
};

export default InventoryPage;
