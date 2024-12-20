import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./src/lib/db.js";
import AuthRouter from "./src/routes/AuthRouter.js";
import AnalyticsRouter from "./src/routes/AnalyticsRouter.js";
import CartRouter from "./src/routes/CartRouter.js";
import isChalu from "./src/middleware/checkAuth.js";
import { successResponse } from "./src/lib/apiResponse.js";
import ProductRouter from "./src/routes/ProductRouter.js";
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

app.get("/", isChalu, (req, res) => {
  return successResponse(res, "Welcome to the API", null);
});

dbConnect().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
