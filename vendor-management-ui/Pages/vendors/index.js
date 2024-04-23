
import axios from 'axios';
import Link from 'next/link';

const VendorsPage = ({ vendors }) => {
  return (
    <div>
    <h1>Vendors</h1>
    {vendors.map(vendor => (
      <div key={vendor._id} className="mb-4">
        <h2>{vendor.name}</h2>
        <Link href={`/vendors/${vendor._id}`}>
          <button className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Edit
          </button>
        </Link>
      </div>
      ))}
      <Link href="/vendors/add"><button className="mt-4 inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Add New Vendor
        </button></Link>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await axios.get('http://localhost:3000/vendors');
  const vendors = res.data;
  return { props: { vendors } };
};

export default VendorsPage;
