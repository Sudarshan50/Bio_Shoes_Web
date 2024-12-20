import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./lib/db.js";
import AuthRouter from "./routes/AuthRouter.js";
import AnalyticsRouter from "./routes/AnalyticsRouter.js";
import CartRouter from "./routes/CartRouter.js";
import isChalu from "./middleware/checkAuth.js";
import { successResponse } from "./lib/apiResponse.js";
import ProductRouter from "./routes/ProductRouter.js";
import cors from "cors";

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/anal", AnalyticsRouter);
app.use("/api/v1/cart", CartRouter);
app.use("/api/v1/product", ProductRouter);

dbConnect().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
