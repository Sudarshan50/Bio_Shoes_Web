import mongoose from "mongoose";

const Analytics = new mongoose.Schema({
  pId: {
    type: String,
    ref: "Product",
    required: true,
    unique: true,
  },
  clickedBy: {
    type: String,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.model("Analytics", Analytics);
