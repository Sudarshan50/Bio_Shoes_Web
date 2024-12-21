import mongoose from "mongoose";

const Analytics = new mongoose.Schema({
  pId: {
    type: String,
    ref: "Product",
    required: true,
  },
  clickedBy: {
    type: String,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.model("Analytics", Analytics);
