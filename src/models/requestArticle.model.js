import mongoose, { Schema } from "mongoose";
import validator from "validator";
import { ApiError } from "../utils/ApiError.js";
import { ValidationMiddleware } from "../middlewares/validation.middleware.js";

const validateStringField = (minLength, maxLength, fieldName) => ({
  type: String,
  required: [true, `${fieldName} is required`],
  trim: true,
  minlength: [
    minLength,
    `${fieldName} should have at least ${minLength} characters`,
  ],
  maxlength: [
    maxLength,
    `${fieldName} should not exceed ${maxLength} characters`,
  ],
});

const requestArticleSchema = Schema(
  {
    fullName: validateStringField(2, 50, "Full name"),
    seniorName: validateStringField(2, 50, "Senior name"),
    companyName: validateStringField(2, 50, "Company name"),
    note: validateStringField(5, 500, "Note"),
    contactInfo: {
      ...validateStringField(1, 200, "Contact information"),
      validate: {
        validator: value => {
          return (
            validator.isMobilePhone(value, "any", { strictMode: false }) ||
            validator.isEmail(value) ||
            isValidSocialMediaLink(value)
          );
        },
        message:
          "Please provide a valid mobile number, email, or social media link.",
      },
    },
  },
  { timestamps: true }
);

function isValidSocialMediaLink (value) {
  const socialMediaLinkRegex =
    /^(https?:\/\/)?(www\.)?(facebook|twitter|instagram|linkedin)\.com\/.*/;
  return socialMediaLinkRegex.test(value);
}

requestArticleSchema.post(
  "validate",
  ValidationMiddleware(400, "Provide Correct Contact Information")
);

export const RequestArticle = mongoose.model(
  "RequestArticles",
  requestArticleSchema
);
