import express from "express";
import Anal from "../controller/AnalController.js";

const AnalyticsRouter = express.Router();

AnalyticsRouter.patch("/l2intrest", Anal.finalCheckout);
AnalyticsRouter.post("/customIntrest", Anal.customIntrest);

export default AnalyticsRouter;
