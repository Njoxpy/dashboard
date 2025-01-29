import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        if (image) formData.append('image', image);

        try {
            const response = await axios.post('/API/v1/products', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log(response.data);
            navigate('/admin/products'); // Navigate to products page after adding
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-center mb-6">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col space-y-2">
                    <label htmlFor="name" className="text-lg font-medium">Product Name</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Enter product name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col space-y-2">
                    <label htmlFor="description" className="text-lg font-medium">Description</label>
                    <textarea
                        id="description"
                        placeholder="Enter product description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col space-y-2">
                    <label htmlFor="price" className="text-lg font-medium">Price</label>
                    <input
                        id="price"
                        type="number"
                        placeholder="Enter product price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        className="p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col space-y-2">
                    <label htmlFor="price" className="text-lg font-medium">Category</label>
                    <select className="p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500">
                        <option>Printing</option>
                        <option>Fresh Oil</option>
                        <option>Animal Feeding</option>
                        <option>Hardware</option>
                        <option>Stationery</option>
                    </select>
                </div>

                <div className="flex flex-col space-y-2">
                    <label htmlFor="image" className="text-lg font-medium">Product Image</label>
                    <input
                        id="image"
                        type="file"
                        onChange={handleImageChange}
                        className="p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
