import { createContext, useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const deliveryFee = 40;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();

  const addToCart = async (id, pSize) => {
    if (!pSize) {
      toast.error("Please select a size");
      return;
    }
    let cartCopy = structuredClone(cartItems);
    if (cartCopy[id]) {
      if (cartCopy[id][pSize]) {
        cartCopy[id][pSize] += 1;
      } else {
        cartCopy[id][pSize] = 1;
      }
    } else {
      cartCopy[id] = { [pSize]: 1 };
    }
    setCartItems(cartCopy);
  };
  const getCartCount = () => {
    let tCount = 0;
    for (let key in cartItems) {
      for (let size in cartItems[key]) {
        try {
          if (cartItems[key][size] > 0) {
            tCount += cartItems[key][size];
          }
        } catch (e) {
          throw new Error(e);
        }
      }
    }
    return tCount;
  };
  const getCartAmount = () => {
    let tAmount = 0;
    for (const key in cartItems) {
      for (const size in cartItems[key]) {
        try {
          if (cartItems[key][size] > 0) {
            const product = products.find((product) => product._id === key);
            tAmount += product.price * cartItems[key][size];
          }
        } catch (e) {
          throw new Error(e);
        }
      }
    }
    return tAmount;
  };

  const updateQuantity = async (id, pSize, qty) => {
    let cartCopy = structuredClone(cartItems);
    if (qty === 0) {
      delete cartCopy[id][pSize];
    } else {
      cartCopy[id][pSize] = qty;
    }
    setCartItems(cartCopy);
  };

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  const value = {
    products,
    currency,
    deliveryFee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
  };
  return (
    // eslint-disable-next-line react/prop-types
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
