import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ACCESS_TOKEN_EXPIRY, ACCESS_TOKEN_SECRET } from "../config/index.js";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email address"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please add valid email address.",
      ],
    },
    password: {
      type: String,
      required: [true, "Password can not be blank"],
      select: false,
      minlength: 6,
    },
    username: {
      type: String,
      required: [true, "Please provide a username"],
      unique: true,
    },
    cuBatch: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });
};

userSchema.methods.matchPassword = async function (enteredPassword) {
  const response = await bcrypt.compare(enteredPassword, this.password);
  return response;
};

export const User = mongoose.model("User", userSchema);
