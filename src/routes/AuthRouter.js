import express from "express";
import Auth from "../controller/AuthController.js";
import isChalu from "../middleware/checkAuth.js";

const AuthRouter = express.Router();

AuthRouter.post("/login", Auth.login);
AuthRouter.post("/signup", Auth.signup);
AuthRouter.post("/google", Auth.googleLogin);
AuthRouter.post("/logout", isChalu, Auth.logOut);
AuthRouter.get('/check', isChalu, Auth.check);

export default AuthRouter;
