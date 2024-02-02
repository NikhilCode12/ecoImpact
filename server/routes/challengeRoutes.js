import express from "express";
import {
  addChallenge,
  getAllChallenges,
  getChallengeDetails,
  joinChallenge,
} from "../controllers/ChallengeController.js";

const router = express.Router();

// Add a new Challenge i.e create one
router.post("/createChallenge", addChallenge);

// Get all challenges
router.get("/getAllChallenges", getAllChallenges);

// Get challenge details
router.get("/getChallengeDetails/:challengeId", getChallengeDetails);

// Join a challenge
router.post("/joinChallenge/:challengeId", joinChallenge);

export default router;
