import { useState } from 'react';
import { Link } from 'react-router-dom';

const SellPhoneForm = () => {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    price: '',
    condition: 'Good',
    description: '',
    contact: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Phone Listed:', formData);
    // Add logic to POST this data to your backend
  };

  const handleImageChange = () => {
    console.log("Clicked handle image change")
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6">
      <Link to='/' className='bg-blue-700 text-white p-2 w-[90px] rounded-xl'>Back</Link>
      <h2 className="text-2xl font-semibold text-blue-600 mb-3 mt-5">Sell Your Phone</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Brand */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Brand</label>
          <input
            type="text"
            name="brand"
            className="mt-1 w-full border rounded-lg px-3 py-2"
            placeholder="e.g. Apple, Samsung"
            value={formData.brand}
            onChange={handleChange}
          />
        </div>

        {/* Model */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Model</label>
          <input
            type="text"
            name="model"
            className="mt-1 w-full border rounded-lg px-3 py-2"
            placeholder="e.g. iPhone 13"
            value={formData.model}
            onChange={handleChange}
          />
        </div>

        {/* Expected Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Expected Price (₹)</label>
          <input
            type="number"
            name="price"
            className="mt-1 w-full border rounded-lg px-3 py-2"
            placeholder="e.g. 25000"
            value={formData.price}
            onChange={handleChange}
          />
        </div>

        {/* Condition */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Condition</label>
          <select
            name="condition"
            className="mt-1 w-full border rounded-lg px-3 py-2"
            value={formData.condition}
            onChange={handleChange}
          >
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Needs Repair">Needs Repair</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            rows="3"
            className="mt-1 w-full border rounded-lg px-3 py-2"
            placeholder="Mention any dents, issues, etc."
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        {/* Contact Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Contact Number</label>
          <input
            type="text"
            name="contact"
            className="mt-1 w-full border rounded-lg px-3 py-2"
            placeholder="e.g. +91-9876543210"
            value={formData.contact}
            onChange={handleChange}
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Your Address</label>
          <textarea
            name="address"
            rows="2"
            className="mt-1 w-full border rounded-lg px-3 py-2"
            placeholder="Your address for pickup"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block font-medium mb-1">
            Upload Phone Images
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="border border-gray-300 rounded px-3 py-2 w-full cursor-pointer"
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl transition"
          >
            List Phone
          </button>
        </div>
      </form>
    </div>
  );
};

export default SellPhoneForm;
