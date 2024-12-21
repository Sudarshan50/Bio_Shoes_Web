import { createContext, useState } from "react";
import { products } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../lib/axiosInstance";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const deliveryFee = 40;
  const [loading, setLoading] = useState(false);
  const [cartCnt, setCartCnt] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const fetchUserCart = async () => {
    setLoading(true);
    await axiosInstance
      .get("/cart")
      .then((res) => {
        if (res.status === 200) {
          let cartCopy = {};
          const cartData = res.data.data;
          cartData.forEach((item) => {
            if (cartCopy[item.productId]) {
              cartCopy[item.productId][item.size] = item.quantity;
            } else {
              cartCopy[item.productId] = { [item.size]: item.quantity };
            }
          });
          setCartItems(cartCopy);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

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
    if (isAuthenticated) {
      setLoading(true);
      await axiosInstance
        .post("/cart", {
          pid: String(id),
          size: String(pSize),
        })
        .then((res) => {
          if (res.data.success) {
            toast.success("Item added to cart successfully");
            setLoading(false);
          }
        })
        .catch((err) => {
          toast.error("Error adding item to cart");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      toast.success("Item added to cart successfully");
    }
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
    setCartCnt(tCount);
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
    if (isAuthenticated) {
      setLoading(true);
      await axiosInstance
        .post("/cart/update", {
          pid: String(id),
          size: String(pSize),
          quantity: qty,
        })
        .then((res) => {
          if (res.data.success) {
            toast.success("Item quantity updated successfully");
            setLoading(false);
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const value = {
    products,
    currency,
    deliveryFee,
    search,
    setSearch,
    showSearch,
    setCartItems,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    loading,
    setLoading,
    isAuthenticated,
    setIsAuthenticated,
    fetchUserCart,
    setCartCnt,
    cartCnt,
  };
  return (
    // eslint-disable-next-line react/prop-types
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
