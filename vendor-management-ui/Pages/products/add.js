
import axios from 'axios';
import { useState } from 'react';
import Router from 'next/router';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [vendor, setVendor] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:3000/products', { name, vendor });
      Router.push('/products');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="vendorName" className="block text-sm font-medium text-gray-700">Vendor Name:</label>
        <input
          id="vendorName"
          type="text"
          value={vendor}
          onChange={(e) => setVendor(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Add Product
      </button>
    </form>
  );
};

export default AddProduct;