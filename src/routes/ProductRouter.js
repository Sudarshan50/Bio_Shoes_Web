import express from "express";
import product from "../controller/ProductContoller.js";
import Products from "../models/Products.js";

const ProductRouter = express.Router();

ProductRouter.get("/", product.getAllProducts);
ProductRouter.post("/", product.addProduct);
ProductRouter.get("/:pid", product.getProductsById);
ProductRouter.post("/checkout", product.finalCheckout);

export default ProductRouter;
