import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCartContext } from "../hooks/useCartContext";

const CartItem = ({item}) => {
    const [error,setError]       = useState(null);
    const {user}                 = useAuthContext();
    const [quantity,setQuantity] = useState(item.quantity);
    const {dispatch}             = useCartContext();

    const updateCart = async () => {
        if (!user) {
            setError("You must be logged in!");
            return;
        }
        item.quantity = Number(quantity);
        const resp = await fetch('/api/carts',{method:"PATCH"})
        const json = await resp.json();
        if (!resp.ok) {
            setError(json.error);
        }
        else if (resp.ok) {
            setError(null);
            dispatch({type:"UPDATE_CART",payload:item});
        }
    }

    const deleteFromCart = () => {
        if (!user) {
            setError("You must be logged in!");
            return;
        }
        dispatch({type:"REMOVE_FROM_CART",payload:item});
    }
    return (    
        <div key={item.id} className="flex items-center justify-between border-b py-4">
            <div className="flex items-center">
               {/* <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md mr-4" /> */}
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600 text-2xl font-bold">₹{Number(item.price)*Number(quantity)} </p>
                </div>
            </div>
            <div>
                <input type='number' value={quantity} min='1' onChange={(e)=>{setQuantity(e.target.value)}} className="w-16 text-center border rounded-lg p-1 mx-4"/>
                <button
                    onClick={updateCart}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mr-3"
                >
                    {error || 'Update'}
                </button>
                <button
                    onClick={deleteFromCart}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >   
                    {error || 'Remove'}
                </button>
            </div>
        </div>
    )
};

export default CartItem;