import { useParams } from "react-router-dom";
import { useProductContext } from "../hooks/useProductContext";
import { motion } from "framer-motion";
import { Battery, Smartphone, Monitor } from "lucide-react";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export default function ProductDetail() {
  const { id } = useParams();
  const { products } = useProductContext();
  const { user } = useAuthContext();
  const [quantity,setQuantity] = useState(1);
  const product = products.find((p) => p._id === id);

  const [currentImage, setCurrentImage] = useState(0);
  const [pincode, setPincode] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState("");

  const handleAddtoCart = async (e,ph) => {
    e.preventDefault();
    const prods = {};
    prods[ph.name] = quantity;
    const resp = await fetch("http://localhost:4000/api/carts",{
      method:"POST",
      headers:{"Content-Type":"application/json","Authorization":`BearerToken ${user.token}`},
      body:JSON.stringify({prods})
    })
    const json = await resp.json();
  }

  const checkPincode = () => {
    if (["560001", "110001"].includes(pincode)) {
      setDeliveryStatus("✅ Delivery available in your area.");
    } else {
      setDeliveryStatus("❌ Delivery not available for this pincode.");
    }
  };

  if (!product) {
    return <h2 className="text-center text-red-600 text-2xl">Product not found</h2>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen w-screen bg-gray-100 flex flex-col items-center py-6"
    >
      {/* Product Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl bg-white shadow-lg rounded-2xl p-8 border flex flex-col md:flex-row"
      >
        {/* Image & Thumbnail */}
        <div className="flex flex-col items-center gap-3">
          <motion.img
            src={product.images?.[currentImage] || product.image}
            alt={product.name}
            className="w-64 md:w-80 h-64 object-cover rounded-lg"
            whileHover={{ scale: 1.05 }}
          />
          <div className="flex gap-2 mt-2">
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                onClick={() => setCurrentImage(index)}
                className={`w-16 h-16 rounded-md object-cover border-2 cursor-pointer ${
                  currentImage === index ? "border-blue-500" : "border-transparent"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-6 md:mt-0 md:ml-10 flex-1">
          <h2 className="text-3xl font-bold text-gray-900">{product.name}</h2>

          {/* Battery */}
          <div className="mt-5 flex items-start">
            <Battery className="w-7 h-7 text-blue-500 mt-1" />
            <div className="ml-3">
              <h3 className="text-lg font-semibold">Battery</h3>
              <p className="text-gray-600">{product.battery}</p>
            </div>
          </div>

          {/* Design */}
          <div className="mt-5 flex items-start">
            <Smartphone className="w-7 h-7 text-green-500 mt-1" />
            <div className="ml-3">
              <h3 className="text-lg font-semibold">Design</h3>
              <p className="text-gray-600">{product.design}</p>
            </div>
          </div>

          {/* Display */}
          <div className="mt-5 flex items-start">
            <Monitor className="w-7 h-7 text-purple-500 mt-1" />
            <div className="ml-3">
              <h3 className="text-lg font-semibold">Display</h3>
              <p className="text-gray-600">{product.display}</p>
            </div>
          </div>

          {/* Condition */}
          <div className="mt-5">
            <p className="ml-1 text-lg text-gray-700">
              <span className="font-semibold">Condition</span>: {product.condition || "Good"}
            </p>
            <p className="ml-1 text-md text-gray-600">
              {product.conditionDescription || "Light scratches, no cracks, works perfectly."}
            </p>
          </div>

          {/* Pincode Input */}
          <div className="mt-6">
            <label className="block font-semibold text-gray-800 mb-1">Check delivery availability:</label>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="border px-3 py-1 rounded-md w-40 focus:outline-none"
                placeholder="Enter Pincode"
              />
              <button
                onClick={checkPincode}
                className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700"
              >
                Check
              </button>
            </div>
            {deliveryStatus && (
              <p className="text-sm mt-1 text-gray-700">{deliveryStatus}</p>
            )}
          </div>

          {/* Price & Button */}
          <form className="mt-8 flex justify-between items-center" onSubmit={e=>handleAddtoCart(e,product)}>
            <span className="text-2xl font-bold text-blue-600">₹{product.price}</span>
            <input
              type='number'
              placeholder='1'
              min='1'
              value={quantity}
              onChange={e=>{setQuantity(e.target.value)}}
              className="max-w-45 min-w-10 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md text-lg"
            >
              Add to Cart
            </motion.button>
          </form>
        </div>
      </motion.div>

      {/* Reviews Section */}
      <div className="mt-10 w-full max-w-4xl bg-white rounded-xl p-6 shadow-md">
        <h3 className="text-xl font-semibold mb-3">Customer Reviews</h3>
        <div className="max-h-48 overflow-y-auto space-y-4">
          {(product.reviews || []).map((review, idx) => (
            <div key={idx} className="border-b pb-2">
              <p className="font-medium">{review.user || "Anonymous"}</p>
              <p className="text-gray-700 text-sm">{review.text}</p>
            </div>
          ))}
          {!product.reviews?.length && (
            <p className="text-gray-500 italic">No reviews yet.</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
