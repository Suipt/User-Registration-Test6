import { Router } from "express";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { config } from "dotenv";
import nodemailer from "nodemailer";

config();
const { SALT_NUMBER, EMAIL, PASS } = process.env;

const userRouter = Router();

const tronsporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: "465",
  auth: {
    user: EMAIL,
    pass: PASS,
  },
});

const sendMail = (to, sub, msg) => {
  tronsporter.sendMail({
    to: to,
    subject: sub,
    html: msg,
  });
};

const genVerificationCode = () =>
  "" + Math.floor(100000 + Math.random() * 900000);

const sendVerificationCode = (email, code) => {
  sendMail(
    email,
    "Verify your email",
    `<h1>Your Verification Code</h1><p>${code}</p>`
  );
};

userRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user)
      return res.status(500).json({
        success: false,
        message: "this email is already exist, try to log in",
      });

    const salt = await bcrypt.genSalt(parseInt(SALT_NUMBER));
    const hashedPassword = await bcrypt.hash(password, salt);

    const verifyCode = genVerificationCode();
    const hashedVerificationCode = await bcrypt.hash(verifyCode, salt);

    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
      isVerified: false,
      verifyToken: hashedVerificationCode,
    });

    const savedUser = await newUser.save();

    sendVerificationCode(savedUser.email, verifyCode);

    return res.json({
      message: "User Saved seccussfully",
      success: true,
      user: {
        email: savedUser.email,
        name: savedUser.name,
        _id: savedUser._id,
        isVerified: savedUser.isVerified,
      },
    });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

export default userRouter;
