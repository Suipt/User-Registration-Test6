import { Router } from "express";
import User from "../models/user.js";
import bcryptjs from "bcryptjs";
import { config } from "dotenv";

config();
const { SALT_NUMBER } = process.env;
const userRouter = Router();

userRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user)
      return res
        .status(500)
        .json({ message: "this email is already exist, try to log in" });

    const salt = await bcryptjs.genSalt(SALT_NUMBER);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    return res.json({
      message: "User Saved seccussfully",
      success: true,
      user: {
        email: savedUser.email,
        name: savedUser.name,
      },
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

export default userRouter;
