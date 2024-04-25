
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import "../../app/globals.css";


const InventoryItemDetails = () => {
    const router = useRouter();

    const [inventoryItem, setInventoryItem] = useState('');

    useEffect(() => {
        const fetchInventoryItem = async () => {
            try {
                const result = await axios.get(`http://localhost:3000/inventory/${router.query._id}`);
                setInventoryItem(result.data);
            } catch (error) {
                console.error('Error fetching inventory item:', error);
            }
        };

        if (router.query._id) {
            fetchInventoryItem();
        }
    }, [router.query._id]);

    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            console.log('Updating inventory item...');
            const response = await axios.put(`http://localhost:3000/inventory/${router.query._id}`, inventoryItem);
            setInventoryItem(response.data); // Update local state with the updated data
            router.push('/inventory');
        } catch (error) {
            console.error('Error updating inventory item:', error);
        }
    };
    

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/inventory/${router.query._id}`);
            router.push('/inventory');
        } catch (error) {
            console.error('Error deleting inventory item:', error);
        }
    };

    const handleChange = (event) => {
        setInventoryItem({ ...inventoryItem, [event.target.name]: event.target.value });
    };

    return (
        <div>
            <div className="mb-4">
                <label htmlFor="productName">Product Name:</label>
                <input
                    id="productName"
                    name="productName"
                    type="text"
                    value={inventoryItem.productName}
                    onChange={handleChange}
                    className="border px-2 py-1"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="vendorName">Vendor Name:</label>
                <input
                    id="vendorName"
                    name="vendorName"
                    type="text"
                    value={inventoryItem.vendorName}
                    onChange={handleChange}
                    className="border px-2 py-1"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="quantity">Quantity:</label>
                <input
                    id="quantity"
                    name="quantity"
                    type="number"
                    value={inventoryItem.quantity}
                    onChange={handleChange}
                    className="border px-2 py-1"
                />
            </div>
            <div className="flex">
                <form onSubmit={handleUpdate} className="mr-4">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded">
                        Update
                    </button>
                </form>
                <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-black font-bold py-2 px-4 rounded">
                    Delete
                </button>
            </div>
            <div>
                <button onClick={() => router.push('/inventory')} className="mt-4 inline-block bg-gray-500 hover:bg-gray-700 text-black font-bold py-2 px-4 rounded">
                    Back to Inventory
                </button>
            </div>
        </div>
    );
};    

export default InventoryItemDetails; 