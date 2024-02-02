// User scheme
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  bio: { type: String, default: "" },
  profileImage: { type: String, default: "default-image.png" },
  joinedAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", UserSchema);
export default User;
