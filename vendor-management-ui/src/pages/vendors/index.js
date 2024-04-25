import axios from 'axios';
import Link from 'next/link';
import "../../app/globals.css";


const VendorsPage = ({ vendors }) => {
  return (
    <div>
 <h1 className="text-3xl font-bold text-center mb-4  text-black
  py-2 px-4 rounded">
        Vendors
      </h1>
            <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Vendor Name</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map(vendor => (
            <tr key={vendor._id}>
              <td className="border px-4 py-2">{vendor.name}</td>
              <td className="border px-4 py-2">
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
      <Link href="/vendors/add">
        <button className="mt-4 inline-block bg-green-500 hover:bg-green-700 text-black font-bold py-2 px-4 rounded">
          Add New Vendor
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
  const res = await axios.get('http://localhost:3000/vendors');
  const vendors = res.data;
  return { props: { vendors } };
};

export default VendorsPage;
