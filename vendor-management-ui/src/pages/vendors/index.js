
import axios from 'axios';
import Link from 'next/link';
import "../../app/globals.css";

const VendorsPage = ({ vendors }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-center mb-4 text-black py-2 px-4 rounded">
        Vendors
      </h1>
      <div className="w-full max-w-screen-md">
        <table className="table-auto w-full border-collapse border border-gray-500">
          <thead>
            <tr>
              <th className="px-4 py-2 border border-gray-500">Vendor Name</th>
              <th className="px-4 py-2 border border-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map(vendor => (
              <tr key={vendor._id}>
                <td className="border px-4 py-2 border-gray-500">{vendor.name}</td>
                <td className="border px-4 py-2 border-gray-500">
                  <Link href={`/vendors/${vendor._id}`}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                      Edit
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <Link href="/vendors/add">
          <button className="bg-green-500 hover:bg-green-700 text-black font-bold py-2 px-4 rounded mr-2">
            Add New Vendor
          </button>
        </Link>
        <Link href="/">
          <button className="bg-gray-500 hover:bg-gray-700 text-black font-bold py-2 px-4 rounded">
            Back to HomePage
          </button>
        </Link>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await axios.get('http://localhost:3000/vendors');
  const vendors = res.data;
  return { props: { vendors } };
};

export default VendorsPage;
