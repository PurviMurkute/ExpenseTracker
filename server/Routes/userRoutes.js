import express from "express";
import {
  postSignUp,
  postLogin,
  putUserProfile,
  putPassword,
  deleteAccount,
  getCurrentUser,
} from "../controllers/user.js";
import { verifyJWT } from "../middlewares/jwt.js";
import passport from "passport";
import jwt from 'jsonwebtoken';

const userRouter = express.Router();

userRouter.post("/signup", postSignUp);
userRouter.post("/login", postLogin);
userRouter.get('/user', verifyJWT, getCurrentUser);
userRouter.put("/profile/:userid", verifyJWT, putUserProfile);
userRouter.put("/password/:userid", verifyJWT, putPassword);
userRouter.delete("/account/:userid", verifyJWT, deleteAccount);
userRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
userRouter.get(
  "/google/callback",
  passport.authenticate("/google", { session: false }),
  (req, res) => {
    try {
      const token = jwt.sign(
        { id: req.user._id, name: req.user.name, email: req.user.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
      res.redirect(`${process.env.CLIENT_URL}/google-success?token=${token}`);
    } catch (error) {
      console.log("Google login error:", error);
      res.redirect(`${process.env.CLIENT_URL}/signin`);
    }
  }
);

export default userRouter;
