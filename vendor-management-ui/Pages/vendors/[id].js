
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const VendorDetails = () => {
    const router = useRouter();
    const { _id } = router.query; 

    const [vendor, setVendor] = useState('');

    useEffect(() => {
        const fetchVendor = async () => {
            try {
                const result = await axios.get(`http://localhost:3000/vendors/${_id}`); 
                setVendor(result.data);
            } catch (error) {
                console.error('Error fetching vendor:', error);
            }
        };

        if (_id) {
            fetchVendor();
        }
    }, [_id]);
  
    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:3000/vendors/${_id}`, vendor); 
            router.push('/vendors');
        } catch (error) {
            console.error('Error updating vendor:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/vendors/${_id}`); 
            router.push('/vendors');
        } catch (error) {
            console.error('Error deleting vendor:', error);
        }
    };

    if (!vendor) return <div>Loading...</div>;

    return (
        <div>
            <form onSubmit={handleUpdate}>
                <label htmlFor="name">Vendor Name:</label>
                <input
                    id="name"
                    type="text"
                    value={vendor.name}
                    onChange={(e) => setVendor({ ...vendor, name: e.target.value })}
                    className="border px-2 py-1"
                />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Update Vendor
                </button>
            </form>
            <button onClick={handleDelete} className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Delete Vendor
            </button>
        </div>
    );
};

export default VendorDetails;
