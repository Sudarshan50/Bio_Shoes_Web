import { products } from "../assets/frontend_assets/assets";

export const getProdDetails = (id) => {
  const productData = products.find((item) => item._id === id);
  return productData;
};
