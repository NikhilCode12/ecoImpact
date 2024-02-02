import express from "express";
import {
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/UserController.js";
import { authenticationMiddleware } from "../middlewares/authenticationMiddleware.js";

const router = express.Router();

// Login user
router.post("/login", loginUser);

// Logout user
router.post("/logout", logoutUser);

// Get user profile
router.get("/profile:userId", getUserProfile);

// Update user profile
router.put("/profile:userId", updateUserProfile);

export default router;
