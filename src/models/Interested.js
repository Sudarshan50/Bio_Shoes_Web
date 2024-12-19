import mongoose from "mongoose";

const Interested = new mongoose.Schema({
  clickCnt: {
    type: Number,
    required: true,
    default: 0,
  },
  clickedBy: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Interested", Interested);
