
import axios from 'axios';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';

const EditProduct = ({ _id }) => { 
  const [name, setName] = useState('');
  const [vendor, setVendor] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products/${_id}`);
        const { name, vendorName } = response.data; 
         setName(name);
        setVendor(vendorName);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        alert('Failed to fetch product details');
        setLoading(false);
      }
    };
    fetchProduct();
  }, [_id]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:3000/products/${_id}`, { name, vendor });
      Router.push('/products');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/products/${_id}`);
      Router.push('/products');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1>Edit Product</h1>
      <form onSubmit={handleUpdate}>
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
          <label htmlFor="vendor" className="block text-sm font-medium text-gray-700">Vendor Name:</label>
          <input
            id="vendor"
            type="text"
            value={vendor}
            onChange={(e) => setVendor(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Update Product
        </button>
      </form>
      <button onClick={handleDelete} className="mt-4 inline-block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        Delete Product
      </button>
      <Link href="/products">
        <button className="mt-4 ml-4 inline-block bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Back to Products</button>
      </Link>
    </div>
  );
};

export async function getServerSideProps(context) {
  return { props: { _id: context.params._id } };
};

export default EditProduct;