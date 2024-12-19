import { errorResponse, successResponse } from "../lib/apiResponse.js";
import Products from "../models/Products.js";

let product = {};

product.getAllProducts = async (req, res) => {
  try {
    const products = await Products.find();
    return successResponse(res, "All products", products);
  } catch (err) {
    console.log(err);
    return errorResponse(res, err.message, err, 500);
  }
};

product.getProductsById = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await Products.findById(pid);
    if (!product) {
      return errorResponse(res, "Product not found", null, 404);
    }
    return successResponse(res, "Product found", product);
  } catch (err) {
    console.log(err);
    return errorResponse(res, err.message, err, 500);
  }
};

export default product;
