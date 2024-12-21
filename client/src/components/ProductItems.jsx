import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import axiosInstance from "../lib/axiosInstance";

const ProductItems = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);
  const handleAnalytics = async () => {
    await axiosInstance
      .post("anal/customIntrest", {
        pId: id,
      })
      .catch((err) => console.log(err));
  };
  return (
    <Link
      to={`/product/${id}`}
      onClick={handleAnalytics}
      className="text-gray-700 cursor-pointer"
    >
      <div className="overflow-hidden">
        <img
          src={image[0]}
          alt=""
          className="w-64 h-72 object-cover hover:scale-110 transition ease-in-out rounded-lg hover:rounded-lg"
        />
        <p className="pt-3 pb-1 text-sm">{name}</p>
        <p className="font-medium text-sm">
          {currency}
          {price}
        </p>
      </div>
    </Link>
  );
};

export default ProductItems;
