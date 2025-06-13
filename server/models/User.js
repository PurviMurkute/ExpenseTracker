import { model, Schema } from "mongoose";
import validator from "validator";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email",
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function isStrongPassword(pw) {
          return validator.isStrongPassword(pw, {
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          });
        },
        message:
          "password must be atleast 6 characters long and must conatain atleast 1 uppercase, lowercase, number and special character",
      },
    },
    DOB: {
      type: String,
      required: true,
    },
    city: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

export default User;
