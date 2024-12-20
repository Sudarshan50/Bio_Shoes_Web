import { validationResult, check } from "express-validator";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { errorResponse, successResponse } from "../lib/apiResponse.js";
import bcrypt from "bcryptjs";

let Auth = {};

Auth.login = [
  check("email").isEmail().notEmpty(),
  check("password").isLength({ min: 6 }).notEmpty(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return errorResponse(
          res,
          `${errors?.array()[0]?.path} has ${errors?.array()[0]?.msg} `,
          errors.array()[0],
          422
        );
      }
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) {
        return errorResponse(res, "User not found", null, 404);
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return errorResponse(res, "Invalid credentials", null, 400);
      }
      const token = jwt.sign(
        { id: user._id, tokenIssuedAt: Date.now() },
        process.env.APP_SECRET,
        {
          expiresIn: "1h",
        }
      );
      return successResponse(res, "Login successful", { token });
    } catch (err) {
      console.log(err);
    }
  },
];

Auth.signup = [
  check("email").isEmail().notEmpty(),
  check("password").isLength({ min: 6 }).notEmpty(),
  check("name").isLength({ min: 3 }).notEmpty(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return errorResponse(
          res,
          `${errors?.array()[0]?.path} has ${errors?.array()[0]?.msg} `,
          errors.array()[0],
          422
        );
      }
      const { email, password, name } = req.body;
      const user = await User.findOne({ email: email });
      if (user) {
        return errorResponse(res, "User already exists", null, 400);
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id, tokenIssuedAt: Date.now() },
        process.env.APP_SECRET,
        {
          expiresIn: "1h",
        }
      );
      return successResponse(res, "User created successfully", { token });
    } catch (err) {
      return errorResponse(res, "Something went wrong", err, 500);
    }
  },
];

Auth.googleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return errorResponse(res, "Token not found", null, 400);
    }
    const decoded = jwt.decode(token);
    if (!decoded) {
      return errorResponse(res, "Invalid token", null, 400);
    }
    const { email, name } = decoded;
    console.log(email, name);
    const user = await User.findOne({ email: email });
    if (!user) {
      const newUser = new User({
        name,
        email,
      });
      await newUser.save();
      const authToken = jwt.sign(
        { id: newUser._id, tokenIssuedAt: Date.now() },
        process.env.APP_SECRET,
        {
          expiresIn: "1h",
        }
      );
      return successResponse(res, "Login successful", { token: authToken });
    }
    console.log(user);
    const authToken = jwt.sign(
      { id: user._id, tokenIssuedAt: Date.now() },
      process.env.APP_SECRET,
      {
        expiresIn: "1h",
      }
    );
    return successResponse(res, "Login successful", { token: authToken });
  } catch (err) {
    return errorResponse(res, "Something went wrong", err, 500);
  }
};

Auth.logOut = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    user.currentSession = Date.now();
    await user.save();
    return successResponse(res, "Logged out successfully", null);
  } catch (err) {
    console.log(err);
    return errorResponse(res, "Something went wrong", err, 500);
  }
};

Auth.check = async (req, res) => {
  try {
    return successResponse(res, "User is logged in", null);
  } catch (err) {
    console.log(err);
    return errorResponse(res, "Something went wrong", err, 500);
  }
};

export default Auth;
