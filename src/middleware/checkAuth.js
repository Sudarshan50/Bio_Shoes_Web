import jwt from "jsonwebtoken";
import { errorResponse } from "../lib/apiResponse.js";
import User from "../models/user.js";

const isChalu = async (req, res, next) => {
  const token = req.headers?.authorization;
  if (!token) {
    return errorResponse(res, "Token not found", null, 401);
  }
  try {
    const decoded = jwt.verify(token, process.env.APP_SECRET);
    if (!decoded) {
      return errorResponse(res, "Invalid token", null, 401);
    }

    const findUser = await User.findById(decoded.id);
    if (!findUser) {
      return errorResponse(res, "Invalid Token1", null, 404);
    }
    if (findUser.currentSession > decoded.tokenIssuedAt) {
      return errorResponse(res, "Token Expired", null, 404);
    }
    req.user = decoded.id;
  } catch (err) {
    console.log(err);
    return errorResponse(res, "Invalid Token", null, 401);
  }

  next();
};

export default isChalu;
