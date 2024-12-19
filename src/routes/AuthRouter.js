import express from "express";
import Auth from "../controller/AuthController.js";

const AuthRouter = express.Router();

AuthRouter.post("/login", Auth.login);
AuthRouter.post("/signup", Auth.signup);
AuthRouter.post("/google", Auth.googleLogin);

export default AuthRouter;
