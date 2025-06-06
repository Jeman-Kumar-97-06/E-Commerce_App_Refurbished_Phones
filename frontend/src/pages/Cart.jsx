import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCartContext } from "../hooks/useCartContext";
import {useNavigate} from 'react-router-dom';
import CartItem from "../components/CartItem";

const products = [
  { id: 1, name: "iPhone 12", price: 599, image: "https://via.placeholder.com/150" },
  { id: 2, name: "Samsung Galaxy S21", price: 499, image: "https://via.placeholder.com/150" }
];

export default function CartPage() {
  
  const navigate = useNavigate();

  const {user}  = useAuthContext();
  const {cart_items,dispatch} = useCartContext();

  const [cart, setCart] = useState(products);
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  //What to do as soon this page loads : 
  useEffect(()=>{
    const fetchCart = async () => {
      const resp = await fetch('http://localhost:4000/api/carts/',{headers:{'Authorization':`Bearer ${user.token}`}});
      const c_items = await resp.json();
      if (resp.ok) {
          dispatch({type:"SET_CART_ITEMS",payload:c_items});
      }
    }
    if (user) {
      fetchCart();
    }
  },[dispatch,user])

  //Payment code starts here : 
  const loadRazorpay = async () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    script.onload = () => handlePayment();
  };

  const handlePayment = () => {
    const options = {
      key: "YOUR_RAZORPAY_KEY", // Replace with your Razorpay Key
      amount: total * 100, // Amount in paisa
      currency: "INR",
      name: "Refurbished Phones Store",
      description: "Order Payment",
      handler: function (response) {
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
      },
      prefill: {
        name: "John Doe",
        email: "johndoe@example.com",
        contact: "9999999999"
      },
      theme: {
        color: "#3399cc"
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  //Payment Code ends here


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <button
        onClick={() => navigate("/")}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        ← Back to Home
      </button>
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Your Cart</h2>
      <div className="max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-lg">
        {cart_items.length>0 ? (
          cart_items.map((item) => (
            <CartItem item={item} key={item._id}/>
          ))
        ) : (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        )}
        <div className="mt-4 text-right">
          <h3 className="text-xl font-semibold">Total: <span className='text-blue-500'>₹{cart_items && cart_items.reduce((total,itm)=>total+Number(itm.price)*Number(itm.quantity),0)}</span></h3>
          <button
            onClick={loadRazorpay}
            className="mt-4 px-6 py-3 bg-green-600 text-white rounded-md shadow hover:bg-green-700"
          >
            Pay with Razorpay
          </button>
        </div>
      </div>
    </div>
  );
}
