import Challenge from "../models/Challenge.js";

export const addChallenge = async (req, res) => {
  try {
    const { title, description, startDate, endDate, createdBy } = req.body;

    if (!isAuthenticated(req)) {
      return res.status(403).json({
        msg: "You are not authorized to add challenge!",
      });
    }

    // creating a new challenge
    const newChallenge = new Challenge({
      title,
      description,
      startDate,
      endDate,
      createdBy: createdBy || req.user._id,
    });

    await newChallenge.save();

    return res.status(201).json({
      msg: "Challenge added successfully!",
      challenge: newChallenge,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err.message,
      msg: "An error occurred while adding challenge!",
    });
  }
};

export const getAllChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find();

    if (!challenges) {
      return res.status(404).json({ msg: "No challenges found!" });
    }

    return res.status(200).json({ challenges: challenges });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err.message,
      msg: "An error occurred while fetching all the challenges!",
    });
  }
};

export const getChallengeDetails = async (req, res) => {
  try {
    const challengeId = req.params.challengeId;
    const challenge = await Challenge.findById(challengeId);

    if (!challenge) {
      return res.status(404).json({ msg: "Challenge not found!" });
    }
    return res.status(200).json({ challenge: challenge });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err.message,
      msg: "An error occurred while fetching challenge details!",
    });
  }
};

export const joinChallenge = async (req, res) => {
  try {
    const challengeId = req.params.challengeId;

    if (!isAuthenticated(req)) {
      return res.status(403).json({
        msg: "You are not authorized to join the challenge!",
      });
    }

    const challenge = await Challenge.findById(challengeId);
    // check if challenge exists
    if (!challenge) {
      return res.status(404).json({ msg: "Challenge not found!" });
    }

    // checking if user has already joined the challenge
    if (challenge.participants.includes(req.user.userId)) {
      return res
        .status(400)
        .json({ msg: "You have already joined the challenge!" });
    }

    // Adding the user to the challenge participants
    challenge.participants.push(req.user._id);
    await challenge.save();

    return res.status(200).json({
      msg: "You have successfully joined the challenge!",
      challenge: challenge,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err.message,
      msg: "An error occurred while joining challenge!",
    });
  }
};

function isAuthenticated(req) {
  return req.isAuthenticated && req.isAuthenticated();
}
