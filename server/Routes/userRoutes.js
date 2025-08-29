import express from "express";
import {
  postSignUp,
  postLogin,
  putUserProfile,
  putPassword,
  deleteAccount,
} from "../controllers/user.js";
import { verifyJWT } from "../middlewares/jwt.js";

const userRouter = express.Router();

userRouter.post("/signup", postSignUp);
userRouter.post("/login", postLogin);
userRouter.put("/profile/:userid", verifyJWT, putUserProfile);
userRouter.put("/password/:userid", verifyJWT, putPassword);
userRouter.delete("/account/:userid", verifyJWT, deleteAccount);

export default userRouter;