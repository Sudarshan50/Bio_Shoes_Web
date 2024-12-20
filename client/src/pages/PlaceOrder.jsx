import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axiosInstance from "../lib/axiosInstance";
import Spinner from "../components/Spinner";

const PlaceOrder = () => {
  const [method, setPaymentMethod] = useState("cod");
  const [formData, setFormData] = useState({});
  const {
    navigate,
    cartItems,
    loading,
    setLoading,
    getCartAmount,
    isAuthenticated,
  } = useContext(ShopContext);

  const handlePlaceOrder = async () => {
    const pIds = Object.keys(cartItems);
    if (pIds.length === 0) {
      toast.error("Cart is Empty");
      return;
    }
    formData.products = pIds;
    formData.price = getCartAmount();
    if (!isAuthenticated) {
      toast.warn("Please Login First Redirecting to Login Page", {
        autoClose: 2000,
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return;
    }
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.pincode ||
      !formData.phone
    ) {
      toast.error("Please Fill All The Fields");
      return;
    }
    setLoading(true);
    await axiosInstance
      .post("/product/checkout", {
        formData,
      })
      .then((res) => {
        if (res.data.success) {
          toast.warn(res.data.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]:">
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>
        {/* TODO:Fill form auto with user data */}
        <div className="flex  gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            required
            placeholder="First Name"
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            onChange={(e) => {
              setFormData({ ...formData, lastName: e.target.value });
            }}
            value={formData.lastName}
            placeholder="Last Name"
          />
        </div>
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
          value={formData.email}
          required
          placeholder="Email Address"
        />
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          onChange={(e) => {
            setFormData({ ...formData, address: e.target.value });
          }}
          value={formData.address}
          required
          placeholder="Address"
        />
        <div className="flex  gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            onChange={(e) => {
              setFormData({ ...formData, city: e.target.value });
            }}
            value={formData.city}
            required
            placeholder="City"
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            onChange={(e) => {
              setFormData({ ...formData, state: e.target.value });
            }}
            value={formData.state}
            required
            placeholder="State"
          />
        </div>
        <div className="flex  gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            onChange={(e) => {
              setFormData({ ...formData, pincode: e.target.value });
            }}
            value={formData.pincode}
            required
            placeholder="Pincode"
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            disabled
            defaultValue={"India"}
            placeholder="Country"
          />
        </div>
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="tel"
          onChange={(e) => {
            setFormData({ ...formData, phone: e.target.value });
          }}
          value={formData.phone}
          required
          placeholder="Phone Number"
        />
      </div>
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        {/* TODO: Add More Payment Method  */}
        <div className="mt-12">
          <Title text1="PAYMENT" text2="METHOD" />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() =>
                method === "cod"
                  ? setPaymentMethod("")
                  : setPaymentMethod("cod")
              }
              className="flex gap-3 flex-col lg:flex-row"
            >
              <div className="flex items-center gap-3 border p-2 px-4 cursor-pointer">
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full ${
                    method === "cod" ? "bg-green-400" : ""
                  }`}
                ></p>
                <p className="text-gray-500 text-sm font-medium mx-4">
                  CASH ON DELIVERY
                </p>
              </div>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              onClick={handlePlaceOrder}
              className="bg-black text-white px-16 py-3 text-sm"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
