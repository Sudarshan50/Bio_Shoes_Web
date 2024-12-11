import express from "express";
import dotenv from "dotenv";
import ApiResponse from "./src/lib/apiResponse.js";

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  new ApiResponse.success(true, "Welcome to the API");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
