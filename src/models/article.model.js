import mongoose, { Schema } from "mongoose";
import validator from "validator";
import { ValidationMiddleware } from "../middlewares/validation.middleware.js";

const articleSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    companyDomainName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Email address is required"],
      validate: {
        validator: validator.isEmail,
        message: "{VALUE} is not a valid email",
        isAsync: false,
      },
    },
    description: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    showName: {
      type: Boolean,
      default: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    userImage: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vectorstock.com%2Froyalty-free-vector%2Flinear-personal-account-information-icon-user-vector-29007762&psig=AOvVaw2TZvNv55y4UqRBjV8iseBi&ust=1709657892066000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCJD8s46K24QDFQAAAAAdAAAAABAR",
    },
  },
  {
    timestamps: true,
  }
);
articleSchema.post(
  "validate",
  ValidationMiddleware(400, "Provide Valid Email")
);
export const Article = mongoose.model("Article", articleSchema);
