import { LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import {Link} from 'react-router-dom'

const UserProfileForm = () => {
  const {user} = useAuthContext();
  console.log(user._doc)
  const [formData, setFormData] = useState({
    name: user._doc.name,
    email: user._doc.email,
    phone: user._doc.phone? user._doc.phone : "",
    pincode: user._doc.pincode? user._doc.pincode:"",
    address: user._doc.address? user._doc.address:"",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Profile:', formData);
    // Submit logic here (e.g. API call)
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6">
      <Link to='/' className='bg-blue-700 text-white p-2 w-[90px] rounded-xl'>Back</Link>
      <h2 className="text-2xl font-semibold text-blue-600 mb-6 mt-5">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="name"
            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        {/* Pincode */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Pincode</label>
          <input
            type="text"
            name="pincode"
            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.pincode}
            onChange={handleChange}
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <textarea
            name="address"
            rows="4"
            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center mt-6">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition"
          >
            Save Changes
          </button>
          <button
            type="button"
            className="flex items-center text-red-500 hover:text-red-700"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfileForm;
