import { errorResponse, successResponse } from "../lib/apiResponse.js";
import Interested from "../models/Interested.js";
import Analytics from "../models/Analytics.js";

let Anal = {};

Anal.finalCheckout = async (req, res) => {
  try {
    const userId = req.user;
    if (!userId) {
      return errorResponse(res, "User not found", null, 404);
    }
    const increment = await Interested.findOneAndUpdate(
      {},
      {
        $inc: { clickCnt: 1 },
        $push: { clickedBy: userId },
      },
      { new: true, upsert: true }
    );

    await increment.save();
    return successResponse(res, "Incremented Successfully");
  } catch (err) {
    console.log(err);
    return errorResponse(res, err.message, err, 500);
  }
};
export default Anal;

Anal.customIntrest = async (req, res) => {
  try {
    const userId = req.user;
    if (!userId) {
      return errorResponse(res, "Not Authenticated", null, 404);
    }
    const { pId } = req.body;
    if (!pId) {
      return errorResponse(res, "Product Id not found", null, 404);
    }
    const newanal = new Analytics({
      pId,
      clickedBy: userId,
    });
    await newanal.save();
    return successResponse(res, "Incremented Successfully");
  } catch (err) {
    console.log(err);
    return errorResponse(res, err.message, err, 500);
  }
};
