
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import "../../app/globals.css";

const InventoryItemDetails = () => {
    const router = useRouter();
    const { _id } = router.query; 

    const [productName, setProductName] = useState('');
    const [vendorName, setVendorName] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInventoryItem = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/inventory/${_id}`);
                const { product, vendor, quantity } = response.data; 

                // Fetch product name
                const productResponse = await axios.get(`http://localhost:3000/products/${product}`);
                const productName = productResponse.data.name;

                // Fetch vendor name
                const vendorResponse = await axios.get(`http://localhost:3000/vendors/${vendor}`);
                const vendorName = vendorResponse.data.name;

                setProductName(productName);
                setVendorName(vendorName);
                setQuantity(quantity);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error('Error fetching inventory item:', error);
            }
        };
        
        if (_id) {
            fetchInventoryItem();
        }
    }, [_id]);

    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:3000/inventory/${_id}`, { productName, vendorName, quantity });
            router.push('/inventory');
        } catch (error) {
            console.error('Error updating inventory item:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/inventory/${_id}`);
            router.push('/inventory');
        } catch (error) {
            console.error('Error deleting inventory item:', error);
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
                        value={productName} 
                        onChange={(e) => setProductName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="vendor" className="block text-sm font-medium text-gray-700">Vendor Name:</label>
                    <input
                        id="vendor"
                        type="text"
                        value={vendorName} 
                        onChange={(e) => setVendorName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                        id="quantity"
                        name="quantity"
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="border px-2 py-1"
                    />
                </div>
                <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Update Product
                </button>
            </form>
            <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-black font-bold py-2 px-4 rounded">
                Delete
            </button>
            <button onClick={() => router.push('/inventory')} className="mt-4 inline-block bg-gray-500 hover:bg-gray-700 text-black font-bold py-2 px-4 rounded">
                Back to Inventory
            </button>
        </div>
    );
};    

export default InventoryItemDetails;
