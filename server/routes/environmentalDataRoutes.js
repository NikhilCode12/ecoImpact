import express from "express";
import {
  addEnvironmentData,
  getEnvironmentalData,
} from "../controllers/EnvironmentDataController.js";

const router = express.Router();

// Add environmental data
router.post("/addData", addEnvironmentData);

// Get environmental data
router.get("/getData:userId", getEnvironmentalData);

export default router;
