import express from "express";
import Cart from "../controller/CartController.js";
import isChalu from "../middleware/checkAuth.js";

const CartRouter = express.Router();

CartRouter.get("/", isChalu, Cart.getCart);
CartRouter.post("/", isChalu, Cart.addToCart);
CartRouter.post("/update", isChalu, Cart.updateCart);

export default CartRouter;
