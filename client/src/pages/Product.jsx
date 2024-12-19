import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { pid } = useParams();
  console.log(pid);
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [selSize, setSize] = useState("");

  const fetchProduct = async () => {
    products.map((item) => {
      if (item._id === pid) {
        console.log(item);
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProduct();
  }, [pid, products]);

  if (!productData) {
    return <div className="opacity-0"></div>;
  }
  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Porduct Data  */}
      <div className="flex gap-2 sm:gap-12 flex-col sm:flex-row">
        {/* Product Image */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData?.image?.map((img, index) => (
              <img
                key={index}
                onClick={() => setImage(img)}
                src={img}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer rounded-md"
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} className="w-full h-auto rounded-md" alt="" />
          </div>
        </div>
        {/* Product Details */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            {/* TODO:Add rating from backend */}
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            <span>{currency}</span> {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((size, index) => (
                <button
                  onClick={() => setSize(size)}
                  className={`border py-2 px-4 bg-gray-100 ${
                    selSize === size ? "border-orange-500" : ""
                  }`}
                  key={index}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          {/* TODO:Add go to cart button */}
          <div className="grid grid-cols-2">
            <button
              onClick={() => addToCart(productData?._id, selSize)}
              className="bg-black text-white py-3 px-8 text-sm active:bg-gray-700 w-fit"
            >
              Add to Cart
            </button>
          </div>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product</p>
            <p>Cash on Delivery is available on this product</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>
      {/* description */}
      <div className="mt-20">
        <div className="flex">
          <p className="border px-5 py-3 text-sm">Description</p>
          {/* TODO: Add Reviews from backend */}
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            Bio Shoes offers a wide range of eco-friendly and stylish footwear
            designed for comfort and durability. Our products are crafted from
            sustainable materials, ensuring that you not only look good but also
            contribute to a healthier planet. With a variety of sizes and
            designs, there's something for everyone. Shop with confidence
            knowing that our products are 100% original and come with an easy
            return and exchange policy. Experience the perfect blend of fashion
            and sustainability with Bio Shoes.
          </p>
          <p>
            Bio Shoes offers a wide range of eco-friendly and stylish footwear
            designed for comfort and durability. Our products are crafted from
            sustainable materials, ensuring that you not only look good but also
            contribute to a healthier planet. With a variety of sizes and
            designs, there's something for everyone. Shop with confidence
            knowing that our products are 100% original and come with an easy
            return and exchange policy. Experience the perfect blend of fashion
            and sustainability with Bio Shoes.
          </p>
        </div>
      </div>
      {/* Display related products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;
