import axios from 'axios';
import Link from 'next/link';


const InventoryPage = ({ inventoryItems }) => {
  return (
    <div>
      <h1>Inventory</h1>
      <table>
        <thead>
          <tr>
            <th>Vendor Name</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {inventoryItems.map(item => (
            <tr key={item._id}>
              <td>{item.vendor}</td>
              <td>{item.product}</td>
              <td>{item.quantity}</td>
              <td>
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
      <Link href="/inventory/add">
        <button className="mt-4 inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Add New Inventory Item
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
