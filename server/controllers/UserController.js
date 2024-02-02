import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

const saltRounds = 10;
const secretKey = process.env.JWT_SECRET;

const generateToken = (userId) => {
  return jwt.sign({ userId }, secretKey, { expiresIn: "1d" });
};

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists!" });
    }

    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();

    const token = generateToken(newUser._id);

    return res
      .status(201)
      .json({ token, user: newUser, msg: "User registered successfully!" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: err.message, msg: "An error occurred in registeration!" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });

    if (!findUser) {
      return res
        .status(400)
        .json({ msg: "User with this email does not exist!" });
    }

    const isPasswordValid = bcrypt.compareSync(password, findUser.password);

    if (!isPasswordValid) {
      return res.status(400).json({ msg: "Invalid credentials!" });
    }

    const token = generateToken(findUser._id);

    return res
      .status(200)
      .json({ user: findUser, token, msg: "User logged in successfully!" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: err.message, msg: "An error occurred in login!" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ msg: "User logged out successfully!" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: err.message, msg: "An error occurred in logout!" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found!" });
    }

    return res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err.message,
      msg: "An error occurred while getting user profile!",
    });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedProfile = req.body;

    if (req.user._id !== userId) {
      return res
        .status(403)
        .json({ msg: "You are not authorized to update this profile!" });
    }

    const updateUser = await User.findByIdAndUpdate(userId, updatedProfile, {
      new: true,
    }).select("-password");

    if (!updateUser) return res.status(404).json({ msg: "User not found!" });

    return res
      .status(200)
      .json({ user: updateUser, msg: "User profile updated successfully!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err.message,
      msg: "An error occurred while updating user profile!",
    });
  }
};
