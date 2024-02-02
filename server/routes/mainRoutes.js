import express from "express";
import userRoutes from "./userRoutes.js";
import environmentalDataRoutes from "./environmentalDataRoutes.js";
import challengeRoutes from "./challengeRoutes.js";

const router = express.Router();

// User routes middleware
router.use("/user", userRoutes);

// Environmental data routes middleware
router.use("/environmentalData", environmentalDataRoutes);

// Challenge routes middleware
router.use("/challenges", challengeRoutes);

export default router;
