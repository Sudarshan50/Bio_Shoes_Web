import mongoose from "mongoose";

const Product = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  reviews: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Product", Product);
