import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Pleas provide your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verifyToken: {
    type: String,
  },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
