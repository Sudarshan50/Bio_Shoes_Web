import { errorResponse, successResponse } from "../lib/apiResponse.js";
import Interested from "../models/Interested.js";
import Order from "../models/Order.js";
import Products from "../models/Products.js";

let product = {};

product.addProduct = async (req, res) => {
  try {
    const { id, name } = req.body;
    if (!id || !name) {
      return errorResponse(res, "All fields are required", null, 400);
    }
    const newProduct = new Products({ id, name });
    await newProduct.save();
    return successResponse(res, "Product added successfully", newProduct);
  } catch (err) {
    console.log(err);
    errorResponse(res, err.message, err, 500);
  }
};

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

product.finalCheckout = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      city,
      address,
      pincode,
      state,
      price,
      products,
    } = req.body.formData;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !city ||
      !address ||
      !pincode ||
      !state ||
      !price || 
      !products
    ) {
      return errorResponse(res, "All fields are required", null, 400);
    }
    const userId = req.user;
    const newOrder = new Order({
      firstName,
      lastName,
      email,
      phone,
      city,
      address,
      pincode,
      state,
      price,
      user: userId,
    });
    products.forEach((p) => {
      newOrder.interestedProducts.push(p);
    });
    await newOrder.save();
    const increment = await Interested.findOneAndUpdate(
      {},
      {
        $inc: { clickCnt: products.length },
        $push: { clickedBy: userId },
      },
      { new: true, upsert: true }
    );
    await increment.save();
    return successResponse(res, "Pincode not serviceable yet", null);
  } catch (err) {
    console.log(err);
    return errorResponse(res, err.message, err, 500);
  }
};

export default product;
