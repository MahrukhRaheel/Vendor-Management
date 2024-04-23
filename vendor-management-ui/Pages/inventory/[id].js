
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const InventoryItemDetails = () => {
    const router = useRouter();
    const { id } = router.query; 
    const [inventoryItem, setInventoryItem] = useState('');

    useEffect(() => {
      const fetchInventoryItem = async () => {
          const result = await axios.get(`http://localhost:3000/inventory/${id}`);
          setInventoryItem(result.data);
      };
      if (id) {
          fetchInventoryItem();
      }
  }, [id]);
  
    const handleUpdate = async (event) => {
        event.preventDefault();
        await axios.put(`http://localhost:3001/inventory/${inventoryItem._id}`, inventoryItem); 
        router.push('/inventory');
    };

    const handleDelete = async () => {
        await axios.delete(`http://localhost:3001/inventory/${inventoryItem._id}`); 
        router.push('/inventory');
    };
    if (!inventoryItem) return <div>Loading...</div>;

     return (
        <div>
        <form onSubmit={handleUpdate}>
          <label htmlFor="productName">Product Name:</label>
          <input
            id="productName"
            type="text"
            value={inventoryItem.productName}

            onChange={(e) => setInventoryItem({...inventoryItem, productName: e.target.value})}
            className="border px-2 py-1"
          />
          <label htmlFor="vendorName">Vendor Name:</label>
          <input
            id="vendorName"
            type="text"
            value={inventoryItem.vendorName}

            onChange={(e) => setInventoryItem({...inventoryItem, vendorName: e.target.value})}
            className="border px-2 py-1"
          />
          <label htmlFor="quantity">Quantity:</label>
          <input
            id="quantity"
            type="number"
            value={inventoryItem.quantity}
            onChange={(e) => setInventoryItem({...inventoryItem, quantity: e.target.value})}
            className="border px-2 py-1"
          />
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded">
            Update Inventory Item
          </button>
        </form>
        <button onClick={handleDelete} className="mt-4 bg-red-500 hover:bg-red-700 text-black font-bold py-2 px-4 rounded">
          Delete Inventory Item
        </button>
      </div>
    );
  };

export default InventoryItemDetails;
