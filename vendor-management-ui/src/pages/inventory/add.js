
import axios from 'axios';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import "../../app/globals.css";


const AddInventoryItem = () => {
  const [productName, setProductName] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:3000/inventory', { productName, vendorName, quantity });
      Router.push('/inventory');
    } catch (error) {
      console.error('Error adding inventory item:', error);
      alert('Failed to add inventory item');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4">
      <div className="mb-4">
        <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name:</label>
        <input
          id="productName"
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="vendorName" className="block text-sm font-medium text-gray-700">Vendor Name:</label>
        <input
          id="vendorName"
          type="text"
          value={vendorName}
          onChange={(e) => setVendorName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity:</label>
        <input
          id="quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Add Inventory Item
      </button>
    </form>
  );
};

export default AddInventoryItem;
