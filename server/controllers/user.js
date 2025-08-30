import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import validator from "validator";
import sendMail from "../Mail/sendMail.js";
import htmlBody from "../Mail/mailBody.js";
import { flushCache } from "../utils/cache.js";

const postSignUp = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "All fiels are required",
    });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "User with this email already exists",
    });
  }

  if (
    !validator.isStrongPassword(password, {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    return res.status(400).json({
      success: false,
      data: null,
      message:
        "Password must be at least 6 characters long and contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character.",
    });
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: encryptedPassword,
  });

  try {
    const savedUser = await user.save();

    sendMail(email, `Welcome to ExpenseDiary ${name}`, "", htmlBody(name));

    return res.status(201).json({
      success: true,
      data: savedUser,
      message: "SignUp Successful",
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      data: null,
      message: e.message,
    });
  }
};

const postLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "All fiels are required",
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Invalid email or password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Invalid email or password",
    });
  }

  user.password = undefined; //remove pass from response

  const jwtToken = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: 60 * 60 * 24 }
  );

  res.status(200).json({
    success: true,
    data: user,
    jwtToken: jwtToken,
    message: "Login Successful",
  });
};

const getCurrentUser = (req, res) => {
  try {
    let user = req.user;

    if (!user) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
      message: "User fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: null,
      message: error.message,
    });
  }
};

const putUserProfile = async (req, res) => {
  const { userid } = req.params;
  const { name, email } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userid)) {
    return res.status(400).json({
      success: false,
      message: "Invalid user ID",
      data: null,
    });
  }

  try {
    const updatedProfile = await User.findByIdAndUpdate(
      userid,
      { name, email },
      { new: true, runValidators: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        data: null,
      });
    }
    await flushCache(`user:${userid}`);

    return res.status(200).json({
      success: true,
      data: updatedProfile,
      message: "Profile updated successfully",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      data: null,
      message: e.message,
    });
  }
};

const putPassword = async (req, res) => {
  const { userid } = req.params;
  const { currentPass, newPass, confirmNewPass } = req.body;

  if (!currentPass || !newPass || !confirmNewPass) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "All fields are required",
    });
  }
  if (newPass !== confirmNewPass) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "New password do not match",
    });
  }
  if (currentPass === newPass) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "New password must be different from previous one",
    });
  }

  try {
    const user = await User.findById({ _id: userid });

    const isPasswordCorrect = await bcrypt.compare(currentPass, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "Current password is incorrect",
      });
    }

    const encryptedPass = await bcrypt.hash(newPass, 10);

    user.password = encryptedPass;
    const updatedUser = await user.save();
    await flushCache(`user:${userid}`);

    return res.status(200).json({
      success: true,
      data: updatedUser,
      message: "Password changed successfully",
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      data: null,
      message: e?.message,
    });
  }
};

const deleteAccount = async (req, res) => {
  const { userid } = req.params;
  try {
    await User.findByIdAndDelete({ _id: userid });
    await flushCache(`user:${userid}`);

    return res.status(200).json({
      success: true,
      data: null,
      message: "Account Deleted Successfully",
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      data: null,
      message: e.message,
    });
  }
};

export { postSignUp, postLogin, getCurrentUser, putUserProfile, putPassword, deleteAccount };
