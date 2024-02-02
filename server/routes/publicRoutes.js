import express from "express";
import { registerUser } from "../controllers/UserController.js";

const router = express.Router();

// register user
router.post("/register", registerUser);

export default router;
