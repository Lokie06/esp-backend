import { Article } from "../models/article.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asynHandler.js";
import { sendConfirmation } from "./mail.controller.js";

const getUnverifiedArticles = asyncHandler(async (req, res) => {
  const articles = await Article.find({ isVerified: false });
  if (!articles) {
    return next(new ApiError(404, "No Unverified articles found!!"));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, articles, "Unverified Articles"));
});

const getVerifiedArticles = asyncHandler(async (req, res) => {
  const articles = await Article.find({ isVerified: true });
  if (!articles) {
    return next(new ApiError(404, "No Verified articles found!!"));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, articles, "Verified Articles"));
});

const verifyArticle = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return next(new ApiError(500, "No ID in param"));
  }

  const updatedArticle = await Article.findByIdAndUpdate(
    id,
    {
      isVerified: true,
    },
    {
      new: true,
      select: "fullName email isVerified title",
    }
  )
    .lean()
    .exec();

  if (!updatedArticle) {
    return next(new ApiError(404, "Couldn't verify"));
  }
  if (updatedArticle) {
    sendConfirmation(
      updatedArticle.email,
      updatedArticle.fullName,
      updatedArticle.title
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, [updatedArticle], "Article Verified"));
});

export { getUnverifiedArticles, getVerifiedArticles, verifyArticle };
