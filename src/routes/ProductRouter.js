import express from "express";
import product from "../controller/ProductContoller.js";

const ProductRouter = express.Router();


ProductRouter.get('/',product.getAllProducts);
ProductRouter.get('/:pid',product.getProductsById);



export default ProductRouter;
