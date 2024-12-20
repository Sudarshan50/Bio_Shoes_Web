import { check, validationResult } from "express-validator";
import { errorResponse, successResponse } from "../lib/apiResponse.js";
import User from "../models/user.js";
import Products from "../models/Products.js";
import mongoose from "mongoose";

let Cart = {};

Cart.getCart = async (req, res) => {
  try {
    const userId = req.user;
    const userData = await User.findById(userId);
    if (!userData?.cartHistory) {
      return errorResponse(res, "Cart is empty", null, 404);
    }
    return successResponse(res, "Cart items", userData.cartHistory);
  } catch (err) {
    console.log(err);
    return errorResponse(res, err.message, err, 500);
  }
};

Cart.addToCart = [
  check("pid").notEmpty(),
  check("size").notEmpty(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return errorResponse(
          res,
          `${errors?.array()[0]?.path} has ${errors?.array()[0]?.msg}`,
          errors.array()[0],
          422
        );
      }
      const userId = req.user;
      const { pid, size } = req.body;
      const product = await Products.findOne({ id: pid });
      if (!product) {
        return errorResponse(res, "Product not found", null, 404);
      }
      const user = await User.findById(userId);
      const userCart = user.cartHistory || [];
      if (userCart.length === 0) {
        const data = {
          productId: pid,
          quantity: 1,
          size: size,
        };
        user.cartHistory.push(data);
      } else {
        const index = userCart.findIndex(
          (item) => item.productId === pid && item.size === size
        );
        if (index === -1) {
          const data = {
            productId: pid,
            quantity: 1,
            size: size,
          };
          user.cartHistory.push(data);
        } else {
          userCart[index].quantity += 1;
        }
      }
      await user.save();
      return successResponse(res, "Product added to cart", user);
    } catch (err) {
      console.log(err);
      return errorResponse(res, err.message, err, 500);
    }
  },
];

Cart.updateCart = async (req, res) => {
  try {
    const { pid, size, quantity } = req.body;
    if (!pid || !size) {
      return errorResponse(res, "All fields are required", null, 400);
    }
    const userId = req.user;
    const user = await User.findById(userId);
    const cartData = user.cartHistory;
    const index = cartData.findIndex(
      (item) => item.productId === pid && item.size === size
    );
    if (index === -1) {
      return errorResponse(res, "Product not found in cart", null, 404);
    }
    if (quantity == 0) {
      cartData.splice(index, 1);
    } else {
      cartData[index].quantity = quantity;
    }
    user.cartHistory = cartData;
    await user.save();
    return successResponse(res, "Cart updated", user.cartHistory);
  } catch (err) {
    console.log(err);
    return errorResponse(res, err.message, err, 500);
  }
};

export default Cart;
