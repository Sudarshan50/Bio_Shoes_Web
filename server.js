import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./src/lib/db.js";
import AuthRouter from "./src/routes/AuthRouter.js";
import AnalyticsRouter from "./src/routes/AnalyticsRouter.js";

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/anal", AnalyticsRouter);



dbConnect().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
